import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from "framer-motion"
import { 
  TbCheck, 
  TbCopy, 
  TbHexagonLetterM, 
  TbLayoutSidebarLeftExpand, 
  TbPackage, 
  TbSearch, 
  TbMenu2, 
  TbX, 
  TbChevronRight, 
  TbEye, 
  TbCode, 
  TbBox, 
  TbBrandNpm,
  TbTerminal2,
  TbDeviceDesktop,
  TbDeviceTablet,
  TbDeviceMobile,
  TbSparkles,
  TbArrowRight,
  TbWorld
} from "react-icons/tb"
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { ServerUrl } from '../App'
import { setAllComponents } from '../redux/userSlice'
import { LiveComponentPreview } from '../components/LiveComponentPreview'
import gsap from 'gsap'

function CopyBtn({ text, label = "COPY" }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <button 
      type="button"
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-white/60 hover:text-white transition-colors bg-white/5 hover:bg-white/15 border border-white/15 px-2.5 py-1 rounded-none cursor-pointer uppercase"
    >
      {copied ? <TbCheck size={12} className="text-emerald-400" /> : <TbCopy size={12} />}
      {copied ? "COPIED" : label}
    </button>
  )
}

function CodeBlock({ code, lang = "jsx" }) {
  return (
    <div className="rounded-none overflow-hidden border border-white/15 bg-[#0e0e0e]">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#161616]">
        <span className="text-[10px] text-white/50 font-mono uppercase tracking-[2px]">{lang}</span>
        <CopyBtn text={code} label="COPY CODE" />
      </div>
      <pre className="p-4 text-[12px] font-mono text-neutral-200 leading-relaxed overflow-x-auto whitespace-pre selection:bg-white selection:text-black">
        {code}
      </pre>
    </div>
  )
}

function GuidePanel() {
  const { userData } = useSelector((s) => s.user)
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-full px-4 sm:px-10 py-12 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl"
      >
        <div className="relative w-16 h-16 mx-auto mb-6 select-none">
          <div className="absolute top-2 left-2 w-14 h-14 bg-neutral-800 border border-white/10 rounded-none" />
          <div className="absolute top-1 left-1 w-14 h-14 bg-neutral-600 border border-white/20 rounded-none" />
          <div className="relative z-10 w-14 h-14 bg-[#141414] border border-white/40 text-white flex items-center justify-center rounded-none shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            <TbPackage size={26} strokeWidth={1.4} />
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.04] border border-white/15 text-[10px] font-mono uppercase tracking-[2px] text-white/70 mb-3 rounded-none">
          <TbTerminal2 size={13} /> COMPONENT REGISTRY // DIRECTORY
        </div>

        <h2 
          className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white mb-3"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {userData ? "Select an Architecture Block" : "Inspect Pure React Components"}
        </h2>
        
        <p className="text-white/50 text-xs sm:text-sm mb-10 max-w-lg mx-auto leading-relaxed">
          {userData 
            ? "Click any UI primitive or complex layout from the sidebar index to test live responsiveness, inspect raw Tailwind classes, and export clean JSX."
            : "Explore our modular, zero-runtime React components built with accessible semantics and TailwindCSS utility classes."
          }
        </p>

        <div className="w-full text-left space-y-4 mb-10 bg-[#121212] border border-white/15 p-6 sm:p-8 rounded-none">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <span className="text-[10px] font-mono uppercase tracking-[2px] text-white/60 font-bold">
              QUICK INTEGRATION SPEC
            </span>
            <span className="text-[10px] font-mono text-white/40">REACT 18 & 19 READY</span>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs font-mono text-white/75 mb-2 flex items-center gap-2">
                <span className="w-5 h-5 bg-white text-black flex items-center justify-center font-bold text-[10px]">01</span>
                INSTALL RUNTIME CORE
              </p>
              <CodeBlock code={`npm install morphyx-ui`} lang="bash" />
            </div>

            <div>
              <p className="text-xs font-mono text-white/75 mb-2 flex items-center gap-2">
                <span className="w-5 h-5 bg-white text-black flex items-center justify-center font-bold text-[10px]">02</span>
                IMPORT COMPONENT MODULE
              </p>
              <CodeBlock code={`import { GlassCard, Button, StatBadge } from "morphyx-ui";`} lang="jsx" />
            </div>

            <div>
              <p className="text-xs font-mono text-white/75 mb-2 flex items-center gap-2">
                <span className="w-5 h-5 bg-white text-black flex items-center justify-center font-bold text-[10px]">03</span>
                DROP SEED INTO YOUR REACT TREE
              </p>
              <CodeBlock 
                code={`export default function Dashboard() {\n  return (\n    <GlassCard blur="xl" theme="monochrome">\n      <StatBadge label="Velocity" count="10x Boost" />\n      <Button variant="solid">Deploy Interface</Button>\n    </GlassCard>\n  );\n}`} 
                lang="jsx" 
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-white/40">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-emerald-400" /> ZERO-DEPENDENCY CORE
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-white" /> 100% ACCESSIBLE JSX
          </span>
        </div>
      </motion.div>
    </div>
  )
}

