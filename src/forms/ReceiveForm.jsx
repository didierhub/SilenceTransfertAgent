import { useState } from "react";
import TransactionHook from "../hooks/TransactionHook";
import UserHook from "../hooks/UserHook";
import { useNavigate } from "react-router-dom";

function ReceiveForm() {
  const { user } = UserHook();
  const { CreatTransaction, UploadProof } = TransactionHook();
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [ reason, setReason] = useState("");
  const navigate = useNavigate();
  const AgentId = user.uid;
  const collectionName = "receives";
  const storageName = "receiveFolder";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const photoURL = image ? await UploadProof(image, AgentId, storageName) : null;
      await CreatTransaction({ reason, AgentId, photoURL }, collectionName);
      // Reset form after successful submission
      setImage(null);
      setReason("");
      setError(null);
      alert("successed")
     navigate("/Transaction/Receive")
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="grid justify-center">
      <form className="grid gap-3 w-[350px] h-[300px]" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <label htmlFor="image" className="text-gray-500 text-sm">
            Amount to transfer
          </label>
          <input
            type="file"
            id="image"
            required
            className="shadow-md rounded-md"
            onChange={handleImageChange}
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="raison" className="text-gray-500 text-sm">
            Raison
          </label>
          <textarea
            id="raison"
            required
            className="shadow-md rounded-md"
            rows={8}
            onChange={(e) =>setReason(e.target.value)}
            value={reason}
          ></textarea>
        </div>
        <div className="grid">
          <button
            type="submit"
            className="px-3 py-1 bg-green-500 hover:scale-105 shadow-md rounded-md text-white font-semibold"
          >
            Send
          </button>
        </div>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
}

export default ReceiveForm;
