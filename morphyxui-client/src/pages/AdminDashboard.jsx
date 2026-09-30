import React, { useState } from 'react'
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
} from "react-icons/tb"
import { ServerUrl } from '../App'
import { setUserData } from '../redux/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AreaChart, Area, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className='bg-[#170f14] border border-[#e11d48]/20 rounded-xl px-3 py-2 text-xs shadow-2xl backdrop-blur-md'>
      <p className='text-[#f5eff2]/50 mb-1'>{label}</p>
      <p className='text-[#f43f5e] font-bold'>{payload[0].value} components</p>
    </div>
  )
}

function AdminDashboard() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [activeView, setActiveView] = useState("dashboard")
  const [componentSearch, setComponentSearch] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)
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
    { label: "Total Users", value: allUsers?.length || 0, icon: TbUsers, color: "#f43f5e" },
    { label: "Components Made", value: publicComponents?.length || 0, icon: TbCode, color: "#fbcfe8" },
  ]

  const navItems = [
    { id: "dashboard", label: "Dashboard", Icon: TbLayoutDashboard },
    { id: "add", label: "Add Components", Icon: TbPackage },
  ]

  const SidebarContent = () => (
    <div className='flex flex-col h-full bg-[#0c080a] border-r border-white/[0.06]'>
      <div className='flex items-center gap-2.5 px-5 py-5 border-b border-white/[0.05]'>
        <div className='w-8 h-8 rounded-xl bg-gradient-to-tr from-[#be123c] to-[#f43f5e] flex items-center justify-center shadow-[0_0_14px_rgba(244,63,94,0.35)] flex-shrink-0'>
          <span className='font-black text-white text-sm'>V</span>
        </div>
        <div>
          <span className='text-base font-bold block text-[#f5eff2]' style={{ fontFamily: "'Syne', sans-serif" }}>
            VirtualUI
          </span>
          <span className='text-[10px] text-[#f43f5e] font-semibold tracking-[2px] uppercase'>Admin</span>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className='ml-auto md:hidden bg-transparent border-none cursor-pointer p-1.5 rounded-lg text-white/40 hover:text-white/70 transition-colors'
        >
          <TbChevronLeft size={18} />
        </button>
      </div>

      <nav className='flex-1 px-3 py-4 space-y-1.5'>
        {navItems.map(({ id, label, Icon }) => {
          const isActive = activeView === id
          return (
            <button
              onClick={() => setActiveView(id)}
              key={id}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer text-left border ${
                isActive
                  ? "bg-[#1b1015] text-[#fbcfe8] border-[#e11d48]/40 shadow-sm"
                  : "bg-transparent text-[#f5eff2]/50 border-transparent hover:text-white hover:bg-white/[0.03]"
              }`}
            >
              <Icon size={16} className={isActive ? "text-[#f43f5e]" : "text-[#f5eff2]/40"} />
              {label}
            </button>
          )
        })}
      </nav>

      <div className='p-3 border-t border-white/[0.05]'>
        <button
          onClick={handleLogout}
          className='w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#fda4af]/70 hover:text-[#fda4af] hover:bg-[#251014]/60 transition-all cursor-pointer bg-transparent border-none text-left'
        >
          <TbLogout size={16} /> Log Out
        </button>
      </div>
    </div>
  )

  return (
    <div
      className='min-h-screen bg-[#070507] text-[#f5eff2] flex overflow-hidden'
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Background Orbs */}
      <div className='fixed top-[-40px] left-[-40px] w-96 h-96 rounded-full pointer-events-none opacity-[0.06] bg-[#be123c] blur-[150px]' />
      <div className='fixed bottom-[-10%] right-[-5%] w-96 h-96 rounded-full pointer-events-none opacity-[0.05] bg-[#f43f5e] blur-[160px]' />

      {/* Desktop Sidebar */}
      <aside className='hidden md:flex flex-col w-60 min-h-screen fixed top-0 left-0 z-20'>
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              className='fixed inset-0 z-30 bg-black/70 backdrop-blur-sm md:hidden'
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
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className='fixed top-0 left-0 z-40 flex flex-col w-64 min-h-screen md:hidden'
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className='flex-1 md:ml-60 min-h-screen overflow-y-auto'>
        {/* Top Navbar */}
        <div className='sticky top-0 z-10 px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 bg-[#070507]/80 backdrop-blur-md border-b border-white/[0.05] flex items-center justify-between gap-2'>
          <div className='flex items-center gap-3 min-w-0'>
            <button
              onClick={() => setSidebarOpen(true)}
              className='md:hidden bg-transparent border-none cursor-pointer p-1.5 rounded-lg text-white/50 hover:text-white/80 hover:bg-white/[0.05] transition-all flex-shrink-0'
            >
              <TbMenu2 size={20} />
            </button>
            <div className='min-w-0'>
              <h1 className='text-base sm:text-lg font-bold truncate text-[#f5eff2]'>
                {activeView === "dashboard" ? "Dashboard" : "Add Components"}
              </h1>
              <p className='text-[#f5eff2]/35 text-xs truncate'>
                Welcome back, {userData?.name || "Admin"}
              </p>
            </div>
          </div>
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/generate")}
            className='flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#be123c] to-[#e11d48] border border-[#e11d48]/40 hover:opacity-95 transition-all shadow-[0_0_20px_rgba(225,29,72,0.25)] cursor-pointer flex-shrink-0'
          >
            <TbPlus size={14} />
            <span className='hidden sm:inline'>AI Component</span>
          </motion.button>
        </div>

        {/* View Switcher Container */}
        <AnimatePresence mode='wait'>
          {activeView === "dashboard" && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="px-4 sm:px-6 lg:px-8 py-5 sm:py-6 space-y-5 sm:space-y-6"
            >
              {/* Stats Grid */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
                {stats.map(({ label, value, icon: Icon, color }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className='p-4 rounded-2xl border border-white/[0.08] bg-[#0c080a] shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                  >
                    <div className='mb-3'>
                      <div
                        className='w-9 h-9 rounded-xl flex items-center justify-center'
                        style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                      >
                        <Icon size={18} style={{ color }} />
                      </div>
                    </div>
                    <p className='text-2xl font-bold text-[#f5eff2]'>{value.toLocaleString()}</p>
                    <p className='text-[#f5eff2]/40 text-xs mt-0.5'>{label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Chart Panel */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className='p-4 sm:p-5 rounded-2xl border border-white/[0.08] bg-[#0c080a] shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
              >
                <div className='flex items-start sm:items-center justify-between mb-4 sm:mb-5 gap-2'>
                  <div>
                    <h3 className='text-sm font-semibold text-[#f5eff2]'>Component Generation Trends</h3>
                    <p className='text-[#f5eff2]/40 text-xs mt-0.5'>Date-wise breakdown</p>
                  </div>
                  <span className='text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[#2a171f] border border-[#e11d48]/30 text-[#fbcfe8] flex-shrink-0'>
                    Last 12 records
                  </span>
                </div>

                {chartData?.length === 0 ? (
                  <div className='h-[180px] sm:h-[220px] flex items-center justify-center text-[#f5eff2]/20 text-sm'>
                    No public components created yet
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={210}>
                    <AreaChart data={chartData} margin={{ top: 5, right: 5, bottom: 0, left: -25 }}>
                      <defs>
                        <linearGradient id="componentGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor='#f43f5e' stopOpacity={0.35} />
                          <stop offset="100%" stopColor='#f43f5e' stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                      <XAxis
                        dataKey='date'
                        tick={{ fill: "rgba(245,239,242,0.4)", fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                        interval="preserveStartEnd"
                      />
                      <YAxis
                        tick={{ fill: "rgba(245,239,242,0.4)", fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                        allowDecimals={false}
                        width={30}
                      />
                      <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(244,63,94,0.2)" }} />
                      <Area
                        type="monotone"
                        dataKey="components"
                        stroke="#f43f5e"
                        strokeWidth={2}
                        fill="url(#componentGradient)"
                        dot={false}
                        activeDot={{ r: 4, fill: "#f43f5e", strokeWidth: 0 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </motion.div>

              {/* Public Components List */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className='rounded-2xl border border-white/[0.08] bg-[#0c080a] shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden'
              >
                <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-5 py-4 border-b border-white/[0.06]'>
                  <div className='flex items-center gap-2.5'>
                    <div className='w-7 h-7 rounded-lg flex items-center justify-center bg-[#2a171f] border border-[#e11d48]/30'>
                      <TbWorld size={14} className='text-[#f43f5e]' />
                    </div>
                    <div>
                      <p className='font-semibold text-sm text-[#f5eff2]'>Public Components</p>
                      <p className='text-[#f5eff2]/40 text-[11px]'>
                        {publicComponents.length} components visible to all users
                      </p>
                    </div>
                  </div>

                  <div className='relative w-full sm:w-56'>
                    <TbSearch size={14} className='absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none' />
                    <input
                      value={componentSearch}
                      onChange={(e) => setComponentSearch(e.target.value)}
                      placeholder='Search components...'
                      className='w-full bg-[#170f14] border border-white/10 rounded-xl pl-8 pr-3 py-2 text-xs text-[#f5eff2] placeholder-white/20 outline-none focus:border-[#e11d48]/50 transition-colors'
                    />
                  </div>
                </div>

                {filteredPublicComponents.length === 0 ? (
                  <div className='flex flex-col items-center justify-center py-14 gap-3 text-white/20'>
                    <TbBoxOff size={32} />
                    <p className='text-sm'>
                      {componentSearch ? "No components match your search" : "No public components yet"}
                    </p>
                  </div>
                ) : (
                  <div className='divide-y divide-white/[0.04]'>
                    {filteredPublicComponents.map((c, i) => (
                      <motion.div
                        key={i}
                        className='flex items-start sm:items-center justify-between gap-3 px-4 sm:px-5 py-3.5 hover:bg-white/[0.02] transition-colors'
                      >
                        <div className='flex items-center gap-3 min-w-0'>
                          <div className='w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#2a171f]/60 border border-[#e11d48]/20'>
                            <TbCode size={14} className='text-[#f43f5e]' />
                          </div>
                          <div className='min-w-0'>
                            <p className='text-sm font-semibold text-[#f5eff2] truncate'>{c.name || "Untitled Component"}</p>
                            <div className='flex flex-wrap gap-1 mt-1'>
                              {c.props?.slice(0, 4).map((p) => (
                                <span
                                  key={p}
                                  className='px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-[#2a171f] border border-[#e11d48]/20 text-[#fda4af]'
                                >
                                  {p}
                                </span>
                              ))}
                              {c.props?.length > 4 && (
                                <span className='px-1.5 py-0.5 rounded-md text-[10px] text-white/30'>
                                  +{c.props.length - 4} more
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className='flex flex-col sm:flex-row items-end sm:items-center gap-2 flex-shrink-0'>
                          <span className='text-[11px] text-white/30 whitespace-nowrap'>
                            {c.createdAt
                              ? new Date(c.createdAt).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })
                              : "Recent"}
                          </span>
                          <span className='flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#2a171f] text-[#fbcfe8] border border-[#e11d48]/30'>
                            <TbWorld size={10} className='text-[#f43f5e]' /> Public
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

export default AdminDashboard