import React from 'react';
import { IoMdSearch } from "react-icons/io";
import { NavLink } from 'react-router-dom';

function TransactionSearchBar(props) {
  const handleInputChange = (event) => {
    if (props.onSearch) {
      props.onSearch(event.target.value);
    }
  };

  return (
    <div className='grid grid-cols-3 p-2 border items-center'>
      <h1>{props.transactiontype}</h1>
      <div className='bg-gray-200 grid items-center grid-cols-12 gap-0 rounded-md px-1'>
        <label className="col-span-1" htmlFor="search"><IoMdSearch /></label>
        <input 
          type="search" 
          id="search" 
          placeholder={props.placeholder} 
          className='border-transparent border bg-transparent rounded-md col-span-11' 
          onChange={handleInputChange}
        />
      </div>
      <NavLink to={props.path} className='text-right'> 
        <button type="button" className='px-3 py-1 border-orange-500 border text-orange-500'>{props.button}</button>
      </NavLink>
    </div>
  );
}

export default TransactionSearchBar;
