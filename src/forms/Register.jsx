import { useState,  useEffect } from "react";
import { agentInputform } from "../data/AgentFormData";
import UserHook from "../hooks/UserHook";
import { useNavigate } from "react-router-dom";
import { FormInput, FormTextarea, SelectInput } from "./formInputAndTextArea";
import { createUser } from "../firebase/FireBaseConfig";

function Register() {
  
  const { UploadUserPhoto, uploadUserInfo, CreateAgent,isAdmin } = UserHook();
  const [error, setError] = useState(null);
  const [message,setMessage]=useState("")
  const [formData, setFormData] = useState({
    image: null,
    AgentId: "",
    displayName: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    city: "",
  });

  const [previewImage, setPreviewImage] = useState(null);
  const collectionName = "agentInfo";
  const storageName = "agentProfileImage";
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) {
        setMessage("Only admins can create users.");
        alert(message)
        return;
      }
    try {
     
      const userCredential = await createUser({
        email: formData.email,
        password: formData.password,
        phoneNumber:formData.phone,
        displayName:formData.displayName,
        emailVerified: false,
        disabled: false,
      });
      const newUser = userCredential.data.uid;
      console.log(newUser)
      const AgentId = newUser;
      const photoURL = await UploadUserPhoto(AgentId, formData.image, storageName);
      await uploadUserInfo(AgentId, collectionName, {
        ...formData,
        image: photoURL,
      });
      navigate("/Users");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form
      className="grid gap-4 relative shadow-md border rounded-md p-3"
      onSubmit={handleSubmit}
    >
      <div className="grid absolute grid-cols-1 lg:grid-cols-3 lg:relative justify-center gap-8 text-center">
        <div className="grid justify-between items-center">
          <div className="border border-gray-600 h-[100px] w-[100px] rounded-full lg:col-span-1 cursor-pointer">
            <img
              src={
                previewImage
                  ? previewImage
                  : "https://w7.pngwing.com/pngs/527/625/png-transparent-scalable-graphics-computer-icons-upload-uploading-cdr-angle-text-thumbnail.png"
              }
              alt="Profile"
              className="rounded-full object-cover h-full w-full"
            />
            <input
              type="file"
              id="image"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="grid lg:grid-cols-2 gap-4">
            {agentInputform(formData, handleInputChange).map((field) => {
              if (field.type === "textarea") {
                return <FormTextarea key={field.id} {...field} />;
              } else if (field.type === "select") {
                return <SelectInput key={field.id} {...field} />;
              } else if (field.type === "file") {
                return (
                  <div key={field.id}>
                    <label htmlFor={field.id}>{field.label}</label>
                    <input
                      type={field.type}
                      id={field.id}
                      required={field.required}
                      onChange={handleFileChange}
                    />
                  </div>
                );
              } else {
                return <FormInput key={field.id} {...field} />;
              }
            })}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="px-2 py-2 bg-green-600 rounded-md text-white hover:scale-105"
          type="submit"
        >
          Register
        </button>
      </div>
      {error && <span className="text-center text-red-600">{error}</span>}
    </form>
  );
}

export default Register;
