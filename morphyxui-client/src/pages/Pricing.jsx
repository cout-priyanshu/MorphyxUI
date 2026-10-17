import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  TbHexagonLetterM,
  TbCpu,
  TbCheck,
  TbLock,
  TbArrowLeft,
  TbArrowRight,
  TbLoader,
  TbShieldCheck,
  TbTerminal2,
  TbSparkles,
  TbBolt,
  TbDeviceFloppy,
  TbWorld
} from "react-icons/tb"
import { useNavigate } from "react-router-dom"
import { ServerUrl } from "../App"
import axios from "axios"
import { setUserData } from "../redux/userSlice"
import { useDispatch } from "react-redux"
import gsap from "gsap"

const plans = [
  {
    tier: "01",
    name: "FREE TIER",
    amount: null,
    aiCredits: 150,
    tag: "CURRENT SPECIFICATION",
    description: "Default compute allocation for testing and personal sandbox development.",
    features: [
      "150 Neural AI Credits included",
      "Full access to prebuilt UI units",
      "Interactive prop sandbox preview",
      "TailwindCSS clean code export",
      "Public community support channel",
    ],
    cta: "ACTIVE WORKSPACE",
    disabled: true,
    highlight: false,
  },
  {
    tier: "02",
    name: "PRO COMPUTE",
    amount: 39,
    aiCredits: 200,
    tag: "RECOMMENDED SPEC",
    description: "Instant top-up compute tokens to build and ship production interfaces with zero interruptions.",
    features: [
      "+200 High-Priority AI Credits",
      "Priority neural engine synthesis",
      "Unlimited component storage",
      "Full JSX + Tailwind source export",
      "Commercial production license",
    ],
    cta: "ACQUIRE CREDITS // ₹39",
    disabled: false,
    highlight: true,
  },
]

