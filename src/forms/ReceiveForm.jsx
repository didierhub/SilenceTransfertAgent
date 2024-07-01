import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc, where, orderBy } from "firebase/firestore";
import { db } from "../firebase/FireBaseConfig";
import TransactionHook from "../hooks/TransactionHook";
import UserHook from "../hooks/UserHook";
import { receiveInputFields } from "../data/inputFields";
import { FormInput, FormTextarea, SelectInput } from "./formInputAndTextArea";

function ReceiveForm() {
  const { CreatTransaction, UploadProof, useFirestoreQuery } =
    TransactionHook();
  const { user } = UserHook();
  const [AgentBalanceId, setAgentBalanceId] = useState("");
  const [balance, setBalance] = useState(0);
  const [errorReceive, setErrorReceive] = useState(null);
  const [formData, setFormData] = useState({
    amountTogive: 0,
    receiverName: "",
    phoneNumber: "",
    email: "",
    receivedMethod: "",
    paymentMethod: "",
    image: null,
    withdrawMethod: "",
    bankDetails: { ibam: "", accountName: "", bank: "" },
  });

  const { id } = useParams(); // Get the transaction ID from the URL
  const collectionName = "receives";
  const BalanceCollectionName = "balances";
  const storageName = "receiveFolder";
  const navigate = useNavigate();
  const AgentId = user.uid;
  const whereClause = where("AgentId", "==", AgentId);
  const orderByClause = orderBy("createdAt", "desc");

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

  useEffect(() => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      receiverName,
      phoneNumber,
      email,
      receivedMethod,
      paymentMethod,
      withdrawMethod,
      bankDetails,
      amountTogive,
    } = formData;

    if (
      !receiverName ||
      !phoneNumber ||
      !email ||
      !receivedMethod ||
      !paymentMethod ||
      amountTogive <= 0
    ) {
      setErrorReceive(
        "All fields are required and amount must be greater than 0"
      );
      return;
    }

    try {
      const photoURL = formData.image
        ? await UploadProof(formData.image, AgentId, storageName)
        : null;

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
        status: "pending",
      };

      if (id) {
        // Update existing transaction
        const docRef = doc(db, collectionName, id);
        await updateDoc(docRef, transactionData);
      } else {
        // Create new transaction
        await CreatTransaction(transactionData, collectionName);
        const AgentBalanceRef = doc(db, BalanceCollectionName, AgentBalanceId);
        await updateDoc(AgentBalanceRef, { Balance: balance - amountTogive });
      }

      setFormData({
        amountTogive: 0,
        receiverName: "",
        phoneNumber: "",
        email: "",
        receivedMethod: "",
        paymentMethod: "",
        image: null,
        withdrawMethod: "",
        bankDetails: { ibam: "", accountName: "", bank: "" },
      });

      setErrorReceive(null);

      navigate("/Transaction/Receive");
      alert(id ? "Transaction updated successfully" : "Received successfully");
    } catch (error) {
      console.error("Error creating receive:", error);
      setErrorReceive("Failed to create transaction. Please try again.");
    }
  };

  return (
    <div className=" h-full w-full flex justify-center items-center self-center   ">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-3 w-[90%] overflow-y-scroll  justify-center self-center "
      >
        {receiveInputFields(formData, setFormData).map((field) => {
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
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="px-3 py-2 bg-green-500 hover:scale-105 shadow-md rounded-md text-white font-semibold"
          >
            {id ? "Update" : "Receive"}
          </button>
        </div>
        {errorReceive && <div className="text-red-500">{errorReceive}</div>}
      </form>
    </div>
  );
}

export default ReceiveForm;
