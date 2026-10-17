import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TbHexagonLetterM,
  TbSearch,
  TbTerminal2,
  TbCopy,
  TbCheck,
  TbChevronRight,
  TbChevronDown,
  TbMenu2,
  TbX,
  TbPackage,
  TbCode,
  TbEye,
  TbBox,
  TbBrandNpm,
  TbBrandGithub,
  TbArrowLeft,
  TbArrowRight,
  TbSparkles,
  TbLayersLinked,
  TbCpu,
  TbShieldCheck,
  TbRocket,
  TbDeviceDesktop,
  TbDeviceTablet,
  TbDeviceMobile,
  TbFileCode,
  TbAdjustments
} from 'react-icons/tb'

// ============================================================================
// DOCUMENTATION REGISTRY & REAL API DATA
// ============================================================================

const DOCS_NAV = [
  {
    category: "Getting Started",
    items: [
      { id: "introduction", label: "Introduction", badge: null },
      { id: "installation", label: "Installation", badge: "CLI" },
      { id: "quick-start", label: "Quick Start", badge: null },
      { id: "project-structure", label: "Project Structure", badge: null },
    ]
  },
  {
    category: "Components",
    items: [
      { id: "button", label: "Button", badge: "Core" },
      { id: "card", label: "GlassCard", badge: "Core" },
      { id: "badge", label: "StatBadge", badge: "Core" },
      { id: "input", label: "TerminalInput", badge: "New" },
      { id: "modal", label: "BrutalistModal", badge: null },
    ]
  },
  {
    category: "Design System",
    items: [
      { id: "theming", label: "Monochrome Palette", badge: null },
      { id: "typography", label: "Typography & Fonts", badge: null },
      { id: "accessibility", label: "WAI-ARIA Standards", badge: "99.8%" },
    ]
  },
  {
    category: "Resources",
    items: [
      { id: "cli-reference", label: "CLI Reference", badge: "v2.4" },
      { id: "faq", label: "Frequently Asked Questions", badge: null },
    ]
  }
]