export default function Pricing() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const containerRef = useRef(null)
  const [loadingPlan, setLoadingPlan] = useState(null)

  // GSAP Entrance Choreography
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gsap-price-nav",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", clearProps: "transform,opacity" }
      )
      gsap.fromTo(
        ".gsap-price-hero",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.1, ease: "power3.out", clearProps: "transform,opacity" }
      )
      gsap.fromTo(
        ".gsap-price-card",
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.6, delay: 0.2, ease: "power3.out", clearProps: "transform,opacity" }
      )
      gsap.fromTo(
        ".gsap-price-telemetry",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, delay: 0.35, ease: "power3.out", clearProps: "transform,opacity" }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const handlePayment = async (plan) => {
    if (plan.disabled || loadingPlan) return
    setLoadingPlan(plan.name)

    try {
      const amount = plan.amount

      const result = await axios.post(
        `${ServerUrl}/api/payment/create`,
        {
          amount: amount,
          aiCredits: plan.aiCredits,
        },
        { withCredentials: true }
      )

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: result.data.amount,
        currency: "INR",
        name: "MorphyxUI",
        description: `${plan.name} - ${plan.aiCredits} AI Credits Allocation`,
        order_id: result.data.id,
        handler: async function (response) {
          try {
            const verifypay = await axios.post(
              `${ServerUrl}/api/payment/verify`,
              response,
              { withCredentials: true }
            )
            dispatch(setUserData(verifypay.data.user))
            alert("Payment Successful 🎉 AI Credits Added to Workspace!")
            navigate("/generate")
          } catch (verifyError) {
            console.error("Verification error:", verifyError)
            alert("Payment verification failed. Please contact support.")
          } finally {
            setLoadingPlan(null)
          }
        },
        modal: {
          ondismiss: function () {
            setLoadingPlan(null)
          },
        },
        theme: {
          color: "#0a0a0a",
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (error) {
      console.error("Payment initialization error:", error)
      alert("Failed to initiate payment. Please try again.")
      setLoadingPlan(null)
    }
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#070707] text-white overflow-x-hidden selection:bg-white selection:text-black flex flex-col justify-between"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Background Architectural Blueprint Grid Lines */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:56px_56px] pointer-events-none z-0" />

      {/* Top Architectural Studio Navigation */}
      <nav className="gsap-price-nav sticky top-0 z-40 flex items-center justify-between px-5 sm:px-10 py-4 border-b border-white/15 bg-[#0d0d0d]/95 backdrop-blur-md relative z-30">
        <div 
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-9 h-9 rounded-none border border-white/30 bg-white/5 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
            <TbHexagonLetterM size={20} />
          </div>
          <div>
            <span
              className="text-base font-bold uppercase tracking-wider text-white block leading-none"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              MorphyxUI
            </span>
            <span className="text-[9px] font-mono uppercase tracking-[2px] text-white/40 block mt-1">
              Compute Token Protocol
            </span>
          </div>
        </div>

        {/* Right Navigation & Helpers */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-white/50 border-r border-white/15 pr-6">
            <TbTerminal2 size={15} className="text-white/70" />
            <span>npm i morphyx-ui</span>
          </div>

          <button
            onClick={() => navigate("/generate")}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 bg-transparent hover:bg-white/10 text-white font-mono text-xs uppercase tracking-wider border border-white/20 rounded-none cursor-pointer transition-colors"
          >
            AI Studio
          </button>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white text-black hover:bg-neutral-200 font-mono text-xs font-bold uppercase tracking-wider rounded-none cursor-pointer border border-white transition-colors"
          >
            <TbArrowLeft size={14} /> Back
          </button>
        </div>
      </nav>

      {/* Main Pricing Container */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 w-full flex-1 flex flex-col justify-center">
        
        {/* Section Header Statement */}
        <div className="gsap-price-hero text-center mb-12 select-none">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-white/20 bg-white/[0.04] text-[10px] font-mono uppercase tracking-[2.5px] text-white/70 mb-4 rounded-none">
            <TbBolt size={13} className="text-white" />
            COMPUTE TOKEN MATRIX // TIER SPEC
          </div>

          <h1
            className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white mb-3"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Architectural Pricing
          </h1>

          <p className="text-xs sm:text-sm font-mono text-white/50 max-w-md mx-auto leading-relaxed">
            Acquire deterministic neural tokens. 1 token yields 1 complete JSX synthesis pass with live prop interfaces.
          </p>
        </div>

        {/* Plans Grid (Strict 0px Geometric Brutalism) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 items-stretch mb-12">
          {plans.map((plan) => {
            const isLoading = loadingPlan === plan.name
            return (
              <div
                key={plan.name}
                className={`gsap-price-card relative flex flex-col justify-between p-7 sm:p-9 rounded-none border transition-colors shadow-2xl ${
                  plan.highlight
                    ? "bg-[#141414] border-white/50 shadow-[0_25px_60px_rgba(0,0,0,0.85)]"
                    : "bg-[#0d0d0d] border-white/15"
                }`}
              >
                {/* Blueprint Crosshairs Corner Accents */}
                <span className="absolute top-2 left-2 text-white/20 font-mono text-[9px] select-none">
                  + TIER.{plan.tier}
                </span>
                <span className="absolute top-2 right-2 text-white/20 font-mono text-[9px] select-none">
                  {plan.highlight ? "ESTABLISHED" : "BASE"}
                </span>

                <div>
                  {/* Tag Header Row */}
                  <div className="flex items-center justify-between mt-2 mb-6">
                    <span
                      className={`text-[9px] font-mono font-bold tracking-[2px] uppercase px-2.5 py-1 border rounded-none ${
                        plan.highlight
                          ? "bg-white text-black border-white"
                          : "bg-white/5 text-white/50 border-white/10"
                      }`}
                    >
                      {plan.tag}
                    </span>

                    {plan.disabled && (
                      <span className="flex items-center gap-1 text-[10px] font-mono text-white/40 uppercase">
                        <TbLock size={12} /> SECURED
                      </span>
                    )}
                  </div>

                  {/* Plan Identifier */}
                  <h2
                    className="text-xl sm:text-2xl font-extrabold uppercase tracking-wider text-white mb-2"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {plan.name}
                  </h2>
                  <p className="text-white/45 text-xs font-mono leading-relaxed mb-6">
                    {plan.description}
                  </p>

                  {/* Pricing Telemetry */}
                  <div className="mb-6 pb-6 border-b border-white/10">
                    <div className="flex items-baseline gap-2">
                      <span
                        className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                      >
                        {plan.amount ? `₹${plan.amount}` : "₹0"}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                        {plan.amount ? "/ ONE-TIME TOPUP" : "/ FOREVER INCLUDED"}
                      </span>
                    </div>

                    {/* Compute Tokens Badge */}
                    <div className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 border border-white/20 bg-white/[0.03] rounded-none">
                      <TbCpu size={14} className="text-white" />
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                        {plan.aiCredits} COMPUTE TOKENS
                      </span>
                    </div>
                  </div>

                  {/* Specifications Checklist */}
                  <ul className="space-y-3 mb-8 p-0 m-0 list-none">
                    {plan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2.5 text-xs font-mono text-white/70 leading-relaxed"
                      >
                        <div className="w-4 h-4 border border-white/30 bg-white/5 flex items-center justify-center text-white shrink-0 rounded-none">
                          <TbCheck size={11} strokeWidth={2.5} />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Split Action Button */}
                <div>
                  <button
                    type="button"
                    onClick={() => handlePayment(plan)}
                    disabled={plan.disabled || isLoading}
                    className={`group w-full flex items-stretch border transition-all rounded-none p-0 cursor-pointer ${
                      plan.disabled
                        ? "bg-[#121212] border-white/10 text-white/30 cursor-not-allowed"
                        : "bg-white hover:bg-neutral-200 text-black border-white shadow-[0_10px_30px_rgba(255,255,255,0.1)]"
                    }`}
                  >
                    <div className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 text-xs font-mono font-bold uppercase tracking-[1.5px]">
                      {isLoading ? (
                        <>
                          <TbLoader size={15} className="animate-spin text-black" />
                          <span>CONNECTING GATEWAY...</span>
                        </>
                      ) : (
                        <span>{plan.cta}</span>
                      )}
                    </div>
                    {!plan.disabled && !isLoading && (
                      <div className="w-11 bg-[#222222] group-hover:bg-[#333333] text-white flex items-center justify-center transition-colors border-l border-white/20 rounded-none">
                        <TbArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    )}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Technical Guarantee Matrix (3 Blocks) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
          {[
            {
              icon: TbBolt,
              title: "INSTANT ALLOCATION",
              desc: "Credits bind to your OAuth profile within 200ms of payment verification.",
            },
            {
              icon: TbShieldCheck,
              title: "RAZORPAY 256-BIT",
              desc: "Industry-standard banking encryption protocol for secure INR transactions.",
            },
            {
              icon: TbDeviceFloppy,
              title: "ZERO RECURRING DUES",
              desc: "Pure pay-as-you-go top-up. No automated debit cards or hidden subscriptions.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="gsap-price-telemetry p-4 border border-white/10 bg-[#0c0c0c] text-left rounded-none"
            >
              <div className="w-7 h-7 border border-white/20 bg-white/5 flex items-center justify-center text-white mb-2.5 rounded-none">
                <item.icon size={15} />
              </div>
              <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-white">
                {item.title}
              </p>
              <p className="text-[10px] font-mono text-white/45 mt-1 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </main>

      {/* Architectural Minimal Footer */}
      <footer className="border-t border-white/10 py-5 bg-[#0a0a0a] relative z-20 text-center text-[10px] font-mono text-white/40 uppercase tracking-widest">
        <span>MORPHYXUI COMPUTE PROTOCOL // ALL TRANSACTIONS PROCESSED IN INR (₹)</span>
      </footer>
    </div>
  )
}