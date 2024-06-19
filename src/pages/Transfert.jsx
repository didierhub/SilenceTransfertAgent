import { useState,useEffect } from "react";
import { where, orderBy } from "firebase/firestore";
import TransactionSearchBar from '../components/TransactionSearchBar';
import UserHook from "../hooks/UserHook";
import TransactionHook from "../hooks/TransactionHook";

function Transfert() {
  const [filteredData, setFilteredData] = useState([]);
   const collectionName="transfers"
   const {formatDate,useFirestoreQuery}=TransactionHook()
   const {user}=UserHook()
   const AgentId=user.uid
   const whereClause = where('AgentId', '==', AgentId); // Example where clause
   const orderByClause = orderBy('createdAt', 'desc'); // Example order by clause


   //fetchingData
   const { data, loading, error }= useFirestoreQuery(
    collectionName, // collectionName
    whereClause,
    orderByClause , // whereClause
   AgentId// orderByClause
  );

  useEffect(() => {
    setFilteredData(data); // update filteredTransfers when sendData changes
  }, [data]);
  
  //handleSearch  function
  const handleSearch = (searchTerm) => {
      const lowerCaseTerm = searchTerm.toLowerCase();
      const filtered = data.filter((transfer) => {
      const reason = transfer.reason ? transfer.reason.toLowerCase() : '';
      const amount = transfer.amount ? transfer.amount.toString().toLowerCase() : '';
      const createdAt = transfer.createdAt ? formatDate(transfer.createdAt).toLowerCase() : '';
      const AgentReceiverId=transfer.createdAt ? formatDate(transfer.createdAt).toLowerCase() : '';
      
      return (
        reason.includes(lowerCaseTerm) ||
        amount.includes(lowerCaseTerm) ||
        AgentReceiverId.includes(lowerCaseTerm) ||
        createdAt.includes(lowerCaseTerm)
      );
    });
    setFilteredData(filtered);
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>Error: {error.message}</div>;
  }




  return (
    <div className="grid gap-3 p-2">
      <TransactionSearchBar 
        button="Transfert" 
        transactiontype="TransfertedData" 
        placeholder="search transferred" 
        path="/Transaction/TransfertForm" 
        onSearch={handleSearch} 
      />
      <div className="relative">
        <div className="border gap-2 shadow-md grid lg:grid-cols-4 px-2 pt-4 absolute top-[50%] left-[50%] translate-x-[-50%] w-full h-[65vh] overflow-y-scroll">
          {filteredData.map((transfer) => (
            <div key={transfer.id} className="grid gap-2 shadow-md p-2 hover:scale-[1.01] border border-gray-400 drop-shadow-md h-fit">
              <div className="text-red-500">Amount: ${transfer.amount}</div>
              <div className="relative overflow-hidden">Reason: {transfer.reason}</div>
              <div className="text-red-500">AgentReceiver ID: {transfer.AgentSenderId}</div>
              <div className="text-green-500">AgentReceiver ID: {transfer.AgentReceiverId}</div>
              <div className="text-gray-500 text-sm"> {formatDate(transfer.createdAt)}</div>
            </div>
          ))}
        </div>
      </div>
    
    </div>
  );
}

export default Transfert;
