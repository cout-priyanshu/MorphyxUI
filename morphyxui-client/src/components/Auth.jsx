import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from "framer-motion"
import { TbHexagonLetterM } from "react-icons/tb";
import { HiSparkles } from "react-icons/hi2"
import { TbCopy, TbSettings, TbDownload, TbLogin2, TbX } from 'react-icons/tb'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../utils/firebase'
import axios from "axios"
import { ServerUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

const steps = [
  { icon: TbLogin2, title: "Login with Google", desc: "Secure OAuth to unlock all AI tools instantly." },
  { icon: HiSparkles, title: "Get 150 AI Credits", desc: "Free credits to generate premium UI components." },
  { icon: TbSettings, title: "Customize Props", desc: "Fine-tune and preview every change live." },
  { icon: TbCopy, title: "Generate components", desc: "AI builds production-ready JSX components." },
  { icon: TbDownload, title: "Copy or save", desc: "Export clean code straight into your projects." },
];

function Auth({ onClose }) {
  const [active, setActive] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    const id = setInterval(() => setActive((s) => (s + 1) % steps.length), 2400)
    return () => clearInterval(id)
  }, [])

  const googleAuth = async () => {
    try {
      const response = await signInWithPopup(auth, provider)
      let User = response.user
      let name = User.displayName
      let email = User.email
      const result = await axios.post(ServerUrl + "/api/auth/google",
        { name, email }, { withCredentials: true })
      dispatch(setUserData(result.data))
      onClose()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md z-50 p-3 sm:p-5 [perspective:1200px]'
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.96 }}
          transition={{ duration: 0.25 }}
          className='flex flex-col md:flex-row w-full max-w-[840px] max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative bg-[#070507] text-[#f5eff2]'
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className='absolute top-3.5 right-3.5 z-30 w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-white/10 text-white/50 hover:text-white flex items-center justify-center transition-all cursor-pointer border border-white/5'
          >
            <TbX size={15} />
          </button>

          {/* Left panel - Info & Steps */}
          <div className='w-full md:w-[50%] bg-[#0c080a] p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/[0.06]'>
            <div className='relative z-10'>
              <div className='flex items-center gap-2.5 mb-6'>
                <div className='w-8 h-8 rounded-lg bg-[#2a171f] border border-[#e11d48]/30 flex items-center justify-center text-[#f43f5e]'>
                  <TbHexagonLetterM size={15} />
                </div>
                <span
                  className='text-lg font-bold text-[#f5eff2] tracking-tight'
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  MorphyxUI
                </span>
              </div>

              <p className='text-[10px] font-semibold tracking-[2px] text-[#f43f5e] uppercase mb-3.5'>
                How it works
              </p>

              {/* Steps List */}
              <div className='flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0'>
                {steps.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => setActive(i)}
                    className={`cursor-pointer flex-shrink-0 md:flex-shrink flex items-start gap-3 p-2.5 rounded-xl border transition-colors w-[210px] sm:w-[230px] md:w-full ${
                      active === i
                        ? "bg-white/[0.04] border-[#e11d48]/40"
                        : "bg-transparent border-transparent hover:bg-white/[0.02]"
                    }`}
                  >
                    <div
                      className={`min-w-[28px] h-[28px] rounded-lg flex items-center justify-center border transition-colors ${
                        active === i
                          ? "bg-[#2a171f] border-[#e11d48]/40 text-[#f43f5e]"
                          : "bg-white/[0.02] border-white/5 text-white/40"
                      }`}
                    >
                      <item.icon size={14} />
                    </div>

                    <div className='min-w-0'>
                      <p
                        className={`text-xs font-medium transition-colors truncate md:whitespace-normal ${
                          active === i ? "text-[#f5eff2]" : "text-white/40"
                        }`}
                      >
                        {item.title}
                      </p>
                      <div
                        className={`overflow-hidden transition-all duration-200 ${
                          active === i ? "max-h-12 opacity-100 mt-0.5" : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className='text-[11px] text-[#f5eff2]/50 leading-relaxed line-clamp-2'>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right panel - Auth Content */}
          <div className='w-full md:w-[50%] bg-[#080608] p-6 sm:p-8 flex flex-col items-center justify-center text-center relative'>
            <div className='w-full max-w-[260px] flex flex-col items-center'>
              <div className='w-10 h-10 rounded-xl bg-[#2a171f] border border-[#e11d48]/30 flex items-center justify-center text-[#f43f5e] mb-3'>
               <TbHexagonLetterM size={18} />
              </div>

              <h3 className='text-lg font-bold text-[#f5eff2] mb-1' style={{ fontFamily: "'Syne', sans-serif" }}>
                Welcome to MorphyxUI
              </h3>
              <p className='text-xs text-[#f5eff2]/45 mb-5 leading-relaxed'>
                Sign in with your account to get instant access to generated UI code.
              </p>

              {/* Stats badges */}
              <div className='flex justify-center gap-5 mb-5 w-full py-2 rounded-lg bg-white/[0.02] border border-white/[0.05]'>
                {[
                  ["150", "AI credits"],
                  ["∞", "Components"],
                  ["JSX", "Ready"],
                ].map(([v, l], i) => (
                  <div key={i} className='text-center'>
                    <div className='text-sm font-semibold text-[#f5eff2]'>{v}</div>
                    <div className='text-[9px] text-[#f5eff2]/40 uppercase tracking-wider'>{l}</div>
                  </div>
                ))}
              </div>

              {/* Google Auth Button */}
              <button 
                onClick={googleAuth}
                className='w-full py-2.5 px-4 bg-[#1b1015] hover:bg-[#23151b] border border-[#e11d48]/40 hover:border-[#e11d48]/60 text-[#f5eff2] font-medium rounded-xl text-xs sm:text-sm transition-colors cursor-pointer'
              >
                Continue with Google
              </button>

              <p className='text-[11px] text-[#f5eff2]/35 mt-4'>
                No account needed for npm.{" "}
                <span 
                  onClick={onClose} 
                  className='text-[#f43f5e] hover:text-[#fb7185] border-b border-[#f43f5e]/30 cursor-pointer transition-colors'
                >
                  View docs →
                </span>
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Auth