function DetailPanel({ component, onBack }) {
  const [activeTab, setActiveTab] = useState("preview")
  const [viewportWidth, setViewportWidth] = useState("100%")
  
  const importCode = `import { ${component.name} } from "morphyx-ui";`
  const usageCode = `import { ${component.name} } from "morphyx-ui";\n\nexport default function App() {\n  return (\n    <div className="p-8 min-h-screen bg-[#070507] flex items-center justify-center">\n      <${component.name}${
    component.props?.length 
      ? `\n        ${component.props.map((p) => `${p}={/* value */}`).join("\n        ")}`
      : ""
  } />\n    </div>\n  );\n}`

  return (
    <motion.div
      key={component._id}
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col h-full bg-[#0a0a0a]"
    >
      <div className="flex items-center justify-between px-5 sm:px-8 py-4 border-b border-white/15 bg-[#121212] gap-4 flex-wrap shrink-0">
        <div className="flex items-center gap-3.5 min-w-0">
          {onBack && (
            <button 
              type="button"
              onClick={onBack}
              className="sm:hidden flex items-center justify-center w-8 h-8 rounded-none bg-white/5 border border-white/20 text-white/80 hover:text-white transition-colors cursor-pointer shrink-0"
            >
              <TbX size={15} />
            </button>
          )}
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-none" />
              <h2 
                className="text-base sm:text-lg font-bold text-white uppercase tracking-wider truncate"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {component.name}
              </h2>
            </div>
            <p className="text-white/40 text-[11px] font-mono mt-0.5 truncate">
              {component.props?.length > 0 ? `PARAM PROPS [${component.props.length}]: ${component.props.join(", ")}` : "PRIMITIVE // ZERO PROPS"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {activeTab === "preview" && (
            <div className="hidden lg:flex items-center border border-white/15 bg-[#0a0a0a] p-0.5 rounded-none">
              {[
                { width: "100%", icon: TbDeviceDesktop, title: "Fluid 100%" },
                { width: "768px", icon: TbDeviceTablet, title: "Tablet 768px" },
                { width: "380px", icon: TbDeviceMobile, title: "Mobile 380px" },
              ].map((vp) => (
                <button
                  key={vp.width}
                  onClick={() => setViewportWidth(vp.width)}
                  title={vp.title}
                  className={`p-1.5 transition-colors cursor-pointer border-none rounded-none ${
                    viewportWidth === vp.width ? "bg-white text-black" : "bg-transparent text-white/40 hover:text-white"
                  }`}
                >
                  <vp.icon size={15} />
                </button>
              ))}
            </div>
          )}

          <div className="flex gap-1 bg-[#0a0a0a] border border-white/15 p-1 rounded-none">
            {[
              { id: "preview", icon: TbEye, label: "PREVIEW" },
              { id: "code", icon: TbCode, label: "JSX CODE" },
              { id: "guide", icon: TbBox, label: "API SPEC" },
            ].map(({ id, icon: Icon, label }) => (
              <button 
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono font-bold tracking-wider transition-all uppercase cursor-pointer border rounded-none ${
                  activeTab === id 
                    ? "bg-white text-black border-white shadow-sm" 
                    : "bg-transparent text-white/50 border-transparent hover:text-white hover:border-white/20"
                }`}
              >
                <Icon size={13} /> {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#070707] relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto h-full flex flex-col">
          <AnimatePresence mode="wait">
            {activeTab === "preview" && (
              <motion.div 
                key="preview" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center"
              >
                <div 
                  style={{ width: viewportWidth, maxWidth: "100%" }}
                  className="transition-all duration-300 border border-white/20 bg-[#111111] p-6 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.85)] min-h-[360px] flex items-center justify-center relative overflow-hidden"
                >
                  <span className="absolute top-3 left-3 text-white/20 font-mono text-[10px] select-none">+ 0,0</span>
                  <span className="absolute bottom-3 right-3 text-white/20 font-mono text-[10px] select-none">{viewportWidth}</span>
                  
                  <div className="w-full flex items-center justify-center">
                    <LiveComponentPreview code={component.code} />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between w-full max-w-full text-[11px] font-mono text-white/40">
                  <span>CANVAS: ACTIVE ISOLATION SANDBOX</span>
                  <CopyBtn text={component.code} label="COPY RAW JSX" />
                </div>
              </motion.div>
            )}

            {activeTab === "code" && (
              <motion.div 
                key="code" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs font-mono text-white/60">
                  <span>{component.name}.jsx // TAILWIND CLEAN EXPORT</span>
                  <span className="text-white/40">UTF-8 SEMANTIC MARKUP</span>
                </div>
                <CodeBlock code={component.code} lang="jsx" />
              </motion.div>
            )}

            {activeTab === "guide" && (
              <motion.div 
                key="guide" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                className="space-y-8"
              >
                {component.props?.length > 0 ? (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-white/70 mb-3 flex items-center gap-2">
                      <TbBox size={14} className="text-white" /> PROP SCHEMAS
                    </p>
                    <div className="rounded-none overflow-hidden border border-white/15 bg-[#121212]">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-white/10 bg-white/[0.03]">
                            <th className="text-left px-5 py-3 text-white/50 font-mono uppercase tracking-wider">Property</th>
                            <th className="text-left px-5 py-3 text-white/50 font-mono uppercase tracking-wider">Type</th>
                            <th className="text-left px-5 py-3 text-white/50 font-mono uppercase tracking-wider">Requirement</th>
                          </tr>
                        </thead>
                        <tbody>
                          {component.props.map((p, i) => (
                            <tr key={i} className="border-b border-white/10 last:border-0 hover:bg-white/[0.02]">
                              <td className="px-5 py-3 font-mono text-white font-semibold">{p}</td>
                              <td className="px-5 py-3 font-mono text-white/40">any / node</td>
                              <td className="px-5 py-3 font-mono text-emerald-400/80">optional</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-[#141414] border border-white/10 text-xs font-mono text-white/50">
                    INFO: This component is self-contained and does not require explicit property parameters.
                  </div>
                )}

                <div className="space-y-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-white/70 mb-2 flex items-center gap-2">
                      <TbBrandNpm size={14} className="text-white" /> NPM INSTALLATION
                    </p>
                    <CodeBlock code={`npm install morphyx-ui`} lang="bash" /> 
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-white/70 mb-2 flex items-center gap-2">
                      <TbCode size={14} className="text-white" /> IMPORT HOOK
                    </p>
                    <CodeBlock code={importCode} lang="jsx" /> 
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-white/70 mb-2 flex items-center gap-2">
                      <TbEye size={14} className="text-white" /> APP IMPLEMENTATION EXAMPLE
                    </p>
                    <CodeBlock code={usageCode} lang="jsx" /> 
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

function SidebarComponent({ publicComponents, selected, onSelect, search, setSearch }) {
  return (
    <>
      <div className="p-4 border-b border-white/15 bg-[#121212]">
        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-none bg-[#0a0a0a] border border-white/20 focus-within:border-white transition-colors">
          <TbSearch size={14} className="text-white/40 shrink-0" />
          <input 
            placeholder="FILTER BLOCKS..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="bg-transparent text-xs font-mono text-white placeholder-white/30 outline-none w-full uppercase tracking-wider"
          />
        </div>
      </div>

      <div className="px-4 py-2.5 bg-[#161616] border-b border-white/10 flex items-center justify-between text-[10px] font-mono uppercase tracking-[2px] text-white/50">
        <span>INDEX DIRECTORY</span>
        <span className="font-bold text-white">{publicComponents.length} UNITS</span>
      </div>

      <div className="flex-1 overflow-y-auto p-2 bg-[#0d0d0d] space-y-1">
        {publicComponents.length === 0 ? (
          <div className="text-center py-12 px-4">
            <p className="text-white/30 text-xs font-mono uppercase tracking-wider">
              No units match query
            </p>
          </div>
        ) : (
          publicComponents.map((c) => {
            const isSelected = selected?._id === c._id
            return (
              <button
                key={c._id}
                type="button"
                onClick={() => onSelect(c)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-none text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border text-left relative ${
                  isSelected 
                    ? "bg-[#383838] text-white border-white/60 shadow-[0_4px_15px_rgba(0,0,0,0.4)]" 
                    : "bg-[#141414] text-white/65 border-white/10 hover:border-white/30 hover:bg-[#1c1c1c] hover:text-white"
                }`}
              >
                {isSelected && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-white" />
                )}

                <span className="truncate pl-1">{c.name}</span>
                
                {isSelected ? (
                  <TbChevronRight size={14} className="shrink-0 ml-1 text-white" />
                ) : (
                  <span className="text-[9px] font-mono text-white/30">JSX</span>
                )}
              </button>
            )
          })
        )}
      </div>

      <div className="p-3.5 bg-[#111111] border-t border-white/10 text-[10px] font-mono text-white/40 flex items-center justify-between">
        <span className="truncate">MORPHYXUI v2.4</span>
        <span className="text-emerald-400">SYNCHRONIZED</span>
      </div>
    </>
  )
}

