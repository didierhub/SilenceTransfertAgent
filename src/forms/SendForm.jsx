import { useState } from "react";
import TransactionHook from "../hooks/TransactionHook";
import UserHook from "../hooks/UserHook";
import { useNavigate } from "react-router-dom";
import Destination from "./Destination";
import { inputFields } from "../data/inputFields" 
import { FormInput,FormTextarea,SelectInput } from "./formInputAndTextArea";

function SendForm() {
  const { CreatTransaction, UploadProof } = TransactionHook();
  const { user } = UserHook();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    amount: "",
    reason: "",
    destination: "",
    paymentMethod: "",
    image: null,
  });
  const collectionName = "sends";
  const storageName = "sendProof";
  const navigate = useNavigate();
  const AgentId = user.uid;

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload the image
      const photoURL = formData.image
        ? await UploadProof(formData.image, AgentId, storageName)
        : null;
      // Create the transaction after the image upload is complete
      const transactionData = {
        amount: formData.amount,
        reason: formData.reason,
        destination: formData.destination,
        paymentMethod: formData.paymentMethod,
        photoURL,
        AgentId 
      };
      
      await CreatTransaction(transactionData, collectionName);
      
       // Reset form fields
       setFormData({
        amount: "",
        reason: "",
        destination: "",
        paymentMethod: "",
        image: null,
      });
      // Navigate to the send page
      navigate("/Transaction/Send");
      alert("sent successfully")
    } catch (error) {
      console.error("Error creating transfer:", error);
      setError(error.message);
    }
  };

  return (
    <div className="grid justify-center relative">
      <form onSubmit={handleSubmit} className="grid gap-3 w-[350px] h-[70vh] absolute left-[50%] translate-x-[-50%] overflow-x-scroll">
        {inputFields(formData, setFormData).map((field) => {
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
        {error && <div className="text-red-500">{error}</div>}
       
      </form>
      {formData.image && (
          <div className="w-[150px] absolute  left-[10%] ">
            <img src={URL.createObjectURL(formData.image)} alt="Preview"  className="relative"/>
          </div>
        )}
         {console.log(formData)}
    </div>
  );
}

export default SendForm;
