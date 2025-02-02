import React from 'react'
import Navbar from "./Navbar"
import Footer from "./Footer"
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

export default function Layout() {
  return (
    <div>
      <Navbar/>
      
      <div >
         <Outlet />
         <ToastContainer />
      </div>
      <Footer />
      
    </div>
  )
}