function AllComponents() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { allComponents } = useSelector((s) => s.user)
  const [selected, setSelected] = useState(null)
  const [search, setSearch] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const containerRef = useRef(null)

  // Mount hone par backend se fresh public components fetch karein
  useEffect(() => {
    const fetchPublicComponents = async () => {
      try {
        const res = await axios.get(`${ServerUrl}/api/components/all`, { withCredentials: true })
        if (res.data) {
          dispatch(setAllComponents(res.data))
        }
      } catch (err) {
        try {
          const res2 = await axios.get(`${ServerUrl}/api/components/getall`, { withCredentials: true })
          if (res2.data) {
            dispatch(setAllComponents(res2.data))
          }
        } catch (e) {
          // ignore error
        }
      }
    }
    fetchPublicComponents()
  }, [dispatch])

  // Robust public component filtering
  const publicComponents = (allComponents || [])
    .filter((c) => c.visibility === "public" || c.isPublished === true || c.status === "published")
    .filter((c) => c.name?.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.name?.localeCompare(b.name))

  const handleSelect = (c) => {
    setSelected(c)
    setSidebarOpen(false)
  }

  // GSAP Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gsap-explore-nav",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", clearProps: "transform,opacity" }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#070707] text-white flex flex-col overflow-hidden selection:bg-white selection:text-black"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:56px_56px] pointer-events-none z-0" />

      {/* Top Navigation Bar */}
      <nav className="gsap-explore-nav sticky top-0 z-40 flex items-center justify-between px-5 sm:px-8 py-3.5 border-b border-white/15 bg-[#0d0d0d]/95 backdrop-blur-md shrink-0 relative z-20">
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
              Component Explorer
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-white/50 border-r border-white/15 pr-6">
            <TbTerminal2 size={15} className="text-white/70" />
            <span>npm i morphyx-ui</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/generate')}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white text-black hover:bg-neutral-200 font-bold text-xs uppercase tracking-wider rounded-none cursor-pointer border-none transition-colors"
            >
              <TbSparkles size={14} /> AI Studio
            </button>

            <button
              onClick={() => navigate('/')}
              className="px-3.5 py-2 bg-transparent hover:bg-white/10 text-white font-mono text-xs uppercase tracking-wider border border-white/20 rounded-none cursor-pointer transition-colors"
            >
              ← Home
            </button>

            <button 
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="sm:hidden flex items-center justify-center w-9 h-9 rounded-none bg-[#161616] border border-white/20 text-white hover:bg-black transition-colors cursor-pointer"
            >
              <TbMenu2 size={18} />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Workspace */}
      <div
        className="flex flex-1 overflow-hidden relative z-10"
        style={{ height: "calc(100vh - 61px)" }}
      >
        <aside className="hidden sm:flex w-64 md:w-72 shrink-0 flex-col border-r border-white/15 bg-[#0e0e0e] overflow-hidden">
          <SidebarComponent
            selected={selected}
            search={search}
            setSearch={setSearch} 
            publicComponents={publicComponents}
            onSelect={handleSelect}
          />
        </aside>
        
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSidebarOpen(false)}
                className="sm:hidden fixed inset-0 z-50 bg-black/85 backdrop-blur-sm"
              />
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 340, damping: 32 }}
                className="sm:hidden fixed top-0 left-0 z-50 h-full w-80 flex flex-col bg-[#0e0e0e] border-r border-white/20"
              >
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/15 bg-[#141414]">
                  <span className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                    Directory Index
                  </span>
                  <button 
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="w-8 h-8 rounded-none flex items-center justify-center text-white/60 hover:text-white hover:bg-black transition-colors cursor-pointer bg-transparent border border-white/20"
                  >
                    <TbX size={16} />
                  </button>
                </div>
                <SidebarComponent
                  selected={selected}
                  search={search}
                  setSearch={setSearch} 
                  publicComponents={publicComponents}
                  onSelect={handleSelect}
                />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        <main className="flex-1 overflow-auto bg-[#070707] min-w-0">
          {selected ? (
            <DetailPanel component={selected} onBack={() => setSelected(null)} />
          ) : (
            <GuidePanel />
          )}
        </main>
      </div>
    </div>
  )
}

export default AllComponents