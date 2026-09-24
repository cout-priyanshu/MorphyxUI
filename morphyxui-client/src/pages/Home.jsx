import React, { useState } from 'react'
import Auth from '../components/Auth'
import { TbHexagonLetterM } from "react-icons/tb";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useDispatch, useSelector } from 'react-redux'
import { HiSparkles } from 'react-icons/hi2'
import { 
  TbArrowRight, 
  TbBrandNpm, 
  TbCode, 
  TbLayout, 
  TbAdjustments, 
  TbPlayerPlay, 
  TbCopy, 
  TbCheck, 
  TbMenu2, 
  TbX, 
  TbLogout, 
  TbComponents,
  TbTerminal2,
  TbChevronRight,
  TbCpu,
  TbShieldCheck,
  TbRocket,
  TbEye
} from 'react-icons/tb'
import axios from 'axios'
import { ServerUrl } from '../App'
import { setUserData } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'

const features = [
  { icon: TbLayout, title: "Prebuilt UI Components", text: "Production-ready, accessible, aur pixel-perfect React elements jo seedhe copy-paste ke liye ready hain." },
  { icon: HiSparkles, title: "Neural AI Generator", text: "Natural English me describe karo aur hamara fine-tuned engine instant JSX output prepare karega." },
  { icon: TbAdjustments, title: "Dynamic Prop Controls", text: "Variants, padding, theme aur state ko real-time sandbox me bina refresh kiye customize karo." },
  { icon: TbBrandNpm, title: "Modular NPM Core", text: "Lightweight zero-dependency architecture jo aapke bundle size ko light aur lightning fast rakhta hai." },
  { icon: TbCode, title: "Zero-Junk JSX Export", text: "Readable TailwindCSS classes aur modern semantic markup ke sath clean export." },
  { icon: TbPlayerPlay, title: "Realtime Viewport Test", text: "Production me push karne se pehle cross-device responsive rendering check karo." },
];

const steps = [
  { n: "01", title: "Initialize Core", text: "Lightweight npm command run karke VirtualUI architecture setup karo." },
  { n: "02", title: "Prompt Engine", text: "Apni desired component ka structure ya purpose type karo." },
  { n: "03", title: "Live Fine-Tune", text: "Interactive prop sliders se theme, radius aur glow tweak karo." },
  { n: "04", title: "Ship JSX", text: "Zero-friction clean code export karke sidha project me drop karo." },
];

function TiltCard({ children, className = "" }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 140, damping: 14 });
  const mouseYSpring = useSpring(y, { stiffness: 140, damping: 14 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
      className={`relative transition-all duration-150 ease-out will-change-transform ${className}`}
    >
      <div style={{ transform: "translateZ(26px)" }}>
        {children}
      </div>
    </motion.div>
  );
}

