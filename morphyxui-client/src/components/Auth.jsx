import React, { useState, useEffect, useRef } from 'react'
import { TbHexagonLetterM } from "react-icons/tb"
import { HiSparkles } from "react-icons/hi2"
import { 
  TbCopy, 
  TbSettings, 
  TbDownload, 
  TbLogin2, 
  TbX, 
  TbArrowRight, 
  TbBrandGoogle,
  TbWorld,
  TbTerminal2,
  TbCheck
} from 'react-icons/tb'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../utils/firebase'
import axios from "axios"
import { ServerUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import gsap from 'gsap'

const steps = [
  { code: "01", icon: TbLogin2, title: "LOGIN WITH GOOGLE", desc: "Secure OAuth handshake to unlock all neural AI tools instantly." },
  { code: "02", icon: HiSparkles, title: "GET 150 AI CREDITS", desc: "Instant free compute credits to synthesize production UI components." },
  { code: "03", icon: TbSettings, title: "CUSTOMIZE PROPS", desc: "Fine-tune variants, spacing, and states in the live sandbox." },
  { code: "04", icon: TbCopy, title: "GENERATE COMPONENTS", desc: "AI engine builds accessible, zero-junk JSX & Tailwind markup." },
  { code: "05", icon: TbDownload, title: "COPY OR SAVE", desc: "Export clean code directly into your React project repository." },
]

function Auth({ onClose }) {
  const [active, setActive] = useState(0)
  const [loading, setLoading] = useState(false)
  const [mobileTab, setMobileTab] = useState('auth') // 'auth' | 'steps' for phone screens
  const dispatch = useDispatch()

  const overlayRef = useRef(null)
  const modalRef = useRef(null)

  // Auto-cycle steps every 2.6 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setActive((s) => (s + 1) % steps.length)
    }, 2600)
    return () => clearInterval(id)
  }, [])

  // Safe GSAP Entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: "power2.out" }
      )

      gsap.fromTo(
        modalRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: "power3.out", clearProps: "transform,opacity" }
      )
    }, overlayRef)

    return () => ctx.revert()
  }, [])

  const handleClose = () => {
    gsap.to(modalRef.current, {
      y: 15,
      opacity: 0,
      duration: 0.18,
      ease: "power2.in"
    })
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.22,
      ease: "power2.in",
      onComplete: onClose
    })
  }

  const googleAuth = async () => {
    if (loading) return
    setLoading(true)
    try {
      const response = await signInWithPopup(auth, provider)
      let User = response.user
      let name = User.displayName
      let email = User.email
      const result = await axios.post(
        ServerUrl + "/api/auth/google",
        { name, email },
        { withCredentials: true }
      )
      dispatch(setUserData(result.data))
      onClose()
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <div
      ref={overlayRef}
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-2.5 sm:p-4 md:p-6 rounded-none select-none"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Main Modal Container */}
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative flex flex-col md:flex-row w-full max-w-[880px] max-h-[92dvh] md:max-h-[90vh] overflow-hidden bg-[#141414] border border-white/20 shadow-[0_35px_90px_rgba(0,0,0,0.95)] rounded-none"
      >
        {/* Universal Top-Right Close Button */}
        <button
          onClick={handleClose}
          title="Close Modal"
          className="absolute top-0 right-0 z-50 w-10 h-10 sm:w-11 sm:h-11 bg-black text-white hover:bg-neutral-800 flex items-center justify-center transition-colors cursor-pointer border-l border-b border-white/20 rounded-none shrink-0"
        >
          <TbX size={17} />
        </button>

        {/* ===================================================================
            MOBILE NAVIGATION SWITCHER (ONLY VISIBLE ON PHONE SCREENS < 768px)
        ==================================================================== */}
        <div className="flex md:hidden border-b border-white/15 bg-[#0e0e0e] w-full shrink-0 pr-10">
          <button
            onClick={() => setMobileTab('auth')}
            className={`flex-1 py-3 text-[11px] font-mono font-bold uppercase tracking-wider transition-colors border-r border-white/15 cursor-pointer border-t-0 border-l-0 ${
              mobileTab === 'auth'
                ? 'bg-white text-black'
                : 'bg-transparent text-white/50 hover:text-white'
            }`}
          >
            01 // SIGN IN
          </button>
          <button
            onClick={() => setMobileTab('steps')}
            className={`flex-1 py-3 text-[11px] font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer border-t-0 border-r-0 border-l-0 ${
              mobileTab === 'steps'
                ? 'bg-[#262626] text-white border-b-2 border-white'
                : 'bg-transparent text-white/50 hover:text-white'
            }`}
          >
            02 // PIPELINE ({steps.length})
          </button>
        </div>

        {/* ===================================================================
            LEFT PANEL: DARK ARCHITECTURAL PIPELINE ("HOW IT WORKS")
        ==================================================================== */}
        <div
          className={`w-full md:w-[52%] bg-[#161616] text-white p-5 sm:p-7 md:p-8 relative overflow-y-auto flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/15 rounded-none ${
            mobileTab === 'steps' ? 'flex' : 'hidden md:flex'
          }`}
        >
          {/* Subtle Architectural Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

          {/* Watermark Emblem */}
          <div className="absolute -left-20 -bottom-20 text-white/[0.03] pointer-events-none">
            <TbWorld size={280} strokeWidth={0.6} />
          </div>

          <div className="relative z-10">
            {/* Brand Header */}
            <div className="flex items-center justify-between pb-4 mb-4 md:mb-5 border-b border-white/15">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white text-black flex items-center justify-center font-bold rounded-none shrink-0">
                  <TbHexagonLetterM size={19} />
                </div>
                <div>
                  <span
                    className="text-sm sm:text-base font-bold tracking-wider uppercase text-white block leading-none"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    MorphyxUI
                  </span>
                  <span className="text-[9px] text-white/45 tracking-[2px] uppercase block mt-1">
                    Authentication Pipeline
                  </span>
                </div>
              </div>

              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-white/60 border border-white/20 px-2 py-0.5 sm:px-2.5 sm:py-1 bg-white/[0.04] rounded-none">
                v2.4 CORE
              </span>
            </div>

            {/* Section Label + Step Indicator Dots */}
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] sm:text-[11px] font-bold tracking-[2.5px] text-white/75 uppercase">
                HOW IT WORKS
              </p>
              <div className="flex items-center gap-1.5">
                {steps.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActive(idx)}
                    className={`h-1.5 transition-colors cursor-pointer border-none rounded-none ${
                      active === idx ? "w-5 sm:w-6 bg-white" : "w-1.5 sm:w-2 bg-white/25 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Steps Container */}
            <div className="flex flex-col gap-2 sm:gap-2.5">
              {steps.map((item, i) => {
                const Icon = item.icon
                const isSelected = active === i
                return (
                  <div
                    key={i}
                    onClick={() => setActive(i)}
                    className={`cursor-pointer flex items-start gap-3 p-2.5 sm:p-3 border transition-colors duration-200 w-full rounded-none relative ${
                      isSelected
                        ? "bg-[#3f3f3f] border-white/70 text-white shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
                        : "bg-[#1f1f1f] border-white/10 text-white/65 hover:border-white/30 hover:bg-[#252525]"
                    }`}
                  >
                    {/* Active Accent Bar */}
                    {isSelected && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-none" />
                    )}

                    {/* Step Icon */}
                    <div
                      className={`min-w-[28px] h-[28px] sm:min-w-[32px] sm:h-[32px] flex items-center justify-center border transition-colors rounded-none mt-0.5 shrink-0 ${
                        isSelected
                          ? "bg-white text-[#111] border-white"
                          : "bg-[#141414] border-white/15 text-white/60"
                      }`}
                    >
                      <Icon size={14} />
                    </div>

                    {/* Step Content */}
                    <div className="min-w-0 flex-1 text-left">
                      <div className="flex items-center justify-between gap-2">
                        <p
                          className={`text-[10px] sm:text-[11px] font-bold tracking-[1.2px] uppercase truncate ${
                            isSelected ? "text-white" : "text-white/75"
                          }`}
                        >
                          {item.title}
                        </p>
                        <span
                          className={`text-[9px] sm:text-[10px] font-mono shrink-0 ${
                            isSelected ? "text-white font-bold" : "text-white/35"
                          }`}
                        >
                          {item.code}
                        </span>
                      </div>

                      <p
                        className={`text-[10px] sm:text-[11px] leading-relaxed mt-1 ${
                          isSelected ? "text-white/90 block" : "text-white/40 line-clamp-1"
                        }`}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Mobile Quick Action to switch to Login */}
          <div className="md:hidden mt-4 pt-3 border-t border-white/15">
            <button
              onClick={() => setMobileTab('auth')}
              className="w-full py-3 bg-white hover:bg-neutral-200 text-black font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border-none flex items-center justify-center gap-2"
            >
              <span>PROCEED TO SIGN IN</span>
              <TbArrowRight size={15} />
            </button>
          </div>

          {/* Left Panel Bottom Terminal Bar (Desktop) */}
          <div className="hidden md:flex relative z-10 mt-5 pt-3.5 border-t border-white/15 items-center justify-between text-[10px] font-mono text-white/50">
            <span className="flex items-center gap-1.5">
              <TbTerminal2 size={14} className="text-white/80" />
              npm install morphyx-ui
            </span>
            <span className="uppercase tracking-widest text-white/70">
              ZERO-RUNTIME
            </span>
          </div>
        </div>

        {/* ===================================================================
            RIGHT PANEL: WHITE ARCHITECTURAL AUTH ACTION PORTAL
        ==================================================================== */}
        <div
          className={`w-full md:w-[48%] bg-white text-[#111111] p-5 sm:p-7 md:p-9 overflow-y-auto flex flex-col justify-between relative rounded-none ${
            mobileTab === 'auth' ? 'flex' : 'hidden md:flex'
          }`}
        >
          {/* Top Decorative Header */}
          <div className="flex items-center justify-between border-b border-neutral-200 pb-3 sm:pb-4 pr-8">
            <span className="text-[9px] sm:text-[10px] font-bold tracking-[2px] uppercase text-neutral-400 font-mono">
              ACCESS PORTAL
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono text-neutral-400">
              OAUTH 2.0 // SECURE
            </span>
          </div>

          {/* Center Auth Content */}
          <div className="my-auto py-4 sm:py-6 text-left">
            {/* 3-Layer Square Emblem */}
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 mb-4 sm:mb-6">
              <div className="absolute top-1.5 left-1.5 w-10 h-10 sm:w-12 sm:h-12 bg-neutral-300 rounded-none" />
              <div className="absolute top-1 left-1 w-10 h-10 sm:w-12 sm:h-12 bg-neutral-600 rounded-none" />
              <div className="relative z-10 w-10 h-10 sm:w-12 sm:h-12 bg-[#141414] text-white flex items-center justify-center rounded-none shadow-md">
                <TbHexagonLetterM size={22} />
              </div>
            </div>

            <p className="text-[9px] sm:text-[10px] font-bold tracking-[2.5px] uppercase text-neutral-400 mb-1 font-mono">
              INSTANT WORKSPACE
            </p>
            <h3
              className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#111] tracking-tight uppercase leading-[1.1] mb-2 sm:mb-3"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Welcome to <br /> MorphyxUI.
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed mb-5 sm:mb-6 max-w-sm">
              Authenticate with your Google account to unlock the neural JSX generator, live prop sandbox, and instant code exports.
            </p>

            {/* 3-Column Wireframe Metrics Grid */}
            <div className="grid grid-cols-3 border border-neutral-300 bg-[#f8f8f8] mb-5 sm:mb-7 rounded-none">
              {[
                ["150", "AI CREDITS"],
                ["∞", "COMPONENTS"],
                ["JSX", "EXPORT"],
              ].map(([val, label], i) => (
                <div
                  key={i}
                  className="p-2 sm:p-3 text-center border-r border-neutral-300 last:border-r-0 rounded-none"
                >
                  <div
                    className="text-sm sm:text-base md:text-lg font-extrabold text-[#111]"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {val}
                  </div>
                  <div className="text-[8px] sm:text-[9px] font-bold text-neutral-400 uppercase tracking-wider mt-0.5">
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* Primary Google Auth Action Button */}
            <div>
              <button
                onClick={googleAuth}
                disabled={loading}
                className="group w-full flex items-stretch bg-[#141414] hover:bg-black text-white border border-[#141414] transition-colors cursor-pointer p-0 rounded-none shadow-[0_10px_20px_rgba(0,0,0,0.15)] disabled:opacity-60"
              >
                <div className="flex-1 flex items-center justify-center gap-2.5 py-3 sm:py-3.5 px-3 sm:px-4 text-xs font-bold uppercase tracking-[1.5px] font-mono">
                  <TbBrandGoogle size={16} className="text-white shrink-0" />
                  <span>{loading ? "Authenticating..." : "Continue with Google"}</span>
                </div>
                <div className="w-10 sm:w-12 bg-[#3a3a3a] group-hover:bg-[#4a4a4a] flex items-center justify-center transition-colors border-l border-white/15 rounded-none shrink-0">
                  <TbArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            </div>

            {/* Mobile Helper Ticker to explore Pipeline */}
            <div className="md:hidden mt-4 pt-3.5 border-t border-neutral-200">
              <button
                onClick={() => setMobileTab('steps')}
                className="w-full flex items-center justify-between px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-[10px] font-mono uppercase tracking-wider transition-colors border border-neutral-300"
              >
                <span>HOW IT WORKS (05 STEPS)</span>
                <span className="font-bold">VIEW SPEC →</span>
              </button>
            </div>
          </div>

          {/* Bottom Documentation / Bypass Footer */}
          <div className="pt-3 sm:pt-4 border-t border-neutral-200 flex items-center justify-between text-[10px] sm:text-[11px] text-neutral-500">
            <span>No account needed for CLI.</span>
            <button
              onClick={handleClose}
              className="font-bold uppercase tracking-wider text-[#111] hover:bg-[#111] hover:text-white px-2 py-0.5 sm:px-2.5 sm:py-1 border border-[#111] transition-colors cursor-pointer bg-transparent rounded-none text-[9px] sm:text-[10px]"
            >
              VIEW DOCS →
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Auth