import React from 'react'
import reactSvg from '../assets/logo/react.svg'
import logo from '../assets/logo/silence_logo.jpeg'
import { RiMenu4Line } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import UserHook from '../hooks/UserHook';

function Logo() {
  const{menu,handleMenu}=UserHook()
  return (
    <div className='flex items-center justify-center gap-x-2'>
      {menu&&(
         <div className='text-md md:hidden'><RiMenu4Line  size={30} onClick={handleMenu}/></div>
      )

      }
      {!menu&&(
         <div className='text-md md:hidden'><IoClose size={30} onClick={handleMenu}/></div>
      )

      }
      
      

     <img src={logo} alt="" className=' hidden md:block h-[50px] w-[50px] drop-shadow-sm' />
    </div>
  )
}

export default Logo