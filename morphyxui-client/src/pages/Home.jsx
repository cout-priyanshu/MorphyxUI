import React, { useEffect, useState, useRef } from 'react'
import Auth from '../components/Auth'
import { TbHexagonLetterM } from "react-icons/tb"
import { AnimatePresence, motion } from "framer-motion"
import { useDispatch, useSelector } from 'react-redux'
import { HiSparkles } from 'react-icons/hi2'
import { 
  TbArrowRight, 
  TbBrandNpm, 
  TbCode, 
  TbLayout, 
  TbAdjustments, 
  TbCopy, 
  TbCheck, 
  TbMenu2, 
  TbX, 
  TbLogout, 
  TbComponents,
  TbTerminal2,
  TbChevronRight,
  TbBrandGithub,
  TbWorld
} from 'react-icons/tb'
import axios from 'axios'
import { ServerUrl } from '../App'
import { setAllComponents, setAllUsers, setUserData } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 5-Item Overlapping Hero Bar
const heroPillars = [
  { id: 'button', code: "01", icon: TbLayout, title: "PREBUILT UI", sub: "Copy-Paste Ready" },
  { id: 'card', code: "02", icon: TbAdjustments, title: "PROP SANDBOX", sub: "Realtime Controls" },
  { id: 'badge', code: "03", icon: TbBrandNpm, title: "MODULAR NPM", sub: "Zero-Bloat Core" },
  { id: 'ai', code: "04", icon: HiSparkles, title: "NEURAL AI GEN", sub: "Prompt to JSX Engine" },
  { id: 'export', code: "05", icon: TbCode, title: "CLEAN EXPORT", sub: "Tailwind & Semantic" },
]

// Why Choose Us Timeline Tabs
const whyTabs = [
  {
    id: 0,
    labelTop: "Zero-Junk",
    labelBottom: "JSX Architecture",
    lead: "MorphyxUI Engine is engineered for modern frontend teams who demand clean, semantic React markup without bloated wrapper divs or locked-in runtime stylesheets.",
    sub: "Every component is synthesized with pure TailwindCSS utility classes, accessible ARIA attributes, and zero-dependency modular hooks—ready to drop straight into production."
  },
  {
    id: 1,
    labelTop: "Excellence &",
    labelBottom: "Neural AI Engine",
    lead: "MorphyxUI is positioned at the intersection of generative AI and deterministic design systems, backed by fine-tuned JSX models that understand layout hierarchy.",
    sub: "Describe your interface in natural language or Hinglish, fine-tune variants live in our interactive sandbox, and ship pixel-perfect React views 10x faster."
  },
  {
    id: 2,
    labelTop: "0kb Runtime",
    labelBottom: "Performance",
    lead: "Built on a lightweight, tree-shakeable NPM core that keeps your production bundle lightning fast while maintaining 99.8% semantic accuracy across viewports.",
    sub: "From atomic buttons and status badges to complex glassmorphic analytics cards, test responsiveness in real-time before pushing a single line of code."
  }
]

// Dark Section Wireframe Features
const darkFeatures = [
  { icon: TbLayout, title: "PREBUILT UI COMPONENTS", text: "Production-ready, accessible, aur pixel-perfect React elements jo seedhe copy-paste ke liye ready hain." },
  { icon: HiSparkles, title: "NEURAL AI GENERATOR", text: "Natural English me describe karo aur hamara fine-tuned engine instant JSX output prepare karega." },
  { icon: TbAdjustments, title: "DYNAMIC PROP CONTROLS", text: "Variants, padding, theme aur state ko real-time sandbox me bina refresh kiye customize karo." },
  { icon: TbBrandNpm, title: "MODULAR NPM CORE", text: "Lightweight zero-dependency architecture jo aapke bundle size ko light aur lightning fast rakhta hai." },
  { icon: TbCode, title: "ZERO-JUNK JSX EXPORT", text: "Readable TailwindCSS classes aur modern markup ke sath clean zero-clutter export." },
]

