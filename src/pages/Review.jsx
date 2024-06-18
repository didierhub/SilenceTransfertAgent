import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase/FireBaseConfig";
import TransactionSearchBar from '../components/TransactionSearchBar';
import UserHook from "../hooks/UserHook";
import TransactionHook from "../hooks/TransactionHook";

function Review() {
  const { user } = UserHook();
  const { formatDate } = TransactionHook();
  const [balance, setBalance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const collectionName = "balances";
  

  useEffect(() => {
    if (!user || !user.uid) return;

    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, where("AgentId", "==", user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      try {
         const transfersData = snapshot.docs.map((doc) => {
          const data = doc.data();
          const createdAt = data.createdAt ? data.createdAt.toDate() : null; // Convert Firestore Timestamp to JavaScript Date
          
          return {
            id: doc.id,
            ...data,
            createdAt,
          };
        });
        {console.log( transfersData)}
        setBalance(transfersData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data: ", err);
        setError(err);
        setLoading(false);
      }
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-4 items-center h-[70vh] grid-center gap-4 px-4">
      <div className="border h-[200px] shadow-md">
      {balance.map((balanceItem) => (
        <div key={balanceItem.id} className=" grid  py-2">

          <h1 className="text-xl font-semibold text-blue-400  flex items-center justify-center gap-5">  <span className="h-1 w-9 bg-blue-400 "></span>{balanceItem.id}
          <span className="h-1 w-9 bg-blue-400 "></span>
          </h1>
          <div className="font-semibold">Balance:  ${balanceItem.Balance}</div>
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
