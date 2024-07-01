import React from "react";
import { FaHome, FaUsers, FaPeopleArrows } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { MdOutlineSendToMobile } from "react-icons/md";
import { BiSolidLogInCircle } from "react-icons/bi";
import { IoMdLogOut } from "react-icons/io";
import { CiDark } from "react-icons/ci";
import { NavLink, useNavigate } from "react-router-dom";
import UserHook from "../hooks/UserHook";

function SideBard() {
  const { user, UserSignOUt, isAdmin,menu,handleMenu} = UserHook();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await UserSignOUt();
      localStorage.removeItem(user);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div >

    {/* desktop */}
     <div className=" hidden  md:grid  left-0 top-20 col-span-1   border-r justify-center h-full">
      <div className="row-span-1 border-b grid ">
        <div className="grid  pt-2 w-full">
          <span className="  text-gray-500 translate-x-[-50%] letf-[50%] absolute  flex justify-start ">
            Menu
          </span>
          <NavLink to="/" className="   flex  items-center gap-5">
            <FaHome size={30} /> home{" "}
          </NavLink>
          {isAdmin && (
            <NavLink to="Users" className="flex  items-center gap-5">
              {" "}
              <FaUsers size={30} />
              users
            </NavLink>
          )}
          <NavLink to="Transaction" className="flex items-center gap-5">
            <GrTransaction size={30} /> transaction
          </NavLink>
        </div>
      </div>

      <div className="col-row-1 border-b grid ">
        <div className=" grid relative  pt-2">
          <span className="  text-gray-500 translate-x-[-25%] letf-[50%] absolute  flex justify-start ">
            Quick Actins
          </span>
          <NavLink
            to="/Transaction/SendForm"
            className="flex  items-center gap-5"
          >
            {" "}
            <MdOutlineSendToMobile size={30} /> send
          </NavLink>
          <NavLink
            to="/Transaction/ReceiveForm"
            className="flex  items-center gap-5"
          >
            <MdOutlineSendToMobile size={30} className=" rotate-180" /> receive
          </NavLink>
          <NavLink
            to="/Transaction/TransfertForm"
            className="flex  items-center gap-5"
          >
            <FaPeopleArrows size={30} /> transfert
          </NavLink>
        </div>
      </div>
      <div className="col-row-1  grid">
        <div className=" grid relative">
          {!user ? (
            <NavLink to="Login" className="flex  items-center gap-5">
              {/* log in  log out*/}
              <BiSolidLogInCircle size={30} /> log in
            </NavLink>
          ) : (
            <div className="flex  items-center gap-5" onClick={handleLogout}>
              <IoMdLogOut size={30} /> lo out
            </div>
          )}

          <div className="flex  items-center ">
            {/* dark mood */}
            <CiDark size={30} /> dark
          </div>
        </div>
      </div>
    </div>
    {/* mobile */}
    <div>

    </div>
    {
      !menu &&(
        <div className="  flex  md:hidden justify-start w-full  fixed top-20 bottom-0 z-20 bg-black/60  text-white transition-all ease-in duration-500 delay-75  pointer-events-none inset-0">

       
        <div className="    grid   border-r justify-center w-[60%] bg-black relative  ">
      <div className="row-span-1 border-b grid ">
        <div className="grid  pt-2 w-full">
          <span className="  text-gray-500 translate-x-[-50%] letf-[50%] absolute  flex justify-start ">
            Menu
          </span>
          <NavLink to="/" className="   flex  items-center gap-5">
            <FaHome size={30} /> home{" "}
          </NavLink>
          {isAdmin && (
            <NavLink to="Users" className="flex  items-center gap-5">
              {" "}
              <FaUsers size={30} />
              users
            </NavLink>
          )}
          <NavLink to="Transaction" className="flex items-center gap-5">
            <GrTransaction size={30} /> transaction
          </NavLink>
        </div>
      </div>

      <div className="col-row-1 border-b grid ">
        <div className=" grid relative  pt-2">
          <span className="  text-gray-500 translate-x-[-25%] letf-[50%] absolute  flex justify-start ">
            Quick Actins
          </span>
          <NavLink
            to="/Transaction/SendForm"
            className="flex  items-center gap-5"
          >
            {" "}
            <MdOutlineSendToMobile size={30} /> send
          </NavLink>
          <NavLink
            to="/Transaction/ReceiveForm"
            className="flex  items-center gap-5"
          >
            <MdOutlineSendToMobile size={30} className=" rotate-180" /> receive
          </NavLink>
          <NavLink
            to="/Transaction/TransfertForm"
            className="flex  items-center gap-5"
          >
            <FaPeopleArrows size={30} /> transfert
          </NavLink>
        </div>
      </div>
      <div className="col-row-1  grid">
        <div className=" grid relative">
          {!user ? (
            <NavLink to="Login" className="flex  items-center gap-5">
              {/* log in  log out*/}
              <BiSolidLogInCircle size={30} /> log in
            </NavLink>
          ) : (
            <div className="flex  items-center gap-5" onClick={handleLogout}>
              <IoMdLogOut size={30} /> lo out
            </div>
          )}

          <div className="flex  items-center ">
            {/* dark mood */}
            <CiDark size={30} /> dark
          </div>
        </div>
      </div>
    </div>
    </div>)
    }
    


    </div>
   
  );
}

export default SideBard;