function Home() {
  const [showAuth, setShowAuth] = useState(false)
  const { userData } = useSelector((state) => state.user)
  const [profileOpen, setProfileOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState('button')
  const dispatch = useDispatch()
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const getLetters = (name) => {
    if (!name) return "U"
    return name.split(" ").filter(Boolean).map((n) => n[0]).join("").toUpperCase().slice(0, 2)
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
    setTimeout(() => setCopied(false), 2000)
  }

  const handleGenerateClick = () => {
    if (userData) {
      navigate("/generate")
    } else {
      setShowAuth(true)
    }
  }

  return (
    
    <div
      className='min-h-screen text-[#f5eff2] overflow-x-hidden bg-[#070507] relative selection:bg-[#e11d48]/20 selection:text-[#fda4af]'
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      
      {/* Subtle Background Glows */}
      <div className='fixed inset-0 z-0 bg-[radial-gradient(#f43f5e_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.035] pointer-events-none' />
      <div className='fixed -top-40 left-1/2 -translate-x-1/2 w-[680px] h-[380px] bg-[#be123c]/[0.08] rounded-full blur-[160px] pointer-events-none' />
      <div className='fixed top-1/3 -left-36 w-[360px] h-[360px] bg-[#9f1239]/[0.04] rounded-full blur-[140px] pointer-events-none' />
      
      {/* Navigation Bar */}
      <nav className='sticky top-0 z-40 flex items-center justify-between px-5 sm:px-10 lg:px-14 py-4 border-b border-white/[0.06] bg-[#070507]/85 backdrop-blur-2xl'>
        <div className='flex items-center gap-3 cursor-pointer group' onClick={() => navigate('/')}>
          <div className='w-8 h-8 rounded-lg bg-gradient-to-b from-[#2a171f] to-[#170c11] border border-[#e11d48]/20 flex items-center justify-center text-[#f43f5e] shadow-sm group-hover:border-[#e11d48]/40 transition-colors'>
            <TbHexagonLetterM size={15} />
          </div>
          <span
            className='text-lg font-bold tracking-tight text-[#f5eff2]'
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            MorphyxUI
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center gap-6 text-sm'>
          <button 
            onClick={() => navigate('/components')} 
            className='px-3 py-1.5 text-[#f5eff2]/60 hover:text-white transition-colors cursor-pointer bg-transparent border-none'
          >
            Components
          </button>
          <button 
            onClick={() => navigate('/docs')} 
            className='px-3 py-1.5 text-[#f5eff2]/60 hover:text-white transition-colors cursor-pointer bg-transparent border-none'
          >
            Docs
          </button>

          {userData ? (
            <div className='relative'>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setProfileOpen(!profileOpen)}
                className='flex items-center gap-2.5 bg-white/[0.03] border border-white/10 hover:border-white/20 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer backdrop-blur-md'
              >
                <div className='w-7 h-7 rounded-lg bg-[#2a171f] border border-[#e11d48]/30 flex items-center justify-center text-[#fda4af] text-[11px] font-medium'>
                  {getLetters(userData.name)}
                </div>
                <span className='text-[#f5eff2]/80 text-sm font-medium max-w-[110px] truncate'>
                  {userData.name}
                </span>
              </motion.button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.16 }}
                    className='absolute right-0 top-12 w-56 bg-[#0e0a0d] backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden z-50'
                  >
                    <div className='px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]'>
                      <p className='text-[#f5eff2] font-semibold text-sm truncate'>{userData.name}</p>
                      <p className='text-[#f5eff2]/40 text-xs truncate mt-0.5'>{userData.email}</p>
                    </div>
                    <div className='py-1'>
                      <button
                        onClick={() => { setProfileOpen(false); navigate('/my-components'); }}
                        className='w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#f5eff2]/70 hover:text-white hover:bg-white/[0.04] transition-colors cursor-pointer bg-transparent border-none text-left'
                      >
                        <TbComponents size={16} className='text-[#f43f5e]' /> My Components
                      </button>
                    </div>
                    <div className='border-t border-white/[0.06] py-1'>
                      <button
                        onClick={handleLogout}
                        className='w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-400/80 hover:text-rose-400 transition-colors cursor-pointer bg-transparent border-none text-left'
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
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAuth(true)}
              className='flex items-center gap-2 bg-[#1b1015] hover:bg-[#23151b] border border-[#e11d48]/40 hover:border-[#e11d48]/60 text-[#f5eff2] px-4 py-2 rounded-xl text-sm font-medium cursor-pointer transition-all'
            >
              <HiSparkles size={15} className='text-[#f43f5e]' /> Sign In / Join
            </motion.button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className='md:hidden text-[#f5eff2]/70 hover:text-white transition-colors bg-transparent border-none cursor-pointer'
        >
          {menuOpen ? <TbX size={22} /> : <TbMenu2 size={22} />}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className='md:hidden sticky top-[65px] z-30 bg-[#0a0709]/95 backdrop-blur-2xl border-b border-white/[0.08] px-5 py-5 flex flex-col gap-3'
          >
            <button 
              onClick={() => { setMenuOpen(false); navigate('/components'); }}
              className='text-sm text-[#f5eff2]/70 hover:text-white py-1.5 text-left bg-transparent border-none cursor-pointer'
            >
              Components
            </button>
            <button 
              onClick={() => { setMenuOpen(false); navigate('/docs'); }}
              className='text-sm text-[#f5eff2]/70 hover:text-white py-1.5 text-left bg-transparent border-none cursor-pointer'
            >
              Documentation
            </button>

            {userData ? (
              <>
                <div className='flex items-center gap-3 py-3 border-t border-white/[0.06]'>
                  <div className='w-8 h-8 rounded-lg bg-[#2a171f] border border-[#e11d48]/30 flex items-center justify-center text-[#fda4af] text-xs font-medium'>
                    {getLetters(userData.name)}
                  </div>
                  <div>
                    <p className='text-[#f5eff2] text-sm font-medium leading-none'>{userData.name}</p>
                    <p className='text-[#f5eff2]/40 text-xs mt-1 leading-none'>{userData.email}</p>
                  </div>
                </div>

                <button
                  onClick={() => { setMenuOpen(false); navigate('/my-components'); }}
                  className='flex items-center gap-2.5 text-sm text-[#f5eff2]/70 hover:text-white py-1.5 bg-transparent border-none cursor-pointer text-left'
                >
                  <TbComponents size={16} className='text-[#f43f5e]' /> My Components
                </button>

                <button
                  onClick={() => { handleLogout(); setMenuOpen(false); }}
                  className='flex items-center gap-2.5 text-sm text-rose-400/80 hover:text-rose-400 py-1.5 bg-transparent border-none cursor-pointer text-left'
                >
                  <TbLogout size={16} /> Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => { setShowAuth(true); setMenuOpen(false); }}
                className='flex items-center justify-center gap-2 bg-[#1b1015] border border-[#e11d48]/40 text-[#f5eff2] px-4 py-2.5 rounded-xl text-sm font-medium cursor-pointer mt-2'
              >
                <HiSparkles size={15} className='text-[#f43f5e]' /> Generate AI Components
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className='relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-16 sm:pb-20 text-center z-10'>
        {/* Subdued Pill */}
        <motion.div 
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className='inline-flex items-center gap-2 text-[11px] font-medium tracking-[1.5px] uppercase text-[#f43f5e] border border-[#e11d48]/25 bg-[#e11d48]/[0.05] rounded-full px-3.5 py-1 mb-6'
        > 
          <span className='w-1.5 h-1.5 rounded-full bg-[#f43f5e]' />
          AI-Powered React Engine
        </motion.div>

        {/* Clean Balanced Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className='text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-5 text-[#f5eff2]'
          style={{ fontFamily: "'Syne', sans-serif" }} 
        >
          Design Without Friction. <br/>
          <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#f5eff2] via-[#fbcfe8] to-[#e11d48]'>
            Ship Clean React UIs
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          className='text-[#f5eff2]/50 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8 font-normal px-4'
        >
          Production-grade JSX components effortlessly prompt karo. Minimal setup, zero clutter, aur modern aesthetics jo visually comfortable hain.
        </motion.p>

        {/* Terminal Copy Box */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.22 }}
          className='flex justify-center mb-8 px-4'
        >
          <div className='flex items-center gap-3 bg-[#0d090b] border border-white/[0.08] hover:border-white/20 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-mono w-full max-w-sm sm:max-w-fit transition-colors'>
            <TbTerminal2 size={16} className='text-[#f43f5e]' />
            <span className='text-[#f5eff2]/80 font-normal truncate'>npm install morphyx-ui</span>
            <button 
              onClick={handleCopy}
              className='ml-2 text-[#f5eff2]/40 hover:text-[#f43f5e] transition-colors cursor-pointer bg-transparent border-none flex-shrink-0'
              title='Copy command'
            >
              {copied ? <TbCheck size={15} className='text-[#f43f5e]' /> : <TbCopy size={15} />}
            </button>
          </div>
        </motion.div>

        {/* CTA Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
          className='flex flex-col sm:flex-row justify-center items-center gap-3.5 px-4 sm:px-0'
        >
          <motion.button 
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerateClick}
            className='flex items-center justify-center gap-2 px-6 py-3 bg-[#f5eff2] hover:bg-white text-[#0a0709] rounded-xl font-semibold text-sm cursor-pointer border-none shadow-sm transition-all w-full sm:w-auto'
          >
            Start Generating Free <TbArrowRight size={16} />
          </motion.button>

          <motion.button 
            onClick={() => navigate('/generate')}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className='flex items-center justify-center gap-2 px-6 py-3 border border-white/10 hover:border-white/25 bg-white/[0.02] rounded-xl text-sm font-medium text-[#f5eff2]/70 hover:text-white transition-all cursor-pointer w-full sm:w-auto'
          >
            <TbComponents size={16} className='text-[#f43f5e]' /> Browse Components
          </motion.button>
        </motion.div>

        {/* 3D Code IDE Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className='mt-14 max-w-3xl mx-auto [perspective:1200px]'
        >
          <TiltCard className='bg-[#0b080a] border border-white/[0.08] rounded-2xl p-5 sm:p-6 text-left shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-md'>
            <div className='flex items-center justify-between pb-3.5 mb-3.5 border-b border-white/[0.06]'>
              <div className='flex items-center gap-2'>
                <div className='w-2.5 h-2.5 rounded-full bg-[#ff5f57]/80' />
                <div className='w-2.5 h-2.5 rounded-full bg-[#febc2e]/80' />
                <div className='w-2.5 h-2.5 rounded-full bg-[#28c840]/80' />
                <span className='ml-2.5 text-xs text-[#f5eff2]/35 font-mono'>DashboardView.jsx</span>
              </div>
              <span className='text-[10px] font-mono text-[#f43f5e] px-2 py-0.5 rounded bg-[#f43f5e]/10 border border-[#f43f5e]/20'>
                MorphyxUI v2.4
              </span>
            </div>

            <div className='font-mono text-xs leading-relaxed space-y-1 overflow-x-auto select-none'>
              <p>
                <span className='text-[#f43f5e]'>import</span> <span className='text-[#f5eff2]'>{"{ GlassCard, Button, StatBadge }"}</span> <span className='text-[#f43f5e]'>from</span> <span className='text-[#fbcfe8]/80'>'morphyx-ui'</span><span className='text-white/30'>;</span>
              </p>
              <p className='text-transparent'>_</p>
              <p>
                <span className='text-[#fda4af]'>export default function</span> <span className='text-[#f5eff2]'>Analytics</span><span className='text-white/40'>() {"{"}</span>
              </p>
              <p className='pl-4'>
                <span className='text-[#f43f5e]'>return</span> <span className='text-white/40'>{"("}</span>
              </p>
              <p className='pl-8'>
                <span className='text-white/30'>{"<"}</span><span className='text-[#f43f5e] font-semibold'>GlassCard</span> <span className='text-[#fbcfe8]/70'>blur</span><span className='text-white/30'>=</span><span className='text-[#f5eff2]'>"xl"</span><span className='text-white/30'>{">"}</span>
              </p>
              <p className='pl-12'>
                <span className='text-white/30'>{"<"}</span><span className='text-[#f43f5e] font-semibold'>StatBadge</span> <span className='text-[#fbcfe8]/70'>label</span><span className='text-white/30'>=</span><span className='text-[#f5eff2]'>"Active Users"</span> <span className='text-[#fbcfe8]/70'>count</span><span className='text-white/30'>=</span><span className='text-[#f5eff2]'>"14.8k"</span> <span className='text-white/30'>{"/>"}</span>
              </p>
              <p className='pl-12'>
                <span className='text-white/30'>{"<"}</span><span className='text-[#f43f5e] font-semibold'>Button</span> <span className='text-[#fbcfe8]/70'>variant</span><span className='text-white/30'>=</span><span className='text-[#f5eff2]'>"subtle"</span><span className='text-white/30'>{">"}</span>
                <span className='text-[#f5eff2] font-medium'>Deploy Interface</span>
                <span className='text-white/30'>{"</"}</span><span className='text-[#f43f5e] font-semibold'>Button</span><span className='text-white/30'>{">"}</span>
              </p>
              <p className='pl-8'>
                <span className='text-white/30'>{"</"}</span><span className='text-[#f43f5e] font-semibold'>GlassCard</span><span className='text-white/30'>{">"}</span>
              </p>
              <p className='pl-4'>
                <span className='text-white/40'>{");"}</span>
              </p>
              <p>
                <span className='text-white/40'>{"}"}</span>
              </p>
            </div>
          </TiltCard>
        </motion.div>
      </section>

      {/* Live Interactive Component Sandbox */}
      <section className='max-w-6xl mx-auto px-4 sm:px-6 py-14 relative z-10'>
        <div className='text-center mb-10'>
          <p className='text-xs font-semibold tracking-[2px] uppercase text-[#f43f5e] mb-2'>Live Playground</p>
          <h2 className='text-2xl sm:text-4xl font-bold tracking-tight text-[#f5eff2]' style={{ fontFamily: "'Syne', sans-serif" }}>
            Test Components In Real-Time
          </h2>
          <p className='text-[#f5eff2]/45 text-sm max-w-md mx-auto mt-2'>Minimal micro-interactions bina visual clutter ke.</p>
        </div>

        <div className='p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#0c080a] shadow-[0_15px_40px_rgba(0,0,0,0.6)]'>
          <div className='flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/[0.06]'>
            <div className='flex items-center gap-1.5 bg-white/[0.03] p-1 rounded-lg border border-white/5'>
              {['button', 'card', 'badge'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3.5 py-1.5 rounded-md text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer border-none ${
                    activeTab === tab ? 'bg-white/10 text-white font-semibold' : 'text-[#f5eff2]/50 hover:text-white bg-transparent'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className='flex items-center gap-2 text-xs text-[#f5eff2]/40'>
              <TbEye size={15} className='text-[#f43f5e]' /> Interactive Preview Mode
            </div>
          </div>

          {/* Playground Preview Display */}
          <div className='min-h-[190px] flex items-center justify-center p-6 bg-[#070507] rounded-xl mt-5 border border-white/[0.04]'>
            {activeTab === 'button' && (
              <div className='flex flex-wrap items-center justify-center gap-3.5'>
                <button className='px-5 py-2.5 rounded-lg bg-[#1a0f14] hover:bg-[#25151c] border border-[#e11d48]/40 text-[#f5eff2] font-medium text-xs sm:text-sm transition-colors cursor-pointer'>
                  Subdued Rose
                </button>
                <button className='px-5 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 hover:border-white/20 text-[#f5eff2]/80 font-medium text-xs sm:text-sm transition-colors cursor-pointer'>
                  Frosted Outline
                </button>
              </div>
            )}
            {activeTab === 'card' && (
              <div className='w-full max-w-sm p-4 rounded-xl bg-white/[0.02] border border-white/10 shadow-sm'>
                <div className='flex items-center gap-3 mb-2.5'>
                  <div className='w-7 h-7 rounded-lg bg-[#2a171f] border border-[#e11d48]/20 flex items-center justify-center text-[#f43f5e]'>
                    <HiSparkles size={14} />
                  </div>
                  <div>
                    <h4 className='text-xs font-semibold text-[#f5eff2]'>Refined Card Surface</h4>
                    <p className='text-[10px] text-[#f5eff2]/40'>Balanced contrast</p>
                  </div>
                </div>
                <p className='text-xs text-[#f5eff2]/60 leading-relaxed'>Built-in soft borders without harsh glow, styled for modern dashboards.</p>
              </div>
            )}
            {activeTab === 'badge' && (
              <div className='flex flex-wrap gap-2.5'>
                <span className='px-3 py-1 rounded-full text-xs font-medium bg-white/[0.04] text-[#fbcfe8] border border-white/10'>
                  Production Ready
                </span>
                <span className='px-3 py-1 rounded-full text-xs font-medium bg-[#2a171f]/50 text-[#fda4af] border border-[#e11d48]/20'>
                  Ultra Fast 0.2kb
                </span>
                <span className='px-3 py-1 rounded-full text-xs font-medium bg-white/[0.02] text-[#f5eff2]/60 border border-white/5'>
                  React 19 Ready
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Metric Benchmark */}
      <section className='max-w-6xl mx-auto px-4 sm:px-6 py-10 relative z-10'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          {[
            { metric: "10x", label: "Dev Speed Boost", icon: TbRocket },
            { metric: "99.8%", label: "Semantic Accuracy", icon: TbCpu },
            { metric: "0kb", label: "Runtime Overhead", icon: TbShieldCheck },
            { metric: "150+", label: "Premade Layouts", icon: TbComponents },
          ].map((stat, i) => (
            <div key={i} className='p-5 rounded-xl bg-white/[0.015] border border-white/[0.06] flex flex-col items-center text-center group hover:border-white/15 transition-colors'>
              <div className='w-8 h-8 rounded-lg bg-[#2a171f] flex items-center justify-center text-[#f43f5e] mb-2.5'>
                <stat.icon size={17} />
              </div>
              <span className='text-2xl sm:text-3xl font-bold text-[#f5eff2]' style={{ fontFamily: "'Syne', sans-serif" }}>
                {stat.metric}
              </span>
              <span className='text-[11px] text-[#f5eff2]/40 mt-1 uppercase tracking-wider'>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className='max-w-6xl mx-auto px-4 sm:px-6 py-14 relative z-10'>
        <div className='text-center mb-10'>
          <p className='text-xs font-semibold tracking-[2px] uppercase text-[#f43f5e] mb-2'>Inside The Architecture</p>
          <h2 className='text-2xl sm:text-4xl font-bold tracking-tight text-[#f5eff2]' style={{ fontFamily: "'Syne', sans-serif" }}>
            Why Developers Pick MorphyxUI
          </h2>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
          {features.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className='p-6 rounded-2xl border border-white/[0.06] bg-white/[0.015] hover:border-white/20 transition-colors'
            >
              <div className='w-10 h-10 rounded-xl bg-[#2a171f] border border-[#e11d48]/20 flex items-center justify-center mb-5 text-[#f43f5e]'>
                <item.icon size={20} />
              </div>
              
              <h3 className='font-semibold text-[#f5eff2] mb-1.5 text-base'>
                {item.title}
              </h3>
              <p className='text-xs sm:text-sm text-[#f5eff2]/50 leading-relaxed'>
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Steps Pipeline Section */}
      <section className='max-w-6xl mx-auto px-4 sm:px-6 py-14 relative z-10'>
        <div className='text-center mb-12'>
          <p className='text-xs font-semibold tracking-[2px] uppercase text-[#f43f5e] mb-2'>Frictionless Workflow</p>
          <h2 className='text-2xl sm:text-4xl font-bold tracking-tight text-[#f5eff2]' style={{ fontFamily: "'Syne', sans-serif" }}>
            From Idea to Shipped UI in 4 Steps
          </h2>
        </div>

        <div className='relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {steps.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className='relative text-center flex flex-col items-center p-4'
            >
              <div className='w-12 h-12 mb-4 rounded-xl bg-[#140b0f] border border-white/10 flex items-center justify-center relative z-10'>
                <span className='text-xs text-[#f43f5e] font-mono font-semibold'>
                  {item.n}
                </span>
              </div>
              <h3 className='font-semibold text-[#f5eff2] mb-1.5 text-sm sm:text-base'>
                {item.title}
              </h3>
              <p className='text-xs text-[#f5eff2]/45 leading-relaxed max-w-xs'>
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Radiant CTA Banner */}
      <section className='max-w-5xl mx-auto px-4 sm:px-6 py-14 relative z-10'>
        <div className='relative rounded-2xl border border-white/[0.08] bg-[#0c080a] p-8 sm:p-12 text-center overflow-hidden'>
          <div className='relative z-10'>
            <p className='text-xs font-medium tracking-[2px] uppercase text-[#f43f5e] mb-3'>
              Instant Access
            </p>
            <h3 className='text-2xl sm:text-4xl font-bold tracking-tight text-[#f5eff2] mb-4' style={{ fontFamily: "'Syne', sans-serif" }}>
              Ready to Upgrade Your Workflow?
            </h3>

            {userData ? (
              <>
                <p className='text-[#f5eff2]/50 mb-7 text-sm max-w-lg mx-auto leading-relaxed'>
                  Welcome back, <span className='text-[#f5eff2] font-semibold'>{userData.name}</span>! Components generate karna continue karein.
                </p>
                <div className='flex flex-col sm:flex-row justify-center items-center gap-3.5'>
                  <motion.button 
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/generate')}
                    className='flex items-center justify-center gap-2 bg-[#f5eff2] hover:bg-white text-[#0a0709] px-6 py-3 rounded-xl font-semibold text-sm cursor-pointer border-none transition-all'
                  >
                    <HiSparkles size={16} className='text-[#f43f5e]' /> Open AI Generator
                  </motion.button>
                  <motion.button 
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/my-components')}
                    className='flex items-center justify-center gap-2 px-6 py-3 border border-white/10 hover:border-white/20 rounded-xl text-sm font-medium text-[#f5eff2]/70 hover:text-white transition-all cursor-pointer bg-transparent'
                  >
                    <TbComponents size={16} className='text-[#f43f5e]' /> My Components
                  </motion.button>
                </div>
              </>
            ) : (
              <>
                <p className='text-[#f5eff2]/50 mb-7 text-sm max-w-lg mx-auto leading-relaxed'>
                  Google se authenticate karke <span className='text-[#f5eff2] font-medium'>150 Free AI Credits</span> claim karein aur bina kisi setup ke JSX generate karein.
                </p>
                <div className='flex flex-col sm:flex-row justify-center items-center gap-3.5'>
                  <motion.button 
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowAuth(true)}
                    className='flex items-center justify-center gap-2 bg-[#1b1015] hover:bg-[#23151b] border border-[#e11d48]/40 hover:border-[#e11d48]/60 text-[#f5eff2] px-6 py-3 rounded-xl font-semibold text-sm cursor-pointer transition-all'
                  >
                    <HiSparkles size={16} className='text-[#f43f5e]' /> Claim 150 Free Credits
                  </motion.button>
                  <motion.button 
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/components')}
                    className='flex items-center justify-center gap-2 px-6 py-3 border border-white/10 hover:border-white/20 rounded-xl text-sm font-medium text-[#f5eff2]/70 hover:text-white transition-all cursor-pointer bg-transparent'
                  >
                    Explore Library <TbChevronRight size={15} />
                  </motion.button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Modern Pitch Black Footer */}
      <footer className='border-t border-white/[0.06] py-8 relative z-10 bg-[#070507]'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-0'>
          <div className='flex items-center gap-2.5 cursor-pointer' onClick={() => navigate('/')}>
            <div className='w-7 h-7 rounded-lg bg-[#2a171f] border border-[#e11d48]/20 flex items-center justify-center text-[#f43f5e]'>
              <TbHexagonLetterM size={14} />
            </div>
            <span className='text-base font-bold tracking-tight text-[#f5eff2]' style={{ fontFamily: "'Syne', sans-serif" }}>
              MorphyxUI
            </span>
          </div>

          <div className='flex flex-wrap justify-center items-center gap-6 text-xs text-[#f5eff2]/40'>
            <span onClick={() => navigate('/components')} className='hover:text-[#f43f5e] transition-colors cursor-pointer'>
              Components
            </span>
            <span onClick={() => navigate('/docs')} className='hover:text-[#f43f5e] transition-colors cursor-pointer'>
              Documentation
            </span>
            <span className='hover:text-[#f43f5e] transition-colors cursor-pointer'>
              admin@morphyxui.com
            </span>
          </div>

          <p className='text-xs text-[#f5eff2]/30'>
            © {new Date().getFullYear()} MorphyxUI Engine. All rights reserved.
          </p>
        </div>
      </footer>

      {showAuth && <Auth onClose={() => setShowAuth(false)} />}

    </div>
  )
}

export default Home