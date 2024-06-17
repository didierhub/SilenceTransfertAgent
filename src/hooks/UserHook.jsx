import { useContext } from "react";
import { UserAuthContext } from "../contexts/UserAuthContex";




function UserHook() {
  return useContext(UserAuthContext)
}
export default UserHook