import React from 'react'


import DonutChartUsageExample from '../Charts/DonutChartUsageExample';
import TopTransfert from '../Charts/TopTransfert';



const valueFormatter = (number) =>
  `$ ${Intl.NumberFormat('us').format(number).toString()}`;


function CardContenairRight() {
  return (
    <div className='grid gap-2 '>
    {/* top transfert way */}
    <DonutChartUsageExample />
   
        {/* top transfet */}
        <TopTransfert />
    
</div>
  )
}

export default CardContenairRight