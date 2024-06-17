import React, { useState } from "react";
import GoogleButton from "react-google-button";
import UserHook from "../hooks/UserHook";
import { useNavigate } from "react-router-dom";

function LogIn() {
  const { UserLogInWithGoogle,UserLogInWithEmailAndPassword,user } = UserHook();
  const [email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //log in with google
  const handleGoogleLogIn =async(e) => {
    e.preventDefault();
    try {
       await UserLogInWithGoogle();
       navigate("/");
       console.log(user)
    } catch (error) {
      console.log(error.message);
      setError(error);
    }
  };

  //log in with password and email
  const handleEmailPasswordLogIn=async(e)=>{
    e.preventDefault();
    try{
    await UserLogInWithEmailAndPassword(email,password)
   navigate("/");
    }
    catch(error){
      setError(error)
      console.log(error.message)
    }
  }
  return (
    <div className="absolute top-[50%] translate-y-[-50%]  left-[50%] translate-x-[-50%] grid justify-center gap-2">
      <form className=" h-[300px] w-[300px]   grid  gap-2 p-2"  >
        <h1 className="text-center">Log in</h1>
        <div className=" border-gray-400  border-b-2 grid pl-2 py-1">
          { console.log(password)}
          <label htmlFor="Email"></label>Email
          <input
            type="email"
            className="border-none bg-transparent pl-1 "
            id="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
        <div className=" border-gray-400  border-b-2 grid pl-2 py-1">
          {" "}
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            className="  outline-none focus:outline-none focus:border-transparent border-none bg-transparent pl-1 "
            id="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>
      </form>
      <div className="flex justify-center">
        <button  className="border rounded-md border-blue-500 hover:bg-blue-500 hover:text-white px-4 py-1" onClick={handleEmailPasswordLogIn}>
          {" "}
          log in
        </button>
      </div>
      <h1 className="text-center flex justify-center gap-3">
        {" "}
        <span className="w-[50px] h-1 bg-gray-500"></span>or log in with{" "}
        <span className="w-[50px] h-1 bg-gray-500"></span>
      </h1>
      <div className="flex justify-center  scale-90 hover:scale-100">
        <GoogleButton onClick={handleGoogleLogIn} />
      </div>
      {
        error && <span className="text-red-600 text-center"> wrong email or password </span>
      }
     
    </div>
  );
}

export default LogIn;
