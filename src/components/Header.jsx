
import MenuBar from './MenuBar'
import Logo from './Logo'
import { useEffect,useState } from 'react'

function Header() {

  const [menu,setMenu]=useState(false)

  const handleMenu=()=>{
    setMenu(prev=>!prev)
  }
  return (
    <div className=' h-20  w-full     border-b shadow flex justify-between px-8 items-center fixed top-0 z-10 bg-white'>
       <Logo/>
       <MenuBar />
    </div>
  )
}

export default Header