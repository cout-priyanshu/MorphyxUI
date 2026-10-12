import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from "framer-motion"
import { TbHexagonLetterM, TbLayoutSidebarLeftExpand, TbSearch } from "react-icons/tb"
import { TbMenu2, TbX, TbChevronRight } from 'react-icons/tb'
import { useSelector } from 'react-redux'

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
              <motion.div
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
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default AllComponents