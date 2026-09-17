import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from "framer-motion"
import { SiValorant } from "react-icons/si"
import { HiSparkles } from "react-icons/hi2"
import { TbCopy, TbSettings, TbDownload, TbLogin2, TbX } from 'react-icons/tb'
import { linkWithCredential, signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../utils/firebase'
import  axios  from "axios"
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
      const result = await axios.post(ServerUrl + "/api/auth/google" ,
         {name, email} , {withCredentials: true})
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
        className='fixed inset-0 flex items-center justify-center bg-black/75 backdrop-blur-sm z-50 p-3 sm:p-5'
      >
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ duration: 0.4 }}
          className='flex flex-col md:flex-row w-full max-w-[860px] max-h-[92vh] overflow-y-auto rounded-3xl border border-[#3be8ff]/15 shadow-[0_40px_80px_rgba(0,0,0,0.85)] relative bg-[#061217]'
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className='absolute top-3.5 right-3.5 z-30 w-8 h-8 rounded-full bg-white/5 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm'
          >
            <TbX size={17} />
          </button>

          {/* Left panel - Info & Steps */}
          <div className='w-full md:w-[50%] bg-gradient-to-br from-[#03181c] to-[#041e24] p-5 sm:p-7 md:p-9 relative overflow-hidden flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/5'>
            <div className='absolute top-10 -right-10 w-60 h-60 rounded-full bg-[radial-gradient(circle,rgba(59,232,255,0.08)_0%,transparent_70%)] pointer-events-none' />

            <div>
              <motion.div
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className='flex items-center gap-3 mb-5 md:mb-8'
              >
                <div className='w-8 h-8 md:w-9 md:h-9 rounded-xl bg-gradient-to-br from-[#3be8ff] to-[#0ab5d4] flex items-center justify-center shadow-[0_0_18px_rgba(59,232,255,0.35)]'>
                  <SiValorant size={16} color='#051c20' />
                </div>
                <span
                  className='text-lg md:text-xl font-bold text-[#e8f8fa] tracking-tight'
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  VirtualUI
                </span>
              </motion.div>

              <p className='text-[10px] font-semibold tracking-[3px] text-[#3be8ff] uppercase mb-3 md:mb-4'>
                How it works
              </p>

              {/* Steps List */}
              <div className='flex md:flex-col gap-2.5 md:gap-1.5 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 no-scrollbar'>
                {steps.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => setActive(i)}
                    className={`cursor-pointer flex-shrink-0 md:flex-shrink flex items-start gap-2.5 sm:gap-3 p-2.5 rounded-xl border transition-all duration-300 w-[210px] sm:w-[230px] md:w-full ${
                      active === i
                        ? "bg-[#3be8ff]/[0.08] border-[#3be8ff]/25 shadow-[0_0_15px_rgba(59,232,255,0.05)]"
                        : "bg-transparent border-transparent"
                    }`}
                  >
                    <div
                      className={`min-w-[28px] h-7 rounded-lg flex items-center justify-center border transition-all duration-300 ${
                        active === i
                          ? "bg-[#3be8ff] border-[#3be8ff] text-[#051c20]"
                          : "bg-[#3be8ff]/10 border-[#3be8ff]/15 text-[#3be8ff]"
                      }`}
                    >
                      <item.icon size={14} />
                    </div>

                    <div className='min-w-0'>
                      <p
                        className={`text-[12.5px] font-semibold transition-colors duration-300 truncate md:whitespace-normal ${
                          active === i ? "text-[#d4f5fa]" : "text-white/55"
                        }`}
                      >
                        {item.title}
                      </p>
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          active === i ? "max-h-12 opacity-100 mt-0.5" : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className='text-[11px] text-[#3be8ff]/60 leading-relaxed line-clamp-2'>
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
          <div className='w-full md:w-[50%] bg-[#081f26]/70 p-6 sm:p-8 md:p-10 flex flex-col items-center justify-center text-center'>
            <div className='w-full max-w-[280px] sm:max-w-xs flex flex-col items-center'>
              
              {/* SiValorant Center Top Icon */}
              <div className='w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#3be8ff] to-[#0ab5d4] flex items-center justify-center shadow-[0_0_25px_rgba(59,232,255,0.35)] mb-3'>
                <SiValorant size={22} color='#051c20' />
              </div>

              <h3 className='text-lg sm:text-xl font-semibold text-white mb-1.5'>
                Welcome to VirtualUI
              </h3>
              <p className='text-xs text-white/50 mb-5 leading-relaxed'>
                Sign in with your account to get instant access to generated UI code.
              </p>

              {/* Stats badges */}
              <div className='flex justify-center gap-6 mb-6'>
                {[
                  ["150", "AI credits"],
                  ["∞", "Components"],
                  ["JSX", "Ready"],
                ].map(([v, l], i) => (
                  <div key={i} className='text-center'>
                    <div className='text-sm sm:text-base font-bold text-[#3be8ff]'>{v}</div>
                    <div className='text-[9px] text-[#78aab4]/60 uppercase tracking-wider font-medium'>{l}</div>
                  </div>
                ))}
              </div>

              {/* Google Auth Button */}
              <button 
                onClick={googleAuth}
                className='w-full py-2.5 px-4 bg-[#3be8ff] hover:bg-[#34d4e9] text-[#051c20] font-semibold rounded-xl text-sm transition-all cursor-pointer shadow-[0_0_20px_rgba(59,232,255,0.25)] active:scale-[0.98]'
              >
                Continue with Google
              </button>

              <p className='text-[11px] text-[#64919b]/60 mt-4'>
                No account needed for npm.{" "}
                <span 
                  onClick={onClose} 
                  className='text-[#3be8ff]/70 border-b border-[#3be8ff]/30 cursor-pointer hover:text-[#3be8ff] transition-colors'
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