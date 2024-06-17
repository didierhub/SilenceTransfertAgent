import React from 'react'
import UserContenair from './UserContenair'
import AdUserBar from '../components/AdUserBar'
import { Outlet } from 'react-router-dom'

function Users() {
  return (
    <div className='grid gap-8 py-4 px-8'>
      <AdUserBar />
      <Outlet />
    </div>
  )
}

export default Users