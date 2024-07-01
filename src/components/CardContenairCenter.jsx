import React from 'react'
import BarChartHero from '../Charts/ChartBar'
import ComparisonCar from '../Charts/ComparisonCar'

function CardContenairCenter() {
  return (
    <div className='col-span-2  grid grid-cols-3 gap-2    '>
       
       <ComparisonCar />
        
        

        <div className='col-span-3 border shadow-md  rounded row-span-2 flex items-center '>
           <BarChartHero />
        </div>
    </div>
  )
}

export default CardContenairCenter