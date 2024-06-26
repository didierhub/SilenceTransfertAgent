import React from "react";
import { NavLink } from "react-router-dom";
import { transactionData } from "../data/transactiondata";

function TransactionContenair() {
  return (


    
    <div className="grid grid-cols-2  md:grid-cols-4 gap-x-4 gap-y-2 px-4 items-center h-[60%] text-center relative top-[20%]  ">

      {transactionData.map(transaction=>(
        <NavLink
        key={transaction.id}
        to={transaction.id}
        className={ `border shadow-md  grid gap-2 rounded-md hover:scale-105 ${transaction.bg}`}
        >
        <h1 className=" semi-bold text-white lg:text-2xl border rounded  ">{transaction.action}</h1>
        <div className=" ">
          <img
            src={transaction.image}
            alt=""
            className=" object-cover"
          />
        </div>
        </NavLink>
      ))


      }
     
     
    </div>
    
  );
}

export default TransactionContenair;
