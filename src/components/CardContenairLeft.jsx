import React from 'react'
import DonutChartUsageExample from '../Charts/DonutChartUsageExample'
import TopAgentsConteniarAgentsConteniar from './TopAgentsConteniar'
import TopCityContenair from './TopCityContenair'
import CityBarChart from '../Charts/CityBarChart'

function CardContenairLeft() {
  return (
    <div className='col-span-1  grid grid-rows-10 gap-2 '>
      
            {/* top agent */}
             <TopAgentsConteniarAgentsConteniar />
            {/* top city */}
          
           <TopCityContenair />
    </div>
  )
}

export default CardContenairLeft