import React, { useEffect, useRef, useCallback, useState, useMemo } from "react"
import { LiveProvider, LivePreview, LiveError } from "react-live"
import { motion } from "framer-motion"
import { 
  TbRefresh, 
  TbAlertTriangle, 
  TbTerminal2, 
  TbCopy, 
  TbCheck, 
  TbSparkles 
} from "react-icons/tb"

export const LiveComponentPreview = ({ code = "" }) => {
  const [refreshKey, setRefreshKey] = useState(0)

  const refreshPreview = () => {
    setRefreshKey((prev) => prev + 1)
  }

  // 1. Clean imports and exports so react-live can execute
  let sanitized = code
    .replace(/import\s+[\s\S]*?from\s+['"].*?['"];?/g, "")
    .replace(/export\s+default\s+/g, "")
    .replace(/export\s+const\s+/g, "const ")
    .replace(/export\s+function\s+/g, "function ")

  // 2. Prevent breaking preview with fixed position
  sanitized = sanitized
    .replace(/position\s*:\s*["']fixed["']/g, 'position: "absolute"')
    .replace(/position\s*:\s*`fixed`/g, 'position: "absolute"')

  // 3. Extract Component Name (case-insensitive & supports PascalCase)
  const match =
    sanitized.match(/const\s+([A-Z]\w*)/) ||
    sanitized.match(/function\s+([A-Z]\w*)/)
  const componentName = match ? match[1] : null

  // 4. Wrap with render() for react-live noInline
  const wrappedCode = componentName
    ? `${sanitized}\n\nrender(<${componentName} />);`
    : sanitized

  return (
    <div className="relative w-full max-w-full font-sans select-none">
      {/* Top Architectural Telemetry Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#121212] border-t border-l border-r border-white/15 text-[10px] font-mono text-white/50 uppercase tracking-[2px]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-emerald-400 inline-block rounded-none" />
          <span>SANDBOX CANVAS // {componentName ? componentName.toUpperCase() : "ROOT"}</span>
        </div>

        <button
          onClick={refreshPreview}
          title="Reload Sandbox Engine"
          className="flex items-center gap-1.5 px-2.5 py-1 bg-[#1a1a1a] hover:bg-white hover:text-black text-white font-mono text-[10px] uppercase tracking-wider border border-white/15 transition-colors cursor-pointer rounded-none"
        >
          <TbRefresh size={12} className="shrink-0" />
          <span>RELOAD</span>
        </button>
      </div>

      <LiveProvider
        key={refreshKey}
        code={wrappedCode}
        scope={{ React, useState, useEffect, useRef, useCallback, useMemo, motion }}
        noInline
      >
        {/* Main Canvas Viewport Container */}
        <div className="w-full min-h-[360px] max-w-full relative border border-white/15 bg-[#0a0a0a] overflow-hidden flex items-center justify-center p-6 sm:p-10 rounded-none shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
          {/* Subtle Blueprint Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

          {/* Technical Corner Crosshairs */}
          <span className="absolute top-2 left-2 text-white/20 font-mono text-[9px] select-none">+ 0,0</span>
          <span className="absolute bottom-2 right-2 text-white/20 font-mono text-[9px] select-none">ISOLATION // 60FPS</span>

          <div className="w-full h-full relative z-10 overflow-auto flex items-center justify-center">
            <LivePreview />
          </div>
        </div>

        {/* Live Error Notification Terminal */}
        <LiveError className="mt-3 p-4 bg-[#1a0c0e] border border-rose-500/40 text-rose-200 font-mono text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed shadow-lg rounded-none" />

        {/* Fallback Warning Dock (If Component Name couldn't be parsed) */}
        {!componentName && (
          <div className="mt-3 p-4 bg-[#141414] border border-white/20 text-white font-mono text-xs flex items-center gap-3 rounded-none">
            <div className="w-6 h-6 bg-white text-black flex items-center justify-center shrink-0 rounded-none font-bold">
              <TbAlertTriangle size={14} />
            </div>
            <div className="text-left leading-normal">
              <p className="text-[10px] uppercase tracking-widest text-white/40">PARSE WARNING</p>
              <p className="text-white/80 mt-0.5">Root component name could not be resolved automatically. Drop JSX directly into your project tree.</p>
            </div>
          </div>
        )}
      </LiveProvider>
    </div>
  )
}