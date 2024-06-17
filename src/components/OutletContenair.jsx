import React from 'react'
import { Outlet } from 'react-router-dom'

function OutletContenair() {
  return (
    <div className=' col-span-10 row-span-12 '>
        <Outlet />
    </div>
  )
}

export default OutletContenair