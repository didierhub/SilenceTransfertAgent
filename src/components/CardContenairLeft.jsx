import React from 'react'
import DonutChartUsageExample from '../Charts/DonutChartUsageExample'
import TopAgentsConteniarAgentsConteniar from './TopAgentsConteniar'
import TopCityContenair from './TopCityContenair'
import CityBarChart from '../Charts/CityBarChart'

function CardContenairLeft() {
  return (
    <div className=' grid gap-2'>
      
      <TopCityContenair />
      <TopCityContenair />
    </div>
  )
}

export default CardContenairLeft