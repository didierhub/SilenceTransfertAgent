import { BarChart } from '@tremor/react';

const chartdata = [
  {
    name: 'Topic 1',
    'Group A': 890,
    'Group B': 338,
    'Group C': 538,
    'Group D': 396,
    'Group E': 138,
    'Group F': 436,
  },
  {
    name: 'Topic 2',
    'Group A': 289,
    'Group B': 233,
    'Group C': 253,
    'Group D': 333,
    'Group E': 133,
    'Group F': 533,
  },
  {
    name: 'Topic 3',
    'Group A': 380,
    'Group B': 535,
    'Group C': 352,
    'Group D': 718,
    'Group E': 539,
    'Group F': 234,
  },
  {
    name: 'Topic 4',
    'Group A': 90,
    'Group B': 98,
    'Group C': 28,
    'Group D': 33,
    'Group E': 61,
    'Group F': 53,
  },
];

const dataFormatter = (number) =>
  Intl.NumberFormat('us').format(number).toString();



 function CityBarChart() {
  return (



<div className='relative   border
'>


      <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong row-span-1">
        Writing Contest: Entries
      </h3>
      <div className='row-span-2'>
      <BarChart
      className=' '
        
        data={chartdata}
        index="name"
        categories={[
          'Group A',
          'Group B',
          'Group C',
          'Group D',
          'Group E',
          'Group F',
        ]}
        colors={['blue', 'teal', 'amber', 'rose', 'indigo', 'emerald']}
        valueFormatter={dataFormatter}
        yAxisWidth={48}
      />
    
      </div>
     
    </div>
      
     
   

  );
}
export default CityBarChart