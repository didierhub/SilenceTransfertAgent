import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase/FireBaseConfig";
import TransactionSearchBar from '../components/TransactionSearchBar';
import UserHook from "../hooks/UserHook";
import TransactionHook from "../hooks/TransactionHook";

function Review() {
  const { user } = UserHook();
  const {formatDate,useFirestoreQuery } = TransactionHook();
  const collectionName = "balances";
  const AgentId=user.uid
  const whereClause = where('AgentId', '==', AgentId); // Example where clause
  const orderByClause = orderBy('createdAt', 'desc'); // Example order by clause
  
  const { data, loading, error }= useFirestoreQuery(
    collectionName, // collectionName
    whereClause,
    undefined, // whereClause
   AgentId// orderByClause
  );
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
 
  {console.log(data)}
// {console.log(balanceData)}
 
  
  return (
    <div className=" h-full grid md:grid-cols-2 lg:grid-cols-4 items-center justify-center   gap-4 px-4">
      <div className="border h-[200px] shadow-md">
      {data.map((balanceItem) => (
        <div key={balanceItem.id} className=" grid  py-2">

          <h1 className="text-xl font-semibold text-blue-400  flex items-center justify-center gap-5">  <span className="h-1 w-9 bg-blue-400 "></span>{balanceItem.id}
          <span className="h-1 w-9 bg-blue-400 "></span>
          </h1>
          <div className="font-semibold">Balance:  ${balanceItem.Balance}</div>
          <div>{formatDate(data.createdAt)}</div>
        </div>
      ))}
      </div>
      <div  className="border h-[200px] shadow-md" >

      </div>
      <div  className="border h-[200px] shadow-md"></div>
      <div  className="border h-[200px] shadow-md"></div>
    </div>
  );
}

export default Review;
