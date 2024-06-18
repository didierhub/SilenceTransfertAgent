import React from 'react'
import { FaHome, FaUsers,FaPeopleArrows  } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { MdOutlineSendToMobile } from "react-icons/md";
import { BiSolidLogInCircle } from "react-icons/bi";
import { IoMdLogOut } from "react-icons/io";
import { CiDark } from "react-icons/ci";
import { NavLink, useNavigate } from 'react-router-dom';
import UserHook from '../hooks/UserHook';


function SideBard() {
  const {user,UserSignOUt,isAdmin}=UserHook()
  const navigate=useNavigate()

  const handleLogout=async()=>{
    try{
      await UserSignOUt();
      localStorage.removeItem(user)
      navigate("/")

    }catch(error){
      
      console.log(error.message)

    }
  }
  return (
    <div className='grid  gap-2 col-span-2 row-span-12   shadow  border-r justify-center '>
        <div className='row-span-1 border-b grid '>
           
            <div className='grid  pt-2 w-full'>
            <span  className= '  text-gray-500 translate-x-[-50%] letf-[50%] absolute  flex justify-start '>Menu</span>
            <NavLink  to="/" className='   flex  items-center gap-5'><FaHome  size={30}/> home </NavLink>
             {isAdmin&&<NavLink to="Users"  className='flex  items-center gap-5'> < FaUsers  size={30} />users</NavLink>}
             <NavLink   to="Transaction"className='flex items-center gap-5'><GrTransaction size={30} /> transaction</NavLink>
            </div>
            
            </div>

           
        <div className='col-row-1 border-b grid '>
        <div className=" grid relative  pt-2">
        <span className= '  text-gray-500 translate-x-[-25%] letf-[50%] absolute  flex justify-start '>Quick Actins</span>
        <NavLink to="/Transaction/SendForm" className='flex  items-center gap-5'> < MdOutlineSendToMobile size={30} /> send</NavLink>
        <NavLink to="/Transaction/ReceiveForm" className='flex  items-center gap-5'>< MdOutlineSendToMobile size={30} className=' rotate-180' /> receive</NavLink>
        <NavLink to="/Transaction/TransfertForm" className='flex  items-center gap-5'><FaPeopleArrows size={30}/> transfert</NavLink>
        </div>
       
        </div>
        <div className='col-row-1 border-b grid'>
            <div className=' grid relative'>
{
  !user ? 
 <NavLink to="Login" className='flex  items-center gap-5'>
 {/* log in  log out*/}
< BiSolidLogInCircle  size={30}/> log in
</NavLink>:

<div className='flex  items-center gap-5' onClick={handleLogout}>
<IoMdLogOut  size={30}/> lo out
</div>
}
           
            <div className='flex  items-center '>
 {/* dark mood */}
             <CiDark  size={30}/>  dark
            </div>
            </div>
           
        </div>
    </div>
  )
}

export default SideBard