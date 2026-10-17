import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { CreateOrder , verifyPayment } from "../controllers/payment.controller.js"

const paymentRouter = express.Router()

paymentRouter.post("/create" ,isAuth ,CreateOrder)

paymentRouter.post("/verify" , isAuth , verifyPayment)

export default paymentRouter