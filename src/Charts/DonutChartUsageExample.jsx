import { DonutChart, Legend } from '@tremor/react';

const sales = [
  {
    name: 'New York',
    sales: 980,
  },
  {
    name: 'London',
    sales: 456,
  },
  {
    name: 'Hong Kong',
    sales: 390,
  },
  {
    name: 'San Francisco',
    sales: 240,
  },
  {
    name: 'Singapore',
    sales: 190,
  },
];

const valueFormatter = (number) =>
  `$ ${Intl.NumberFormat('us').format(number).toString()}`;

function DonutChartUsageExample() {
  return (
    <div className=' row-span-6 border shadow-md rounded grid grid-rows-3 justify-center items-center gap-2'>
        {/* top ways */}
        
      <div className="  row-span-2  flex justify-center">
        <DonutChart
          data={sales}
          category="sales"
          index="name"
          valueFormatter={valueFormatter}
          colors={['blue', 'cyan', 'indigo', 'violet', 'fuchsia']}
          className="w-40 "
        />
         </div>
        <div className=' row-span-1 flex justify-center '>

       
        <Legend
          categories={['New York', 'London', 'Hong Kong', 'San Francisco', 'Singapore']}
          colors={['blue', 'cyan', 'indigo', 'violet', 'fuchsia']}
          className="max-w-xs "
        />
         </div>
     
    

     
    </div>
  );
}
export default DonutChartUsageExample