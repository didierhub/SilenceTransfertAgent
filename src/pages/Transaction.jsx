import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { GrTransaction } from "react-icons/gr";
import { MdOutlineSendToMobile } from "react-icons/md";

function Transaction() {
  return (
   <Outlet />
  );
}

export default Transaction;
