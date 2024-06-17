import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase/FireBaseConfig";
import TransactionSearchBar from '../components/TransactionSearchBar';
import UserHook from "../hooks/UserHook";

function Send() {
  const { user } = UserHook();
  const [transfers, setTransfers] = useState([]);
  const [filteredTransfers, setFilteredTransfers] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, "sends");
    const q = query(collectionRef, where("AgentId", "==", user.uid), orderBy("createdAt", "desc"));

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
      setFilteredTransfers(transfersData); // Initialize filteredTransfers with all transfers
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, [user.uid]);

  const handleSearch = (searchTerm) => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    const filtered = transfers.filter((transfer) => {
      const reason = transfer.reason ? transfer.reason.toLowerCase() : '';
      const amount = transfer.amount ? transfer.amount.toString().toLowerCase() : '';
      const createdAt = transfer.createdAt ? formatDate(transfer.createdAt).toLowerCase() : '';
      
      return (
        reason.includes(lowerCaseTerm) ||
        amount.includes(lowerCaseTerm) ||
        createdAt.includes(lowerCaseTerm)
      );
    });
    setFilteredTransfers(filtered);
  };

  const formatDate = (date) => {
    if (!date) return "Unknown Date";
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }).format(date);
  };

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
          {filteredTransfers.map((transfer) => (
            <div key={transfer.id} className="grid grid-rows-6 gap-2 shadow-md p-2 hover:scale-[1.01] border border-gray-400 drop-shadow-md h-[200px]">
              <div className="row-span-3"><img src={transfer.photoURL} alt="Photo" className="h-full w-full object-cover" /></div>
              <div className="text-red-500">Amount: ${transfer.amount}</div>
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
