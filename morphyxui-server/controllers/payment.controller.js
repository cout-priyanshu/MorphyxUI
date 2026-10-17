import Payment from "../models/payment.model.js";
import User from "../models/user.model.js"; 
import { razorpay } from "../configs/razorpay.config.js";
import crypto from "crypto";

export const CreateOrder = async (req, res) => {
    try {
        const { amount, aiCredits } = req.body;
        if (!amount || !aiCredits) {
            return res.status(400).json({ message: "Invalid plan data" });
        }

        const options = {
            amount: amount * 100, // Amount in paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        await Payment.create({
            userId: req.userId,
            amount,
            aiCredits,
            razorpayOrderId: order.id,
            status: "created",
        });

        return res.status(200).json(order);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `failed to create Razorpay order: ${error.message || error}` });
    }
};

export const verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ message: "Invalid payment signature" });
        }

        const payment = await Payment.findOne({
            razorpayOrderId: razorpay_order_id,
        });

        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        if (payment.status === "paid") {
            return res.json({ message: "Already processed" });
        }

        payment.status = "paid";
        payment.razorpayPaymentId = razorpay_payment_id;
        await payment.save();

        // User ke credits increment karein
        const updatedUser = await User.findByIdAndUpdate(
            payment.userId,
            { $inc: { aiCredits: payment.aiCredits } },
            { new: true }
        );

        return res.json({
            success: true,
            message: "Payment verified and credits added",
            user: updatedUser,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `failed to verify Razorpay payment: ${error.message || error}` });
    }
};