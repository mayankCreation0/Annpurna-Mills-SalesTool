import React from 'react'
import Dashboard from '../Components/Dashboard'
import Navbar from '../Components/Navbar'

const Home = ({ mode, toggleColorMode }) => {
  return (
    <div>
      <Navbar mode={mode} toggleColorMode={toggleColorMode} />
      <Dashboard />
    </div>
  )
}

export default Home
