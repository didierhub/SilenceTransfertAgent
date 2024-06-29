import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/FireBaseConfig";
import TransactionSearchBar from "../components/TransactionSearchBar";
import UserHook from "../hooks/UserHook";
import TransactionHook from "../hooks/TransactionHook";
import { useNavigate } from "react-router-dom";

function Receive() {
  const { user, isAdmin } = UserHook();
  const [filteredData, setFilteredData] = useState([]);
  const collectionName = "receives";
  const AgentId = user.uid;
  const { formatDate, useFirestoreQuery, } = TransactionHook();
  const whereClause = isAdmin ? null : where("AgentId", "==", AgentId);
  const orderByClause = orderBy("createdAt", "desc");
  const navigate = useNavigate();

  const { data, loading, error } = useFirestoreQuery(
    collectionName,
    whereClause,
    orderByClause,
    AgentId
  );

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleSearch = (searchTerm) => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    const filtered = data.filter((transfer) => {
      const reason = transfer.reason ? transfer.reason.toLowerCase() : "";
      const amount = transfer.amountTogive
        ? transfer.amountTogive.toString().toLowerCase()
        : "";
      const createdAt = transfer.createdAt
        ? formatDate(transfer.createdAt).toLowerCase()
        : "";

      return (
        reason.includes(lowerCaseTerm) ||
        amount.includes(lowerCaseTerm) ||
        createdAt.includes(lowerCaseTerm)
      );
    });
    setFilteredData(filtered);
  };

  const handleStatusChange = async (transactionId, newStatus) => {
    try {
      const transactionRef = doc(db, collectionName, transactionId);
      await updateDoc(transactionRef, { status: newStatus });
      // Optionally update local state to reflect the change immediately
    } catch (error) {
      console.error("Error updating status:", error);
      // Handle error updating status
    }
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
        button="New receive"
        transactiontype="ReceivedData"
        placeholder="search received"
        path="/Transaction/ReceiveForm"
        onSearch={handleSearch}
      />

      <div className="relative">
        <div className="border gap-2 shadow-md grid lg:grid-cols-4 px-2 pt-4 absolute top-[50%] left-[50%] translate-x-[-50%] w-full h-[65vh] overflow-y-scroll">
          {filteredData.map((transfer) => (
            <div
              key={transfer.id}
              className="grid grid-rows-6 gap-2 shadow-md p-2 hover:scale-[1.01] border border-gray-400 drop-shadow-md h-80 "
            >
              <div className="row-span-3">
                <img
                  src={transfer.photoURL}
                  alt="Photo"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="relative overflow-hidden">
                receiverName: {transfer.receiverName}
              </div>
              <div className="relative overflow-hidden">
                amountTogive: ${transfer.amountTogive}
              </div>
              <div className="relative overflow-hidden">
                withdrawMethod: {transfer.withdrawMethod}
              </div>
              <div className="text-md">
                Status:
                <span
                  className={`${
                    transfer.status === "pending"
                      ? "text-yellow-500"
                      : transfer.status === "accepted"
                      ? "text-green-500"
                      : "text-red-500"
                  } bg-gray-100 p-2 rounded-md shadow-md`}
                >
                  {transfer.status}
                </span>
              </div>
              <div className="overflow-hidden">
                {formatDate(transfer.createdAt)}
              </div>
              {!isAdmin && transfer.status !== "accepted" && (
                <div className="flex justify-end">
                  <button
                    onClick={() =>
                      navigate(`/Transaction/ReceiveForm/${transfer.id}`)
                    }
                    className="px-3 py-1 bg-blue-500 hover:scale-105 shadow-md rounded-md text-white font-semibold"
                  >
                    Edit
                  </button>
                </div>
              )}
               {isAdmin && transfer.status !== 'accepted' && (
                <div className="flex justify-end">
                  <select
                    value={transfer.status}
                    onChange={(e) => handleStatusChange(transfer.id, e.target.value)}
                    className="px-3 py-1 bg-gray-100 hover:scale-105 shadow-md rounded-md text-sm text-gray-700 font-semibold"
                    disabled={transfer.status === 'accepted'}
                  >
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              )}
            </div>
          ))}
        </div>
        {console.log(filteredData)}
      </div>
    </div>
  );
}

export default Receive;
