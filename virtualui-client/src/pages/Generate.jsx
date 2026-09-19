import React, { useState } from 'react'
import { AnimatePresence, motion } from "framer-motion"
import {
  FiZap,
  FiSave,
  FiCode,
  FiUploadCloud,
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
} from "react-icons/fi"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { TbX } from 'react-icons/tb'
import axios from 'axios'
import { ServerUrl } from '../App'
import { setUserData } from '../redux/userSlice'
import { LiveComponentPreview } from '../components/LiveComponentPreview.js'

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
        `${ServerUrl}/api/component/generate`,
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


        <div>
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

        {
            generated.code && (
                <LiveComponentPreview code={generated.code}/>
            )
        }

        </div>

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