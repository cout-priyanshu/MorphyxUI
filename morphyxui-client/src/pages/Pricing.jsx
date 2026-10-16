import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiZap, FiCheck, FiLock, FiArrowLeft, FiLoader } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { ServerUrl } from "../App";
import axios from "axios";
import { setUserData } from "../redux/userSlice";
import { useDispatch } from "react-redux";

const plans = [
  {
    name: "Free",
    amount: null,
    aiCredits: 150,
    tag: "Current Plan",
    description: "Get started with AI-powered component generation.",
    features: [
      "150 AI Credits included",
      "Save components",
      "Preview & export code",
      "Community support",
    ],
    cta: "Active",
    disabled: true,
    highlight: false,
  },
  {
    name: "Pro",
    amount: 39,
    aiCredits: 200,
    tag: "Most Popular",
    description: "More credits to build faster with no interruptions.",
    features: [
      "200 AI Credits added",
      "Save components",
      "Preview & export code",
      "Priority support",
    ],
    cta: "Buy for ₹39",
    disabled: false,
    highlight: true,
  },
];

export default function Pricing() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loadingPlan, setLoadingPlan] = useState(null);

  const handlePayment = async (plan) => {
    if (plan.disabled || loadingPlan) return;
    setLoadingPlan(plan.name);

    try {
      const amount = plan.amount;

      const result = await axios.post(
        `${ServerUrl}/api/payment/order`,
        {
          amount: amount,
          aiCredits: plan.aiCredits,
        },
        { withCredentials: true }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: result.data.amount,
        currency: "INR",
        name: "MorphyxUI",
        description: `${plan.name} Plan - ${plan.aiCredits} AI Credits`,
        order_id: result.data.id,
        handler: async function (response) {
          try {
            const verifypay = await axios.post(
              `${ServerUrl}/api/payment/verify`,
              response,
              { withCredentials: true }
            );
            dispatch(setUserData(verifypay.data.user));
            alert("Payment Successful 🎉 AI Credits Added!");
            navigate("/generate");
          } catch (verifyError) {
            console.error("Verification error:", verifyError);
            alert("Payment verification failed. Please contact support.");
          } finally {
            setLoadingPlan(null);
          }
        },
        modal: {
          ondismiss: function () {
            setLoadingPlan(null);
          },
        },
        theme: {
          color: "#e11d48",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment initialization error:", error);
      alert("Failed to initiate payment. Please try again.");
      setLoadingPlan(null);
    }
  };

  return (
    <div
      className="min-h-screen text-[#f5eff2] relative overflow-hidden flex flex-col bg-[#070507]"
      style={{
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');`}</style>

      {/* Grid bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(#f43f5e 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Glow blobs */}
      <div
        className="absolute top-[-10%] left-[5%] w-96 h-96 rounded-full pointer-events-none opacity-[0.08]"
        style={{
          background: "#be123c",
          filter: "blur(140px)",
        }}
      />
      <div
        className="absolute bottom-[-10%] right-[5%] w-96 h-96 rounded-full pointer-events-none opacity-[0.06]"
        style={{
          background: "#f43f5e",
          filter: "blur(150px)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-14 w-full">
        {/* Back */}
        <motion.button
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-[#f5eff2]/40 hover:text-white transition-all mb-10 cursor-pointer bg-transparent border-none"
        >
          <FiArrowLeft size={15} /> Back
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 border border-[#e11d48]/30 bg-[#2a171f]/50 backdrop-blur-md"
          >
            <FiZap size={13} className="text-[#f43f5e]" />
            <span className="text-xs font-semibold tracking-widest text-[#fbcfe8] uppercase">
              AI Credits
            </span>
          </div>

          <h1
            className="text-4xl sm:text-5xl font-extrabold mb-3 tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Simple{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f5eff2] via-[#fbcfe8] to-[#e11d48]">
              Pricing
            </span>
          </h1>
          <p className="text-[#f5eff2]/40 text-sm max-w-sm mx-auto leading-relaxed">
            Choose a plan that fits your workflow. Credits are used each time you generate a component.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {plans.map((plan, i) => {
            const isLoading = loadingPlan === plan.name;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="relative rounded-2xl p-6 flex flex-col"
                style={{
                  background: plan.highlight
                    ? "linear-gradient(145deg, rgba(225,29,72,0.12) 0%, rgba(12,8,10,0.9) 100%)"
                    : "#0c080a",
                  border: plan.highlight
                    ? "1px solid rgba(225,29,72,0.35)"
                    : "1px solid rgba(255,255,255,0.08)",
                  boxShadow: plan.highlight
                    ? "0 0 40px rgba(225,29,72,0.15)"
                    : "0 10px 30px rgba(0,0,0,0.5)",
                }}
              >
                {/* Tag */}
                <div className="flex items-center justify-between mb-5">
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      background: plan.highlight
                        ? "rgba(225,29,72,0.2)"
                        : "rgba(255,255,255,0.06)",
                      color: plan.highlight ? "#fbcfe8" : "rgba(245,239,242,0.45)",
                      border: plan.highlight
                        ? "1px solid rgba(225,29,72,0.35)"
                        : "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    {plan.tag}
                  </span>
                  {plan.disabled && (
                    <FiLock size={13} className="text-[#f5eff2]/30" />
                  )}
                </div>

                {/* Plan name */}
                <h2
                  className="text-xl font-bold mb-1 text-[#f5eff2]"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {plan.name}
                </h2>
                <p className="text-[#f5eff2]/40 text-xs mb-5">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  {plan.amount ? (
                    <div className="flex items-end gap-1">
                      <span
                        className="text-4xl font-extrabold text-[#f5eff2]"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                      >
                        ₹{plan.amount}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-end gap-1">
                      <span
                        className="text-4xl font-extrabold text-[#f5eff2]"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                      >
                        Free
                      </span>
                    </div>
                  )}

                  {/* Credits badge */}
                  <div
                    className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-lg"
                    style={{
                      background: plan.highlight
                        ? "rgba(225,29,72,0.12)"
                        : "rgba(255,255,255,0.04)",
                      border: plan.highlight
                        ? "1px solid rgba(225,29,72,0.25)"
                        : "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <FiZap
                      size={11}
                      style={{
                        color: plan.highlight
                          ? "#f43f5e"
                          : "rgba(245,239,242,0.4)",
                      }}
                    />
                    <span
                      className="text-xs font-semibold"
                      style={{
                        color: plan.highlight
                          ? "#fbcfe8"
                          : "rgba(245,239,242,0.4)",
                      }}
                    >
                      {plan.aiCredits} AI Credits
                    </span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2.5 text-sm text-[#f5eff2]/65"
                    >
                      <FiCheck
                        size={13}
                        style={{
                          color: plan.highlight
                            ? "#f43f5e"
                            : "rgba(245,239,242,0.3)",
                        }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  type="button"
                  onClick={() => handlePayment(plan)}
                  disabled={plan.disabled || isLoading}
                  className="w-full py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2"
                  style={{
                    cursor: plan.disabled || isLoading ? "not-allowed" : "pointer",
                    background: plan.disabled
                      ? "rgba(255,255,255,0.04)"
                      : "linear-gradient(135deg, #be123c 0%, #e11d48 50%, #f43f5e 100%)",
                    color: plan.disabled ? "rgba(245,239,242,0.3)" : "#fff",
                    border: plan.disabled
                      ? "1px solid rgba(255,255,255,0.07)"
                      : "1px solid rgba(225,29,72,0.4)",
                    boxShadow: plan.disabled
                      ? "none"
                      : "0 0 24px rgba(225,29,72,0.3)",
                    opacity: isLoading ? 0.7 : 1,
                  }}
                >
                  {isLoading ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="inline-block"
                      >
                        <FiLoader size={14} />
                      </motion.span>
                      Processing...
                    </>
                  ) : plan.disabled ? (
                    <span className="flex items-center justify-center gap-2">
                      <FiCheck size={14} /> {plan.cta}
                    </span>
                  ) : (
                    plan.cta
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-[#f5eff2]/30 text-xs mt-8"
        >
          Credits are added to your account instantly after payment.
        </motion.p>
      </div>
    </div>
  );
}