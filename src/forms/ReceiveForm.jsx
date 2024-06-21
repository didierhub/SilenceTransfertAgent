import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TransactionHook from "../hooks/TransactionHook";
import UserHook from "../hooks/UserHook";
import { doc, updateDoc, where, orderBy } from 'firebase/firestore';
import { db } from "../firebase/FireBaseConfig";
import { receiveInputFields } from "../data/inputFields";
import { FormInput, FormTextarea, SelectInput } from "./formInputAndTextArea";

function ReceiveForm() {
  const { CreatTransaction, UploadProof, useFirestoreQuery } = TransactionHook();
  const { user } = UserHook();
  const [AgentBalanceId, setAgentBalanceId] = useState("");
  const [balance, setBalance] = useState(0); // Track the current balance
  const [errorReceive, setErrorReceive] = useState(null);
  const [formData, setFormData] = useState({
    amountTogive:0,
    receiverName: '',
    phoneNumber: '',
    email: '',
    receivedMethod: '',
    paymentMethod: '',
    image: null,
    withdrawMethod: '',
    bankDetails: { ibam: '', accountName: '', bank: '' },
  });

  const collectionName = "receives";
  const BalanceCollectionName = "balances";
  const storageName = "receiveFolder";
  const navigate = useNavigate();
  const AgentId = user.uid;
  const whereClause = where('AgentId', '==', AgentId);
  const orderByClause = orderBy('createdAt', 'desc');

  const { data, loading, error } = useFirestoreQuery(
    BalanceCollectionName,
    whereClause,
    undefined,
    AgentId
  );

  useEffect(() => {
    if (data && data.length > 0) {
      setAgentBalanceId(data[0].id);
      setBalance(data[0].Balance); 
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { receiverName, phoneNumber, email, receivedMethod, paymentMethod, withdrawMethod, bankDetails,amountTogive } = formData;

    try {
      const photoURL = formData.image ? await UploadProof(formData.image, AgentId, storageName) : null;

      // Create the transaction after the image upload is complete
      const transactionData = {
        receiverName,
        phoneNumber,
        email,
        amountTogive,
        receivedMethod,
        paymentMethod,
        withdrawMethod,
        bankDetails,
        photoURL,
        AgentId,
      };
      await CreatTransaction(transactionData, collectionName);
      const AgentBalanceRef = doc(db, BalanceCollectionName, AgentBalanceId);
      await updateDoc(AgentBalanceRef, { Balance: balance - amountTogive }); // Deduct the totalAmount
      // Reset form fields
      setFormData({
        amountTogive:0,
        receiverName: '',
        phoneNumber: '',
        email: '',
        receivedMethod: '',
        paymentMethod: '',
        image: null,
        withdrawMethod: '',
        bankDetails: { ibam: '', accountName: '', bank: '' },
      });
      
      setErrorReceive(null);

      // Navigate to the receive page
      navigate("/Transaction/Receive");
      alert("Received successfully");
    } catch (error) {
      console.error("Error creating receive:", error);
      setErrorReceive(error.message);
    }
  };

  return (
    <div className="grid justify-center relative">
      <form onSubmit={handleSubmit} className="grid grid-cols-1  md:grid-cols-2 gap-3 w-[80%]  max-h-[70vh] absolute left-[50%] translate-x-[-50%] overflow-x-scroll">
        {receiveInputFields(formData, setFormData).map((field) => {
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
            Receive
          </button>
        </div>
        {errorReceive && <div className="text-red-500">{errorReceive}</div>}
      </form>
      {formData.image && (
        <div className="w-[150px] absolute left-[10%]">
          <img src={URL.createObjectURL(formData.image)} alt="Preview" className="relative" />
        </div>
      )}
    </div>
  );
}

export default ReceiveForm;