// Real Component Specifications
const COMPONENT_SPECS = {
  button: {
    title: "Button",
    description: "Accessible, high-contrast action primitive with architectural borders and subtle tactile interactions.",
    props: [
      { name: "variant", type: "'solid' | 'outline' | 'subtle'", default: "'solid'", description: "Visual appearance style" },
      { name: "size", type: "'sm' | 'md' | 'lg'", default: "'md'", description: "Sizing and padding scale" },
      { name: "disabled", type: "boolean", default: "false", description: "Disables interaction and triggers opacity mute" },
      { name: "children", type: "ReactNode", default: "required", description: "Button label or inline icon content" },
    ],
    code: `import React from 'react';

export function Button({ 
  children, 
  variant = 'solid', 
  size = 'md', 
  className = '', 
  ...props 
}) {
  const base = "font-mono uppercase font-bold tracking-wider inline-flex items-center justify-center transition-all cursor-pointer border rounded-none select-none";
  
  const variants = {
    solid: "bg-white text-black hover:bg-neutral-200 border-white shadow-[0_4px_14px_rgba(255,255,255,0.15)]",
    outline: "bg-transparent text-white hover:bg-white hover:text-black border-white/30 hover:border-white",
    subtle: "bg-white/5 text-white/80 hover:bg-white/10 hover:text-white border-white/10 hover:border-white/20"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-[10px]",
    md: "px-5 py-2.5 text-xs",
    lg: "px-7 py-3.5 text-sm"
  };

  return (
    <button 
      className={\`\${base} \${variants[variant]} \${sizes[size]} \${className}\`} 
      {...props}
    >
      {children}
    </button>
  );
}`,
    demo: (
      <div className="flex flex-wrap items-center gap-4">
        <button className="px-5 py-2.5 bg-white text-black font-mono text-xs font-bold uppercase tracking-wider border border-white hover:bg-neutral-200 transition-colors cursor-pointer rounded-none">
          Deploy Interface
        </button>
        <button className="px-5 py-2.5 bg-transparent text-white font-mono text-xs font-bold uppercase tracking-wider border border-white/30 hover:border-white hover:bg-white hover:text-black transition-colors cursor-pointer rounded-none">
          Frosted Outline
        </button>
        <button className="px-5 py-2.5 bg-white/5 text-white/70 font-mono text-xs font-bold uppercase tracking-wider border border-white/10 hover:bg-white/10 hover:text-white transition-colors cursor-pointer rounded-none">
          Subtle Frame
        </button>
      </div>
    )
  },
  card: {
    title: "GlassCard",
    description: "Monochrome architectural surface designed for telemetry dashboards and data-dense views.",
    props: [
      { name: "blur", type: "'sm' | 'md' | 'lg' | 'xl'", default: "'xl'", description: "Backdrop blur intensity level" },
      { name: "theme", type: "'monochrome' | 'dark'", default: "'monochrome'", description: "Border contrast and background shading" },
      { name: "children", type: "ReactNode", default: "required", description: "Internal card surface elements" },
    ],
    code: `import React from 'react';

export function GlassCard({ children, blur = 'xl', className = '' }) {
  return (
    <div className={\`relative border border-white/15 bg-[#121212]/90 backdrop-blur-\${blur} p-6 sm:p-8 rounded-none shadow-[0_20px_50px_rgba(0,0,0,0.8)] \${className}\`}>
      <span className="absolute top-2 left-2 text-[9px] font-mono text-white/20 select-none">+ SURFACE.01</span>
      {children}
    </div>
  );
}`,
    demo: (
      <div className="relative border border-white/20 bg-[#121212] p-6 max-w-sm w-full rounded-none shadow-2xl">
        <span className="absolute top-2 left-2 text-[9px] font-mono text-white/25">+ CARD.CORE</span>
        <div className="flex items-center justify-between mb-4 mt-2">
          <span className="text-[10px] font-mono uppercase tracking-[2px] text-white/50">ANALYTICS SPEC</span>
          <span className="text-emerald-400 text-[10px] font-mono font-bold">● ACTIVE</span>
        </div>
        <p className="text-xl font-extrabold text-white font-mono">14.8k Units</p>
        <p className="text-xs text-white/50 mt-1">Zero-runtime React performance verified across all responsive viewports.</p>
      </div>
    )
  },
  badge: {
    title: "StatBadge",
    description: "Compact status indicator for displaying system telemetry, counters, and runtime attributes.",
    props: [
      { name: "label", type: "string", default: "required", description: "Metadata descriptor text" },
      { name: "count", type: "string | number", default: "null", description: "Numerical or status value" },
      { name: "status", type: "'neutral' | 'live' | 'warn'", default: "'neutral'", description: "Color accent of status node" },
    ],
    code: `import React from 'react';

export function StatBadge({ label, count, status = 'neutral' }) {
  const statusColors = {
    neutral: 'bg-white',
    live: 'bg-emerald-400',
    warn: 'bg-amber-400'
  };

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/15 text-[10px] font-mono uppercase tracking-wider text-white rounded-none">
      <span className={\`w-1.5 h-1.5 \${statusColors[status]}\`} />
      <span className="text-white/60">{label}</span>
      {count && <span className="font-bold text-white border-l border-white/20 pl-2">{count}</span>}
    </div>
  );
}`,
    demo: (
      <div className="flex flex-wrap gap-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/15 text-[10px] font-mono uppercase tracking-wider text-white rounded-none">
          <span className="w-1.5 h-1.5 bg-emerald-400" />
          <span className="text-white/60">ACCURACY</span>
          <span className="font-bold text-white border-l border-white/20 pl-2">99.8%</span>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/15 text-[10px] font-mono uppercase tracking-wider text-white rounded-none">
          <span className="w-1.5 h-1.5 bg-white" />
          <span className="text-white/60">RUNTIME</span>
          <span className="font-bold text-white border-l border-white/20 pl-2">0KB</span>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/15 text-[10px] font-mono uppercase tracking-wider text-white rounded-none">
          <span className="w-1.5 h-1.5 bg-amber-400" />
          <span className="text-white/60">VERSION</span>
          <span className="font-bold text-white border-l border-white/20 pl-2">v2.4</span>
        </div>
      </div>
    )
  },
  input: {
    title: "TerminalInput",
    description: "Technical, monospace input field styled after architectural CLI docks.",
    props: [
      { name: "prefix", type: "string", default: "'>'", description: "Leading terminal indicator symbol" },
      { name: "placeholder", type: "string", default: "''", description: "Placeholder guidance text" },
      { name: "error", type: "string", default: "null", description: "Validation error status text" },
    ],
    code: `import React from 'react';

export function TerminalInput({ prefix = '>', placeholder, ...props }) {
  return (
    <div className="flex items-center border border-white/20 bg-[#0c0c0c] px-3.5 py-2.5 rounded-none focus-within:border-white transition-colors">
      <span className="font-mono text-xs text-white/40 mr-2.5 select-none">{prefix}</span>
      <input
        placeholder={placeholder}
        className="w-full bg-transparent font-mono text-xs text-white placeholder-white/30 outline-none uppercase tracking-wider"
        {...props}
      />
    </div>
  );
}`,
    demo: (
      <div className="w-full max-w-sm">
        <div className="flex items-center border border-white/20 bg-[#0c0c0c] px-3.5 py-2.5 rounded-none focus-within:border-white transition-colors">
          <span className="font-mono text-xs text-white/40 mr-2.5 select-none">&gt;</span>
          <input
            defaultValue="npm install morphyx-ui"
            className="w-full bg-transparent font-mono text-xs text-white placeholder-white/30 outline-none uppercase tracking-wider"
          />
        </div>
      </div>
    )
  },
  modal: {
    title: "BrutalistModal",
    description: "Dual-panel split modal with dark telemetry view and high-contrast action portal.",
    props: [
      { name: "isOpen", type: "boolean", default: "false", description: "Controls viewport visibility" },
      { name: "onClose", type: "() => void", default: "required", description: "Modal dismissal callback" },
      { name: "children", type: "ReactNode", default: "required", description: "Modal interior content" },
    ],
    code: `import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function BrutalistModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 15 }}
        className="relative bg-[#141414] border border-white/20 max-w-lg w-full p-8 rounded-none shadow-2xl text-white"
      >
        <button 
          onClick={onClose}
          className="absolute top-0 right-0 w-10 h-10 bg-black border-l border-b border-white/20 text-white flex items-center justify-center cursor-pointer"
        >
          ✕
        </button>
        {children}
      </motion.div>
    </div>
  );
}`,
    demo: (
      <div className="p-6 bg-[#141414] border border-white/20 max-w-md w-full relative">
        <span className="text-[10px] font-mono text-white/40 uppercase tracking-[2px] block mb-2">DIALOG SPEC</span>
        <h4 className="text-base font-bold uppercase tracking-wider text-white mb-2">Deterministic Dialog</h4>
        <p className="text-xs text-white/60 mb-4 leading-relaxed">
          Zero curved edges. High-contrast dismiss triggers with backdrop isolation.
        </p>
        <button className="px-4 py-2 bg-white text-black font-mono text-xs font-bold uppercase tracking-wider border-none cursor-pointer">
          Acknowledge Spec
        </button>
      </div>
    )
  }
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

// Monospace Code Block with Clean Copy Indicator
function DocsCodeBlock({ code, lang = "jsx", label = null }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="border border-white/15 bg-[#0c0c0c] rounded-none overflow-hidden my-4">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#141414] border-b border-white/10 text-[10px] font-mono uppercase tracking-[1.5px] text-white/50">
        <span>{label || lang}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-0.5 bg-white/5 hover:bg-white hover:text-black text-white/70 transition-colors cursor-pointer border border-white/15 rounded-none"
        >
          {copied ? <TbCheck size={12} className="text-emerald-400" /> : <TbCopy size={12} />}
          <span>{copied ? "COPIED" : "COPY"}</span>
        </button>
      </div>
      <pre className="p-4 sm:p-5 text-xs font-mono text-neutral-200 leading-relaxed overflow-x-auto whitespace-pre selection:bg-white selection:text-black">
        {code}
      </pre>
    </div>
  )
}

