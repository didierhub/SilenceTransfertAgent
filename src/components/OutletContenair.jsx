import React from 'react'
import { Outlet } from 'react-router-dom'

function OutletContenair() {
  return (
    <div className=' col-span-7  md:col-span-6  justify-center items-center relative z-0  gap-x-2 scroll-smooth'>
        <Outlet />
    </div>
  )
}

export default OutletContenair