import React, { useState } from 'react'
import Auth from '../components/Auth'
import { SiValorant } from 'react-icons/si'
import { motion } from "motion/react"

function Home() {
  const [showAuth, setShowAuth] = useState(false)

  return (
    <div className='min-h-screen text-white overflow-x-hidden'
     style={{fontFamily:"'DM Sans' ,sans-serif"}}>
      {/* <button 
        className='px-5 py-2.5 bg-[#3be8ff] text-[#051c20] font-semibold rounded-xl hover:bg-[#34d4e9] transition-all cursor-pointer shadow-[0_0_15px_rgba(59,232,255,0.25)]' 
        onClick={() => setShowAuth(true)}
      > 
        Open Auth
      </button> */}
      <div className='fixed inset-0 z-0 bg-[radial-gradient(circle,rgba(59,232,255,0.05)_1px, transparent_1px)]
      bg-[size:26px_26px] pointer-events-none' />
      <div className='fixed top-0 left-1/2 -translate-x-1/2 w-[min(700px,100vw)]
      h-64 bg-[radial-gradient(ellipse,rgba(59,232,255,0.06)_0%,transparent_70%)] pointer-events-none' />

      <nav className='sticky top-0 z-40 flex items-center justify-between px-4 sm:px-8 lg:px-10 py-4 border-b border-white/[0.05] bg-[#030b0d]/85 backdrop-blur-md' >
      <div className='flex items-center gap-2.5'>
        <div className='w-8 h-8 rounded-xl bg-gradient-to-br from-[##be8ff]
       to-[#0ab5d4] flex items-center justify-center shadow-[0_0_14px_rgba(59,232,255,0.04)]'>
        <SiValorant size={15} color='#051c20'/>
       </div>
       <span className='text-lg font-bold tracking-tight' style={{
        fontFamily:"'Syne',sans-serif"
       }}>VirtualUI</span>
      </div>


      <div className='hidden md:flex items-center gap-6 text-sm text-white/50'>
      <button className='duration-200 px-6 py-1.5 border-white/15 rounded-xl text-sm text-white/70 hover:text-white hover:border-white/25
      transition-all cursor-pointer bg-transparent w-full'>Components
      </button>
      {userData ? (
        <div
      )
      </div>
      </nav>


      {showAuth && <Auth onClose={() => setShowAuth(false)} />}
    </div>
  )
}

export default Home