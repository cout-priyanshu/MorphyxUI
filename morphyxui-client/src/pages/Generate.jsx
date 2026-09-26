import React, { useState } from 'react'
import { AnimatePresence, motion } from "framer-motion"
import {
  FiZap,
  FiSave,
  FiCode,
  FiArrowRight,
  FiLoader,
  FiPackage,
  FiAlertCircle,
  FiCheckCircle,
  FiCpu,
  FiLayers,
  FiArrowLeft,
  FiRefreshCw,
  FiPlus,
  FiEye,
} from "react-icons/fi"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { TbX } from 'react-icons/tb'
import axios from 'axios'
import { ServerUrl } from '../App'
import { setUserData } from '../redux/userSlice'
import { LiveComponentPreview } from '../components/LiveComponentPreview'

const Toast = ({ message, type, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      className='fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.8)] border border-white/10 backdrop-blur-xl'
      style={{
        background: type === "success" ? '#14251e' : type === "error" ? "#261014" : "#170f14",
        color: type === "success" ? "#86efac" : type === "error" ? "#fda4af" : "#f5eff2",
        minWidth: "240px"
      }}
    >
      {type === "success" ? (
        <FiCheckCircle size={18} className='text-emerald-400 shrink-0' />
      ) : (
        <FiAlertCircle size={18} className='text-[#f43f5e] shrink-0' />
      )}
      <p className='text-sm font-medium text-[#f5eff2]'>{message}</p>
      <button onClick={onClose} className='ml-auto text-white/50 hover:text-white transition-colors cursor-pointer bg-transparent border-none'>
        <TbX size={18} />
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

  const [prompt, setPrompt] = useState("")
  const [generated, setGenerated] = useState(null)
  const [generating, setGenerating] = useState(false)
  const [toast, setToast] = useState(null)
  const [activeTab, setActiveTab] = useState("preview")

  const [savedComponentId, setSavedComponentId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [published, setPublished] = useState(false)

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
      showToast("AI Component Generated", "success")
    } catch (error) {
      showToast(error?.response?.data?.message || "Generate Error", "error")
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
      showToast("Component saved successfully!", "success")
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
      showToast("Published to npm successfully!", "success")
      setPublishing(false)
    } catch (error) {
      console.log(error)
      showToast("Publish failed", "error")
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
    <div className='min-h-screen text-[#f5eff2] relative overflow-hidden bg-[#070507]' style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Background Soft Dots & Blur Orbs */}
      <div className='absolute inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#f43f5e_1px,transparent_1px)] bg-[size:32px_32px]' />
      <div className='absolute top-[10px] left-[-50px] w-96 h-96 rounded-full pointer-events-none opacity-[0.08] bg-[#be123c] blur-[140px]' />
      <div className='absolute bottom-[-10%] right-[-5%] w-96 h-96 rounded-full pointer-events-none opacity-[0.06] bg-[#f43f5e] blur-[150px]' />

      <div className='relative z-10 max-w-5xl mx-auto px-4 py-12'>
        {/* Top Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-center mb-10'
        >
          <div className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-5 border border-[#e11d48]/30 bg-[#2a171f]/50 backdrop-blur-md'>
            <FiCpu size={14} className='text-[#f43f5e]' />
            <span className='text-[11px] font-semibold tracking-widest text-[#fbcfe8] uppercase'>
              AI Component Studio
            </span>
          </div>

          <h2 className='text-4xl sm:text-5xl font-bold mb-3 tracking-tight' style={{ fontFamily: "'Syne', sans-serif" }}>
            Build with <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#f5eff2] via-[#fbcfe8] to-[#e11d48]'>AI</span>
          </h2>

          <p className='text-[#f5eff2]/50 text-sm sm:text-base max-w-md mx-auto leading-relaxed'>
            Describe your React Component in plain English. Preview, save, and publish - all in one place.
          </p>
        </motion.div>

        {/* Credit Display */}
        {userRole === "user" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className='flex justify-end mb-4'
          >
            <div
              className='flex items-center gap-2 px-3.5 py-1.5 rounded-xl border backdrop-blur-sm'
              style={{
                background: lowCredits ? "rgba(225,29,72,0.1)" : "rgba(255,255,255,0.03)",
                borderColor: lowCredits ? "rgba(225,29,72,0.3)" : "rgba(255,255,255,0.08)",
              }}
            >
              <FiZap size={13} className={lowCredits ? "text-red-400" : "text-[#f43f5e]"} />
              <span className='text-xs font-semibold text-[#f5eff2]/90'>
                {aiCredits} AI Credits
              </span>
              <button
                className='flex items-center justify-center w-5 h-5 rounded-md transition-all cursor-pointer border-none bg-white/5 hover:bg-white/10 text-white/80'
                title='Buy more credits'
                onClick={() => navigate("/pricing")}
              >
                <FiPlus size={12} />
              </button>
            </div>
          </motion.div>
        )}

        {/* Low Credits Warning Banner */}
        {lowCredits && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className='flex items-center gap-3 px-4 py-3 rounded-2xl mb-5 bg-[#251014] border border-red-500/20'
          >
            <FiAlertCircle size={16} className='text-red-400 shrink-0' />
            <p className='text-sm text-[#fda4af]'>
              You need at least <span className='font-bold text-white'>50 Credits</span> to generate a component.
            </p>
            <button
              onClick={() => navigate("/pricing")}
              className='ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border border-red-500/30 bg-red-500/15 text-[#fda4af] hover:bg-red-500/25 whitespace-nowrap'
            >
              Buy Credits <FiArrowRight size={12} />
            </button>
          </motion.div>
        )}

        {/* Prompt Input Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className='rounded-2xl p-1 mb-8 bg-[#0c080a] border border-white/[0.08] shadow-[0_15px_40px_rgba(0,0,0,0.6)]'
          style={{ opacity: lowCredits ? 0.6 : 1 }}
        >
          <div className='flex items-start gap-3 p-4'>
            <FiZap className="text-[#f43f5e] mt-1 shrink-0" size={20} />
            <textarea
              onKeyDown={handleKeyDown}
              onChange={(e) => setPrompt(e.target.value)}
              value={prompt}
              placeholder={
                lowCredits
                  ? "Not enough credits to generate..."
                  : "A glassmorphism pricing card with a toggle for monthly/annual billing..."
              }
              disabled={lowCredits || generating}
              rows={3}
              className='w-full bg-transparent text-[#f5eff2] placeholder-white/20 text-[15px] resize-none outline-none leading-relaxed disabled:cursor-not-allowed'
            />
          </div>

          <div className='flex items-center justify-between px-4 pb-3 pt-1 border-t border-white/[0.04]'>
            <span className='text-xs text-white/30'>Ctrl + Enter to Generate</span>
            <motion.button
              onClick={handleGenerate}
              whileTap={{ scale: 0.97 }}
              disabled={generating || !prompt.trim() || lowCredits}
              className='flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer border border-[#e11d48]/40 bg-[#1b1015] hover:bg-[#25151c] text-[#f5eff2] shadow-sm'
            >
              {generating ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className='inline-block'
                  >
                    <FiLoader size={14} />
                  </motion.span>
                  Generating...
                </>
              ) : (
                <>
                  <FiZap size={14} className='text-[#f43f5e]' />
                  Generate
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Generated Output Studio */}
        <AnimatePresence>
          {generated && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className='rounded-2xl overflow-hidden mb-12 bg-[#0c080a] border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.7)]'
            >
              {/* Studio Header Bar */}
              <div className='flex flex-wrap items-center justify-between gap-4 px-5 py-3.5 border-b border-white/[0.06] bg-[#090608]'>
                <div className='flex items-center gap-3'>
                  <div className='w-8 h-8 rounded-lg bg-[#2a171f] border border-[#e11d48]/30 flex items-center justify-center text-[#f43f5e]'>
                    <FiLayers size={15} />
                  </div>
                  <div>
                    <h4 className='text-sm font-semibold text-[#f5eff2]'>
                      {generated.name || "GeneratedComponent"}
                    </h4>
                    <p className='text-[11px] text-[#f5eff2]/40'>
                      {generated.props?.length > 0 ? `Props: ${generated.props.join(", ")}` : "No external props required"}
                    </p>
                  </div>
                </div>

                {/* Tab Switcher */}
                <div className='flex items-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.05]'>
                  <button
                    onClick={() => setActiveTab("preview")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border-none ${
                      activeTab === "preview"
                        ? "bg-[#1b1015] border border-[#e11d48]/40 text-[#f5eff2] shadow-sm"
                        : "text-[#f5eff2]/50 hover:text-[#f5eff2] bg-transparent"
                    }`}
                  >
                    <FiEye size={13} className={activeTab === "preview" ? "text-[#f43f5e]" : ""} />
                    Preview
                  </button>
                  <button
                    onClick={() => setActiveTab("code")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border-none ${
                      activeTab === "code"
                        ? "bg-[#1b1015] border border-[#e11d48]/40 text-[#f5eff2] shadow-sm"
                        : "text-[#f5eff2]/50 hover:text-[#f5eff2] bg-transparent"
                    }`}
                  >
                    <FiCode size={13} className={activeTab === "code" ? "text-[#f43f5e]" : ""} />
                    Code
                  </button>
                </div>
              </div>

              {/* Display Canvas View */}
              <div className='p-5 sm:p-6'>
                <AnimatePresence mode='wait'>
                  {activeTab === "preview" ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key="preview-tab"
                      className='min-h-[300px] flex items-center justify-center rounded-xl p-4 bg-[#070507] border border-white/[0.04]'
                    >
                      {generated?.code ? (
                        <LiveComponentPreview code={generated.code} />
                      ) : (
                        <p className='text-xs text-[#f5eff2]/30'>No preview available</p>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key="code-tab"
                      className='rounded-xl overflow-hidden bg-[#070507] border border-white/[0.05]'
                    >
                      <pre className='p-4 text-xs font-mono leading-relaxed text-[#fbcfe8] max-h-[360px] overflow-auto whitespace-pre-wrap selection:bg-[#f43f5e]/30 selection:text-white'>
                        {generated.code}
                      </pre>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action Buttons */}
              <div className='flex items-center gap-3 px-5 pb-5 pt-1 flex-wrap'>
                {userRole === "admin" && (
                  <>
                    <motion.button
                      onClick={handlesave}
                      whileTap={{ scale: 0.97 }}
                      disabled={saving || savedComponentId}
                      className='flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed border'
                      style={{
                        background: savedComponentId ? "rgba(16,185,129,0.12)" : "rgba(255,255,255,0.06)",
                        borderColor: savedComponentId ? "rgba(16,185,129,0.3)" : "rgba(255,255,255,0.12)",
                        color: savedComponentId ? "#34d399" : "#f5eff2",
                      }}
                    >
                      {saving ? (
                        <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                          <FiLoader size={14} />
                        </motion.span>
                      ) : savedComponentId ? (
                        <FiCheckCircle size={14} />
                      ) : (
                        <FiSave size={14} />
                      )}
                      {saving ? "Saving..." : savedComponentId ? "Saved" : "Save Component"}
                    </motion.button>

                    {savedComponentId && !published && (
                      <motion.button
                        onClick={handlePublish}
                        whileTap={{ scale: 0.97 }}
                        disabled={publishing}
                        className='flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-40 border border-[#e11d48]/40 shadow-[0_0_20px_rgba(225,29,72,0.25)] text-white'
                        style={{
                          background: publishing ? "rgba(225,29,72,0.2)" : "linear-gradient(135deg, #be123c 0%, #e11d48 50%, #f43f5e 100%)",
                        }}
                      >
                        {publishing ? "Publishing..." : "Publish to npm"}
                      </motion.button>
                    )}

                    {published && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className='flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border'
                        style={{
                          background: "rgba(16,185,129,0.1)",
                          borderColor: "rgba(16,185,129,0.3)",
                          color: "#34d399",
                        }}
                      >
                        <FiCheckCircle size={14} /> Published
                      </motion.div>
                    )}

                    {savedComponentId && (
                      <motion.div
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className='flex items-center gap-2 ml-auto'
                      >
                        <motion.button
                          onClick={() => navigate("/")}
                          whileTap={{ scale: 0.97 }}
                          className='flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-[#f5eff2]/70 hover:text-white'
                        >
                          <FiArrowLeft size={14} /> Back
                        </motion.button>
                        <motion.button
                          onClick={() => {
                            setPrompt("")
                            setGenerated(null)
                            setSavedComponentId(null)
                            setPublished(false)
                            setActiveTab("preview")
                          }}
                          whileTap={{ scale: 0.97 }}
                          className='flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border border-[#e11d48]/40 text-white shadow-[0_0_20px_rgba(225,29,72,0.2)] bg-gradient-to-r from-[#be123c] to-[#e11d48]'
                        >
                          <FiRefreshCw size={14} /> Generate New
                        </motion.button>
                      </motion.div>
                    )}
                  </>
                )}

                {userRole === "user" && (
                  <>
                    <motion.button
                      onClick={handlesave}
                      whileTap={{ scale: 0.97 }}
                      disabled={saving || savedComponentId}
                      className='flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed border'
                      style={{
                        background: savedComponentId ? "rgba(16,185,129,0.12)" : "rgba(255,255,255,0.06)",
                        borderColor: savedComponentId ? "rgba(16,185,129,0.3)" : "rgba(255,255,255,0.12)",
                        color: savedComponentId ? "#34d399" : "#f5eff2",
                      }}
                    >
                      {saving ? (
                        <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                          <FiLoader size={14} />
                        </motion.span>
                      ) : savedComponentId ? (
                        <FiCheckCircle size={14} />
                      ) : (
                        <FiSave size={14} />
                      )}
                      {saving ? "Saving..." : savedComponentId ? "Saved" : "Save Component"}
                    </motion.button>

                    {savedComponentId && (
                      <motion.div
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className='flex items-center gap-2 ml-auto'
                      >
                        <motion.button
                          onClick={() => navigate("/")}
                          whileTap={{ scale: 0.97 }}
                          className='flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-[#f5eff2]/70 hover:text-white'
                        >
                          <FiArrowLeft size={14} /> Back
                        </motion.button>
                        <motion.button
                          onClick={() => {
                            setPrompt("")
                            setGenerated(null)
                            setSavedComponentId(null)
                            setPublished(false)
                            setActiveTab("preview")
                          }}
                          whileTap={{ scale: 0.97 }}
                          className='flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border border-[#e11d48]/40 text-white shadow-[0_0_20px_rgba(225,29,72,0.2)] bg-gradient-to-r from-[#be123c] to-[#e11d48]'
                        >
                          <FiRefreshCw size={14} /> Generate New
                        </motion.button>

                        <motion.button
                          onClick={() => navigate("/components")}
                          whileTap={{ scale: 0.97 }}
                          className='flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border border-[#e11d48]/30 bg-[#2a171f]/50 text-[#fbcfe8] hover:bg-[#2a171f]/80'
                        >
                          <FiPackage size={14} /> My Components
                        </motion.button>
                      </motion.div>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Placeholder View */}
        {!generated && !generating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className='text-center py-16'
          >
            <div className='w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 bg-[#1b1015] border border-[#e11d48]/30 text-[#f43f5e]'>
              <FiCpu size={24} />
            </div>
            <p className='text-[#f5eff2]/35 text-sm'>
              Describe your component above and hit Generate
            </p>
          </motion.div>
        )}

        {/* Loading Spinner View */}
        {generating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='text-center py-16'
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className='w-10 h-10 rounded-full border-2 border-transparent border-t-[#f43f5e] border-r-[#fbcfe8] mx-auto mb-4'
            />
            <p className='text-[#f5eff2]/50 text-sm'>
              AI is creating your component...
            </p>
          </motion.div>
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