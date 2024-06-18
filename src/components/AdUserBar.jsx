import React from 'react'
import { MdAdd } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { makeAdmin } from '../firebase/FireBaseConfig';
import CreateUserComponent from './CreateUserComponent';

function AdUserBar() {
const [email,setEmail]=useState("")
const [error,setError]=useState("")
const [message,setMessage]=useState("")
const makeAdminHandler= async()=>{
  if (!email) {
    setMessage("Email is required.");
    return;
  }

  try {
    const result = await makeAdmin({ email });
    setMessage(result.data.message);
  } catch (error) {
    setMessage(`Error: ${error.message}`);
    console.log(error)
  }


}

const showMessageHandler=()=>{
  setTimeout(()=>{

  },3000)
}



  return (
    <div className='flex justify-between shadow-md border rounded-md p-1'>
        
        <h1 className='text-2xl text-gray-500'>User</h1>
        <div className='flex gap-4'>
           <input type="email"   value={email}  placeholder='example@gmail.com' onChange={(e)=>setEmail(e.target.value)}/>
           <button  onClick={makeAdminHandler} className=' rounded-md bg-green-400 text-white px-2'>make admin</button>
           {console.log(email)}
           <CreateUserComponent />
            <p> {message}</p>
        </div>

        <NavLink to="Register" className=''> <button className='flex items-center gap-3 border px-2 py-2 rounded-md  text-green-400 border-green-400 drop-shadow-sm hover:bg-green-400 hover:text-white'> <MdAdd /> <span>add new</span></button></NavLink>
    </div>
  )
}

export default AdUserBar