import React from 'react'
import reactSvg from '../assets/logo/react.svg'
import logo from '../assets/logo/silence_logo.jpeg'

function Logo() {
  return (
    <div>
     <img src={logo} alt="" className='h-[50px] w-[50px] drop-shadow-sm' />
    </div>
  )
}

export default Logo