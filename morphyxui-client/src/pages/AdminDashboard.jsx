import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import {
  TbUsers,
  TbCode,
  TbLogout,
  TbPlus,
  TbLayoutDashboard,
  TbPackage,
  TbMenu2,
  TbChevronLeft,
  TbWorld,
  TbSearch,
  TbBoxOff,
  TbCodeDots,
  TbDeviceFloppy,
  TbEye,
  TbX,
  TbLoader,
  TbCheck,
  TbTrash,
  TbHexagonLetterM,
  TbTerminal2,
  TbArrowRight,
  TbRefresh,
  TbDeviceDesktop,
  TbDeviceTablet,
  TbDeviceMobile,
  TbCpu,
  TbShieldCheck
} from "react-icons/tb"
import { ServerUrl } from '../App'
import { setUserData } from '../redux/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AreaChart, Area, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { LiveComponentPreview } from '../components/LiveComponentPreview'
import gsap from 'gsap'

// Architectural Monochromatic Tooltip
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className='bg-[#161616] border border-white/20 px-3.5 py-2.5 shadow-2xl rounded-none font-mono'>
      <p className='text-[10px] uppercase tracking-widest text-white/50 mb-1'>{label}</p>
      <p className='text-xs font-bold text-white flex items-center gap-1.5'>
        <span className='w-1.5 h-1.5 bg-white inline-block' />
        {payload[0].value} UNITS SYNTHESIZED
      </p>
    </div>
  )
}

// Architectural Monospace Props Tag Input
function PropsInput({ props = [], setProps }) {
  const [input, setInput] = useState("")
  const addProps = () => {
    const trimmed = input.trim()
    if (trimmed && !props.includes(trimmed)) {
      setProps([...props, trimmed])
    }
    setInput("")
  }
  const removeProps = (p) => setProps(props.filter((x) => x !== p))

  return (
    <div>
      <div className='flex flex-wrap gap-1.5 mb-2.5 min-h-[30px]'>
        {props.map((p) => (
          <span
            key={p}
            className='flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono font-bold bg-[#1e1e1e] text-white border border-white/20 rounded-none'
          >
            {p}
            <button
              type='button'
              onClick={() => removeProps(p)}
              className='text-white/40 hover:text-white transition-colors bg-transparent border-none cursor-pointer p-0 flex items-center'
            >
              <TbX size={12} />
            </button>
          </span>
        ))}
        {props.length === 0 && (
          <span className='text-xs font-mono text-white/30 self-center'>
            NO PROPS ADDED // PURE PRIMITIVE
          </span>
        )}
      </div>
      <div className='flex items-stretch gap-2'>
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault()
              addProps()
            }
          }}
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder='e.g. "title", "onClick", "theme"'
          className='flex-1 min-w-0 bg-[#0a0a0a] border border-white/15 px-3.5 py-2 text-xs font-mono text-white placeholder-white/30 outline-none focus:border-white transition-colors rounded-none'
        />
        <button
          type='button'
          onClick={addProps}
          className='px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider cursor-pointer transition-colors bg-white text-black hover:bg-neutral-200 border border-white rounded-none'
        >
          Add Prop
        </button>
      </div>
      <p className='text-[10px] font-mono text-white/40 mt-1.5'>
        PRESS <span className='text-white font-bold'>ENTER</span> OR <span className='text-white font-bold'>COMMA (,)</span> TO REGISTER PROPERTY
      </p>
    </div>
  )
}

