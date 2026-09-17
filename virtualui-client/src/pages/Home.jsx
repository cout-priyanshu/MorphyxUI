import React, { useState } from 'react'
import Auth from '../components/Auth'
import { SiValorant } from 'react-icons/si'
import { AnimatePresence, motion } from "framer-motion"
import { useDispatch, useSelector } from 'react-redux'
import { HiSparkles } from 'react-icons/hi2'
import { TbArrowRight, TbBrandNpm, TbCode, TbLayout, TbAdjustments, TbPlayerPlay, TbCopy, TbCheck, TbMenu2, TbX, TbLogout, TbComponents } from 'react-icons/tb'
import axios from 'axios'
import { ServerUrl } from '../App'
import { setUserData } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [showAuth, setShowAuth] = useState(false)
  const { userData } = useSelector((state) => state.user)
  const [profileOpen, setProfileOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const dispatch = useDispatch()
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const getLetters = (name) => {
    if (!name) return "U"
    return name
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const handleLogout = async () => {
    try {
      await axios.get(`${ServerUrl}/api/auth/logout`, { withCredentials: true })
      dispatch(setUserData(null))
    } catch (error) {
      console.log(error)
    }
    setProfileOpen(false)
  }
  const handleCopy = () => {
    navigator.clipboard.writeText("npm install priyanshu-virtual-ui")
    setCopied(true)
    setTimeout(()=>setCopied(false), 2000)
  }
  const handleGenerateClick = () => {
    if(userData){
      navigate("/generate")
    } else {
      setShowAuth(true)
    }
  }

  return (
    <div
      className='min-h-screen text-white overflow-x-hidden bg-[#030b0d]'
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className='fixed inset-0 z-0 bg-[radial-gradient(circle,rgba(59,232,255,0.05)_1px,transparent_1px)] bg-[size:26px_26px] pointer-events-none' />
      <div className='fixed top-0 left-1/2 -translate-x-1/2 w-[min(700px,100vw)] h-64 bg-[radial-gradient(ellipse,rgba(59,232,255,0.06)_0%,transparent_70%)] pointer-events-none' />

      <nav className='sticky top-0 z-40 flex items-center justify-between px-4 sm:px-8 lg:px-10 py-4 border-b border-white/[0.05] bg-[#030b0d]/85 backdrop-blur-md'>
        <div className='flex items-center gap-2.5 cursor-pointer' onClick={() => navigate('/')}>
          <div className='w-8 h-8 rounded-xl bg-gradient-to-br from-[#3be8ff] to-[#0ab5d4] flex items-center justify-center shadow-[0_0_14px_rgba(59,232,255,0.4)]'>
            <SiValorant size={15} color='#051c20' />
          </div>
          <span
            className='text-lg font-bold tracking-tight'
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            VirtualUI
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center gap-4 text-sm text-white/50'>
          <button className='duration-200 px-4 py-2 border border-white/15 rounded-xl text-sm text-white/70 hover:text-white hover:border-white/25 transition-all cursor-pointer bg-transparent'>
            Components
          </button>

          {userData ? (
            <div className='relative'>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setProfileOpen(!profileOpen)}
                className='flex items-center gap-2.5 bg-white/[0.06] border border-white/10 hover:border-[#3be8ff]/30 px-3 py-1.5 rounded-xl transition-all cursor-pointer'
              >
                <div className='w-7 h-7 rounded-lg bg-gradient-to-br from-[#3be8ff] to-[#0ab5d4] flex items-center justify-center text-[#030b0d] text-[11px] font-bold'>
                  {getLetters(userData.name)}
                </div>
                <span className='text-white/80 text-sm font-medium max-w-[100px] truncate'>
                  {userData.name}
                </span>
              </motion.button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    className='absolute right-0 top-12 w-52 bg-[#0a1a1e] border border-white/[0.09] rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.5)] overflow-hidden z-50'
                  >
                    <div className='px-4 py-3.5 border-b border-white/[0.07]'>
                      <p className='text-white/90 font-semibold text-sm truncate'>
                        {userData.name}
                      </p>
                      <p className='text-white/40 text-xs truncate mt-0.5'>
                        {userData.email}
                      </p>
                    </div>
                    <div className='py-1.5'>
                      <button
                        onClick={() => {
                          setProfileOpen(false)
                          navigate('/my-components')
                        }}
                        className='w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/[0.04] transition-colors cursor-pointer bg-transparent border-none text-left'
                      >
                        <TbComponents size={16} className='text-[#3be8ff]/70' /> My-Components
                      </button>
                    </div>
                    <div className='border-t border-white/[0.07] py-1.5'>
                      <button
                        onClick={handleLogout}
                        className='w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400/80 hover:text-red-400 hover:bg-red-500/[0.06] transition-colors cursor-pointer bg-transparent border-none text-left'
                      >
                        <TbLogout size={16} /> Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAuth(true)}
              className='flex items-center gap-2 bg-[#3be8ff] text-[#030b0d] px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer border-none shadow-[0_0_20px_rgba(59,232,255,0.4)] transition-shadow whitespace-nowrap'
            >
              <HiSparkles size={14} /> Generate your AI components
            </motion.button>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className='md:hidden text-white/60 hover:text-white transition-colors bg-transparent border-none cursor-pointer'
        >
          {menuOpen ? <TbX size={22} /> : <TbMenu2 size={22} />}
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className='md:hidden sticky top-[65px] z-30 bg-[#030b0d]/95 backdrop-blur-md border-b border-white/[0.05] px-4 py-4 flex flex-col gap-3'
          >
            <button className='text-sm text-white/60 hover:text-white transition-colors py-1 text-left bg-transparent border-none cursor-pointer'>
              Components
            </button>

            {userData ? (
              <>
                <div className='flex items-center gap-2.5 py-2 border-t border-white/[0.07]'>
                  <div className='w-7 h-7 rounded-lg bg-gradient-to-br from-[#3be8ff] to-[#0ab5d4] flex items-center justify-center text-[#030b0d] text-[11px] font-bold'>
                    {getLetters(userData.name)}
                  </div>
                  <span className='text-white/80 text-sm font-medium'>
                    {userData.name}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setMenuOpen(false)
                    navigate('/my-components')
                  }}
                  className='flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors py-1 bg-transparent border-none cursor-pointer text-left'
                >
                  <TbComponents size={15} className='text-[#3be8ff]/70' /> My components
                </button>

                <button
                  onClick={() => {
                    handleLogout()
                    setMenuOpen(false)
                  }}
                  className='flex items-center gap-2 text-sm text-red-400/80 hover:text-red-400 transition-colors py-1 bg-transparent border-none cursor-pointer text-left'
                >
                  <TbLogout size={15} /> Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setShowAuth(true)
                  setMenuOpen(false)
                }}
                className='flex items-center justify-center gap-2 bg-[#3be8ff] text-[#030b0d] px-4 py-2.5 rounded-lg text-sm font-semibold cursor-pointer border-none mt-1'
              >
                <HiSparkles size={14} /> Generate AI Components
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero section */}


      <section className='relative max-w-5xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-12 sm:pb-20 text-center'>
        <motion.div 
        initial={{opacity:0, y:22}}
        animate={{opacity:1, y:0}}
        transition={{delay:0.05, duration:0.6}}
         className='inline-flex items-center gap-2 text-[10px] font-semibold tracking-[2.5px] uppercase text-[#3be8ff]/70 border border-[#3be8ff]/20 bg-[#3be8ff]/[0.05] rounded-full px-4 py-1.5 mb-sm:mb-7'> 
        <span className='w-1.5 h-1.5 rounded-full bg-[#3be8ff] animate-pulse'/>
        AI Powered react ui engine</motion.div>

        <motion.h1 
        initial={{opacity:0, y:22}}
        animate={{opacity:1, y:0}}
        transition={{delay:0.12, duration:0.6}}
        className='text-4xl sm:text-3xl5xl lg:text-6xl font-bold leading-[1.08] tracking-tight mb-5 sm:mb-6'
        style={{ fontFamily:"'Syne',sans-serif" }} >
          Design. Generate. Ship. <br/>
          <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#3be8ff] to-[#0ab5d4]'>
            Build 10X Faster UI
          </span>
        </motion.h1>
        <motion.p 
        initial={{opacity:0 , y:22}}
        animate={{opacity:1, y:0}}
        transition={{delay:0.2 , duration:0.6}}
        className='text-white/50 text-base sm:text:lg max-w-xl mx-auto leading-relaxed mb-8 sm:mb-10 font-light px-2'>
          From prebuild components to fully custom designs, our AI engine helps you build polished React interfaces without the repetitive coding.
        </motion.p>

        <motion.div 
        initial={{opacity:0 , y:22}}
        animate={{opacity:1, y:0}}
        className='flex justify-center mb-7 sm:mb-8 px-2'>
          <div className='flex items-center gap-2 sm:gap-3 bg-white/[0.04]
          border border-white/10 rounded-xl px-4 sm:px-5 py-3 text-xs sm:text-sm font-mono w-full max-w-xs sm:max-w-fit'>
            <span className='text-[#3be8ff]/60'>$</span>
            <span className='text-white/80 truncate'>npm install priyanshu-virtual-ui</span>
            <button 
            onClick={handleCopy}
            className='ml-1 text-white/30 hover:text-[#3be8ff]
            transition-colors cursor-pointer bg-transparent border-none flex-shrink-0'>
              {copied? <TbCheck size={15} className='text-[#3be8ff]'/> : <TbCopy size={15}/>}

            </button>
          </div>
          </motion.div>

        <motion.div 
           initial={{opacity:0 , y:22}}
           animate={{opacity:1 , y:0}}
           transition={{delay:0.33 , duration:0.6}}
           className='flex flex-col sm:flex-row justify-center gap-3 px-4 sm:px-0'>
            <motion.button 
            whileHover={{y:-2}}
            whileTop={{scale:0.97}}
            className='flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 bg-white text-[#030b0d] rounded-xl font-sm
            cursor-pointer border-none shadow-[0_6px_32px_rgba(255,255,255,0.1)] hover:shadow-[0_6px_32px_rgba(255,255,255,0.18)] transition-shadow w-full sm:w-auto'>
              Get Started <TbArrowRight size={15}/>

            </motion.button>
            <motion.button 
            onClick={handleGenerateClick}
            whileHover={{y:-2}}
            whileTop={{scale:0.97}}
            className='flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 border border-white/15 rounded-xl text-sm
            text-white/70 hover:text-white hover:boreder-white/25 transition-all cursor-pointer bg-transparent w-full sm:w-auto'>
              <HiSparkles size={14} /> Generate AI Components
            </motion.button>

        </motion.div>

      </section>

      {showAuth && <Auth onClose={() => setShowAuth(false)} />}
    </div>
  )
}

export default Home