import React, { useState } from 'react'
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
  TbBrandNpm
} from "react-icons/tb"
import { useSelector } from 'react-redux'
import { LiveComponentPreview } from '../components/LiveComponentPreview'

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 3500)
  }

  return (
    <button 
      type="button"
      onClick={handleCopy}
      className='flex items-center gap-1.5 text-[11px] text-[#f5eff2]/40 hover:text-[#f5eff2] transition-colors bg-transparent border-none cursor-pointer px-2 py-1 rounded-lg hover:bg-white/[0.04]'
    >
      {copied ? <TbCheck size={13} className="text-[#34d399]" /> : <TbCopy size={13} />}
      {copied ? "Copied" : "Copy"}
    </button>
  )
}

function CodeBlock({ code, lang = "jsx" }) {
  return (
    <div 
      className='rounded-xl overflow-hidden'
      style={{ background: "#0c080a", border: "1px solid rgba(255, 255, 255, 0.06)" }}
    >
      <div className='flex items-center justify-between px-4 py-2 border-b border-white/[0.05]'>
        <span className='text-[10px] text-[#f5eff2]/30 font-mono uppercase tracking-widest'>{lang}</span>
        <CopyBtn text={code} />
      </div>
      <pre className='px-4 py-3.5 text-[12px] font-mono text-[#fbcfe8] leading-relaxed overflow-x-auto whitespace-pre'>
        {code}
      </pre>
    </div>
  )
}

function GuidePanel() {
  const { userData } = useSelector((s) => s.user)

  return (
    <div className='flex flex-col items-center justify-center h-full px-6 sm:px-8 text-center py-10 sm:py-16'>
      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='w-full'
      >
        <div className='w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#2a171f] border border-[#e11d48]/25 flex items-center justify-center mx-auto mb-5 sm:mb-6 shadow-[0_0_20px_rgba(244,63,94,0.15)]'>
          <TbPackage size={24} className='text-[#f43f5e]' />
        </div>
        {userData ? (
          <>
            <h2 className='text-base sm:text-lg font-bold mb-2 text-[#f5eff2]/90'>Select a component</h2>
            <p className='text-[#f5eff2]/40 text-xs sm:text-sm mb-8 sm:mb-10 max-w-sm mx-auto leading-relaxed'>
              Click any component from the sidebar to see its preview, code, and usage guide.
            </p>
          </>
        ) : (
          <>
            <h2 className='text-base sm:text-lg font-bold mb-2 text-[#f5eff2]/90'>Sign in to explore components</h2>
            <p className='text-[#f5eff2]/40 text-xs sm:text-sm mb-8 sm:mb-10 max-w-sm mx-auto leading-relaxed'>
              Sign in first to browse prebuilt components, live preview, and usage guide.
            </p>
          </>
        )}
        <div className='w-full max-w-md mx-auto text-left space-y-4 mb-8'>
          <p className='text-[10px] font-bold tracking-[3px] uppercase text-[#f43f5e] mb-4'>
            Quick Start Guide
          </p>
          <div>
            <p className='text-xs text-[#f5eff2]/50 mb-2 flex items-center gap-1.5'>
              <span className='text-[#f43f5e] font-bold'>01</span>
              Install the packages
            </p>
            <CodeBlock code={`npm install morphyx-ui`} lang='bash' />
          </div>
          <div>
            <p className='text-xs text-[#f5eff2]/50 mb-2 flex items-center gap-1.5'>
              <span className='text-[#f43f5e] font-bold'>02</span>
              Import your component
            </p>
            <CodeBlock code={`import { ComponentName } from "morphyx-ui"`} lang='jsx' />
          </div>
          <div>
            <p className='text-xs text-[#f5eff2]/50 mb-2 flex items-center gap-1.5'>
              <span className='text-[#f43f5e] font-bold'>03</span>
              Use in your App.jsx
            </p>
            <CodeBlock 
              code={`import { UserAvatar, PricingCard } from "morphyx-ui";\n\nexport default function App() {\n  return (\n    <div>\n      <UserAvatar src="/user.png" />\n      <PricingCard title="Pro" price={99} />\n    </div>\n  );\n}`} 
              lang='jsx' 
            />
          </div>
        </div>
        <p className='text-[#f5eff2]/25 text-xs'>
          ← Select a component from the sidebar to get started
        </p>
      </motion.div>
    </div>
  )
}

