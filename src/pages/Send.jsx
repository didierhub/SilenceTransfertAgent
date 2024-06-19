import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase/FireBaseConfig";
import TransactionSearchBar from '../components/TransactionSearchBar';
import UserHook from "../hooks/UserHook";
import TransactionHook from "../hooks/TransactionHook";

function Send() {
  const { user } = UserHook();
  const [filteredData, setFilteredData] = useState([]);
  const {formatDate,useFirestoreQuery}=TransactionHook()
  const collectionName="sends"
  const AgentId=user.uid
  const whereClause = where('AgentId', '==', AgentId); // Example where clause
  const orderByClause = orderBy('createdAt', 'desc'); // Example order by clause



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
      const totalAmount = transfer.amount ? transfer.totalAmount.toString().toLowerCase() : '';
      const createdAt = transfer.createdAt ? formatDate(transfer.createdAt).toLowerCase() : '';
      
      return (
        reason.includes(lowerCaseTerm) ||
        totalAmount.includes(lowerCaseTerm) ||
        createdAt.includes(lowerCaseTerm)
      );
    });
    setFilteredTransfers(filtered);
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>Error: {error.message}</div>;
  }


  return (
    <div className='grid gap-3 p-2'>
      <TransactionSearchBar
        button="New send"
        transactiontype="SentData"
        placeholder="Search sent"
        path="/Transaction/SendForm"
        onSearch={handleSearch} // Pass the search handler function
      />
      <div className="relative">
        <div className="border gap-2 shadow-md grid lg:grid-cols-4 px-2 pt-4 absolute top-[50%] left-[50%] translate-x-[-50%] w-full h-[65vh] overflow-y-scroll">
          {filteredData.map((transfer) => (
            <div key={transfer.id} className="grid grid-rows-6 gap-2 shadow-md p-2 hover:scale-[1.01] border border-gray-400 drop-shadow-md h-[200px]">
              <div className="row-span-3"><img src={transfer.photoURL} alt="Photo" className="h-full w-full object-cover" /></div>
              <div className="text-red-500">Amount: ${transfer.totalAmount}</div>
              <div className="relative overflow-hidden">Reason: {transfer.reason}</div>
              <div className="text-gray-500 text-sm">{formatDate(transfer.createdAt)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Send;
