import React from 'react'
import CardContenairLeft from './CardContenairLeft'
import CardContenairCenter from './CardContenairCenter'
import CardContenairRight from './CardContenairRight'

function CardContenair() {
  return (
    <div className=' grid grid-cols-4 gap-4 grid-rows-1 p-4 '>
        <CardContenairLeft />
         <CardContenairCenter />
         <CardContenairRight />
    </div>
  )
}

export default CardContenair