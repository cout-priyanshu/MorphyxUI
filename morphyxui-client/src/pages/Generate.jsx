import React, { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from "framer-motion"
import {
  TbHexagonLetterM,
  TbCpu,
  TbTerminal2,
  TbSparkles,
  TbAlertCircle,
  TbCheck,
  TbX,
  TbArrowRight,
  TbCopy,
  TbDeviceDesktop,
  TbDeviceTablet,
  TbDeviceMobile,
  TbEye,
  TbCode,
  TbPackage,
  TbPlus,
  TbArrowLeft,
  TbRefresh,
  TbWorld
} from "react-icons/tb"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ServerUrl } from '../App'
import { setUserData } from '../redux/userSlice'
import { LiveComponentPreview } from '../components/LiveComponentPreview'
import gsap from 'gsap'

// Architectural Square Toast Notification
const Toast = ({ message, type, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.98 }}
      className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 border shadow-[0_20px_50px_rgba(0,0,0,0.9)] rounded-none ${
        type === "success" 
          ? "bg-[#111c15] border-emerald-500/40 text-emerald-300" 
          : type === "error" 
          ? "bg-[#201012] border-rose-500/40 text-rose-300" 
          : "bg-[#141414] border-white/20 text-white"
      }`}
      style={{ minWidth: "280px" }}
    >
      <div className={`w-6 h-6 flex items-center justify-center rounded-none font-bold text-xs ${
        type === "success" ? "bg-emerald-400 text-black" : type === "error" ? "bg-rose-500 text-white" : "bg-white text-black"
      }`}>
        {type === "success" ? <TbCheck size={14} /> : <TbAlertCircle size={14} />}
      </div>
      <div className="flex-1 text-left">
        <p className="text-[10px] font-mono uppercase tracking-widest text-white/40">SYSTEM EVENT</p>
        <p className="text-xs font-semibold text-white leading-tight mt-0.5">{message}</p>
      </div>
      <button 
        onClick={onClose} 
        className="text-white/40 hover:text-white p-1 transition-colors cursor-pointer bg-transparent border-none rounded-none"
      >
        <TbX size={16} />
      </button>
    </motion.div>
  )
}

const Generate = () => {
  const { userData } = useSelector((state) => state.user)
  const userRole = userData?.Role || userData?.role
  const aiCredits = userData?.aiCredits || 0
  const lowCredits = userRole === "user" && aiCredits < 50

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const containerRef = useRef(null)

  const [prompt, setPrompt] = useState("")
  const [generated, setGenerated] = useState(null)
  const [generating, setGenerating] = useState(false)
  const [toast, setToast] = useState(null)
  const [activeTab, setActiveTab] = useState("preview")
  const [viewportWidth, setViewportWidth] = useState("100%")

  const [savedComponentId, setSavedComponentId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [published, setPublished] = useState(false)

  // GSAP Entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gsap-gen-nav",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", clearProps: "transform,opacity" }
      )
      gsap.fromTo(
        ".gsap-gen-hero",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.1, ease: "power3.out", clearProps: "transform,opacity" }
      )
      gsap.fromTo(
        ".gsap-gen-box",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: "power3.out", clearProps: "transform,opacity" }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const showToast = (message, type = "info") => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3500)
  }

  const handleGenerate = async () => {
    if (!prompt.trim() || lowCredits || generating) return
    setGenerated(null)
    setGenerating(true)

    try {
      const { data } = await axios.post(
        `${ServerUrl}/api/components/generate`,
        { prompt },
        { withCredentials: true }
      )
      setGenerated(data.parsed)
      dispatch(
        setUserData({
          ...userData,
          aiCredits: data.remainingCredits,
        })
      )
      setGenerating(false)
      showToast("AI Component Synthesized Successfully", "success")
    } catch (error) {
      showToast(error?.response?.data?.message || "Synthesis Failed", "error")
      setGenerating(false)
    }
  }

  const handlesave = async () => {
    if (!generated) return
    setSaving(true)
    try {
      const res = await axios.post(
        `${ServerUrl}/api/components/save`,
        {
          name: generated.name,
          code: generated.code,
          props: generated.props,
        },
        { withCredentials: true }
      )
      setSavedComponentId(res.data._id)
      showToast("Block Saved to Workspace Repository", "success")
      setSaving(false)
    } catch (error) {
      console.log(error)
      showToast("Component save error", "error")
      setSaving(false)
    }
  }

  const handlePublish = async () => {
    if (!savedComponentId) return
    setPublishing(true)
    try {
      await axios.post(
        `${ServerUrl}/api/components/publish`,
        { componentId: savedComponentId },
        { withCredentials: true }
      )
      setPublished(true)
      showToast("Unit Published to Registry", "success")
      setPublishing(false)
    } catch (error) {
      console.log(error)
      showToast("Publish process aborted", "error")
      setPublishing(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      handleGenerate()
    }
  }

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-[#070707] text-white overflow-x-hidden selection:bg-white selection:text-black"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Background Architectural Grid Lines */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:56px_56px] pointer-events-none z-0" />

      {/* Top Architectural Navigation Bar */}
      <nav className="gsap-gen-nav sticky top-0 z-40 flex items-center justify-between px-5 sm:px-10 py-4 border-b border-white/15 bg-[#0d0d0d]/95 backdrop-blur-md relative z-30">
        <div 
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer group"
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
              Neural Studio // CLI v2.4
            </span>
          </div>
        </div>

        {/* Status Telemetry & Actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-white/50 border-r border-white/15 pr-6">
            <TbTerminal2 size={15} className="text-white/70" />
            <span>npm i morphyx-ui</span>
          </div>

          {/* Credits Counter Dock */}
          {userRole === "user" && (
            <div className={`flex items-center gap-2.5 px-3 py-1.5 border rounded-none ${
              lowCredits ? "bg-rose-950/30 border-rose-500/40 text-rose-300" : "bg-[#141414] border-white/20 text-white"
            }`}>
              <TbCpu size={14} className={lowCredits ? "text-rose-400" : "text-white"} />
              <span className="text-xs font-mono font-bold tracking-wide">
                {aiCredits} CREDITS
              </span>
              <button
                onClick={() => navigate("/pricing")}
                className="w-5 h-5 flex items-center justify-center bg-white/10 hover:bg-white hover:text-black text-white text-xs transition-colors cursor-pointer border-none rounded-none"
                title="Recharge Compute Credits"
              >
                <TbPlus size={12} />
              </button>
            </div>
          )}

          <button
            onClick={() => navigate('/components')}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 bg-transparent hover:bg-white/10 text-white font-mono text-xs uppercase tracking-wider border border-white/20 rounded-none cursor-pointer transition-colors"
          >
            Components
          </button>

          <button
            onClick={() => navigate('/')}
            className="px-3.5 py-1.5 bg-transparent hover:bg-white/10 text-white font-mono text-xs uppercase tracking-wider border border-white/20 rounded-none cursor-pointer transition-colors"
          >
            ← Home
          </button>
        </div>
      </nav>

      {/* Main Studio Work Area */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-12">
        
        {/* Studio Header Statement */}
        <div className="gsap-gen-hero text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-white/20 bg-white/[0.04] text-[10px] font-mono uppercase tracking-[2.5px] text-white/70 mb-4 rounded-none">
            <TbSparkles size={13} className="text-white" />
            PROMPT TO ZERO-RUNTIME JSX
          </div>

          <h1 
            className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white mb-3"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Neural Interface Studio
          </h1>

          <p className="text-xs sm:text-sm font-mono text-white/50 max-w-lg mx-auto leading-relaxed">
            Describe your desired React UI primitive in natural language or Hinglish. Synthesize, simulate viewports, inspect markup, and ship.
          </p>
        </div>

        {/* Low Credits Alert Block */}
        {lowCredits && (
          <div className="mb-6 p-4 border border-rose-500/40 bg-[#1f0d11] text-rose-200 flex items-center justify-between gap-4 rounded-none">
            <div className="flex items-center gap-3">
              <TbAlertCircle size={20} className="text-rose-400 shrink-0" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider">Compute Threshold Exhausted</p>
                <p className="text-[11px] text-rose-300/70 font-mono mt-0.5">
                  Minimum 50 Compute Credits required to invoke neural JSX parser.
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate("/pricing")}
              className="px-4 py-2 bg-white text-black hover:bg-neutral-200 font-bold text-xs uppercase tracking-wider rounded-none cursor-pointer border-none transition-colors whitespace-nowrap"
            >
              Recharge Credits →
            </button>
          </div>
        )}

        {/* Blueprint Terminal Prompt Dock (Strict 0px Corners) */}
        <div className="gsap-gen-box relative border border-white/20 bg-[#111111] shadow-[0_25px_60px_rgba(0,0,0,0.85)] mb-10 rounded-none">
          {/* Blueprint Corner Accents */}
          <span className="absolute top-2 left-2 text-white/25 font-mono text-[10px] select-none">+ SYS.IN</span>
          <span className="absolute top-2 right-2 text-white/25 font-mono text-[10px] select-none">UTF-8 // LLM</span>

          {/* Prompt Header Telemetry */}
          <div className="flex items-center justify-between px-5 pt-7 pb-2 text-[10px] font-mono uppercase tracking-[2px] text-white/40 border-b border-white/10">
            <span>PROMPT INPUT SPECIFICATION</span>
            <span>MODEL: MORPHYX.NEURAL.v2</span>
          </div>

          {/* Textarea */}
          <div className="p-5">
            <textarea
              onKeyDown={handleKeyDown}
              onChange={(e) => setPrompt(e.target.value)}
              value={prompt}
              placeholder={
                lowCredits
                  ? "INSUFFICIENT COMPUTE BALANCE // PLEASE RECHARGE"
                  : "e.g. A sleek glassmorphic analytics stat card with dark mode toggle, trending metrics pill, and zero runtime classes..."
              }
              disabled={lowCredits || generating}
              rows={4}
              className="w-full bg-transparent text-white font-mono text-xs sm:text-sm placeholder-white/25 resize-none outline-none leading-relaxed disabled:cursor-not-allowed selection:bg-white selection:text-black"
            />
          </div>

          {/* Bottom Dock Controls */}
          <div className="flex items-center justify-between px-5 py-3.5 border-t border-white/10 bg-[#141414]">
            <span className="text-[11px] font-mono text-white/40 hidden sm:inline">
              SHORTCUT: <span className="text-white/80">CTRL + ENTER</span> TO EXECUTE
            </span>

            {/* Split Synthesize Button (Matches Auth & Home Action Bar) */}
            <button
              onClick={handleGenerate}
              disabled={generating || !prompt.trim() || lowCredits}
              className="group flex items-stretch bg-white hover:bg-neutral-200 text-black border border-white transition-all cursor-pointer p-0 rounded-none disabled:opacity-40 disabled:cursor-not-allowed ml-auto shadow-md"
            >
              <div className="flex items-center gap-2.5 py-2.5 px-5 text-xs font-bold font-mono uppercase tracking-[1.8px]">
                {generating ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="inline-block"
                    >
                      <TbRefresh size={14} />
                    </motion.span>
                    <span>SYNTHESIZING...</span>
                  </>
                ) : (
                  <>
                    <TbSparkles size={14} />
                    <span>SYNTHESIZE JSX</span>
                  </>
                )}
              </div>
              <div className="w-10 bg-[#333333] group-hover:bg-[#444444] text-white flex items-center justify-center transition-colors border-l border-white/20 rounded-none">
                <TbArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          </div>
        </div>

        {/* Studio Canvas Stage (When Generated Component Exists) */}
        <AnimatePresence>
          {generated && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="border border-white/20 bg-[#0e0e0e] shadow-[0_30px_80px_rgba(0,0,0,0.9)] mb-12 rounded-none overflow-hidden"
            >
              {/* Studio Telemetry Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-white/15 bg-[#141414]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-none" />
                    <h3 
                      className="text-base font-bold text-white uppercase tracking-wider"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {generated.name || "CustomArchitecture"}
                    </h3>
                  </div>
                  <p className="text-[10px] font-mono text-white/40 mt-0.5">
                    {generated.props?.length > 0 ? `PARAM PROPS: ${generated.props.join(", ")}` : "STANDALONE ATOMIC BLOCK"}
                  </p>
                </div>

                {/* Viewport Toggles & Mode Switcher */}
                <div className="flex items-center gap-3">
                  {activeTab === "preview" && (
                    <div className="hidden sm:flex items-center border border-white/15 bg-[#0a0a0a] p-0.5 rounded-none">
                      {[
                        { width: "100%", icon: TbDeviceDesktop, title: "100% Fluid" },
                        { width: "768px", icon: TbDeviceTablet, title: "768px Tablet" },
                        { width: "380px", icon: TbDeviceMobile, title: "380px Mobile" },
                      ].map((vp) => (
                        <button
                          key={vp.width}
                          onClick={() => setViewportWidth(vp.width)}
                          title={vp.title}
                          className={`p-1.5 transition-colors cursor-pointer border-none rounded-none ${
                            viewportWidth === vp.width ? "bg-white text-black" : "bg-transparent text-white/40 hover:text-white"
                          }`}
                        >
                          <vp.icon size={14} />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Mode Tab Switchers */}
                  <div className="flex gap-1 bg-[#0a0a0a] border border-white/15 p-1 rounded-none">
                    <button
                      onClick={() => setActiveTab("preview")}
                      className={`flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono font-bold tracking-wider transition-all uppercase cursor-pointer border rounded-none ${
                        activeTab === "preview" ? "bg-white text-black border-white" : "bg-transparent text-white/40 border-transparent hover:text-white"
                      }`}
                    >
                      <TbEye size={12} /> PREVIEW
                    </button>
                    <button
                      onClick={() => setActiveTab("code")}
                      className={`flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono font-bold tracking-wider transition-all uppercase cursor-pointer border rounded-none ${
                        activeTab === "code" ? "bg-white text-black border-white" : "bg-transparent text-white/40 border-transparent hover:text-white"
                      }`}
                    >
                      <TbCode size={12} /> JSX MARKUP
                    </button>
                  </div>
                </div>
              </div>

              {/* Viewport Sandbox Canvas */}
              <div className="p-6 sm:p-10 bg-[#070707] relative min-h-[380px] flex items-center justify-center">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

                <AnimatePresence mode="wait">
                  {activeTab === "preview" ? (
                    <motion.div
                      key="prev"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{ width: viewportWidth, maxWidth: "100%" }}
                      className="transition-all duration-300 border border-white/20 bg-[#121212] p-6 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative"
                    >
                      <span className="absolute top-2 left-2 text-white/20 font-mono text-[9px] select-none">+ 0,0</span>
                      <span className="absolute bottom-2 right-2 text-white/20 font-mono text-[9px] select-none">{viewportWidth}</span>
                      
                      <div className="w-full flex items-center justify-center">
                        <LiveComponentPreview code={generated.code} />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="code"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full border border-white/15 bg-[#0e0e0e] rounded-none overflow-hidden"
                    >
                      <div className="flex items-center justify-between px-4 py-2 bg-[#161616] border-b border-white/10 text-[10px] font-mono text-white/50">
                        <span>{generated.name}.jsx // PURE TAILWIND</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(generated.code)
                            showToast("JSX Copied to Clipboard", "success")
                          }}
                          className="flex items-center gap-1.5 text-white/70 hover:text-white bg-transparent border-none cursor-pointer font-mono"
                        >
                          <TbCopy size={12} /> COPY
                        </button>
                      </div>
                      <pre className="p-5 font-mono text-xs text-neutral-200 max-h-[380px] overflow-auto whitespace-pre selection:bg-white selection:text-black">
                        {generated.code}
                      </pre>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action Operations Footer */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-[#141414] border-t border-white/15">
                <div className="flex items-center gap-3 flex-wrap">
                  {/* Save Block Trigger */}
                  <button
                    onClick={handlesave}
                    disabled={saving || savedComponentId}
                    className={`flex items-center gap-2 px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-all border rounded-none cursor-pointer disabled:cursor-not-allowed ${
                      savedComponentId
                        ? "bg-emerald-950/40 border-emerald-400 text-emerald-300"
                        : "bg-white text-black hover:bg-neutral-200 border-white"
                    }`}
                  >
                    {savedComponentId ? <TbCheck size={14} /> : <TbPackage size={14} />}
                    <span>{saving ? "STORING..." : savedComponentId ? "UNIT STORED" : "SAVE TO WORKSPACE"}</span>
                  </button>

                  {/* Admin NPM Publish Trigger */}
                  {userRole === "admin" && savedComponentId && !published && (
                    <button
                      onClick={handlePublish}
                      disabled={publishing}
                      className="flex items-center gap-2 px-5 py-2.5 bg-[#252525] hover:bg-neutral-700 text-white border border-white/20 font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer rounded-none disabled:opacity-40"
                    >
                      <span>{publishing ? "PACKAGING..." : "PUBLISH TO NPM"}</span>
                    </button>
                  )}

                  {published && (
                    <div className="flex items-center gap-2 px-4 py-2 border border-emerald-400/40 bg-emerald-950/30 text-emerald-300 text-xs font-mono font-bold uppercase rounded-none">
                      <TbCheck size={14} /> PUBLISHED TO NPM
                    </div>
                  )}
                </div>

                {/* Navigation and Reset Triggers */}
                <div className="flex items-center gap-3 ml-auto">
                  <button
                    onClick={() => {
                      setPrompt("")
                      setGenerated(null)
                      setSavedComponentId(null)
                      setPublished(false)
                      setActiveTab("preview")
                    }}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-transparent hover:bg-white/10 text-white font-mono text-xs uppercase tracking-wider border border-white/20 transition-colors cursor-pointer rounded-none"
                  >
                    <TbRefresh size={14} /> NEW PROMPT
                  </button>

                  <button
                    onClick={() => navigate("/my-components")}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-transparent hover:bg-white/10 text-white font-mono text-xs uppercase tracking-wider border border-white/20 transition-colors cursor-pointer rounded-none"
                  >
                    WORKSPACE →
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty Placeholder View (Matches Home & Auth Style) */}
        {!generated && !generating && (
          <div className="text-center py-16 border border-white/10 bg-[#0e0e0e] p-8 rounded-none">
            <div className="relative w-12 h-12 mx-auto mb-4 select-none">
              <div className="absolute top-1.5 left-1.5 w-10 h-10 bg-neutral-800 border border-white/10 rounded-none" />
              <div className="relative z-10 w-10 h-10 bg-[#161616] border border-white/30 text-white flex items-center justify-center rounded-none shadow-md">
                <TbCpu size={20} />
              </div>
            </div>
            <p className="text-white/70 font-mono text-xs uppercase tracking-[2px] mb-1">
              ENGINE READY FOR INPUT SPECIFICATION
            </p>
            <p className="text-white/40 text-xs font-mono max-w-sm mx-auto">
              Synthesize zero-dependency React components by prompting your structure in the dock above.
            </p>
          </div>
        )}

        {/* Generating Matrix Loader */}
        {generating && (
          <div className="text-center py-20 border border-white/15 bg-[#0e0e0e] p-10 rounded-none">
            <div className="relative w-14 h-14 mx-auto mb-5 select-none">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2.4, ease: "linear" }}
                className="w-14 h-14 border border-dashed border-white/40 flex items-center justify-center rounded-none"
              >
                <div className="w-7 h-7 bg-white text-black flex items-center justify-center font-bold text-xs rounded-none">
                  AI
                </div>
              </motion.div>
            </div>
            <p className="text-white font-mono text-xs font-bold uppercase tracking-[3px] mb-1">
              SYNTHESIZING COMPONENT MATRIX...
            </p>
            <p className="text-white/40 font-mono text-[11px]">
              Extracting JSX hierarchy • Resolving Tailwind classes • Generating props interface
            </p>
          </div>
        )}

      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default Generate