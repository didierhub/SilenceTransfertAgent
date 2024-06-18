import { Auth,db,Storage } from "../firebase/FireBaseConfig";
import { collection, addDoc, serverTimestamp,query } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createContext,useEffect,useState } from "react";
import UserHook from "../hooks/UserHook";

 export const TransactionContext=createContext()


 export const TransactionContextProvider=({children})=>{


const CreatTransaction=(data,documentName)=>{
    const collectionRef=collection(db,`${documentName}`)
    addDoc(collectionRef, {
        ...data,
        createdAt: serverTimestamp(), // Include createdAt with server timestamp
      }); 
}




const fetchData=()=>{
  const {user}=UserHook()
  const collectionname="transfers"
  const userId=user.uid
const [transactiondata, setTransactionData] = useState([]);


useEffect(() => {
  const fetchTranactions = async () => {
    try {
      const collectionRef = collection(db, collectionname);
      const q = query(collectionRef, where('AgentId', '==', userId), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const transactionData = snapshot.docs.map((doc) => {
          const data = doc.data();
          const createdAt = data.createdAt ? data.createdAt.toDate() : null;
          return {
            id: doc.id,
            ...data,
            createdAt,
          };
        });
        setTransactionData(transactionData);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error(`'Error fetching transfers:'`, error);
    }
  };

  fetchTranactions();
}, [userId]);
return{transactiondata}

}

const useFirestoreQuery = (collectionName, whereClause, orderByClause) => {
  const [data, setData] = useState([]);
  const {user}=UserHook(); // Assuming you have a UserContext

  useEffect(() => {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, whereClause, orderByClause);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        const data = doc.data();
        const createdAt = data.createdAt ? data.createdAt.toDate() : null; // Convert Firestore Timestamp to JavaScript Date
        return {
          id: doc.id,
          ...data,
          createdAt,
        };
      });
      setData(data);
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, [user.uid]);

  return data;
};



const formatDate = (date) => {
  if (!date) return 'Unknown Date';
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).format(date);
};

const UploadProof = (image, userId, FolderName) => {
  return new Promise((resolve, reject) => {
    const timestamp = new Date().getTime(); // Generate timestamp for uniqueness
    const randomNum = Math.floor(Math.random() * 10000);
    const fileExtension = image.name.split('.').pop(); // Use image.name to get the file extension
    const fileName = `${randomNum}${userId}${timestamp}.${fileExtension}`; // Construct file name with userId, timestamp, and random number
    const Storageref = ref(Storage, `${FolderName}/${fileName}`); // Construct storage reference path
    
    // Start the upload process
    const uploadTask = uploadBytesResumable(Storageref, image);

    // Set up event listeners to track upload progress and completion
    uploadTask.on('state_changed', 
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
        }
      }, 
      (error) => {
        // Handle unsuccessful uploads
        console.error(error.message);
        reject(error);
      }, 
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            console.log('File available at', downloadURL);
            resolve(downloadURL); // Resolve the Promise with the download URL
          })
          .catch((error) => {
            console.error(error.message);
            reject(error);
          });
      }
    );
  });
};









    return(
        <TransactionContext.Provider value={{CreatTransaction,UploadProof,fetchData,formatDate,useFirestoreQuery}}>
          {children}
        </TransactionContext.Provider>
    )
}