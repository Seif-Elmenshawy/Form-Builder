import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Auth from './pages/Auth/Auth.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Auth />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  )
}

export default App