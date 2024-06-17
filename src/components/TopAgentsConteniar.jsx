import React from 'react'
import TopAgent from './TopAgent'

function TopAgentsConteniar() {
  return (
    <div className='grid gap-2 p-1 col-span-5 row-span-6 border shadow-md  rounded relative overflow-y-scroll'>
        <h1 className='text-xl font-semibold'>Top Agents</h1>
        <TopAgent />
    </div>
  )
}

export default TopAgentsConteniar