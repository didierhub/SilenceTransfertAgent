import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TransactionHook from "../hooks/TransactionHook";
import UserHook from "../hooks/UserHook";
import { db } from "../firebase/FireBaseConfig";
import { doc, runTransaction,  where,  } from 'firebase/firestore';

function TransfertForm() {
  const { user } = UserHook();
  const { CreatTransaction, useFirestoreQuery } = TransactionHook();
 
  const navigate = useNavigate();
  const AgentId = user.uid;
  const BalanceCollectionName = "balances";
  const [AgentSenderId, setAgentSenderId] = useState("");
  const whereClause = where('AgentId', '==', AgentId);

  const { data, loading, error } = useFirestoreQuery(
    BalanceCollectionName,
    whereClause,
    undefined,
    AgentId
  );

  useEffect(() => {
    if (data && data.length > 0) {
      setAgentSenderId(data[0].id);
    }
  }, [data]);

  const [formData, setFormData] = useState({
    amount: "",
    reason: "",
    AgentReceiverId: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { amount, reason, AgentReceiverId } = formData;
    const transferAmount = parseFloat(amount);

    if (isNaN(transferAmount) || transferAmount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    try {
      await transferBalance(AgentSenderId, AgentReceiverId, transferAmount);

      await CreatTransaction(
        { AgentSenderId, AgentReceiverId, amount: transferAmount, reason, AgentId },
        "transfers"
      );
      console.log("Transfer created successfully");
      setFormData({ amount: "", reason: "", AgentReceiverId: "" });
      navigate("/Transaction/Transfert");
    } catch (error) {
      console.error("Error creating transfer:", error);
    }
  };

  const transferBalance = async (AgentSenderId, AgentReceiverId, amount) => {
    const fromAgentRef = doc(db, BalanceCollectionName, AgentSenderId);
    const toAgentRef = doc(db, BalanceCollectionName, AgentReceiverId);

    try {
      await runTransaction(db, async (transaction) => {
        const fromAgentDoc = await transaction.get(fromAgentRef);
        const toAgentDoc = await transaction.get(toAgentRef);

        if (!fromAgentDoc.exists() || !toAgentDoc.exists()) {
          throw new Error("One or both balances do not exist.");
        }

        const fromAgentBalance = fromAgentDoc.data().Balance;
        const toAgentBalance = toAgentDoc.data().Balance;

        if (fromAgentBalance < amount) {
          throw new Error("Insufficient balance for the transfer.");
        }

        transaction.update(fromAgentRef, { Balance: fromAgentBalance - amount });
        transaction.update(toAgentRef, { Balance: toAgentBalance + amount });
      });

      alert('Transfer successful');
    } catch (error) {
      console.error('Transfer failed: ', error);
      throw error;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex justify-center mt-10">
      <form onSubmit={handleSubmit} className="grid gap-3 w-[350px] h-[300px]">
        <div className="grid gap-2">
          <label htmlFor="amount" className="text-gray-500 text-sm">
            Amount to transfer
          </label>
          <input
            type="number"
            id="amount"
            required
            value={formData.amount}
            onChange={handleChange}
            className="shadow-md rounded-md"
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="reason" className="text-gray-500 text-sm">
            Reason for the transfer
          </label>
          <textarea
            rows={8}
            required
            id="reason"
            value={formData.reason}
            onChange={handleChange}
            className="shadow-md rounded-md"
          ></textarea>
        </div>
        <div className="grid gap-2">
          <label htmlFor="AgentReceiverId" className="text-gray-500 text-sm">
            Agent Receiver ID
          </label>
          <input
            required
            type="text"
            id="AgentReceiverId"
            value={formData.AgentReceiverId}
            onChange={handleChange}
            className="shadow-md rounded-md"
          />
        </div>
        <div className="grid">
          <button
            type="submit"
            className="px-3 py-1 bg-green-500 hover:scale-105 shadow-md rounded-md text-white font-semibold"
          >
            Transfer
          </button>
        </div>
        <div>{error && <span>{error}</span>}</div>
      </form>
    </div>
  );
}

export default TransfertForm;