function DetailPanel({ component, onBack }) {
  const [activeTab, setActiveTab] = useState("preview")
  const importCode = `import { ${component.name} } from "morphyx-ui";`
  const usageCode = `import { ${component.name} } from "morphyx-ui";\n\nexport default function App() {\n  return (\n    <div>\n      <${component.name}${
    component.props?.length 
      ? `\n        ${component.props.map((p) => `${p}={/* value */}`).join("\n        ")}`
      : ""
  } />\n    </div>\n  );\n}`

  return (
    <motion.div
      key={component._id}
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35 }}
      className='flex flex-col h-full'
    >
      {/* Header */}
      <div className="flex items-start sm:items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-white/[0.06] gap-3 flex-wrap">
        <div className="flex items-center gap-3 min-w-0">
          {onBack && (
            <button 
              type="button"
              onClick={onBack}
              className="sm:hidden flex items-center justify-center w-8 h-8 rounded-xl bg-white/[0.05] border border-white/[0.08] text-[#f5eff2]/50 hover:text-white transition-colors cursor-pointer shrink-0"
            >
              <TbX size={14} />
            </button>
          )}
          <div className="min-w-0">
            <h2 className="text-sm sm:text-base font-bold text-[#f5eff2] truncate">
              {component.name}
            </h2>
            <p className="text-[#f5eff2]/40 text-[11px] sm:text-xs mt-0.5 truncate">
              {component.props?.length > 0 ? `Props: ${component.props.join(", ")}` : "No props required"}
            </p>
          </div>
        </div>

        <div 
          className="flex gap-1 rounded-xl p-1 overflow-x-auto shrink-0 bg-white/[0.03] border border-white/[0.05]"
        >
          {[
            { id: "preview", icon: TbEye, label: "Preview" },
            { id: "code", icon: TbCode, label: "Code" },
            { id: "guide", icon: TbBox, label: "Guide" },
          ].map(({ id, icon: Icon, label }) => (
            <button 
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium transition-all capitalize cursor-pointer border-none whitespace-nowrap"
              style={{
                background: activeTab === id ? "#1b1015" : "transparent",
                color: activeTab === id ? "#fbcfe8" : "rgba(245,239,242,0.45)",
                border: activeTab === id ? "1px solid rgba(225,29,72,0.35)" : "1px solid transparent",
                boxShadow: activeTab === id ? "0 0 12px rgba(244,63,94,0.15)" : "none"
              }}
            >
              <Icon size={12} className={activeTab === id ? "text-[#f43f5e]" : ""} /> {label}
            </button>
          ))}
        </div>
      </div>

      <div className='flex-1 overflow-y-auto p-4 sm:p-6'>
        <AnimatePresence mode='wait'>
          {activeTab === "preview" && (
            <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <LiveComponentPreview code={component.code} />
            </motion.div>
          )}

          {activeTab === "code" && (
            <motion.div key="code" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <CodeBlock code={component.code} lang='jsx' />
            </motion.div>
          )}

          {activeTab === "guide" && (
            <motion.div key="guide" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
              {component.props?.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-[#f5eff2]/50 mb-3 flex items-center gap-2">
                    <TbBox size={14} className="text-[#f43f5e]" /> Props
                  </p>
                  <div className="rounded-xl overflow-hidden border border-white/[0.08] bg-[#0c080a]">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                          <th className="text-left px-4 py-2.5 text-[#f5eff2]/40 font-medium">Name</th>
                          <th className="text-left px-4 py-2.5 text-[#f5eff2]/40 font-medium">Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {component.props.map((p, i) => (
                          <tr key={i} className='border-b border-white/[0.04] last:border-0'>
                            <td className="px-4 py-2.5 font-mono text-[#fda4af]">{p}</td>
                            <td className="px-4 py-2.5 text-[#f5eff2]/30">any</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div>
                <p className="text-xs font-semibold text-[#f5eff2]/50 mb-2.5 flex items-center gap-2">
                  <TbBrandNpm size={14} className="text-[#f43f5e]" /> Install
                </p>
                <CodeBlock code={`npm install morphyx-ui`} lang='bash' /> 
              </div>

              <div>
                <p className="text-xs font-semibold text-[#f5eff2]/50 mb-2.5 flex items-center gap-2">
                  <TbCode size={14} className="text-[#f43f5e]" /> Import
                </p>
                <CodeBlock code={importCode} lang='jsx' /> 
              </div>

              <div>
                <p className="text-xs font-semibold text-[#f5eff2]/50 mb-2.5 flex items-center gap-2">
                  <TbEye size={14} className="text-[#f43f5e]" /> Usage in App.jsx
                </p>
                <CodeBlock code={usageCode} lang='jsx' /> 
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

function SidebarComponent({ publicComponents, selected, onSelect, search, setSearch }) {
  return (
    <>
      <div className='px-3 py-3 border-b border-white/[0.05]'>
        <div className='flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06]'>
          <TbSearch size={13} className='text-white/25 shrink-0' />
          <input 
            placeholder='Search...'
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className='bg-transparent text-xs text-[#f5eff2]/70 placeholder-white/20 outline-none w-full'
          />
        </div>
      </div>
      <div className='px-4 pt-3 pb-1.5'>
        <p className='text-[9px] font-bold tracking-[2.5px] uppercase text-[#f5eff2]/30'>
          Public · {publicComponents.length}
        </p>
      </div>

      <div className='flex-1 overflow-y-auto py-1 px-2'>
        {publicComponents.length === 0 ? (
          <p className='text-[#f5eff2]/30 text-xs text-center py-8 px-3'>
            No public components yet
          </p>
        ) : (
          publicComponents.map((c) => (
            <button
              key={c._id}
              type="button"
              onClick={() => onSelect(c)}
              className='w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all cursor-pointer border text-left mb-0.5'
              style={{
                background: selected?._id === c._id ? "rgba(244,63,94,0.12)" : "transparent",
                borderColor: selected?._id === c._id ? "rgba(225,29,72,0.3)" : "transparent",
                color: selected?._id === c._id ? "#fbcfe8" : "rgba(245,239,242,0.5)",
              }}
            >
              <span className='truncate font-medium text-xs'>{c.name}</span>
              {selected?._id === c._id && (
                <TbChevronRight size={13} className='shrink-0 ml-1 text-[#f43f5e]' />
              )}
            </button>
          ))
        )}
      </div>
    </>
  )
}

function AllComponents() {
  const navigate = useNavigate()
  const { allComponents } = useSelector((s) => s.user)
  const [selected, setSelected] = useState(null)
  const [search, setSearch] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const publicComponents = (allComponents || [])
    .filter((c) => c.visibility === "public")
    .filter((c) => c.name?.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.name?.localeCompare(b.name))

  const handleSelect = (c) => {
    setSelected(c)
    setSidebarOpen(false)
  }

  return (
    <div
      className='min-h-screen bg-[#070507] text-[#f5eff2] flex flex-col overflow-hidden'
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Navbar */}
      <nav className='sticky top-0 z-40 flex items-center justify-between px-4 sm:px-8 py-3.5 border-b border-white/[0.05] bg-[#070507]/90 backdrop-blur-md shrink-0'>
        <button 
          type="button"
          onClick={() => navigate("/")}
          className='flex items-center gap-2 sm:gap-2.5 bg-transparent border-none cursor-pointer'
        >
          <div className='w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-[#be123c] to-[#f43f5e] flex items-center justify-center shadow-[0_0_14px_rgba(244,63,94,0.35)]'>
            <TbHexagonLetterM size={13} color='#ffffff' />
          </div>
          <span
            className='text-sm sm:text-base font-bold text-white'
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            MorphyxUI
          </span>
        </button>

        <div className='flex items-center gap-2'>
          <div className='hidden sm:flex items-center gap-2 text-xs text-[#f5eff2]/30'>
            <TbLayoutSidebarLeftExpand size={14} />
            <span>Component Explorer</span>
          </div>

          <button 
            type="button"
            onClick={() => setSidebarOpen(true)}
            className='sm:hidden flex items-center justify-center w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#f5eff2]/50 hover:text-[#f5eff2]/80 transition-colors cursor-pointer'
          >
            <TbMenu2 size={16} />
          </button>
        </div>
      </nav>

      {/* Main Container */}
      <div
        className='flex flex-1 overflow-hidden'
        style={{ height: "calc(100vh - 57px)" }}
      >
        <aside className='hidden sm:flex w-52 md:w-56 shrink-0 flex-col border-r border-white/[0.06] bg-[#0c080a] overflow-hidden'>
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
                className='sm:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm'
              />
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 320, damping: 32 }}
                className='sm:hidden fixed top-0 left-0 z-50 h-full w-72 flex flex-col bg-[#0c080a] border-r border-white/[0.08]'
              >
                <div className='flex items-center justify-between px-4 py-4 border-b border-white/[0.06]'>
                  <span className='text-xs font-bold text-[#f5eff2]/40 tracking-widest uppercase'>
                    Components
                  </span>
                  <button 
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className='w-7 h-7 rounded-lg flex items-center justify-center text-[#f5eff2]/40 hover:text-[#f5eff2]/70 hover:bg-white/[0.06] transition-colors cursor-pointer bg-transparent border-none'
                  >
                    <TbX size={14} />
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

        <main className='flex-1 overflow-auto bg-[#070507] min-w-0'>
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