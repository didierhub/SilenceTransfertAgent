import React, { useState } from "react";
import { db } from "../firebase/FireBaseConfig";
import { doc, setDoc } from "firebase/firestore";
import UserHook from "../hooks/UserHook";

function DataUploadTest() {
  const { user } = UserHook();
  const [formData, setFormData] = useState({});
  const[error,setError]=useState(null)

  const data = [
    { id: "name", value: "Name", placeholder: "Don joe", type: "text" },
    { id: "phone", value: "phone", placeholder: "+90 533 881 23 90", type: "text" },
    { id: "email", value: "email", placeholder: "example@gmail.com", type: "email" },
    { id: "address", value: "address", placeholder: "girne ,23,", type: "text" },
  ];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const createDocument = async (e) => {
    e.preventDefault();
    try {
      const userId = user.uid;
      const timestamp = new Date().toISOString();
      const documentRef = doc(db, "users", userId, "data", timestamp);

      await setDoc(documentRef, formData);
      console.log("Document successfully written!");
    } catch (error) {
      console.error("Error writing document: ", error);
      setError(error)
    }
  };

  return (
    <form className="grid gap-2 p-10" onSubmit={createDocument}>
      {data.map((input) => (
        <input
          key={input.id}
          id={input.id}
          type={input.type}
          placeholder={input.placeholder}
          onChange={handleInputChange}
          className="border p-2 rounded"
        />
      ))}
      <div className="flex justify-center">
        <button className="text-white bg-green-400 rounded-md px-3 py-1" type="submit">
          Submit
        </button>
      </div>
      {error &&<div className="grid justify-center"> {error}</div>}
    </form>
  );
}

export default DataUploadTest;
