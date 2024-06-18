import { MdOutlineRemoveRedEye } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/FireBaseConfig";
import UserHook from "../hooks/UserHook";

function UserContenair() {
  const { user, formatDate } = UserHook();
  const [agentInfo, setAgentInfo] = useState([]);
  const collectionName = "agentInfo";

  useEffect(() => {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const agentInfo = snapshot.docs.map((doc) => {
        const data = doc.data();
        {
          console.log(data);
        }
        const createdAt = data.createdAt ? data.createdAt.toDate() : null; // Convert Firestore Timestamp to JavaScript Date
        return {
          id: doc.id,
          ...data,
          createdAt,
        };
      });
      setAgentInfo(agentInfo);
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, [user.uid]);

  return (
    <main className=" relative  grid  items-center">
      <div className=" relative ">
        {/* userContenair */}
        <div className="grid gap-2  absolute overflow-y-scroll h-[60vh] justify-center w-full ">
          <div className=" grid grid-cols-7 text-center sticky top-1 shadow-md border-b-2 border-gray-600">
            {/* userheader */}
            <div className="">
              <input type="checkbox" name="" id="" />
            </div>
            <div>id</div>
            <div>Agent</div>
            <div>Name Surname</div>
            <div>city</div>
            <div>+phone</div>
            <div>action</div>
          </div>

          {agentInfo.map((agent) => (
            <div
              key={agent.id}
              className=" grid grid-cols-7 items-center gap-2 shadow-sm rounded-md border py-1 text-center  h-[50px]"
            >
              {/* usertable */}
              <div>
                <input type="checkbox" name="" id="" />
              </div>
              <div className=" overflow-hidden">{agent.id}</div>
             
              <div className=" grid grid-cols-2 items-center   ">
             
             < img src={agent.image}
                className="h-10 rounded-full w-10 object-cover flex  "
                alt=""
              />
           
           
             <span className=" ">{agent.AgentId}</span>
            
              
            </div>
            

             
              <div>{agent.displayName}</div>
              <div>{agent.city}</div>
              <div>{agent.phone}</div>
              {console.log(agent)}
              <div className=" flex gap-2 justify-center">
                <button className=" border border-green-500 py-1 rounded-md px-2 flex items-center gap-1">
                  <MdOutlineRemoveRedEye />
                  <span>view</span>{" "}
                </button>
                <button className=" border border-red-500  rounded-md py-1  px-2 flex items-center gap-1">
                  <MdDeleteForever />
                  <span>delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default UserContenair;
