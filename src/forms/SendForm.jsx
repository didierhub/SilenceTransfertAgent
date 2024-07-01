import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc, where, orderBy } from 'firebase/firestore';
import { db } from "../firebase/FireBaseConfig";
import TransactionHook from "../hooks/TransactionHook";
import UserHook from "../hooks/UserHook";
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

  const { id } = useParams(); // Get the transaction ID from the URL

  // Fetch agent's balance
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
    // Fetch existing transaction data if editing
    if (id) {
      const fetchTransaction = async () => {
        const docRef = doc(db, collectionName, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      };
      fetchTransaction();
    }
  }, [id]);

  useEffect(() => {
    // Calculate fees and total amount whenever amount changes
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
      // Upload the image if provided
      const photoURL = formData.image
        ? await UploadProof(formData.image, AgentId, storageName)
        : null;

      // Check if the agent has sufficient balance
      if (balance < totalAmount) {
        setErrorSend("Insufficient balance.");
        return;
      }

      // Construct transaction data
      const transactionData = {
        totalAmount,
        amount,
        fees,
        destination,
        paymentMethod,
        accountDetails,
        photoURL,
        AgentId,
        status: 'pending'
      };

      if (id) {
        // Update existing transaction
        const docRef = doc(db, collectionName, id);
        await updateDoc(docRef, transactionData);
      } else {
        // Create new transaction
        await CreatTransaction(transactionData, collectionName);

        // Deduct the totalAmount from agent's balance after successful transaction
        const AgentBalanceRef = doc(db, BalanceCollectionName, AgentBalanceId);
        await updateDoc(AgentBalanceRef, { Balance: balance - totalAmount });
      }

      // Reset form fields and state
      setFormData({
        amount: 0,
        fees: 0,
        totalAmount: 0,
        destination: "",
        paymentMethod: "",
        accountDetails: {},
        image: null,
      });
      setErrorSend(null);

      // Navigate to the send page
      navigate("/Transaction/Send");
      alert(id ? "Transaction updated successfully" : "Sent successfully");
    } catch (error) {
      console.error("Error creating transfer:", error);
      setErrorSend(error.message);
    }
  };

  return (
    <div className="h-full w-full flex justify-center items-center self-center  relative ">
      <form onSubmit={handleSubmit}  className="grid grid-cols-1 md:grid-cols-2 gap-3 w-[90%] overflow-y-scroll  justify-center self-center ">
        {sendInputFields(formData, setFormData).map((field) => {
          if (field.type === "textarea") {
            return <FormTextarea key={field.id} {...field} />;
          } else if (field.type === "select") {
            return <SelectInput key={field.id} {...field} />;
          } else {
            return <FormInput key={field.id} {...field} />;
          }
        })}
        {formData.image && (
          <div className="h-50px w-full flex border-2 shadow-md p-1 justify-center">
            <img
              src={URL.createObjectURL(formData.image)}
              alt="Preview"
              className="relativ h-40 w-full  object-cover"
            />
          </div>
        )}
        <div  className="flex justify-center items-center">
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 hover:scale-105 shadow-md rounded-md text-white font-semibold"
          >
            {id ? "Update" : "Send"}
          </button>
        </div>
        {errorSend && <div className="text-red-500">{errorSend}</div>}
      </form>
      
    </div>
  );
}

export default SendForm;
