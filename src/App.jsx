import { useState, useEffect, useContext } from 'react'
import axios from "axios"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Home from './pages/Home'
import './App.css'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Register from './pages/Register'
import { Toaster } from 'react-hot-toast'
import { Context, server } from './main'

function App() {

  const { setUser, setIsAuthenticated, setLoading } = useContext(Context);

  useEffect(() => {
    setLoading(true)
    axios
      .get(`${server}/users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user)
        setIsAuthenticated(true)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setUser({})
        setIsAuthenticated(false)
        setLoading(false)
      })
  }, [])

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
      <Toaster />
    </Router>

  )
}

export default App
