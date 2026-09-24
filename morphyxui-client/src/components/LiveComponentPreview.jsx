import React, { useEffect, useRef, useCallback, useState } from "react"
import { LiveProvider, LivePreview, LiveError } from "react-live"
import { motion } from "framer-motion"
import { FiRefreshCw, FiAlertTriangle } from "react-icons/fi"

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
    <div className="relative w-full max-w-full font-sans">
      {/* Refresh Preview Button */}
      <motion.button
        onClick={refreshPreview}
        whileTap={{ scale: 0.9, rotate: 180 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        title="Refresh Preview"
        className="absolute right-3 top-3 z-20 flex items-center justify-center w-8 h-8 rounded-lg bg-[#1b1015] hover:bg-[#25151c] border border-[#e11d48]/40 hover:border-[#e11d48]/60 text-[#f5eff2] transition-colors cursor-pointer shadow-sm"
      >
        <FiRefreshCw size={14} className="text-[#f43f5e]" />
      </motion.button>

      <LiveProvider
        key={refreshKey}
        code={wrappedCode}
        scope={{ React, useState, useEffect, useRef, useCallback }}
        noInline
      >
        {/* Main Canvas Container */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full min-h-[340px] max-w-full relative rounded-xl border border-white/[0.08] bg-[#070507] overflow-hidden flex items-center justify-center p-4 sm:p-6"
        >
          <div className="w-full h-full relative overflow-auto flex items-center justify-center">
            <LivePreview />
          </div>
        </motion.div>

        {/* Live Error Notification */}
        <LiveError className="mt-3 p-3.5 rounded-xl bg-[#261014] border border-red-500/25 text-[#fda4af] font-mono text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed shadow-sm" />

        {/* Fallback Warning if Component Name couldn't be parsed */}
        {!componentName && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 p-3.5 rounded-xl bg-[#140b0f] border border-[#e11d48]/25 text-[#fbcfe8] text-xs flex items-center gap-2.5"
          >
            <FiAlertTriangle size={15} className="text-[#f43f5e] shrink-0" />
            <span>
              Preview could not resolve root component. Copy code directly into your project.
            </span>
          </motion.div>
        )}
      </LiveProvider>
    </div>
  )
}