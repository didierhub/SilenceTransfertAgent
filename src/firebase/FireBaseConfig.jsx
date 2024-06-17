// Import the functions you need from the SDKs you need
import { initializeApp, } from "firebase/app";
import { getAuth ,GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBE_UeFS8jevH206I_kcDQZzZnZ08mM1uE",
  authDomain: "silenceagentltd.firebaseapp.com",
  projectId: "silenceagentltd",
  storageBucket: "silenceagentltd.appspot.com",
  messagingSenderId: "513741818465",
  appId: "1:513741818465:web:1e0ae7a891cca4c507b820"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const Auth=getAuth(app)
const db=getFirestore(app)
const Storage=getStorage(app)
const Provider= new GoogleAuthProvider()
// const createUserFunction = firebase.functions().httpsCallable('createUser');
export{Auth,db,Provider,Storage}