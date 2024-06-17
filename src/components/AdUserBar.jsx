import React from 'react'
import { MdAdd } from "react-icons/md";
import { NavLink } from 'react-router-dom';




function AdUserBar() {
  return (
    <div className='flex justify-between shadow-md border rounded-md p-1'>
        
        <h1 className='text-2xl text-gray-500'>User</h1>
        <NavLink to="Register" className=''> <button className='flex items-center gap-3 border px-2 py-2 rounded-md  text-green-400 border-green-400 drop-shadow-sm hover:bg-green-400 hover:text-white'> <MdAdd /> <span>add new</span></button></NavLink>
    </div>
  )
}

export default AdUserBar