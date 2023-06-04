// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBX1difvOX5kBjqBk5Z_nblIQck2nUI7yg",
  authDomain: "mini-chat-e3af8.firebaseapp.com",
  projectId: "mini-chat-e3af8",
  storageBucket: "mini-chat-e3af8.appspot.com",
  messagingSenderId: "1050812807548",
  appId: "1:1050812807548:web:3cc669ad5623cd18b38cf9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();
export const db=getFirestore(app);