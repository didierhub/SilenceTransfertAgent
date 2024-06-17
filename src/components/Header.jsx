import React from 'react'
import MenuBar from './MenuBar'
import Logo from './Logo'

function Header() {
  return (
    <div className='col-span-12 row-span-4  border-b shadow flex justify-between px-8 items-center'>
       <Logo/>
       <MenuBar />
    </div>
  )
}

export default Header