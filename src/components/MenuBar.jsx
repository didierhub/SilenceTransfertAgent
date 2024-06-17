import React from 'react'
import UserHook from '../hooks/UserHook'

function MenuBar() {
  const {user}=UserHook()
  return (
    <div>
      {
        user &&
      <div className='flex gap-2 items-center'> <img src={user.photoURL} alt="" className='h-[30px] w-[30px] rounded-full object-cover'/> <span>{user.displayName}</span></div>
      }
     {/* {console.log(user.photoURL)} */}
      <div></div>
      <div></div>
    </div>
  )
}

export default MenuBar