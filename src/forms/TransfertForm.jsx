import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TransactionHook from "../hooks/TransactionHook";
import UserHook from "../hooks/UserHook";
// Ensure you have this import
import { db } from "../firebase/FireBaseConfig";
import { doc, runTransaction, addDoc, collection } from 'firebase/firestore'; // Ensure you have these imports

function TransfertForm() {
  const { user } = UserHook();
  const { CreatTransaction } = TransactionHook();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const AgentId = user.uid;
  const [formData, setFormData] = useState({
    amount: "",
    reason: "",
    AgentReceiverId: "",
    AgentSenderId: ""
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };


  //to creat transfert
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { amount, reason, AgentReceiverId, AgentSenderId } = formData;
    const transferAmount = parseFloat(amount);

    // Ensure you have validation here as necessary
    if (isNaN(transferAmount) || transferAmount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    try {
      // Perform the balance transfer
      await transferBalance(AgentSenderId, AgentReceiverId, transferAmount);

      // Log the transfer in the transfers collection
      await CreatTransaction(
        { AgentSenderId, AgentReceiverId, amount: transferAmount, reason,AgentId },
        "transfers"
      );
      console.log("Transfer created successfully");
      // Optionally, you could reset the form here
      setFormData({ amount: "", reason: "", AgentReceiverId: "", AgentSenderId: "" });
      navigate("/Transaction/Transfert");
    } catch (error) {
      console.error("Error creating transfer:", error);
      setError(error.message);
    }
  };

  const transferBalance = async (AgentSenderId, AgentReceiverId, amount) => {
    const fromAgentRef = doc(db, 'balances', AgentSenderId);
    const toAgentRef = doc(db, 'balances', AgentReceiverId);

    try {
      await runTransaction(db, async (transaction) => {
        const fromAgentDoc = await transaction.get(fromAgentRef);
        const toAgentDoc = await transaction.get(toAgentRef);

        if (!fromAgentDoc.exists() || !toAgentDoc.exists()) {
          throw new Error("One or both balances do not exist.");
        }

        const fromAgentBalance = fromAgentDoc.data().balance;
        const toAgentBalance = toAgentDoc.data().balance;

        if (fromAgentBalance < amount) {
          throw new Error("Insufficient balance for the transfer.");
        }

        // Perform the balance transfer
        transaction.update(fromAgentRef, { balance: fromAgentBalance - amount });
        transaction.update(toAgentRef, { balance: toAgentBalance + amount });

      });

      alert('Transfer successful');
    } catch (error) {
      console.error('Transfer failed: ', error);
      throw error;
    }
  };

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
        <div className="grid gap-2">
          <label htmlFor="AgentSenderId" className="text-gray-500 text-sm">
            Agent Sender ID
          </label>
          <input
            required
            type="text"
            id="AgentSenderId"
            value={formData.AgentSenderId}
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
        {console.log(formData)}
      </form>
    </div>
  );
}

export default TransfertForm;
