import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, useMotionValue, useSpring } from 'framer-motion'

function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Direct mouse positions
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Ultra-smooth trailing physics
  const springConfig = { damping: 26, stiffness: 300, mass: 0.4 }
  const ringX = useSpring(mouseX, springConfig)
  const ringY = useSpring(mouseY, springConfig)

  useEffect(() => {
    setMounted(true)

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseDown = () => setIsClicked(true)
    const handleMouseUp = () => setIsClicked(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    const handleMouseOver = (e) => {
      const target = e.target.closest('button, a, input, textarea, select, [role="button"], .cursor-pointer')
      setIsHovered(!!target)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [isVisible, mouseX, mouseY])

  if (!mounted || !isVisible) return null

  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        pointerEvents: 'none',
        zIndex: 999999,
      }}
      className="hidden md:block select-none"
    >
      {/* 1. Outer Smooth Fluid Trailing Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          mixBlendMode: 'difference',
        }}
        animate={{
          width: isHovered ? 52 : 32,
          height: isHovered ? 52 : 32,
          scale: isClicked ? 0.75 : 1,
          borderColor: isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.45)',
          backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
          borderWidth: isHovered ? '1.5px' : '1px',
        }}
        transition={{
          type: 'spring',
          stiffness: 380,
          damping: 24,
        }}
        className="rounded-full border backdrop-blur-[1px]"
      />

      {/* 2. Center Precision Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          mixBlendMode: 'difference',
        }}
        animate={{
          scale: isHovered ? 0 : isClicked ? 1.5 : 1,
          opacity: isHovered ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
        className="w-1.5 h-1.5 rounded-full bg-white"
      />
    </div>,
    document.body
  )
}

export default CustomCursor