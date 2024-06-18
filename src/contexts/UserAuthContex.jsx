import { createContext, useState, useEffect } from "react";
import{Auth,db,Provider,Storage} from "../firebase/FireBaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, doc, setDoc,serverTimestamp,  } from "firebase/firestore";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";


// user state
export const UserAuthContext = createContext();

export const ProviderUserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, async (currentUser) => {
      if (currentUser) {
        const token = await currentUser.getIdTokenResult();
        setIsAdmin(!!token.claims.admin);
        
        setUser(currentUser);
      } else {
        setIsAdmin(false);
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  //log in with password and email
  const UserLogInWithEmailAndPassword=(email,password)=>{
    return signInWithEmailAndPassword(Auth,email,password)

  }
  // log in with google
  const UserLogInWithGoogle = () => {
    return signInWithPopup(Auth, Provider);
  };


  //log out
  const UserSignOUt = () => {
    localStorage.clear();
    return signOut(Auth);
  };

  //creat agent
// Create user by admin
const CreateAgent = (email, password) => {
  return  createUserWithEmailAndPassword(Auth,email,password)
};

//upload userphoto
const UploadUserPhoto = (userId, image, FolderName) => {
  return new Promise((resolve, reject) => {
    if (!image) {
      reject(new Error("Image is not provided."));
      return;
    }

    const timestamp = new Date().getTime(); // Generate timestamp for uniqueness
    const randomNum = Math.floor(Math.random() * 10000);
    const fileExtension = image.name ? image.name.split('.').pop() : null; // Check if image name is defined
    if (!fileExtension) {
      reject(new Error("Invalid file extension."));
      return;
    }
    
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



//upload user dataInfo
const uploadUserInfo=(userId,collectionName,data)=>{
  const Collection=collection(db,collectionName)
  return setDoc(doc(Collection,userId), { ...data,
    createdAt: serverTimestamp(),})
  


}
//update agent
const UpdateAgent=()=>{

}
//delete agent
  const DeleteAgent = () => {};


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
  return (
    // context provider
    <UserAuthContext.Provider
      value={{ 
        user,
        isAdmin,
        UserLogInWithEmailAndPassword,
         UserLogInWithGoogle,
         CreateAgent,
          DeleteAgent,
          UpdateAgent, 
          UserSignOUt,
          UploadUserPhoto,
          uploadUserInfo,
          formatDate  }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};
