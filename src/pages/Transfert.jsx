import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase/FireBaseConfig";
import TransactionSearchBar from '../components/TransactionSearchBar';
import UserHook from "../hooks/UserHook";
import TransactionHook from "../hooks/TransactionHook";

function Transfert() {
   const collectionName="transfers"
   const [transfers, setTransfers] = useState([]);
   const {formatDate,fetchData}=TransactionHook()
   const {user}=UserHook()
   const userId=user.uid

  

  useEffect(() => {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, where("AgentId", "==", userId), orderBy("createdAt","desc"));


    const unsubscribe = onSnapshot(q, (snapshot) => {
      const transfersData = snapshot.docs.map((doc) => {
        const data = doc.data();
       
        const createdAt = data.createdAt ? data.createdAt.toDate() : null; // Convert Firestore Timestamp to JavaScript Date
        return {
          id: doc.id,
          ...data,
          createdAt,
        };
      });
      setTransfers(transfersData);
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, [userId]);



  return (
    <div className="grid gap-3 p-2">
      <TransactionSearchBar 
        button="Transfert" 
        transactiontype="TransfertedData" 
        placeholder="search transferred" 
        path="/Transaction/TransfertForm" 
      />
      <div className="relative">
        <div className="border gap-2 shadow-md grid lg:grid-cols-4 px-2 pt-4 absolute top-[50%] left-[50%] translate-x-[-50%] w-full h-[65vh] overflow-y-scroll">
          {transfers.map((transfer) => (
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
      {console.log(transfers)}
    </div>
  );
}

export default Transfert;
