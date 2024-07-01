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
     <div className=' '>
     {user ? <> 
      <Header />
      <div className='grid grid-cols-7  gap-x-2 absolute top-20 overflow-y-scroll overflow-x-hidden min-h-[90vh] w-full scroll-hidden '>
      <SideBard />
      <OutletContenair />   
      </div>
      
      </>
      :<LogIn />}
      
      
      </div>
  )
}

export default Layout