import React from 'react'
import Home from './Home'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import SideBard from '../components/SideBard'
import OutletContenair from '../components/OutletContenair'
import UserHook from '../hooks/UserHook'
import LogIn from '../forms/LogIn'


function Layout() {
  const {user}=UserHook()
  return (
     <div className=' grid grid-cols-12  grid-rows-16 h-screen w-screen bg-[#F7F9F8]  fixed'>
     {user ? <> 
      <Header />
      <SideBard />
      <OutletContenair />
      </>
      :<LogIn />}
      
      
      </div>
  )
}

export default Layout