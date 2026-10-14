import { motion } from "motion/react";
import { FiZap, FiCheck, FiLock, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { ServerUrl } from "../App";
import axios from "axios"
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
  const dispatch = useDispatch()

  
  const handlePayment = async (plan) => {
    try {
      

      const amount =  plan.amount
     

      const result = await axios.post(ServerUrl + "/api/payment/order" , {
        amount: amount,
        aiCredits: plan.aiCredits,
      },{withCredentials:true})
      

      const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: result.data.amount,
      currency: "INR",
      name: "Virtual.AI",
      description: `${plan.name} - ${plan.credits} Credits`,
      order_id: result.data.id,

      handler:async function (response) {
        const verifypay = await axios.post(ServerUrl + "/api/payment/verify" ,response , {withCredentials:true})
        dispatch(setUserData(verifypay.data.user))

          alert("Payment Successful 🎉 AICredits Added!");
          navigate("/generate")

      },
      theme:{
        color: "#34079C",
      },

      }

      const rzp = new window.Razorpay(options)
      rzp.open()

      setLoadingPlan(null);
    } catch (error) {
     console.log(error)
     
    }
  }

  return (
    <div
      className="min-h-screen text-white relative overflow-hidden flex flex-col"
      style={{
        background: "linear-gradient(135deg, #0a0a1a 0%, #0d0d28 60%, #0a1628 100%)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');`}</style>

      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }} />

      {/* Glow blobs */}
      <div className="absolute top-[-8%] left-[10%] w-80 h-80 rounded-full pointer-events-none opacity-20"
        style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)", filter: "blur(70px)" }} />
      <div className="absolute bottom-[-6%] right-[5%] w-72 h-72 rounded-full pointer-events-none opacity-15"
        style={{ background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-14 w-full">

        {/* Back */}
        <motion.button
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-all mb-10 cursor-pointer bg-transparent border-none"
        >
          <FiArrowLeft size={15} /> Back
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
            style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)" }}>
            <FiZap size={13} className="text-indigo-400" />
            <span className="text-xs font-semibold tracking-widest text-indigo-300 uppercase">AI Credits</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold mb-3"
            style={{ fontFamily: "'Syne', sans-serif", letterSpacing: "-0.03em" }}>
            Simple{" "}
            <span style={{
              background: "linear-gradient(135deg, #818cf8 0%, #06b6d4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>Pricing</span>
          </h1>
          <p className="text-white/35 text-sm max-w-sm mx-auto">
            Choose a plan that fits your workflow. Credits are used each time you generate a component.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="relative rounded-2xl p-6 flex flex-col"
              style={{
                background: plan.highlight
                  ? "linear-gradient(145deg, rgba(99,102,241,0.12) 0%, rgba(6,182,212,0.06) 100%)"
                  : "rgba(255,255,255,0.03)",
                border: plan.highlight
                  ? "1px solid rgba(99,102,241,0.35)"
                  : "1px solid rgba(255,255,255,0.07)",
                boxShadow: plan.highlight ? "0 0 40px rgba(99,102,241,0.12)" : "none",
              }}
            >
              {/* Tag */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{
                    background: plan.highlight ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.06)",
                    color: plan.highlight ? "#818cf8" : "rgba(255,255,255,0.4)",
                    border: plan.highlight ? "1px solid rgba(99,102,241,0.3)" : "1px solid rgba(255,255,255,0.08)",
                  }}>
                  {plan.tag}
                </span>
                {plan.disabled && (
                  <FiLock size={13} className="text-white/20" />
                )}
              </div>

              {/* Plan name */}
              <h2 className="text-xl font-bold mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
                {plan.name}
              </h2>
              <p className="text-white/35 text-xs mb-5">{plan.description}</p>

              {/* Price */}
              <div className="mb-6">
                {plan.amount ? (
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-extrabold" style={{ fontFamily: "'Syne', sans-serif" }}>
                      ₹{plan.amount}
                    </span>
                    
                  </div>
                ) : (
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-extrabold" style={{ fontFamily: "'Syne', sans-serif" }}>
                      Free
                    </span>
                  </div>
                )}
                {/* Credits badge */}
                <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-lg"
                  style={{
                    background: plan.highlight ? "rgba(6,182,212,0.1)" : "rgba(255,255,255,0.05)",
                    border: plan.highlight ? "1px solid rgba(6,182,212,0.2)" : "1px solid rgba(255,255,255,0.07)",
                  }}>
                  <FiZap size={11} style={{ color: plan.highlight ? "#06b6d4" : "rgba(255,255,255,0.4)" }} />
                  <span className="text-xs font-semibold" style={{ color: plan.highlight ? "#06b6d4" : "rgba(255,255,255,0.4)" }}>
                    {plan.aiCredits} AI Credits
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-white/60">
                    <FiCheck size={13} style={{ color: plan.highlight ? "#818cf8" : "rgba(255,255,255,0.3)" }} />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={()=>handlePayment(plan)}
                disabled={plan.disabled}
                className="w-full py-3 rounded-xl text-sm font-semibold transition-all"
                style={{
                  cursor: plan.disabled ? "not-allowed" : "pointer",
                  background: plan.disabled
                    ? "rgba(255,255,255,0.04)"
                    : "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                  color: plan.disabled ? "rgba(255,255,255,0.25)" : "#fff",
                  border: plan.disabled ? "1px solid rgba(255,255,255,0.07)" : "none",
                  boxShadow: plan.disabled ? "none" : "0 0 24px rgba(99,102,241,0.35)",
                }}
              >
                {plan.disabled ? (
                  <span className="flex items-center justify-center gap-2">
                    <FiCheck size={14} /> {plan.cta}
                  </span>
                ) : plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-white/20 text-xs mt-8"
        >
          Credits are added to your account instantly after payment.
        </motion.p>
      </div>
    </div>
  );
}