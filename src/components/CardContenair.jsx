import React from 'react'
import CardContenairLeft from './CardContenairLeft'
import CardContenairCenter from './CardContenairCenter'
import CardContenairRight from './CardContenairRight'

function CardContenair() {
  return (
    <div className=' grid md:grid-cols-4   relative gap-2 justify-center my-auto  h-[90vh]  p-2 '>
        <CardContenairLeft />
         <CardContenairCenter />
         <CardContenairRight />
    </div>
  )
}

export default CardContenair