function Home() {
  const [showAuth, setShowAuth] = useState(false)
  const { userData } = useSelector((state) => state.user)
  const [profileOpen, setProfileOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState('ai')
  const [stripPaused, setStripPaused] = useState(false)
  const [activeWhy, setActiveWhy] = useState(1)
  const [menuOpen, setMenuOpen] = useState(false)
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const mainRef = useRef(null)

  useEffect(() => {
    if (userData?.role === "admin") {
      navigate("/admin")
    }
  }, [userData, navigate])

  // Auto-Cycle the 5-Column Interactive Service Strip
  useEffect(() => {
    if (stripPaused) return
    const interval = setInterval(() => {
      setActiveTab((prev) => {
        const currentIndex = heroPillars.findIndex((item) => item.id === prev)
        const nextIndex = (currentIndex + 1) % heroPillars.length
        return heroPillars[nextIndex].id
      })
    }, 2600)

    return () => clearInterval(interval)
  }, [stripPaused])

  // GSAP Setup
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      tl.fromTo(
        ".gsap-nav",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", clearProps: "transform,opacity" }
      )
      .fromTo(
        ".gsap-hero-text",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out", clearProps: "transform,opacity" },
        "-=0.2"
      )
      .fromTo(
        ".gsap-strip-wrapper",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: "power3.out", clearProps: "transform,opacity" },
        "-=0.3"
      )

      // "Why Choose Us" Reveal
      gsap.fromTo(
        ".gsap-why-header",
        { y: 25, opacity: 0 },
        {
          scrollTrigger: { trigger: ".gsap-why-section", start: "top 85%" },
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          clearProps: "transform,opacity"
        }
      )

      gsap.fromTo(
        ".gsap-stacked-card",
        { x: -20, opacity: 0 },
        {
          scrollTrigger: { trigger: ".gsap-why-section", start: "top 78%" },
          x: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: "power3.out",
          clearProps: "transform,opacity"
        }
      )

      gsap.fromTo(
        ".gsap-why-copy",
        { x: 20, opacity: 0 },
        {
          scrollTrigger: { trigger: ".gsap-why-section", start: "top 78%" },
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          clearProps: "transform,opacity"
        }
      )

      // "With a Difference" Editorial Reveal
      gsap.fromTo(
        ".gsap-diff-item",
        { y: 25, opacity: 0 },
        {
          scrollTrigger: { trigger: ".gsap-diff-section", start: "top 80%" },
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: "power3.out",
          clearProps: "transform,opacity"
        }
      )

      // Wireframe Cards Reveal
      gsap.fromTo(
        ".gsap-wireframe-card",
        { y: 25, opacity: 0 },
        {
          scrollTrigger: { trigger: ".gsap-dark-section", start: "top 78%" },
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: "power3.out",
          clearProps: "transform,opacity"
        }
      )

      // Pre-Footer CTA Banner Reveal
      gsap.fromTo(
        ".gsap-cta-banner",
        { y: 30, opacity: 0 },
        {
          scrollTrigger: { trigger: ".gsap-cta-section", start: "top 85%" },
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          clearProps: "transform,opacity"
        }
      )

      // Interactive 3D SVG Object Micro-floaters
      gsap.to(".gsap-float-tower", {
        y: -14,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })

      gsap.to(".gsap-float-inner-prism", {
        y: 8,
        duration: 2.3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })

      gsap.to(".gsap-float-orbit-ring", {
        y: -6,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })
    }, mainRef)

    return () => ctx.revert()
  }, [])

  const getLetters = (name) => {
    if (!name) return "U"
    return name.split(" ").filter(Boolean).map((n) => n[0]).join("").toUpperCase().slice(0, 2)
  }

  const handleLogout = async () => {
    try {
      await axios.get(`${ServerUrl}/api/auth/logout`, { withCredentials: true })
      dispatch(setUserData(null))
      dispatch(setAllUsers([]))
      dispatch(setAllComponents([]))
      navigate("/")
    } catch (error) {
      console.log(error)
    }
    setProfileOpen(false)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText("npm install morphyx-ui")
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
      ref={mainRef}
      className="min-h-screen bg-white text-[#1a1a1a] overflow-x-hidden selection:bg-black selection:text-white relative"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* =====================================================================
          1. ARCHITECTURAL HERO + DUAL-TIER HEADER
      ====================================================================== */}
      <header className="relative min-h-[640px] sm:min-h-[670px] lg:min-h-[730px] bg-[#0d0d0d] text-white flex flex-col justify-between overflow-hidden">
        
        {/* Dramatic Architectural Background */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          {/* 1. Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center grayscale contrast-135 opacity-70 scale-105"
            style={{ backgroundImage: `url('/new2.jpeg')` }}
          />

          {/* 2. Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-[#0d0d0d]" />

          {/* 3. Subtle Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:56px_56px]" /> 
        </div>

        {/* Top Navigation & Core Headers Container */}
        <div className="gsap-nav relative z-30 max-w-6xl w-full mx-auto px-4 sm:px-8 pt-5">
          
          {/* Tier 1: Brand & User Workspace Control Bar */}
          <div className="flex items-center justify-between pb-4 sm:pb-5 border-b border-white/10 gap-4">
            <div 
              onClick={() => navigate('/')} 
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/30 bg-white/5 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all shrink-0">
                <TbHexagonLetterM size={18} className="sm:size-5" />
              </div>
              <div className="min-w-0">
                <span 
                  className="text-base sm:text-lg lg:text-xl font-bold tracking-wider uppercase block leading-none text-white truncate"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  MorphyxUI
                </span>
                <span className="text-[9px] text-white/50 tracking-[1.5px] uppercase block mt-1 truncate">
                  Neural React Architecture
                </span>
              </div>
            </div>

            {/* Top Right Call-To-Actions */}
            <div className="flex items-center gap-2.5 sm:gap-4 lg:gap-8">
              
              {/* Desktop Only Inline Trays */}
              <div className="hidden md:flex items-center gap-8">
                <div 
                  onClick={handleCopy}
                  className="flex items-center gap-3 cursor-pointer group"
                  title="Click to copy install command"
                >
                  <div className="w-8 h-8 rounded-full border border-white/25 flex items-center justify-center text-white/70 group-hover:border-white group-hover:text-white transition-colors">
                    {copied ? <TbCheck size={14} className="text-emerald-400" /> : <TbTerminal2 size={14} />}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-mono font-semibold text-white tracking-wide flex items-center gap-1.5">
                      npm i morphyx-ui
                      <TbCopy size={11} className="text-white/45 group-hover:text-white transition-colors" />
                    </p>
                    <p className="text-[9px] text-white/40 uppercase tracking-wider">
                      {copied ? "Copied to clipboard!" : "v2.4 • Zero-Dependency"}
                    </p>
                  </div>
                </div>

                {userData ? (
                  <div className="relative">
                    <button
                      onClick={() => setProfileOpen(!profileOpen)}
                      className="flex items-center gap-2.5 bg-white/5 hover:bg-white/10 border border-white/15 px-3 py-1.5 rounded-full transition-all cursor-pointer select-none"
                    >
                      <div className="w-5.5 h-5.5 rounded-full bg-white text-black flex items-center justify-center text-[10px] font-bold">
                        {getLetters(userData.name)}
                      </div>
                      <div className="text-left pr-0.5">
                        <p className="text-xs font-semibold text-white leading-none max-w-[90px] truncate">{userData.name}</p>
                        <p className="text-[8px] text-white/50 uppercase tracking-wider mt-0.5">Workspace</p>
                      </div>
                    </button>

                    <AnimatePresence>
                      {profileOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.12 }}
                          className="absolute right-0 top-11 w-48 bg-[#141414] border border-white/15 shadow-2xl overflow-hidden z-50 rounded-none text-left"
                        >
                          <div className="px-3.5 py-2.5 border-b border-white/10 bg-white/[0.02]">
                            <p className="text-white font-semibold text-xs truncate">{userData.name}</p>
                            <p className="text-white/40 text-[10px] truncate mt-0.5">{userData.email}</p>
                          </div>
                          <div className="py-1">
                            <button
                              onClick={() => { setProfileOpen(false); navigate('/my-components'); }}
                              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[10px] uppercase tracking-wider text-white/75 hover:text-white hover:bg-white/5 transition-colors cursor-pointer bg-transparent border-none text-left font-mono"
                            >
                              <TbComponents size={14} /> My Saved UI
                            </button>
                            <button
                              onClick={() => { setProfileOpen(false); navigate('/generate'); }}
                              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[10px] uppercase tracking-wider text-white/75 hover:text-white hover:bg-white/5 transition-colors cursor-pointer bg-transparent border-none text-left font-mono"
                            >
                              <HiSparkles size={14} /> AI Studio
                            </button>
                          </div>
                          <div className="border-t border-white/10 py-1">
                            <button
                              onClick={handleLogout}
                              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[10px] uppercase tracking-wider text-rose-400 hover:bg-white/5 transition-colors cursor-pointer bg-transparent border-none text-left font-mono"
                            >
                              <TbLogout size={14} /> Logout
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div 
                    onClick={() => setShowAuth(true)}
                    className="flex items-center gap-2.5 cursor-pointer group"
                  >
                    <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 group-hover:bg-white group-hover:text-black transition-all">
                      <HiSparkles size={14} />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-semibold text-white uppercase tracking-wider group-hover:underline">
                        Sign In / Join
                      </p>
                      <p className="text-[9px] text-white/45 uppercase tracking-wider">
                        150 Free Credits
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Top-Right Premium Github Tracker */}
              <a
                href="https://github.com/cout-priyanshu/morphyxui"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/75 hover:text-white hover:border-white hover:bg-white/5 transition-all cursor-pointer shrink-0"
                title="View GitHub Repository"
              >
                <TbBrandGithub size={15} />
              </a>

              {/* Mobile Open Trigger Toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden text-white/80 hover:text-white bg-transparent border-none cursor-pointer flex items-center justify-center shrink-0 p-1"
                aria-label="Toggle Menu Drawer"
              >
                {menuOpen ? <TbX size={20} /> : <TbMenu2 size={20} />}
              </button>
            </div>
          </div>

          {/* Tier 2: Inline Desktop-Only Subnav */}
          <nav className="hidden md:flex items-center justify-between pt-3.5 text-left pb-1">
            {[
              { top: "HOME", sub: "Main Page", path: "/", active: true },
              { top: "COMPONENTS", sub: "UI Library", path: "/components" },
              { top: "AI ENGINE", sub: "Prompt to JSX", action: handleGenerateClick },
              { top: "DOCUMENTATION", sub: "Setup & Core", path: "/docs" },
              { top: "SANDBOX", sub: "Live Preview", scrollTo: "sandbox-section" },
              { top: "BENCHMARKS", sub: "Metrics & Specs", scrollTo: "features-section" },
              { top: "MY WORKSPACE", sub: userData ? "Saved UI" : "Authenticate", action: () => userData ? navigate('/my-components') : setShowAuth(true) },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (item.action) item.action()
                  else if (item.path) navigate(item.path)
                  else if (item.scrollTo) {
                    document.getElementById(item.scrollTo)?.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className={`group bg-transparent border-none cursor-pointer pb-2 border-b-2 transition-all text-left ${
                  item.active ? "border-white" : "border-transparent hover:border-white/35"
                }`}
              >
                <span className="block text-[10px] font-bold tracking-[1.5px] text-white uppercase">
                  {item.top}
                </span>
                <span className="block text-[9px] text-white/40 group-hover:text-white/60 transition-colors mt-0.5">
                  {item.sub}
                </span>
              </button>
            ))}
          </nav>

          {/* Center Hero Title & Dynamic Spacers */}
          <div className="relative z-20 max-w-4xl mx-auto px-4 text-center my-auto pt-16 pb-28 md:pb-32">
            <p className="gsap-hero-text text-[10px] sm:text-xs tracking-[5px] sm:tracking-[7px] uppercase text-white/60 font-light mb-3">
              PROMPT ANY INTERFACE
            </p>

            <h1 
              className="gsap-hero-text text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase leading-[1.1] mb-6 md:mb-8"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              <span className="text-white drop-shadow-[0_4px_16px_rgba(255,255,255,0.12)] block sm:inline">
                SHIP CLEAN{" "}
              </span>
              <span className="relative inline-block mt-1 sm:mt-0">
                <span 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 via-neutral-400 to-neutral-600"
                  style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}
                >
                  REACT UIs
                </span>
                <span className="block h-[1.5px] w-full bg-gradient-to-r from-white/70 via-white/20 to-transparent mt-0.5 md:mt-1" />
              </span>
            </h1>
          </div>

          {/* Generate Action Button (Clearly Visible Medium-Dark) */}
         <div className="gsap-hero-text flex flex-wrap items-center justify-center gap-3.5">
           <button
            onClick={handleGenerateClick}
            className="px-5 py-2 sm:py-2.5 rounded-full bg-neutral-700 hover:bg-neutral-600 text-white border border-white/40 hover:border-white/70 font-semibold text-[11px] sm:text-xs tracking-wider uppercase transition-all shadow-[0_8px_20px_rgba(0,0,0,0.6)] cursor-pointer"
           >
            GENERATE ?
           </button>
         </div>
           </div>
     </header>

      {/* =====================================================================
          2. OVERLAPPING 5-COLUMN INTERACTIVE SERVICE STRIP
          (AUTO-SWIPE & HORIZONTAL SCROLL ON SMALL MOBILE SCREENS)
      ====================================================================== */}
      <section 
        id="sandbox-section" 
        className="gsap-strip-wrapper relative z-20 max-w-5xl mx-auto px-4 sm:px-6 -mt-14 md:-mt-20"
        onMouseEnter={() => setStripPaused(true)}
        onMouseLeave={() => setStripPaused(false)}
      >
        <div className="bg-white shadow-[0_20px_60px_rgba(0,0,0,0.14)] flex md:grid md:grid-cols-5 items-stretch border border-neutral-200 overflow-x-auto snap-x snap-mandatory scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {heroPillars.map((pillar) => {
            const Icon = pillar.icon
            const isActive = activeTab === pillar.id
            return (
              <div
                key={pillar.id}
                onClick={() => setActiveTab(pillar.id)}
                className={`group relative flex flex-col items-center justify-center text-center px-4 py-6 md:py-8 cursor-pointer select-none transition-all duration-300 snap-center shrink-0 w-[150px] md:w-auto ${
                  isActive
                    ? "bg-[#333333] text-white md:-translate-y-2 z-10 shadow-[0_15px_30px_rgba(0,0,0,0.25)] border-b-2 border-white md:border-b-0"
                    : "bg-white text-[#222] hover:bg-neutral-50 border-r border-neutral-200/80 last:border-r-0"
                }`}
              >
                {/* Visual Action Banner Bar */}
                <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden bg-transparent">
                  {isActive && (
                    <motion.div
                      key={pillar.id}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2.6, ease: "linear" }}
                      className="h-full bg-white"
                    />
                  )}
                </div>

                <span className={`text-[8px] sm:text-[9px] font-mono tracking-widest mb-1.5 ${
                  isActive ? "text-white/70" : "text-neutral-400"
                }`}>
                  {pillar.code}
                </span>

                <Icon 
                  size={24} 
                  strokeWidth={1.3}
                  className={`mb-2 transition-transform duration-300 group-hover:scale-105 ${
                    isActive ? "text-white animate-pulse" : "text-neutral-500"
                  }`} 
                />
                
                <h3 className={`text-[10px] font-bold tracking-[1px] uppercase ${
                  isActive ? "text-white" : "text-neutral-800"
                }`}>
                  {pillar.title}
                </h3>
                
                <p className={`text-[9px] mt-0.5 font-mono ${
                  isActive ? "text-white/80" : "text-neutral-400"
                }`}>
                  {pillar.sub}
                </p>

                {/* Tactile Toggle Trigger */}
                <div className="h-6 flex items-center justify-center mt-2.5">
                  {isActive ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleGenerateClick()
                      }}
                      title="Launch Prompt Workspace"
                      className="w-5.5 h-5.5 rounded-full bg-white text-[#111] flex items-center justify-center shadow hover:scale-110 transition-transform cursor-pointer border-none"
                    >
                      <TbChevronRight size={13} />
                    </button>
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-200 group-hover:bg-neutral-400 transition-colors" />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* =====================================================================
          3. "WHY CHOOSE US?" (TIMELINE + COMPACT PLAYBACK CONTROLS & CODE)
      ====================================================================== */}
      <section className="gsap-why-section max-w-5xl mx-auto px-4 sm:px-6 pt-16 md:pt-24 pb-14 md:pb-20">
        
        {/* Row Title */}
        <div className="gsap-why-header text-center mb-8 md:mb-14">
          <h2 
            className="text-2xl sm:text-3xl font-bold text-[#222] tracking-tight uppercase"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Why Choose MorphyxUI?
          </h2>

          {/* Timeline Stack Navigation Component */}
          <div className="max-w-xl mx-auto mt-6 md:mt-10 relative">
            <div className="hidden md:block absolute left-[16%] right-[16%] bottom-[5px] h-[1px] bg-neutral-200 z-0" />

            <div className="grid grid-cols-3 gap-2 sm:gap-4 relative z-10">
              {whyTabs.map((tab, idx) => {
                const isSelected = activeWhy === idx
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveWhy(idx)}
                    className="flex flex-col items-center bg-transparent border-none cursor-pointer group px-1 py-1 text-center"
                  >
                    <span className={`text-[9px] sm:text-[10.5px] leading-tight transition-colors truncate w-full ${
                      isSelected ? "font-bold text-[#111]" : "font-normal text-neutral-400 group-hover:text-neutral-600"
                    }`}>
                      {tab.labelTop}
                    </span>
                    <span className={`text-[9px] sm:text-[10.5px] leading-tight mb-2 sm:mb-3 transition-colors truncate w-full ${
                      isSelected ? "font-bold text-[#111]" : "font-normal text-neutral-400 group-hover:text-neutral-600"
                    }`}>
                      {tab.labelBottom}
                    </span>

                    <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all ${
                      isSelected 
                        ? "bg-black ring-2 sm:ring-4 ring-neutral-200 scale-105" 
                        : "bg-neutral-300 group-hover:bg-neutral-400"
                    }`} />
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Dynamic Sandbox Display Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center mt-8 sm:mt-12">
          
          {/* Overlapping Showcase Blueprint Box */}
          <div className="lg:col-span-6 relative pl-0 sm:pl-8 pt-0 sm:pt-6 pb-2 text-left">
            <div className="hidden sm:block gsap-stacked-card absolute left-0 top-12 bottom-6 w-[85%] bg-[#1f1f1f] rounded-none shadow-lg" />
            <div className="hidden sm:block gsap-stacked-card absolute left-4 sm:left-5 top-0 w-[75%] h-48 bg-[#999999] rounded-none shadow-md" />

            <div className="gsap-stacked-card relative z-10 bg-[#141414] text-white p-4.5 sm:p-6 rounded-none shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-neutral-800 w-full overflow-hidden">
              <div className="flex flex-wrap items-center justify-between pb-3 mb-4 border-b border-white/10 gap-2">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="w-2 h-2 rounded-full bg-white/25" />
                  <span className="w-2 h-2 rounded-full bg-white/45" />
                  <span className="w-2 h-2 rounded-full bg-white/70" />
                  <span className="ml-1 sm:ml-2 text-[10px] font-mono text-white/50">
                    DashboardView.jsx
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#0a0a0a] border border-white/10 p-0.5">
                  {['button', 'card', 'badge'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setActiveTab(t)}
                      className={`px-1.5 py-0.5 text-[8.5px] font-mono uppercase tracking-wider cursor-pointer border transition-colors rounded-none ${
                        activeTab === t 
                          ? "bg-white text-black border-white font-bold" 
                          : "bg-transparent text-white/50 border-transparent hover:text-white"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Render Canvas Wrapper */}
              <div className="bg-[#0a0a0a] border border-white/10 p-3 sm:p-4 mb-3.5 min-h-[95px] sm:min-h-[115px] flex items-center justify-center">
                {(activeTab === 'button' || activeTab === 'ai' || activeTab === 'export') && (
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <button 
                      onClick={handleGenerateClick}
                      className="px-3.5 py-1.5 bg-white text-black text-[10px] font-bold uppercase tracking-wider cursor-pointer border-none hover:bg-neutral-200 transition-colors rounded-none"
                    >
                      Deploy Interface
                    </button>
                    <button 
                      onClick={() => navigate('/components')}
                      className="px-3.5 py-1.5 bg-transparent border border-white/35 text-white text-[10px] font-medium uppercase tracking-wider cursor-pointer hover:border-white transition-all rounded-none"
                    >
                      Frosted Outline
                    </button>
                  </div>
                )}
                {activeTab === 'card' && (
                  <div className="w-full max-w-xs p-3 bg-white/[0.02] border border-white/15 text-left rounded-none">
                    <div className="flex items-center justify-between mb-1 gap-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white truncate">Architectural Surface</span>
                      <HiSparkles size={11} className="text-white/60 shrink-0" />
                    </div>
                    <p className="text-[9.5px] text-white/50 leading-relaxed font-mono">
                      Zero harsh glow, crisp 1px borders engineered for modern dashboard grids.
                    </p>
                  </div>
                )}
                {activeTab === 'badge' && (
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    <span className="px-2.5 py-0.5 text-[8px] font-mono uppercase tracking-wider bg-white text-black font-semibold rounded-none">
                      Production Ready
                    </span>
                    <span className="px-2.5 py-0.5 text-[8px] font-mono uppercase tracking-wider bg-white/10 text-white border border-white/15 rounded-none">
                      Ultra Fast 0.2kb
                    </span>
                    <span className="px-2.5 py-0.5 text-[8px] font-mono uppercase tracking-wider bg-transparent text-white/50 border border-white/10 rounded-none">
                      React 19 Core
                    </span>
                  </div>
                )}
              </div>

              {/* Sample Telemetry Markup Block */}
              <div className="font-mono text-[9px] sm:text-[10px] leading-relaxed text-white/60 space-y-0.5 select-none text-left overflow-x-auto">
                <p className="truncate">
                  <span className="text-white font-semibold">import</span> {"{ GlassCard, Button }"} <span className="text-white font-semibold">from</span> <span className="text-white/95">'morphyx-ui'</span>;
                </p>
                <p className="text-white/45 truncate">
                  {"<GlassCard blur=\"xl\">"}
                </p>
                <p className="pl-3.5 text-white/80 truncate">
                  {"<Button variant=\"solid\">Deploy</Button>"}
                </p>
                <p className="text-white/45 truncate">
                  {"</GlassCard>"}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column Content Panel */}
          <div className="gsap-why-copy lg:col-span-6 space-y-4 md:space-y-5 text-left">
            <p className="text-xs sm:text-[13px] text-neutral-500 leading-relaxed">
              {whyTabs[activeWhy].lead}
            </p>
            <p className="text-xs sm:text-[13px] text-neutral-400 leading-relaxed">
              {whyTabs[activeWhy].sub}
            </p>

            {/* Micro Benchmark Stats */}
            <div className="pt-4 border-t border-neutral-200 grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
              {[
                { metric: "10x", label: "Dev Speed" },
                { metric: "99.8%", label: "Accuracy" },
                { metric: "0kb", label: "Runtime size" },
                { metric: "150+", label: "Dynamic specs" },
              ].map((stat, i) => (
                <div key={i} className="min-w-0">
                  <span 
                    className="text-base sm:text-lg font-bold text-[#111] block leading-tight"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {stat.metric}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-neutral-400 block truncate mt-0.5">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* =====================================================================
          4. "UI ENGINE WITH A DIFFERENCE. INNOVATION."
      ====================================================================== */}
      <section className="gsap-diff-section bg-[#f5f5f5] py-14 sm:py-20 lg:py-24 border-t border-b border-neutral-300/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          
          {/* Top Section Header Telemetry */}
          <div className="flex items-center justify-between pb-3.5 mb-6 md:mb-8 border-b border-neutral-300 text-[9px] sm:text-[10px] font-mono uppercase tracking-[2px] text-neutral-500 gap-4">
            <span className="flex items-center gap-1.5 truncate">
              <span className="w-1.5 h-1.5 bg-black inline-block rounded-none" />
              SPEC.04 // EDITORIAL PARADIGM & ARCHITECTURE
            </span>
            <span className="hidden sm:inline shrink-0">ENGINE CORE // STABLE RELEASE</span>
          </div>

          {/* Asymmetric Multi-grid Section Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-stretch">
            
            {/* Left Blueprint Box */}
            <div className="gsap-diff-item lg:col-span-4 bg-white border border-neutral-300 p-5 sm:p-7 flex flex-col justify-between rounded-none shadow-[0_10px_30px_rgba(0,0,0,0.03)] relative text-left">
              <span className="absolute top-2 left-2 text-neutral-300 font-mono text-[8px] sm:text-[9px] select-none">+ MANIFESTO</span>
              <span className="absolute top-2 right-2 text-neutral-300 font-mono text-[8px] sm:text-[9px] select-none">v2.4</span>

              <div>
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[2px] text-neutral-400 block mb-2 mt-2">
                  01 // PHILOSOPHY
                </span>

                <h2 
                  className="text-xl sm:text-2xl lg:text-[28px] font-extrabold text-[#111] leading-[1.12] tracking-tight uppercase mb-4"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  React UI Engine <br className="hidden sm:inline" />
                  <span className="text-neutral-400 font-light">With a Difference.</span> <br className="hidden sm:inline" />
                  Innovation.
                </h2>

                <div className="border-l border-black pl-3 my-4">
                  <p className="text-xs text-neutral-500 leading-relaxed font-normal">
                    Production-grade JSX components effortlessly prompt karo. Minimal setup, zero clutter, and modern aesthetics jo frontend workflow ko speed boost deta hai.
                  </p>
                </div>

                <div className="py-3.5 border-y border-neutral-150 space-y-2 text-[9.5px] sm:text-[10px] font-mono text-neutral-500">
                  <div className="flex items-center justify-between">
                    <span>PARADIGM</span>
                    <span className="font-bold text-black uppercase">Zero-Runtime</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>FOUNDATION</span>
                    <span className="font-bold text-black uppercase">TailwindCSS 3.4+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>ACCESSIBILITY</span>
                    <span className="font-bold text-black uppercase">WAI-ARIA Spec</span>
                  </div>
                </div>
              </div>

              {/* Founder Signoff Card stamp */}
              <div className="pt-4 mt-5 border-t border-neutral-200 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[1px] text-[#111]">
                    PRIYANSHU GUPTA
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-neutral-400 font-mono mt-0.5">
                    Lead Architect, MorphyxUI
                  </p>
                </div>
                <div className="w-6.5 h-6.5 border border-neutral-300 bg-neutral-50 flex items-center justify-center text-[9px] font-mono font-bold text-black shrink-0">
                  PG
                </div>
              </div>
            </div>

            {/* Right Side Adaptive Image-Text Display Section Grid */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 items-stretch">
              
              {/* Card 1 */}
              <div className="gsap-diff-item group bg-white border border-neutral-350 hover:border-black p-4 sm:p-6 flex flex-col justify-between transition-all duration-300 rounded-none shadow-[0_10px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] relative text-left">
                <span className="absolute top-2 left-2 text-neutral-300 font-mono text-[8px] sm:text-[9px] select-none">+ VIEWPORT.01</span>
                
                <div>
                  <div className="flex items-center justify-between mb-3 mt-2.5">
                    <span className="text-[8.5px] sm:text-[9.5px] font-mono font-bold tracking-[1.5px] uppercase bg-black text-white px-2 py-0.5 rounded-none">
                      02 // ARCHITECTURE
                    </span>
                    <span className="text-[9px] font-mono text-neutral-400">CLI & NPM</span>
                  </div>

                  <div className="relative h-40 sm:h-44 w-full overflow-hidden bg-black border border-neutral-200 mb-4.5 rounded-none">
                    <img 
                      src="/img1.jpeg" 
                      alt="Code Architecture"
                      className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-102 group-hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    <span className="absolute bottom-2 left-2 text-[8px] font-mono text-white/85 bg-black/70 px-2 py-0.5 rounded-none">
                      MORPHYX.CLI // SETUP
                    </span>
                  </div>

                  <h3 
                    className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#111] mb-2"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    Inside The Architecture
                  </h3>

                  <p className="text-[11px] sm:text-xs text-neutral-500 leading-relaxed mb-5.5">
                    Lightweight command install (<code className="font-mono text-[10px] bg-neutral-100 px-1 py-0.5 border border-neutral-200">npm i morphyx-ui</code>) running on VirtualUI architecture parameters cleanly.
                  </p>
                </div>

                <div 
                  onClick={() => navigate('/docs')}
                  className="pt-3 border-t border-neutral-200 flex items-center justify-between cursor-pointer group/btn"
                >
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500 group-hover/btn:text-black transition-colors">
                    EXPLORE DOCUMENTATION →
                  </span>
                  <div className="w-7 h-7 bg-neutral-900 group-hover:bg-black text-white flex items-center justify-center transition-transform group-hover/btn:translate-x-0.5 rounded-none shrink-0">
                    <TbChevronRight size={13} />
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="gsap-diff-item group bg-white border border-neutral-350 hover:border-black p-4 sm:p-6 flex flex-col justify-between transition-all duration-300 rounded-none shadow-[0_10px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] relative text-left">
                <span className="absolute top-2 left-2 text-neutral-300 font-mono text-[8px] sm:text-[9px] select-none">+ VIEWPORT.02</span>

                <div>
                  <div className="flex items-center justify-between mb-3 mt-2.5">
                    <span className="text-[8.5px] sm:text-[9.5px] font-mono font-bold tracking-[1.5px] uppercase bg-black text-white px-2 py-0.5 rounded-none">
                      03 // WORKFLOW
                    </span>
                    <span className="text-[9px] font-mono text-neutral-400">PROMPT ENGINE</span>
                  </div>

                  <div className="relative h-40 sm:h-44 w-full overflow-hidden bg-black border border-neutral-200 mb-4.5 rounded-none">
                    <img 
                      src="/img2.jpeg" 
                      alt="Neural Engine"
                      className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-102 group-hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    <span className="absolute bottom-2 left-2 text-[8px] font-mono text-white/85 bg-black/70 px-2 py-0.5 rounded-none">
                      SYNTHESIS // LIVE PROPS
                    </span>
                  </div>

                  <h3 
                    className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#111] mb-2"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    Workflow Redefined
                  </h3>

                  <p className="text-[11px] sm:text-xs text-neutral-500 leading-relaxed mb-5.5">
                    Interactive sliders se variant aur status settings check karo aur direct cleanly readable core codebase export trigger karo.
                  </p>
                </div>

                <div 
                  onClick={handleGenerateClick}
                  className="pt-3 border-t border-neutral-200 flex items-center justify-between cursor-pointer group/btn"
                >
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500 group-hover/btn:text-black transition-colors">
                    LAUNCH AI GENERATOR →
                  </span>
                  <div className="w-7 h-7 bg-neutral-900 group-hover:bg-black text-white flex items-center justify-center transition-transform group-hover/btn:translate-x-0.5 rounded-none shrink-0">
                    <TbChevronRight size={13} />
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================================
          5. "UNMATCHED SERVICES. UNMATCHED EXCELLENCE." (DARK WIREFRAME GRID)
      ====================================================================== */}
      <section 
        id="features-section" 
        className="gsap-dark-section relative bg-gradient-to-b from-[#1b1b1b] via-[#161616] to-[#0e0e0e] text-white pt-16 md:pt-24 pb-14 md:pb-20 overflow-hidden"
      >
        <div className="absolute -right-24 -bottom-24 text-white/[0.03] pointer-events-none select-none">
          <TbWorld size={400} strokeWidth={0.5} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
            
            <div className="gsap-wireframe-card flex flex-col justify-between p-2 text-left">
              <div>
                <h2 
                  className="text-2xl sm:text-3xl font-bold text-white leading-tight uppercase"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Unmatched <br />
                  Components. <br />
                  Unmatched <br />
                  Velocity.
                </h2>
                <p className="text-xs text-white/45 mt-2.5 max-w-[200px] leading-relaxed">
                  From custom prompting straight into production.
                </p>
              </div>

              <div className="flex items-center justify-between mt-6 md:mt-8 pt-4 border-t border-white/5">
                <span className="text-[9px] font-mono uppercase tracking-widest text-white/40 truncate">
                  {userData ? `User: ${userData.name}` : "150 Free credits"}
                </span>
                <button
                  onClick={handleGenerateClick}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-[#111] hover:scale-105 transition-transform flex items-center justify-center cursor-pointer border-none shadow-lg shrink-0"
                  title="Generate UI Components"
                >
                  <TbChevronRight size={15} />
                </button>
              </div>
            </div>

            {darkFeatures.map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={idx}
                  onClick={() => navigate('/components')}
                  className="gsap-wireframe-card group relative border border-white/15 hover:border-white/50 p-6 pt-8 transition-colors cursor-pointer bg-[#181818]/45 text-left rounded-none"
                >
                  <div className="absolute -top-4.5 left-4 sm:left-5 bg-[#171717] px-2 text-white/80 group-hover:text-white transition-colors">
                    <Icon size={24} strokeWidth={1.2} />
                  </div>

                  <h3 className="text-xs font-bold uppercase tracking-[1px] text-white mb-2 font-mono pt-1">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-white/45 leading-[1.7] group-hover:text-white/70 transition-colors">
                    {item.text}
                  </p>
                </div>
              )
            })}

          </div>
        </div>
      </section>

      {/* =====================================================================
          6. "WANT TO CREATE SOMETHING CRAZY?" (PRE-FOOTER BANNER & 3D QUANTUM)
      ====================================================================== */}
      <section className="gsap-cta-section relative bg-gradient-to-b from-[#0e0e0e] to-[#0a0a0a] py-14 sm:py-20 lg:py-24 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:56px_56px] pointer-events-none" />

        <div className="gsap-cta-banner relative z-10 max-w-5xl mx-auto border border-white/15 bg-[#111111]/90 backdrop-blur-md shadow-[0_20px_55px_rgba(0,0,0,0.8)] rounded-none overflow-hidden">
          
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 bg-white/[0.02] text-[9px] sm:text-[10px] font-mono uppercase tracking-[1.5px] sm:tracking-[2px] text-white/45 gap-2">
            <span className="flex items-center gap-1.5 truncate">
              <span className="w-1.5 h-1.5 bg-white inline-block shrink-0" />
              MORPHYX.CORE // SYNTHESIS ENGINE
            </span>
            <span className="hidden sm:inline shrink-0">ORIENTATION: TILTED // 60FPS</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/10 text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 border border-white/15 bg-white/[0.02] text-[9.5px] font-mono uppercase tracking-widest text-white/60 mb-4 sm:mb-5">
                <HiSparkles size={11} /> High-Velocity Workspace
              </div>

              <h2
                className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold text-white tracking-tight uppercase leading-[1.1] mb-4"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Want to create <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-neutral-500">
                  something crazy?
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-white/55 leading-relaxed max-w-md mb-6 sm:mb-8 font-normal">
                Drop heavy bloat frameworks. Customize properties live inside our interactive sandbox and drop components directly into your React directories.
              </p>

              <div className="flex flex-wrap items-stretch gap-3">
                <button
                  onClick={() => navigate('/components')}
                  className="group flex items-center gap-2.5 px-5.5 py-3.5 bg-white hover:bg-neutral-200 text-[#0a0a0a] font-bold text-xs uppercase tracking-[1px] transition-all cursor-pointer border-none rounded-none shrink-0"
                >
                  <span>Explore blocks</span>
                  <TbArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  onClick={handleGenerateClick}
                  className="px-5 py-3.5 bg-[#1a1a1a] hover:bg-white/10 text-white font-mono text-xs uppercase tracking-wider border border-white/15 hover:border-white transition-colors cursor-pointer rounded-none"
                >
                  Launch AI Studio →
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 flex items-center justify-center relative min-h-[250px] sm:min-h-[300px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_65%)]">
              <span className="absolute top-2.5 left-2.5 text-white/20 font-mono text-xs select-none">+</span>
              <span className="absolute top-2.5 right-2.5 text-white/20 font-mono text-xs select-none">+</span>
              <span className="absolute bottom-2.5 left-2.5 text-white/20 font-mono text-xs select-none">+</span>
              <span className="absolute bottom-2.5 right-2.5 text-white/20 font-mono text-xs select-none">+</span>

              <div className="relative w-48 h-48 sm:w-60 sm:h-60 flex items-center justify-center select-none overflow-hidden scale-90 sm:scale-100">
                <div className="gsap-float-tower w-full h-full flex items-center justify-center">
                  <svg
                    viewBox="0 0 340 340"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full overflow-visible shrink-0"
                  >
                    <line
                      x1="170"
                      y1="18"
                      x2="170"
                      y2="322"
                      stroke="#ffffff"
                      strokeOpacity="0.16"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />

                    <g className="gsap-float-orbit-ring" transform="rotate(-16 170 170)">
                      <ellipse
                        cx="170"
                        cy="170"
                        rx="128"
                        ry="44"
                        stroke="#ffffff"
                        strokeOpacity="0.25"
                        strokeWidth="1.2"
                        strokeDasharray="6 4"
                      />
                      <ellipse
                        cx="170"
                        cy="170"
                        rx="102"
                        ry="34"
                        stroke="#ffffff"
                        strokeOpacity="0.45"
                        strokeWidth="1.5"
                      />
                      <rect x="38" y="166" width="7" height="7" fill="#ffffff" />
                      <rect x="294" y="166" width="5" height="5" fill="#111111" stroke="#ffffff" strokeWidth="1.2" />
                    </g>

                    <g transform="translate(0, 42)">
                      <polygon
                        points="170,175 235,198 170,222 105,198"
                        fill="#161616"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      />
                      <polygon
                        points="105,198 105,228 170,252 170,222"
                        fill="#0d0d0d"
                        stroke="#ffffff"
                        strokeWidth="1.2"
                      />
                      <polygon
                        points="235,198 235,228 170,252 170,222"
                        fill="#242424"
                        stroke="#ffffff"
                        strokeWidth="1.2"
                      />
                    </g>

                    <g className="gsap-float-inner-prism">
                      <polygon
                        points="115,132 115,188 170,214 170,158"
                        fill="#1b1b1b"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      />
                      <polygon
                        points="225,132 225,188 170,214 170,158"
                        fill="#333333"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      />
                      <polygon
                        points="170,106 225,132 170,158 115,132"
                        fill="#525252"
                        stroke="#ffffff"
                        strokeWidth="1.8"
                      />
                      <polygon
                        points="170,118 205,134 170,150 135,134"
                        fill="#111111"
                        stroke="#ffffff"
                        strokeWidth="1.2"
                      />
                      <line x1="130" y1="152" x2="130" y2="178" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.5" />
                      <line x1="140" y1="157" x2="140" y2="183" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.5" />
                    </g>

                    <g transform="translate(0, -14)">
                      <polygon
                        points="170,42 136,82 170,98"
                        fill="#ffffff"
                        fillOpacity="0.8"
                        stroke="#ffffff"
                        strokeWidth="1.2"
                      />
                      <polygon
                        points="170,42 204,82 170,98"
                        fill="#262626"
                        stroke="#ffffff"
                        strokeWidth="1.2"
                      />
                      <rect x="166" y="22" width="7" height="7" transform="rotate(45 170 26)" fill="#ffffff" />
                    </g>
                  </svg>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================================
          7. ARCHITECTURAL PITCH-BLACK 4-COLUMN FOOTER
      ====================================================================== */}
      <footer className="bg-[#0a0a0a] text-white py-14 sm:py-16 border-t border-white/10 select-none">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-y-10 gap-x-6 pb-10 border-b border-white/10 text-left">
            
            {/* Section 1: Logo Stamp */}
            <div className="lg:col-span-4 space-y-3.5">
              <div 
                onClick={() => navigate('/')} 
                className="flex items-center gap-2.5 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white shrink-0">
                  <TbHexagonLetterM size={18} />
                </div>
                <div>
                  <span 
                    className="text-base font-bold tracking-wider uppercase block leading-none text-white"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    MorphyxUI
                  </span>
                  <span className="text-[9px] text-white/40 tracking-[1.5px] uppercase block mt-1">
                    React Component Engine
                  </span>
                </div>
              </div>

              <p className="text-[10.5px] sm:text-[11px] text-white/40 leading-[1.8] pr-2">
                Production-grade JSX components effortlessly prompt karo. Minimal setup, zero clutter, with pure fast architecture.
              </p>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => navigate('/components')}
                  className="w-6.5 h-6.5 border border-white/15 hover:border-white text-white/50 hover:text-white flex items-center justify-center bg-transparent cursor-pointer transition-colors rounded-none"
                  title="UI Components"
                >
                  <TbComponents size={12} />
                </button>
                <button
                  onClick={() => navigate('/docs')}
                  className="w-6.5 h-6.5 border border-white/15 hover:border-white text-white/50 hover:text-white flex items-center justify-center bg-transparent cursor-pointer transition-colors rounded-none"
                  title="Specs"
                >
                  <TbCode size={12} />
                </button>
                <button
                  onClick={handleCopy}
                  className="w-6.5 h-6.5 border border-white/15 hover:border-white text-white/50 hover:text-white flex items-center justify-center bg-transparent cursor-pointer transition-colors rounded-none"
                  title="Copy core install utility"
                >
                  {copied ? <TbCheck size={11} /> : <TbBrandNpm size={12} />}
                </button>
              </div>
            </div>

            {/* Section 2 */}
            <div className="lg:col-span-2 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
                Architecture
              </h4>
              <ul className="space-y-2 text-[10px] sm:text-[11px] text-white/50 list-none p-0 m-0">
                <li onClick={() => navigate('/components')} className="hover:text-white cursor-pointer flex items-center gap-1">
                  <span>›</span> Prebuilt UI
                </li>
                <li onClick={handleGenerateClick} className="hover:text-white cursor-pointer flex items-center gap-1">
                  <span>›</span> Neural AI Engine
                </li>
                <li onClick={() => navigate('/components')} className="hover:text-white cursor-pointer flex items-center gap-1">
                  <span>›</span> Prop Sandbox
                </li>
                <li onClick={() => navigate('/docs')} className="hover:text-white cursor-pointer flex items-center gap-1">
                  <span>›</span> Modular NPM
                </li>
                <li onClick={() => navigate('/docs')} className="hover:text-white cursor-pointer flex items-center gap-1">
                  <span>›</span> JSX Export
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="lg:col-span-2 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
                Outlook
              </h4>
              <ul className="space-y-2 text-[10px] sm:text-[11px] text-white/50 list-none p-0 m-0">
                <li onClick={() => navigate('/docs')} className="hover:text-white cursor-pointer flex items-center gap-1">
                  <span>›</span> Documentation
                </li>
                <li onClick={handleGenerateClick} className="hover:text-white cursor-pointer flex items-center gap-1">
                  <span>›</span> Generate JSX
                </li>
                {userData ? (
                  <>
                    <li onClick={() => navigate('/my-components')} className="hover:text-white cursor-pointer flex items-center gap-1">
                      <span>›</span> My Saved UIs
                    </li>
                    <li onClick={handleLogout} className="hover:text-rose-400 cursor-pointer flex items-center gap-1">
                      <span>›</span> Logout
                    </li>
                  </>
                ) : (
                  <li onClick={() => setShowAuth(true)} className="hover:text-white cursor-pointer flex items-center gap-1">
                    <span>›</span> Claim Workspace
                  </li>
                )}
                <li className="text-white/30 flex items-center gap-1 pt-1 break-all truncate">
                  <span>›</span> support@morphyx.com
                </li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="lg:col-span-4 space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-1">
                {userData ? `Operator Active` : "Local Sync Core"}
              </h4>
              <p className="text-[10px] sm:text-[11px] text-white/45 leading-relaxed font-mono">
                {userData 
                  ? `Active profile verification completed under ${userData.name}. Access all dynamic sandboxes.` 
                  : "Sync components directly with our dynamic JSX CLI packages without bundle overheads."}
              </p>

              <div className="flex items-stretch pt-1">
                <div 
                  onClick={handleCopy}
                  className="bg-white text-[#111] px-3 py-2.5 text-[10px] font-mono flex-1 flex items-center justify-between cursor-pointer select-all truncate rounded-none"
                >
                  <span className="truncate">npm i morphyx-ui</span>
                  <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-bold ml-2">
                    {copied ? "copied" : "copy"}
                  </span>
                </div>
                <button
                  onClick={handleGenerateClick}
                  className="bg-neutral-800 hover:bg-neutral-700 text-white px-3.5 flex items-center justify-center transition-colors cursor-pointer border-none rounded-none shrink-0"
                  title="Studio"
                >
                  <TbArrowRight size={14} />
                </button>
              </div>
            </div>

          </div>

          {/* Bottom attribution labels */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[9.5px] sm:text-[11px] text-white/30 gap-4 text-center sm:text-left">
            <p>© {new Date().getFullYear()} MorphyxUI Engine. All specs initialized securely.</p>
            <p className="font-mono text-[9px] uppercase tracking-[2px]">
              Designed for Zero-Friction React Shipping
            </p>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          MOBILE DRAWER OVERLAY (ROOT-LEVEL: Z-[70] & Z-[80] FOR PROPER STACKING)
      ====================================================================== */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-xs md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 38 }}
              className="fixed top-0 right-0 bottom-0 z-[80] w-[270px] sm:w-[320px] bg-[#0f0f0f] border-l border-white/10 p-6 flex flex-col justify-between overflow-y-auto md:hidden text-left shadow-2xl"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="text-xs font-mono tracking-widest text-white/50 uppercase">NAVIGATION</span>
                  <button 
                    onClick={() => setMenuOpen(false)} 
                    className="text-white/65 hover:text-white p-1 border border-white/10 bg-transparent cursor-pointer"
                  >
                    <TbX size={15} />
                  </button>
                </div>

                <div className="flex flex-col gap-3 font-mono">
                  {[
                    { label: "COMPONENTS LIBRARY", path: "/components" },
                    { label: "AI JSX GENERATOR", action: handleGenerateClick },
                    { label: "DOCUMENTATION", path: "/docs" },
                    { label: "PRICING PLANS", path: "/pricing" }
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setMenuOpen(false)
                        if (item.action) item.action()
                        else if (item.path) navigate(item.path)
                      }}
                      className="text-left py-2.5 px-3 bg-white/[0.02] hover:bg-white/10 text-xs font-bold uppercase tracking-wider text-white/80 hover:text-white transition-all border border-white/5 hover:border-white/20 rounded-none cursor-pointer"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-4 space-y-3.5 text-left">
                  <span className="text-[10px] font-mono text-white/35 uppercase tracking-wider block">Local Registry Setup</span>
                  <div className="flex items-center justify-between bg-white/[0.02] border border-white/10 px-3 py-2.5">
                    <span className="text-[11px] font-mono text-white/60 truncate">npm i morphyx-ui</span>
                    <button
                      onClick={handleCopy}
                      className="text-[10px] font-bold uppercase font-mono bg-white text-black px-2 py-0.5 rounded-none cursor-pointer border-none shrink-0 ml-2"
                    >
                      {copied ? "COPIED" : "COPY"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 mt-8 text-left">
                {userData ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6.5 h-6.5 bg-white text-black text-xs font-bold flex items-center justify-center shrink-0">
                        {getLetters(userData.name)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white truncate">{userData.name}</p>
                        <p className="text-[9px] text-white/40 font-mono truncate">{userData.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => { setMenuOpen(false); navigate('/my-components'); }}
                      className="w-full text-center py-2 bg-white/5 border border-white/15 text-[10px] font-bold uppercase text-white/95 hover:bg-white/10 transition-all rounded-none cursor-pointer font-mono"
                    >
                      WORKSPACE
                    </button>
                    <button
                      onClick={() => { handleLogout(); setMenuOpen(false); }}
                      className="w-full text-center py-2 bg-transparent text-rose-400 border border-rose-500/20 text-[10px] font-bold uppercase hover:bg-rose-950/20 hover:border-rose-500/40 transition-all rounded-none cursor-pointer font-mono"
                    >
                      LOGOUT
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { setShowAuth(true); setMenuOpen(false); }}
                    className="w-full bg-white hover:bg-neutral-200 text-black py-3 text-xs font-bold uppercase tracking-widest border-none cursor-pointer rounded-none font-mono flex items-center justify-center gap-1.5"
                  >
                    <HiSparkles size={14} /> SIGN IN / CLAIM CREDITS
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Auth Gate Drawer overlay */}
      {showAuth && <Auth onClose={() => setShowAuth(false)} />}
    </div>
  )
}

export default Home