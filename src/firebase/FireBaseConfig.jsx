// Import the functions you need from the SDKs you need
import { initializeApp, } from "firebase/app";
import { getAuth ,GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions, httpsCallable } from 'firebase/functions';



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
const Auth = getAuth(app); // Authentication instance
const db = getFirestore(app); // Firestore instance
const Storage = getStorage(app); // Storage instance
const Provider = new GoogleAuthProvider(); // Google Auth provider

// Initialize Cloud Functions
const functions = getFunctions(app, 'us-central1'); // Replace 'us-central1' with your region
const createUser = httpsCallable(functions, 'createUser');
const updateUser = httpsCallable(functions, 'updateUser');
const makeAdmin = httpsCallable(functions, 'makeAdmin');

export { Auth, db, Provider, Storage, createUser, updateUser, makeAdmin };