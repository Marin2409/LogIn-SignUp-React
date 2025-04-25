import React from 'react'
import { Routes, Route } from 'react-router-dom'

import NavBar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Footer from './components/Footer'
import SignUp from './pages/SignUp'

const App = () => {

  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50'>
      <NavBar />
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/login' element = {<Login />}/>
        <Route path='/signup' element = {<SignUp />}/>
        <Route path='/dashboard' element = {<Dashboard />}/>
      </Routes>
      <Footer />
    </div>
  )
}

export default App