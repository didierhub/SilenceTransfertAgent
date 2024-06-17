import React from 'react'


import DonutChartUsageExample from '../Charts/DonutChartUsageExample';
import TopTransfert from '../Charts/TopTransfert';



const valueFormatter = (number) =>
  `$ ${Intl.NumberFormat('us').format(number).toString()}`;


function CardContenairRight() {
  return (
    <div className='col-span-1  grid grid-rows-10 gap-2 '>
    {/* top transfert way */}
    <DonutChartUsageExample />
   
        {/* top transfet */}
        <TopTransfert />
    
</div>
  )
}

export default CardContenairRight