// Sharp Architectural Toast Alert
const Toast = ({ message, type, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.98 }}
      className={`fixed top-6 right-6 z-50 flex items-center gap-3.5 px-5 py-3.5 border shadow-[0_20px_50px_rgba(0,0,0,0.95)] rounded-none ${
        type === "success"
          ? "bg-[#111c15] border-emerald-500/40 text-emerald-300"
          : type === "error"
          ? "bg-[#201012] border-rose-500/40 text-rose-300"
          : "bg-[#141414] border-white/20 text-white"
      }`}
      style={{ minWidth: "300px" }}
    >
      <div className={`w-6 h-6 flex items-center justify-center font-bold text-xs rounded-none ${
        type === "success" ? "bg-emerald-400 text-black" : type === "error" ? "bg-rose-500 text-white" : "bg-white text-black"
      }`}>
        {type === "success" ? <TbCheck size={14} /> : <TbX size={14} />}
      </div>
      <div className="flex-1 text-left">
        <p className="text-[10px] font-mono uppercase tracking-widest text-white/40">SYSTEM NOTIFICATION</p>
        <p className="text-xs font-semibold text-white leading-tight mt-0.5">{message}</p>
      </div>
      <button onClick={onClose} className="text-white/40 hover:text-white p-1 transition-colors cursor-pointer bg-transparent border-none rounded-none">
        <TbX size={16} />
      </button>
    </motion.div>
  )
}

