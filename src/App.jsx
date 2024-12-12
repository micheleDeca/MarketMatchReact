import React, { useState } from 'react'
import NavBar from './Components/NavBar/NavBar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Footer from './Components/Footer/Footer';


const App = () => {

  const [navColorState, setNavColor] = useState("");

  return (
    <div>
      <NavBar  userType="ConA" navColor = {navColorState}/>
      <Routes>
        <Route path='/' element={<Home setNavColor={setNavColor}/>}/>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
