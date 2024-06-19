import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TransactionHook from "../hooks/TransactionHook";
import UserHook from "../hooks/UserHook";
import { doc, updateDoc, where, orderBy } from 'firebase/firestore';
import { db } from "../firebase/FireBaseConfig";
import { sendInputFields } from "../data/inputFields";
import { FormInput, FormTextarea, SelectInput } from "./formInputAndTextArea";
import { calculateFeesAndTotal } from "../features/functions";

function SendForm() {
  const { CreatTransaction, UploadProof, useFirestoreQuery } = TransactionHook();
  const { user } = UserHook();
  const [AgentBalanceId, setAgentBalanceId] = useState("");
  const [balance, setBalance] = useState(0); // Track the current balance
  const [errorSend, setErrorSend] = useState(null);
  const [formData, setFormData] = useState({
    amount: 0,
    fees: 0,
    totalAmount: 0,
    destination: "",
    paymentMethod: "",
    accountDetails: {},
    image: null,
  });
  const collectionName = "sends";
  const BalanceCollectionName = "balances";
  const storageName = "sendProof";
  const navigate = useNavigate();
  const AgentId = user.uid;
  const whereClause = where('AgentId', '==', AgentId);
  const orderByClause = orderBy('createdAt', 'desc');


  //fetching balance
  const { data, loading, error } = useFirestoreQuery(
    BalanceCollectionName,
    whereClause,
    undefined,
    AgentId
  );

  useEffect(() => {
    if (data && data.length > 0) {
      setAgentBalanceId(data[0].id);
      setBalance(data[0].Balance); // Assume Balance is a field in the document
    }
  }, [data]);

  useEffect(() => {
    const { fees, totalAmount } = calculateFeesAndTotal(formData.amount);

    setFormData((prevData) => ({
      ...prevData,
      fees,
      totalAmount,
    }));
  }, [formData.amount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { totalAmount, amount, destination, paymentMethod, accountDetails, fees } = formData;

    if (isNaN(totalAmount) || totalAmount <= 0) {
      setErrorSend("Please enter a valid amount.");
      return;
    }

    try {
      // Upload the image
      const photoURL = formData.image
        ? await UploadProof(formData.image, AgentId, storageName)
        : null;

      // Check if the agent has sufficient balance
      if (balance < totalAmount) {
        setErrorSend("Insufficient balance.");
        return;
      }

      // Create the transaction after the image upload is complete
      const transactionData = {
        totalAmount,
        amount,
        fees,
        destination,
        paymentMethod,
        accountDetails,
        photoURL,
        AgentId,
      };
      await CreatTransaction(transactionData, collectionName);

      // Update the agent's balance
      const AgentBalanceRef = doc(db, BalanceCollectionName, AgentBalanceId);
      await updateDoc(AgentBalanceRef, { Balance: balance + totalAmount }); // Deduct the totalAmount

      // Reset form fields
      setFormData({
        amount: 0,
        fees: 0,
        totalAmount: 0,
        destination: "",
        paymentMethod: "",
        accountDetails: {},
        image: null,
      });

      // Navigate to the send page
      navigate("/Transaction/Send");
      alert("Sent successfully");
    } catch (error) {
      console.error("Error creating transfer:", error);
      setErrorSend(error.message);
    }
  };

  return (
    <div className="grid justify-center relative">
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3 w-[80%] h-auto absolute left-[50%] translate-x-[-50%] overflow-x-scroll">
        {sendInputFields(formData, setFormData).map((field) => {
          if (field.type === "textarea") {
            return <FormTextarea key={field.id} {...field} />;
          } else if (field.type === "select") {
            return <SelectInput key={field.id} {...field} />;
          } else {
            return <FormInput key={field.id} {...field} />;
          }
        })}
        <div className="grid">
          <button
            type="submit"
            className="px-3 py-1 bg-green-500 hover:scale-105 shadow-md rounded-md text-white font-semibold"
          >
            Send
          </button>
        </div>
        {errorSend && <div className="text-red-500">{errorSend}</div>}
      </form>
      {formData.image && (
        <div className="w-[150px] absolute left-[10%]">
          <img src={URL.createObjectURL(formData.image)} alt="Preview" className="relative" />
        </div>
      )}
    </div>
  );
}

export default SendForm;