// Add Component Studio Form
function AddComponentsForm() {
  const [name, setName] = useState("")
  const [props, setProps] = useState([])
  const [code, setCode] = useState("")
  const [codeTab, setCodeTab] = useState("code")
  const [saving, setSaving] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [savedId, setSavedId] = useState(null)
  const [isPublished, setIsPublished] = useState(false)
  const [toast, setToast] = useState(null)

  const showToast = (message, type = "info") => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3500)
  }

  const handleSave = async () => {
    if (!name.trim() || !code.trim() || saving) return
    setSaving(true)
    try {
      const res = await axios.post(
        `${ServerUrl}/api/components/save`,
        { name, code, props },
        { withCredentials: true }
      )
      setSavedId(res.data._id)
      showToast("Component registered in repository", "success")
      setSaving(false)
    } catch (error) {
      console.log(error)
      showToast("Repository registry error", "error")
      setSaving(false)
    }
  }

  const handlePublish = async () => {
    if (!savedId) return
    setPublishing(true)
    try {
      await axios.post(
        `${ServerUrl}/api/components/publish`,
        { componentId: savedId },
        { withCredentials: true }
      )
      setIsPublished(true)
      showToast("Published to NPM registry package", "success")
      setPublishing(false)
    } catch (error) {
      console.log(error)
      showToast("NPM publish failed", "error")
      setPublishing(false)
    }
  }

  return (
    <div className='px-4 sm:px-8 py-8 max-w-4xl w-full mx-auto'>
      <div className='mb-8 border-b border-white/15 pb-5'>
        <div className='inline-flex items-center gap-2 px-3 py-1 bg-white/[0.04] border border-white/15 text-[10px] font-mono uppercase tracking-[2px] text-white/60 mb-2 rounded-none'>
          <TbTerminal2 size={13} /> COMPONENT REGISTRY INTAKE
        </div>
        <h2 className='text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white' style={{ fontFamily: "'Syne', sans-serif" }}>
          Register Architecture Unit
        </h2>
        <p className='text-white/45 text-xs font-mono mt-1'>
          Define semantic unit parameters, establish prop interfaces, inspect viewport sandbox, and publish.
        </p>
      </div>

      <div className='space-y-6'>
        {/* Unit Name Box */}
        <div className='p-5 border border-white/15 bg-[#121212] rounded-none'>
          <label htmlFor="name" className='text-[10px] font-mono font-bold text-white/60 uppercase tracking-[2px] block mb-2'>
            COMPONENT IDENTIFIER // NAME
          </label>
          <input
            type="text"
            id='name'
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder='e.g. GlassmorphicButton'
            className='w-full bg-[#0a0a0a] border border-white/15 px-4 py-2.5 text-xs sm:text-sm font-mono text-white placeholder-white/30 outline-none focus:border-white transition-colors rounded-none'
          />
        </div>

        {/* Props Box */}
        <div className='p-5 border border-white/15 bg-[#121212] rounded-none'>
          <label className='text-[10px] font-mono font-bold text-white/60 uppercase tracking-[2px] block mb-2'>
            PROPERTY SCHEMAS
          </label>
          <PropsInput props={props} setProps={setProps} />
        </div>

        {/* Code & Preview Box */}
        <div className='border border-white/15 bg-[#121212] rounded-none overflow-hidden'>
          <div className='flex items-center justify-between px-5 py-3 border-b border-white/10 bg-[#161616]'>
            <span className='text-[10px] font-mono font-bold text-white/60 uppercase tracking-[2px]'>
              SOURCE IMPLEMENTATION
            </span>
            <div className='flex gap-1 bg-[#0a0a0a] border border-white/15 p-1 rounded-none'>
              {["code", "preview"].map((tab) => (
                <button
                  type='button'
                  onClick={() => setCodeTab(tab)}
                  key={tab}
                  className={`flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer border rounded-none ${
                    codeTab === tab
                      ? "bg-white text-black border-white shadow-sm"
                      : "bg-transparent text-white/40 border-transparent hover:text-white"
                  }`}
                >
                  {tab === 'code' ? <TbCodeDots size={12} /> : <TbEye size={12} />}
                  <span>{tab}</span>
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode='wait'>
            {codeTab === "code" ? (
              <motion.div key='code' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <textarea
                  onChange={(e) => setCode(e.target.value)}
                  value={code}
                  rows={14}
                  placeholder={`export default function MyComponent({ title }) {\n  return (\n    <div className="p-6 bg-[#111] text-white border border-white/20">\n      <h1>{title}</h1>\n    </div>\n  );\n}`}
                  className="w-full bg-[#0a0a0a] p-5 text-xs leading-relaxed text-neutral-200 font-mono resize-none outline-none placeholder-white/20 selection:bg-white selection:text-black"
                />
              </motion.div>
            ) : (
              <motion.div key='preview' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='p-6 bg-[#070707] min-h-[300px] flex items-center justify-center'>
                {code.trim() ? (
                  <div className="w-full border border-white/15 bg-[#111111] p-8 shadow-2xl">
                    <LiveComponentPreview code={code} />
                  </div>
                ) : (
                  <div className='h-40 flex items-center justify-center text-white/30 text-xs font-mono border border-dashed border-white/15 w-full'>
                    PASTE JSX SOURCE TO ACTIVATE SANDBOX PREVIEW
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Actions Bar */}
        <div className='flex items-center gap-3 flex-wrap pt-2'>
          <button
            onClick={handleSave}
            disabled={saving || !name.trim() || !code.trim() || savedId}
            className={`flex items-center gap-2 px-5 py-3 text-xs font-mono font-bold uppercase tracking-wider transition-all border rounded-none cursor-pointer disabled:cursor-not-allowed ${
              savedId
                ? "bg-emerald-950/40 border-emerald-400 text-emerald-300"
                : "bg-white text-black hover:bg-neutral-200 border-white"
            }`}
          >
            {saving ? <TbLoader size={14} className="animate-spin" /> : savedId ? <TbCheck size={14} /> : <TbDeviceFloppy size={14} />}
            <span>{saving ? "SAVING..." : savedId ? "UNIT STORED" : "SAVE TO REPOSITORY"}</span>
          </button>

          {savedId && !isPublished && (
            <button
              onClick={handlePublish}
              disabled={publishing}
              className="flex items-center gap-2 px-5 py-3 bg-[#262626] hover:bg-neutral-700 text-white border border-white/20 text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer rounded-none disabled:opacity-40"
            >
              {publishing ? <TbLoader size={14} className="animate-spin" /> : <TbPackage size={14} />}
              <span>{publishing ? "PACKAGING..." : "PUBLISH TO NPM"}</span>
            </button>
          )}

          {isPublished && (
            <div className="flex items-center gap-2 px-4 py-2.5 border border-emerald-400/40 bg-emerald-950/30 text-emerald-300 text-xs font-mono font-bold uppercase rounded-none">
              <TbCheck size={14} /> PUBLISHED TO NPM
            </div>
          )}

          {(savedId || name || code) && (
            <button
              onClick={() => {
                setName("")
                setProps([])
                setCode("")
                setSavedId(null)
                setIsPublished(false)
                setCodeTab("code")
              }}
              className="ml-auto flex items-center gap-1.5 px-3 py-2 text-xs font-mono uppercase text-white/50 hover:text-white hover:bg-white/5 transition-all bg-transparent border border-white/10 hover:border-white/30 cursor-pointer rounded-none"
            >
              <TbTrash size={13} /> RESET
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </div>
  )
}

function AdminDashboard() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [activeView, setActiveView] = useState("dashboard")
  const [componentSearch, setComponentSearch] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const containerRef = useRef(null)

  const { userData, allUsers, allComponents } = useSelector((s) => s.user)
  const publicComponents = allComponents?.filter((c) => c.visibility === "public") || []

  const filteredPublicComponents = componentSearch.trim()
    ? publicComponents.filter(
        (c) =>
          c.name?.toLowerCase().includes(componentSearch.toLowerCase()) ||
          c.props?.some((p) => p.toLowerCase().includes(componentSearch.toLowerCase()))
      )
    : publicComponents

  const handleLogout = async () => {
    try {
      await axios.get(`${ServerUrl}/api/auth/logout`, { withCredentials: true })
      dispatch(setUserData(null))
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  // GSAP Entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gsap-admin-stat",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: "power3.out", clearProps: "transform,opacity" }
      )
      gsap.fromTo(
        ".gsap-admin-panel",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, delay: 0.15, ease: "power3.out", clearProps: "transform,opacity" }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [activeView])

  const chartData = (() => {
    if (!publicComponents.length) return []
    const map = {}
    publicComponents.forEach((c) => {
      const raw = c.createdAt
      if (!raw) return
      const label = new Date(raw).toLocaleDateString("en-US", { month: "short", day: "numeric" })
      map[label] = (map[label] || 0) + 1
    })
    return Object.entries(map)
      .map(([date, count]) => ({ date, components: count }))
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(-12)
  })()

  const stats = [
    { label: "REGISTERED OPERATORS", value: allUsers?.length || 0, icon: TbUsers, sub: "AUTHENTICATED DEVS" },
    { label: "PUBLIC ARCHITECTURE UNITS", value: publicComponents?.length || 0, icon: TbCode, sub: "LIVE READY BLOCKS" },
    { label: "CORE TELEMETRY STATUS", value: "99.8%", icon: TbShieldCheck, sub: "RUNTIME SEMANTIC" },
    { label: "ACTIVE NPM PACKAGE", value: "v2.4", icon: TbTerminal2, sub: "TREE-SHAKEABLE" },
  ]

  const navItems = [
    { id: "dashboard", label: "DASHBOARD OVERVIEW", Icon: TbLayoutDashboard },
    { id: "add", label: "REGISTER COMPONENT", Icon: TbPackage },
  ]

  const SidebarContent = () => (
    <div className='flex flex-col h-full bg-[#0d0d0d] border-r border-white/15 text-white select-none'>
      {/* Brand Header */}
      <div className='flex items-center gap-3 px-6 py-5 border-b border-white/15'>
        <div className='w-9 h-9 border border-white/30 bg-white/5 flex items-center justify-center text-white rounded-none'>
          <TbHexagonLetterM size={20} />
        </div>
        <div>
          <span className='text-base font-bold uppercase tracking-wider block text-white leading-none' style={{ fontFamily: "'Syne', sans-serif" }}>
            MorphyxUI
          </span>
          <span className='text-[9px] font-mono text-white/50 tracking-[2px] uppercase block mt-1'>
            SYS.ADMIN // CONTROL
          </span>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className='ml-auto md:hidden text-white/40 hover:text-white p-1 rounded-none border border-white/10 bg-transparent'
        >
          <TbChevronLeft size={16} />
        </button>
      </div>

      {/* Navigation */}
      <nav className='flex-1 p-3 space-y-1.5'>
        <div className='px-3 pt-3 pb-2 text-[9px] font-mono font-bold text-white/40 uppercase tracking-[2px]'>
          CORE MODULES
        </div>
        {navItems.map(({ id, label, Icon }) => {
          const isActive = activeView === id
          return (
            <button
              onClick={() => setActiveView(id)}
              key={id}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-none text-xs font-mono font-bold tracking-wider transition-colors cursor-pointer text-left border relative ${
                isActive
                  ? "bg-[#333333] text-white border-white/60 shadow-md"
                  : "bg-[#141414] text-white/60 border-white/10 hover:border-white/30 hover:bg-[#1a1a1a] hover:text-white"
              }`}
            >
              {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-white" />}
              <div className="flex items-center gap-2.5">
                <Icon size={15} className={isActive ? "text-white" : "text-white/40"} />
                <span>{label}</span>
              </div>
              <span className='text-[9px] text-white/30 font-mono'>0{id === "dashboard" ? "1" : "02"}</span>
            </button>
          )
        })}

        <div className='px-3 pt-6 pb-2 text-[9px] font-mono font-bold text-white/40 uppercase tracking-[2px]'>
          DIRECT LINKS
        </div>
        <button
          onClick={() => navigate("/components")}
          className="w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-mono text-white/50 hover:text-white hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 cursor-pointer bg-transparent text-left"
        >
          <span className="flex items-center gap-2.5"><TbWorld size={14} /> Explorer</span>
          <span>→</span>
        </button>
        <button
          onClick={() => navigate("/generate")}
          className="w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-mono text-white/50 hover:text-white hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 cursor-pointer bg-transparent text-left"
        >
          <span className="flex items-center gap-2.5"><TbCpu size={14} /> AI Studio</span>
          <span>→</span>
        </button>
      </nav>

      {/* Operator Session Telemetry & Logout */}
      <div className='p-4 border-t border-white/15 bg-[#111111] space-y-3'>
        <div className='text-[10px] font-mono text-white/45'>
          <p className='truncate uppercase'>OPERATOR: {userData?.name || "ROOT_ADMIN"}</p>
          <p className='text-emerald-400 mt-0.5'>AUTH: LEVEL_01_SUPERUSER</p>
        </div>
        <button
          onClick={handleLogout}
          className='w-full flex items-center justify-center gap-2 px-3 py-2 bg-transparent hover:bg-rose-950/30 text-rose-400 border border-rose-500/30 hover:border-rose-500/60 transition-all font-mono text-xs font-bold uppercase tracking-wider cursor-pointer rounded-none'
        >
          <TbLogout size={14} /> TERMINATE SESSION
        </button>
      </div>
    </div>
  )

  return (
    <div
      ref={containerRef}
      className='min-h-screen bg-[#070707] text-white flex overflow-hidden selection:bg-white selection:text-black'
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Background Architectural Grid Lines */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:56px_56px] pointer-events-none z-0" />

      {/* Desktop Fixed Architectural Sidebar */}
      <aside className='hidden md:flex flex-col w-64 min-h-screen fixed top-0 left-0 z-30'>
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              className='fixed inset-0 z-40 bg-black/85 backdrop-blur-sm md:hidden'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 320 }}
              className='fixed top-0 left-0 z-50 flex flex-col w-72 min-h-screen md:hidden'
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Workspace Frame */}
      <main className='flex-1 md:ml-64 min-h-screen overflow-y-auto relative z-10'>
        {/* Sticky Topbar */}
        <div className='sticky top-0 z-20 px-5 sm:px-8 py-4 bg-[#0d0d0d]/95 backdrop-blur-md border-b border-white/15 flex items-center justify-between gap-4'>
          <div className='flex items-center gap-3.5 min-w-0'>
            <button
              onClick={() => setSidebarOpen(true)}
              className='md:hidden bg-[#161616] border border-white/20 p-2 text-white hover:bg-black transition-colors rounded-none cursor-pointer flex-shrink-0'
            >
              <TbMenu2 size={18} />
            </button>
            <div className='min-w-0'>
              <h1 className='text-sm sm:text-base font-bold font-mono uppercase tracking-wider text-white truncate'>
                {activeView === "dashboard" ? "DASHBOARD TELEMETRY // STATS" : "COMPONENT REGISTRATION DOCK"}
              </h1>
              <p className='text-white/40 font-mono text-[11px] truncate mt-0.5'>
                OPERATIONAL SESSION: {userData?.email || "admin@morphyxui.com"}
              </p>
            </div>
          </div>

          <div className='flex items-center gap-3'>
            <button
              onClick={() => navigate("/generate")}
              className='flex items-center gap-2 px-4 py-2 bg-white text-black hover:bg-neutral-200 font-mono text-xs font-bold uppercase tracking-wider rounded-none cursor-pointer border border-white transition-colors flex-shrink-0 shadow-sm'
            >
              <TbPlus size={14} />
              <span className='hidden sm:inline'>AI STUDIO</span>
            </button>
          </div>
        </div>

        {/* Dynamic View Sections */}
        <AnimatePresence mode='wait'>
          {activeView === "dashboard" && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-5 sm:p-8 space-y-8 max-w-6xl mx-auto"
            >
              {/* 4 Metric Telemetry Cards */}
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                {stats.map(({ label, value, icon: Icon, sub }, i) => (
                  <div
                    key={i}
                    className='gsap-admin-stat p-5 border border-white/15 bg-[#121212] shadow-[0_15px_40px_rgba(0,0,0,0.6)] relative overflow-hidden rounded-none'
                  >
                    <span className="absolute top-2 right-2 text-white/20 font-mono text-[9px] select-none">+ 0{i + 1}</span>
                    <div className='flex items-center justify-between mb-3'>
                      <div className='w-8 h-8 border border-white/20 bg-white/5 flex items-center justify-center text-white rounded-none'>
                        <Icon size={16} />
                      </div>
                      <span className='text-[9px] font-mono uppercase tracking-widest text-emerald-400'>ONLINE</span>
                    </div>
                    <p className='text-3xl font-bold text-white tracking-tight' style={{ fontFamily: "'Syne', sans-serif" }}>
                      {value}
                    </p>
                    <p className='text-[10px] font-mono text-white/60 uppercase tracking-[1.5px] mt-1'>{label}</p>
                    <p className='text-[9px] font-mono text-white/35 mt-0.5'>{sub}</p>
                  </div>
                ))}
              </div>

              {/* Chart Panel */}
              <div className='gsap-admin-panel border border-white/15 bg-[#121212] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)] rounded-none relative'>
                <span className="absolute top-2 left-2 text-white/20 font-mono text-[9px] select-none">+ GRAPH.TELEMETRY</span>
                <span className="absolute top-2 right-2 text-white/20 font-mono text-[9px] select-none">UTC INTERVAL</span>

                <div className='flex items-center justify-between mb-6 pt-3 border-b border-white/10 pb-3 flex-wrap gap-2'>
                  <div>
                    <h3 className='text-xs sm:text-sm font-bold uppercase tracking-wider text-white font-mono'>
                      COMPONENT GENERATION FREQUENCY
                    </h3>
                    <p className='text-white/40 text-[11px] font-mono mt-0.5'>Date-wise synthesis telemetry</p>
                  </div>
                  <span className='text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 bg-white/10 border border-white/20 text-white'>
                    LAST 12 RECORDS
                  </span>
                </div>

                {chartData?.length === 0 ? (
                  <div className='h-[210px] flex items-center justify-center text-white/30 text-xs font-mono border border-dashed border-white/10'>
                    NO PUBLIC RECORD TELEMETRY CAPTURED YET
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={220}>
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, bottom: 0, left: -25 }}>
                      <defs>
                        <linearGradient id="monochromeGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor='#ffffff' stopOpacity={0.25} />
                          <stop offset="100%" stopColor='#ffffff' stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis
                        dataKey='date'
                        tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 10, fontFamily: "monospace" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 10, fontFamily: "monospace" }}
                        axisLine={false}
                        tickLine={false}
                        allowDecimals={false}
                      />
                      <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(255,255,255,0.3)" }} />
                      <Area
                        type="monotone"
                        dataKey="components"
                        stroke="#ffffff"
                        strokeWidth={2}
                        fill="url(#monochromeGrad)"
                        dot={false}
                        activeDot={{ r: 4, fill: "#ffffff", strokeWidth: 0 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>

              {/* Public Components Registry Table */}
              <div className='gsap-admin-panel border border-white/15 bg-[#121212] shadow-[0_20px_50px_rgba(0,0,0,0.7)] rounded-none overflow-hidden'>
                <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 border-b border-white/15 bg-[#161616]'>
                  <div>
                    <h3 className='text-xs sm:text-sm font-bold uppercase tracking-wider text-white font-mono flex items-center gap-2'>
                      <TbWorld size={16} /> LIVE PUBLIC ARCHITECTURE BLOCKS
                    </h3>
                    <p className='text-white/40 text-[11px] font-mono mt-0.5'>
                      {publicComponents.length} verified units accessible in open registry
                    </p>
                  </div>

                  <div className='relative w-full sm:w-64'>
                    <TbSearch size={14} className='absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none' />
                    <input
                      value={componentSearch}
                      onChange={(e) => setComponentSearch(e.target.value)}
                      placeholder='SEARCH IDENTIFIERS...'
                      className='w-full bg-[#0a0a0a] border border-white/20 pl-8 pr-3 py-2 text-xs font-mono text-white placeholder-white/30 outline-none focus:border-white transition-colors rounded-none uppercase tracking-wider'
                    />
                  </div>
                </div>

                {filteredPublicComponents.length === 0 ? (
                  <div className='flex flex-col items-center justify-center py-16 gap-2 text-white/30 font-mono'>
                    <TbBoxOff size={32} />
                    <p className='text-xs uppercase tracking-wider'>
                      {componentSearch ? "NO UNITS MATCH QUERY" : "REGISTRY IS EMPTY"}
                    </p>
                  </div>
                ) : (
                  <div className='divide-y divide-white/10'>
                    {filteredPublicComponents.map((c, i) => (
                      <div
                        key={i}
                        className='flex items-start sm:items-center justify-between gap-4 p-4 sm:p-5 hover:bg-white/[0.02] transition-colors'
                      >
                        <div className='flex items-center gap-3.5 min-w-0'>
                          <div className='w-8 h-8 border border-white/20 bg-white/5 flex items-center justify-center text-white rounded-none flex-shrink-0'>
                            <TbCode size={15} />
                          </div>
                          <div className='min-w-0'>
                            <p className='text-xs sm:text-sm font-bold uppercase tracking-wide text-white truncate font-mono'>
                              {c.name || "UNNAMED_BLOCK"}
                            </p>
                            <div className='flex flex-wrap gap-1 mt-1'>
                              {c.props?.slice(0, 4).map((p) => (
                                <span
                                  key={p}
                                  className='px-1.5 py-0.5 text-[9px] font-mono font-bold bg-[#1a1a1a] border border-white/15 text-neutral-300 rounded-none'
                                >
                                  {p}
                                </span>
                              ))}
                              {c.props?.length > 4 && (
                                <span className='px-1.5 py-0.5 text-[9px] font-mono text-white/40'>
                                  +{c.props.length - 4} MORE
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className='flex flex-col sm:flex-row items-end sm:items-center gap-3 flex-shrink-0 font-mono'>
                          <span className='text-[10px] text-white/40'>
                            {c.createdAt
                              ? new Date(c.createdAt).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })
                              : "SYSTEM INIT"}
                          </span>
                          <span className='flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-mono font-bold uppercase bg-white text-black rounded-none'>
                            <TbWorld size={11} /> PUBLIC
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeView === "add" && (
            <motion.div
              key="add"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AddComponentsForm />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

export default AdminDashboard