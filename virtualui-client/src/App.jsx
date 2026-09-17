import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUserData } from './redux/userSlice'

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
      <Routes>
        <Route path='/' element={<Home/>} />
      </Routes>
    </div>
  )
}

export default App