// Global Command Palette / Search Modal (Ctrl + K)
function DocsSearchModal({ isOpen, onClose, onSelectDoc }) {
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setQuery("")
      setSelectedIndex(0)
    }
  }, [isOpen])

  // Flattened searchable index
  const allItems = useMemo(() => {
    const list = []
    DOCS_NAV.forEach(cat => {
      cat.items.forEach(item => {
        list.push({
          ...item,
          category: cat.category,
          searchStr: `${cat.category} ${item.label} ${item.id}`.toLowerCase()
        })
      })
    })
    return list
  }, [])

  const filtered = useMemo(() => {
    if (!query.trim()) return allItems
    const q = query.toLowerCase()
    return allItems.filter(item => item.searchStr.includes(q))
  }, [allItems, query])

  // Keyboard navigation inside search palette
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex(prev => (prev + 1) % (filtered.length || 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex(prev => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1))
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault()
      onSelectDoc(filtered[selectedIndex].id)
      onClose()
    } else if (e.key === "Escape") {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-sm select-none"
    >
      <div 
        onClick={e => e.stopPropagation()}
        className="w-full max-w-xl bg-[#111111] border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.95)] rounded-none overflow-hidden"
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/15 bg-[#161616]">
          <TbSearch size={18} className="text-white/40 mr-3 shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => { setQuery(e.target.value); setSelectedIndex(0); }}
            onKeyDown={handleKeyDown}
            placeholder="TYPE COMMAND OR SEARCH DIRECTORY..."
            className="w-full bg-transparent text-xs font-mono uppercase tracking-wider text-white placeholder-white/30 outline-none"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[9px] font-mono text-white/40 border border-white/15 bg-white/5 rounded-none">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-white/[0.04]">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-xs font-mono text-white/30 uppercase tracking-widest">
              NO MATCHING ARCHITECTURAL UNITS
            </div>
          ) : (
            filtered.map((item, idx) => {
              const active = idx === selectedIndex
              return (
                <div
                  key={item.id}
                  onClick={() => { onSelectDoc(item.id); onClose(); }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3.5 py-3 cursor-pointer transition-colors text-xs font-mono uppercase tracking-wider rounded-none ${
                    active ? "bg-white text-black" : "text-white/70 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] ${active ? "text-neutral-600 font-bold" : "text-white/35"}`}>
                      {item.category}
                    </span>
                    <span>/</span>
                    <span className="font-bold">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[9px] px-1.5 py-0.5 border ${
                      active ? "border-black text-black" : "border-white/20 text-white/50"
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </div>
              )
            })
          )}
        </div>

        {/* Modal Footer Keybinds */}
        <div className="px-4 py-2.5 bg-[#0a0a0a] border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40">
          <span>NAVIGATE: ↑ ↓</span>
          <span>SELECT: ENTER</span>
          <span>DISMISS: ESC</span>
        </div>
      </div>
    </div>
  )
}

// Component Documentation View
function DocsComponentView({ compKey, onNavigate }) {
  const spec = COMPONENT_SPECS[compKey]
  const [activeTab, setActiveTab] = useState("preview")
  const [viewport, setViewport] = useState("100%")

  if (!spec) {
    return (
      <div className="py-20 text-center font-mono text-xs text-white/40 uppercase">
        SPECIFICATION FOR [{compKey}] COMING SOON IN v2.5
      </div>
    )
  }

  return (
    <div className="space-y-10">
      {/* Component Title & Summary */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/15 text-[10px] font-mono uppercase tracking-[2px] text-white/60 mb-3 rounded-none">
          <TbBox size={13} /> COMPONENT PRIMITIVE
        </div>
        <h1 
          className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white mb-3"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {spec.title}
        </h1>
        <p className="text-sm sm:text-base text-white/60 leading-relaxed max-w-2xl">
          {spec.description}
        </p>
      </div>

      {/* Interactive Sandbox & Code Preview */}
      <div className="border border-white/15 bg-[#111111] rounded-none overflow-hidden">
        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-b border-white/15 bg-[#161616]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider border rounded-none cursor-pointer ${
                activeTab === "preview" ? "bg-white text-black border-white" : "bg-transparent text-white/50 border-transparent hover:text-white"
              }`}
            >
              PREVIEW
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider border rounded-none cursor-pointer ${
                activeTab === "code" ? "bg-white text-black border-white" : "bg-transparent text-white/50 border-transparent hover:text-white"
              }`}
            >
              CODE
            </button>
          </div>

          {activeTab === "preview" && (
            <div className="hidden sm:flex items-center border border-white/15 bg-[#0a0a0a] p-0.5">
              {[
                { w: "100%", icon: TbDeviceDesktop, tip: "100% Fluid" },
                { w: "768px", icon: TbDeviceTablet, tip: "768px Tablet" },
                { w: "380px", icon: TbDeviceMobile, tip: "380px Mobile" },
              ].map((vp) => (
                <button
                  key={vp.w}
                  onClick={() => setViewport(vp.w)}
                  title={vp.tip}
                  className={`p-1.5 transition-colors cursor-pointer border-none rounded-none ${
                    viewport === vp.w ? "bg-white text-black" : "bg-transparent text-white/40 hover:text-white"
                  }`}
                >
                  <vp.icon size={13} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sandbox Content Viewport */}
        <div className="p-6 sm:p-12 bg-[#070707] flex items-center justify-center min-h-[280px] relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
          
          <div style={{ width: viewport, maxWidth: "100%" }} className="relative z-10 flex items-center justify-center transition-all duration-300">
            {activeTab === "preview" ? (
              spec.demo
            ) : (
              <pre className="w-full text-xs font-mono text-neutral-200 leading-relaxed overflow-x-auto whitespace-pre selection:bg-white selection:text-black">
                {spec.code}
              </pre>
            )}
          </div>
        </div>
      </div>

      {/* Installation Snippet */}
      <div>
        <h3 className="text-xs font-mono font-bold uppercase tracking-[2px] text-white/60 mb-3 flex items-center gap-2">
          <TbTerminal2 size={15} /> 01 // INSTALLATION
        </h3>
        <DocsCodeBlock code="npm install morphyx-ui" lang="bash" label="TERMINAL INSTALL" />
      </div>

      {/* Manual File Copy Option */}
      <div>
        <h3 className="text-xs font-mono font-bold uppercase tracking-[2px] text-white/60 mb-3 flex items-center gap-2">
          <TbFileCode size={15} /> 02 // MANUAL DROP-IN SOURCE
        </h3>
        <p className="text-xs text-white/50 leading-relaxed mb-2 font-mono">
          Copy this self-contained implementation straight into your project:
        </p>
        <DocsCodeBlock code={spec.code} lang="jsx" label={`${spec.title}.jsx`} />
      </div>

      {/* Props Schema Table */}
      <div>
        <h3 className="text-xs font-mono font-bold uppercase tracking-[2px] text-white/60 mb-3 flex items-center gap-2">
          <TbAdjustments size={15} /> 03 // PROPS & API SPECIFICATION
        </h3>
        <div className="border border-white/15 bg-[#0e0e0e] overflow-x-auto rounded-none">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-white/15 bg-[#141414] text-white/50">
                <th className="p-3.5 uppercase tracking-wider">Property</th>
                <th className="p-3.5 uppercase tracking-wider">Type</th>
                <th className="p-3.5 uppercase tracking-wider">Default</th>
                <th className="p-3.5 uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-white/80">
              {spec.props.map((p, i) => (
                <tr key={i} className="hover:bg-white/[0.02]">
                  <td className="p-3.5 font-bold text-white">{p.name}</td>
                  <td className="p-3.5 text-neutral-400">{p.type}</td>
                  <td className="p-3.5 text-white/50">{p.default}</td>
                  <td className="p-3.5 text-white/70">{p.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// Introduction & Foundation Overview View
function DocsIntroductionView({ onNavigate }) {
  const navigate = useNavigate()

  return (
    <div className="space-y-12">
      {/* Editorial Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/5 border border-white/20 text-[10px] font-mono uppercase tracking-[2.5px] text-white/70 mb-4 rounded-none">
          <TbSparkles size={13} className="text-white" />
          DOCUMENTATION // CORE PARADIGM
        </div>

        <h1 
          className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white mb-5 leading-[1.08]"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Build Interfaces That <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-neutral-500">
            Feel Different.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-white/60 leading-relaxed max-w-2xl font-normal">
          MorphyxUI is a modern, architectural React UI component engine. Built with zero-runtime dependencies, strict geometry, high contrast, and accessible semantics.
        </p>

        {/* CTA Actions */}
        <div className="flex flex-wrap items-center gap-4 mt-8">
          <button
            onClick={() => onNavigate("installation")}
            className="px-6 py-3.5 bg-white text-black font-mono text-xs font-bold uppercase tracking-[1.5px] border border-white hover:bg-neutral-200 transition-colors cursor-pointer rounded-none"
          >
            Get Started →
          </button>
          <button
            onClick={() => onNavigate("button")}
            className="px-6 py-3.5 bg-transparent text-white font-mono text-xs font-bold uppercase tracking-[1.5px] border border-white/20 hover:border-white hover:bg-white/5 transition-colors cursor-pointer rounded-none"
          >
            Explore Components
          </button>
        </div>
      </div>

      {/* Feature Pillar Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[
          {
            icon: TbShieldCheck,
            title: "ZERO RUNTIME",
            desc: "Pure TailwindCSS utilities. No heavy styled-components or locked runtime stylesheets in your bundle."
          },
          {
            icon: TbCpu,
            title: "STRICT BRUTALISM",
            desc: "100% sharp square & rectangular geometry engineered for technical dashboards and developer tools."
          },
          {
            icon: TbLayersLinked,
            title: "COPY & PASTE READY",
            desc: "Install via NPM package or drop components straight into your repository as standalone JSX files."
          }
        ].map((feat, i) => (
          <div key={i} className="p-6 border border-white/15 bg-[#111111] relative rounded-none">
            <span className="absolute top-2 right-2 text-[9px] font-mono text-white/25">+ 0{i + 1}</span>
            <div className="w-8 h-8 border border-white/20 bg-white/5 flex items-center justify-center text-white mb-4 rounded-none">
              <feat.icon size={16} />
            </div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-2">{feat.title}</h4>
            <p className="text-xs text-white/50 leading-relaxed font-mono">{feat.desc}</p>
          </div>
        ))}
      </div>

      {/* Quick Start Section */}
      <div className="space-y-4 pt-4 border-t border-white/15">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-white">
          <TbTerminal2 size={16} /> QUICK INSTALLATION CLI
        </div>
        <p className="text-xs text-white/50 leading-relaxed font-mono">
          Initialize MorphyxUI in your modern React 18 or 19 application via the NPM registry:
        </p>
        <DocsCodeBlock code="npm install morphyx-ui" lang="bash" label="CLI" />
      </div>

      {/* Usage Example */}
      <div className="space-y-4">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
          SAMPLE PRODUCTION USAGE
        </h3>
        <DocsCodeBlock 
          code={`import React from 'react';
import { GlassCard, Button, StatBadge } from 'morphyx-ui';

export default function AnalyticsDashboard() {
  return (
    <GlassCard blur="xl">
      <div className="flex items-center justify-between mb-4">
        <StatBadge label="Status" count="Live" status="live" />
        <StatBadge label="Latency" count="12ms" />
      </div>
      <h2 className="text-lg font-mono font-bold text-white mb-2">
        Operational Pipeline
      </h2>
      <Button variant="solid" size="md">
        Deploy To Cluster
      </Button>
    </GlassCard>
  );
}`}
          lang="jsx"
          label="src/App.jsx"
        />
      </div>
    </div>
  )
}

// Installation Guide View
function DocsInstallationView({ onNavigate }) {
  return (
    <div className="space-y-10">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/15 text-[10px] font-mono uppercase tracking-[2px] text-white/60 mb-3 rounded-none">
          <TbBrandNpm size={14} /> GETTING STARTED // STEP 01
        </div>
        <h1 
          className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white mb-3"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Installation
        </h1>
        <p className="text-sm sm:text-base text-white/60 leading-relaxed max-w-2xl font-normal">
          How to install, configure Tailwind CSS, and register MorphyxUI inside your application.
        </p>
      </div>

      <div>
        <h3 className="text-xs font-mono font-bold uppercase tracking-[2px] text-white/60 mb-3">
          01 // INSTALL PACKAGE VIA NPM
        </h3>
        <DocsCodeBlock code="npm install morphyx-ui" lang="bash" label="NPM" />
      </div>

      <div>
        <h3 className="text-xs font-mono font-bold uppercase tracking-[2px] text-white/60 mb-3">
          02 // TAILWIND CSS CONFIGURATION
        </h3>
        <p className="text-xs text-white/50 leading-relaxed mb-3 font-mono">
          Ensure your <code className="text-white">tailwind.config.js</code> scans the MorphyxUI package export paths:
        </p>
        <DocsCodeBlock 
          code={`/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/morphyx-ui/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['DM Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}`}
          lang="javascript"
          label="tailwind.config.js"
        />
      </div>

      <div>
        <h3 className="text-xs font-mono font-bold uppercase tracking-[2px] text-white/60 mb-3">
          03 // MANUAL LOCAL CLONE (NO NPM ALTERNATIVE)
        </h3>
        <p className="text-xs text-white/50 leading-relaxed mb-3 font-mono">
          If you prefer zero dependencies without an npm package, copy components directly into your local <code className="text-white">/components</code> directory as demonstrated in each component's specification page.
        </p>
      </div>
    </div>
  )
}

// Fallback/Generic Documentation View for Unpopulated Chapters
function DocsGenericView({ docId }) {
  const currentItem = useMemo(() => {
    for (const cat of DOCS_NAV) {
      const match = cat.items.find(i => i.id === docId)
      if (match) return match
    }
    return { label: docId.toUpperCase() }
  }, [docId])

  return (
    <div className="space-y-6">
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/15 text-[10px] font-mono uppercase tracking-[2px] text-white/60 rounded-none">
        <TbFileCode size={13} /> SPECIFICATION ACTIVE
      </div>
      <h1 
        className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        {currentItem.label}
      </h1>
      <p className="text-sm text-white/50 font-mono leading-relaxed max-w-xl">
        This section is actively synchronized with the MorphyxUI v2.4 core repository. All specifications follow strict zero-runtime paradigms and pure Tailwind class compositions.
      </p>
      <div className="border border-white/15 bg-[#111111] p-6 text-xs font-mono text-white/70 space-y-2">
        <p className="text-white font-bold">STATUS: COMPLIANT</p>
        <p>• Tailwind CSS 3.4+ compatible</p>
        <p>• Zero runtime style injection</p>
        <p>• Native keyboard accessibility hooks</p>
      </div>
    </div>
  )
}

// ============================================================================
// MASTER DOCUMENTATION PAGE
// ============================================================================

export default function Docs() {
  const navigate = useNavigate()
  const [activeDoc, setActiveDoc] = useState("introduction")
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  const [collapsedCategories, setCollapsedCategories] = useState({})

  // Keyboard shortcut listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setSearchOpen((prev) => !prev)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Scroll to top of doc content on section change
  const contentRef = useRef(null)
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
  }, [activeDoc])

  const toggleCategory = (cat) => {
    setCollapsedCategories(prev => ({
      ...prev,
      [cat]: !prev[cat]
    }))
  }

  // Next / Previous Navigation Calculator
  const { prevDoc, nextDoc } = useMemo(() => {
    const flattened = []
    DOCS_NAV.forEach(cat => {
      cat.items.forEach(item => flattened.push(item))
    })
    const idx = flattened.findIndex(i => i.id === activeDoc)
    return {
      prevDoc: idx > 0 ? flattened[idx - 1] : null,
      nextDoc: idx < flattened.length - 1 ? flattened[idx + 1] : null
    }
  }, [activeDoc])

  return (
    <div 
      className="min-h-screen bg-[#070707] text-white flex flex-col overflow-hidden selection:bg-white selection:text-black"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Blueprint Grid Lines Overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:56px_56px] pointer-events-none z-0" />

      {/* =====================================================================
          TOP NAVIGATION BAR
      ====================================================================== */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-5 sm:px-8 py-3.5 border-b border-white/15 bg-[#0d0d0d]/95 backdrop-blur-md relative z-30 select-none">
        
        {/* Brand Trigger */}
        <div 
          onClick={() => navigate('/')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-none border border-white/30 bg-white/5 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
            <TbHexagonLetterM size={18} />
          </div>
          <div>
            <span 
              className="text-base font-bold uppercase tracking-wider text-white block leading-none"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              MorphyxUI
            </span>
            <span className="text-[9px] font-mono uppercase tracking-[2px] text-white/40 block mt-1">
              Documentation v2.4
            </span>
          </div>
        </div>

        {/* Center / Right Quick Actions */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Search Trigger Button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#141414] hover:bg-[#1a1a1a] border border-white/15 text-white/60 hover:text-white transition-colors cursor-pointer rounded-none text-xs font-mono"
          >
            <TbSearch size={14} />
            <span className="hidden sm:inline">Search Documentation...</span>
            <span className="sm:hidden">Search</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono text-white/40 border border-white/15 bg-white/5 rounded-none ml-2">
              ⌘K
            </kbd>
          </button>

          {/* Quick Links */}
          <div className="hidden md:flex items-center gap-4 text-xs font-mono">
            <button 
              onClick={() => navigate('/components')} 
              className="text-white/60 hover:text-white transition-colors bg-transparent border-none cursor-pointer uppercase"
            >
              Library
            </button>
            <button 
              onClick={() => navigate('/generate')} 
              className="text-white/60 hover:text-white transition-colors bg-transparent border-none cursor-pointer uppercase"
            >
              AI Studio
            </button>
            <a 
              href="https://github.com/cout-priyanshu/morphyxui" 
              target="_blank" 
              rel="noreferrer"
              className="text-white/60 hover:text-white transition-colors p-1"
              title="GitHub Repository"
            >
              <TbBrandGithub size={16} />
            </a>
          </div>

          {/* Mobile Drawer Trigger */}
          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="md:hidden p-2 text-white/70 hover:text-white bg-[#141414] border border-white/15 rounded-none cursor-pointer"
          >
            <TbMenu2 size={16} />
          </button>
        </div>
      </header>

      {/* =====================================================================
          MAIN WORKSPACE LAYOUT: SIDEBAR + CONTENT + TABLE OF CONTENTS
      ====================================================================== */}
      <div className="flex flex-1 overflow-hidden relative z-10" style={{ height: "calc(100vh - 58px)" }}>
        
        {/* Desktop Left Documentation Sidebar */}
        <aside className="hidden md:flex w-64 lg:w-72 shrink-0 flex-col border-r border-white/15 bg-[#0e0e0e] overflow-y-auto select-none">
          <div className="p-4 border-b border-white/10 bg-[#121212] flex items-center justify-between text-[10px] font-mono text-white/40 uppercase tracking-[2px]">
            <span>DIRECTORY INDEX</span>
            <span className="text-white font-bold">2.4 STABLE</span>
          </div>

          <div className="p-3 space-y-6 flex-1">
            {DOCS_NAV.map((cat) => {
              const isCollapsed = collapsedCategories[cat.category]
              return (
                <div key={cat.category} className="space-y-1">
                  <button
                    onClick={() => toggleCategory(cat.category)}
                    className="w-full flex items-center justify-between px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-[2px] text-white/40 hover:text-white transition-colors bg-transparent border-none cursor-pointer text-left"
                  >
                    <span>{cat.category}</span>
                    <TbChevronDown 
                      size={13} 
                      className={`transition-transform duration-200 ${isCollapsed ? "-rotate-90" : "rotate-0"}`} 
                    />
                  </button>

                  {!isCollapsed && (
                    <div className="space-y-0.5 pt-0.5">
                      {cat.items.map((item) => {
                        const isActive = activeDoc === item.id
                        return (
                          <button
                            key={item.id}
                            onClick={() => setActiveDoc(item.id)}
                            className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-mono uppercase tracking-wider transition-colors border text-left cursor-pointer relative ${
                              isActive
                                ? "bg-[#2e2e2e] text-white border-white/60 font-bold shadow-sm"
                                : "bg-transparent text-white/60 border-transparent hover:border-white/15 hover:bg-white/5 hover:text-white"
                            }`}
                          >
                            {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-white" />}
                            <span className="truncate">{item.label}</span>
                            {item.badge && (
                              <span className={`text-[9px] px-1.5 py-0.2 border ${
                                isActive ? "border-white text-white" : "border-white/20 text-white/40"
                              }`}>
                                {item.badge}
                              </span>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Quick Terminal Footer */}
          <div className="p-3.5 border-t border-white/10 bg-[#121212] flex items-center justify-between text-[10px] font-mono text-white/40">
            <span>MORPHYX.CORE</span>
            <span className="text-emerald-400">SYNCED</span>
          </div>
        </aside>

        {/* Mobile Sidebar Drawer */}
        <AnimatePresence>
          {mobileDrawerOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileDrawerOpen(false)}
                className="md:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
              />
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 320, damping: 32 }}
                className="md:hidden fixed top-0 left-0 z-50 h-full w-72 flex flex-col bg-[#0e0e0e] border-r border-white/20 select-none"
              >
                <div className="flex items-center justify-between p-4 border-b border-white/15 bg-[#141414]">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-white">
                    DOCS DIRECTORY
                  </span>
                  <button
                    onClick={() => setMobileDrawerOpen(false)}
                    className="p-1 text-white/60 hover:text-white border border-white/20 bg-transparent rounded-none cursor-pointer"
                  >
                    <TbX size={16} />
                  </button>
                </div>

                <div className="p-3 overflow-y-auto flex-1 space-y-6">
                  {DOCS_NAV.map((cat) => (
                    <div key={cat.category} className="space-y-1">
                      <div className="px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-[2px] text-white/40">
                        {cat.category}
                      </div>
                      <div className="space-y-0.5">
                        {cat.items.map((item) => {
                          const isActive = activeDoc === item.id
                          return (
                            <button
                              key={item.id}
                              onClick={() => {
                                setActiveDoc(item.id)
                                setMobileDrawerOpen(false)
                              }}
                              className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors border text-left cursor-pointer ${
                                isActive
                                  ? "bg-white text-black border-white font-bold"
                                  : "bg-transparent text-white/60 border-transparent hover:bg-white/5"
                              }`}
                            >
                              <span>{item.label}</span>
                              {item.badge && <span className="text-[9px] border px-1 border-white/20">{item.badge}</span>}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* =====================================================================
            MAIN CONTENT AREA
        ====================================================================== */}
        <main 
          ref={contentRef}
          className="flex-1 overflow-y-auto px-5 sm:px-12 py-10 sm:py-14 bg-[#070707] relative"
        >
          <div className="max-w-3xl mx-auto space-y-12 pb-16">
            
            {/* View Switching Logic */}
            {activeDoc === "introduction" && (
              <DocsIntroductionView onNavigate={id => setActiveDoc(id)} />
            )}

            {activeDoc === "installation" && (
              <DocsInstallationView onNavigate={id => setActiveDoc(id)} />
            )}

            {COMPONENT_SPECS[activeDoc] && (
              <DocsComponentView compKey={activeDoc} onNavigate={id => setActiveDoc(id)} />
            )}

            {!["introduction", "installation"].includes(activeDoc) && !COMPONENT_SPECS[activeDoc] && (
              <DocsGenericView docId={activeDoc} />
            )}

            {/* Pagination Controls (Previous & Next Chapters) */}
            <div className="pt-8 mt-12 border-t border-white/15 flex items-center justify-between gap-4 font-mono select-none">
              {prevDoc ? (
                <button
                  onClick={() => setActiveDoc(prevDoc.id)}
                  className="flex items-center gap-2 px-4 py-2.5 border border-white/20 bg-[#111111] hover:border-white hover:bg-white/5 text-white/70 hover:text-white text-xs uppercase tracking-wider transition-colors cursor-pointer rounded-none"
                >
                  <TbArrowLeft size={14} />
                  <span>PREV: {prevDoc.label}</span>
                </button>
              ) : <div />}

              {nextDoc ? (
                <button
                  onClick={() => setActiveDoc(nextDoc.id)}
                  className="flex items-center gap-2 px-4 py-2.5 border border-white/20 bg-[#111111] hover:border-white hover:bg-white/5 text-white/70 hover:text-white text-xs uppercase tracking-wider transition-colors cursor-pointer rounded-none"
                >
                  <span>NEXT: {nextDoc.label}</span>
                  <TbArrowRight size={14} />
                </button>
              ) : <div />}
            </div>

          </div>
        </main>

        {/* Right Table of Contents (Desktop High-Res Displays) */}
        <aside className="hidden xl:block w-60 shrink-0 border-l border-white/10 p-6 bg-[#0a0a0a] text-xs font-mono select-none overflow-y-auto">
          <p className="text-[10px] uppercase font-bold tracking-[2px] text-white/40 mb-4">
            ON THIS PAGE
          </p>
          <ul className="space-y-2.5 p-0 m-0 list-none text-white/60">
            <li className="hover:text-white transition-colors cursor-pointer">
              • Overview & Concept
            </li>
            <li className="hover:text-white transition-colors cursor-pointer">
              • Sandbox Preview
            </li>
            <li className="hover:text-white transition-colors cursor-pointer">
              • CLI & Installation
            </li>
            <li className="hover:text-white transition-colors cursor-pointer">
              • Prop Schemas & Types
            </li>
          </ul>

          <div className="mt-12 p-3.5 border border-white/15 bg-[#121212]">
            <p className="text-[10px] font-bold uppercase tracking-wider text-white">COMMUNITY CORE</p>
            <p className="text-[10px] text-white/40 mt-1 leading-relaxed">
              Found a bug or need another primitive? Check open issues or create a PR.
            </p>
          </div>
        </aside>

      </div>

      {/* Quick Search Dialog Modal */}
      <DocsSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectDoc={(id) => setActiveDoc(id)}
      />
    </div>
  )
}