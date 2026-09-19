import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUserData } from './redux/userSlice'
import CustomCursor from './components/CustomCursor'
import Generate from './pages/Generate'

export const ServerUrl = "http://localhost:8000"

function App() {
  const dispatch = useDispatch()

  useEffect(()=>{
    const fetchUser = async () => {
      try {
        const res = await axios.get(ServerUrl+ "/api/user/current-user" ,
          {withCredentials: true})
          dispatch(setUserData(res.data))
        } catch (error) {
          dispatch(setUserData(null))
      }
    }
    fetchUser()
  },[])
  return (
    <div>
      <CustomCursor />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/generate' element={<Generate/>} />
      </Routes>
    </div>
  )
}

export default App
