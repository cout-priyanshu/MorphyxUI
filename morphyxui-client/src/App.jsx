import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setAllComponents, setAllUsers, setUserData } from './redux/userSlice'
import CustomCursor from './components/CustomCursor'
import Generate from './pages/Generate'
import { useState } from 'react'
import AdminDashboard from './pages/AdminDashboard'
import AllComponents from './pages/AllComponents'
import Pricing from './pages/Pricing'
import MyComponents from './pages/MyComponents'

export const ServerUrl = "http://localhost:8000"

function App() {
  const dispatch = useDispatch()
  const {userData} = useSelector((state)=>state.user)
  const [authChecked,setAuthChecked] = useState(false)

  useEffect(()=>{
    const fetchUser = async () => {
      try {
        const res = await axios.get(ServerUrl+ "/api/user/current-user" ,
          {withCredentials: true})
          dispatch(setUserData(res.data))
          setAuthChecked(true)
        } catch (error) {
          dispatch(setUserData(null))
          setAuthChecked(true)
      }
    }
    fetchUser()
  },[])

  useEffect(()=> {
    if(!userData)return;
    const fetchAllUsers = async () => {
      try {
        const usersRes = await axios.get(ServerUrl+ "/api/user/all-users" ,
          {withCredentials: true})
          dispatch(setAllUsers(usersRes.data))
          console.log(usersRes.data)
        } catch (error) {
          console.log(error)
          dispatch(setAllUsers(null))
      }
    }
     fetchAllUsers()

     const fetchAllComponents = async () => {
      try {
        const ComponentsRes = await axios.get(ServerUrl+ "/api/component/all-components" ,
          {withCredentials: true})
          dispatch(setAllComponents(ComponentsRes.data))
          console.log(ComponentsRes.data)
        } catch (error) {
          console.log(error)
          dispatch(setAllComponents(null))
      }
    }
    fetchAllComponents()

  }, [userData,dispatch])
  return (
    <div>
      <CustomCursor />
      {
        !authChecked && <div className='fixed top-0 left-0 w-full h-1 bg-[#35ebff] animate pulse z-50'>
          </div>

      }
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/generate' element={<Generate/>} />
        <Route path='/admin' element={<AdminDashboard/>} />
        <Route path='/components' element={<AllComponents/>} />
        <Route path='/pricing' element={<Pricing/>} />
        <Route path='/my-components' element={<MyComponents/>} />

      </Routes>
    </div>
  )
}

export default App
