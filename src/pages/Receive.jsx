import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase/FireBaseConfig";
import TransactionSearchBar from '../components/TransactionSearchBar';
import UserHook from "../hooks/UserHook";
import TransactionHook from "../hooks/TransactionHook";




function Receive() {

  const { user } = UserHook();
  const [transfers, setTransfers] = useState([]);
  const collectionName = "receives";
  const{formatDate}=TransactionHook()

  useEffect(() => {
    const collectionRef = collection(db,collectionName);
    const q = query(collectionRef, where("AgentId", "==", user.uid), orderBy("createdAt","desc"));


    const unsubscribe = onSnapshot(q, (snapshot) => {
      const transfersData = snapshot.docs.map((doc) => {
        const data = doc.data();
        {console.log(data)}
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
  }, [user.uid]);

 
  return (
    <div className=' grid  gap-3 p-2'>
      <TransactionSearchBar  button="New receive" transactiontype="ReceivedData"  placeholder="search received" path="/Transaction/ReceiveForm" />
      <div className="relative">
        <div className="border gap-2 shadow-md grid lg:grid-cols-4 px-2 pt-4 absolute top-[50%] left-[50%] translate-x-[-50%] w-full h-[65vh] overflow-y-scroll">
          {transfers.map((transfer) => (
            <div key={transfer.id} className="grid  grid-rows-6 gap-2  shadow-md p-2 hover:scale-[1.01] border border-gray-400 drop-shadow-md h-[200px]">
               <div className=" row-span-3"><img src={transfer.photoURL} alt="Photo"  className="h-full w-full object-cover"/></div>
              <div className="relative overflow-hidden  ">Reason: {transfer.reason}</div>
              <div className="text-gray-500 text-sm  "> {formatDate(transfer.createdAt)}</div>
            </div>
          ))}
        </div>
     
       
      </div>
    </div>
  )
}

export default Receive