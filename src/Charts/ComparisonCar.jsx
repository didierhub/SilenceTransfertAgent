import React from 'react'
import { Card } from '@tremor/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const data = [
  {
    name: 'Daily active users',
    stat: '3,450',
    change: '+12.1%',
    changeType: 'positive',
  },
  {
    name: 'Weekly sessions',
    stat: '1,342',
    change: '-9.8%',
    changeType: 'negative',
  },
  {
    name: 'Duration',
    stat: '5.2min',
    change: '+7.7%',
    changeType: 'positive',
  },
];





function ComparisonCar() {
  return (
    <div    className='  col-span-3 border shadow-md rounded row-span-1   grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 p-4  ' >
        
        
        {data.map((item) => (
          <Card key={item.name} 
          >
            <div className="flex items-center justify-between">
              <p className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content">
                {item.name}
              </p>
              <span
                className={classNames(
                  item.changeType === 'positive'
                    ? 'bg-emerald-100 text-emerald-800 ring-emerald-600/10 dark:bg-emerald-400/10 dark:text-emerald-500 dark:ring-emerald-400/20'
                    : 'bg-red-100 text-red-800 ring-red-600/10 dark:bg-red-400/10 dark:text-red-500 dark:ring-red-400/20',
                  'inline-flex items-center rounded-tremor-small px-2 py-1 text-tremor-label font-medium ring-1 ring-inset',
                )}
              >
                {item.change}
              </span>
            </div>
            <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
              {item.stat}
            </p>
          </Card>
        ))}
      </div>
  
  
  )
}

export default ComparisonCar