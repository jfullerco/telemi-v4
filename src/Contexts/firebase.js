// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  query, 
  where, 
  doc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  setDoc, 
  addDoc, 
  deleteDoc,
  arrayUnion, 
  arrayRemove 
} from "firebase/firestore"
import { getStorage, ref, uploadBytes } from firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBi2EZr6TAuP_M0GDf2t6kYjVSBr-EEHgI",
  authDomain: "telemi-develop.firebaseapp.com",
  projectId: "telemi-develop",
  storageBucket: "telemi-develop.appspot.com",
  messagingSenderId: "208473651772",
  appId: "1:208473651772:web:b7d880afd16985ad626139",
  measurementId: "G-K3F50P2C8N"
};

// Initialize Firebase
const app = initializeApp({
  apiKey: "AIzaSyCLcH3HfDZU-0Qa8k90hHYhQZZRyOAy8j4",
  authDomain: "tiems-24d17.firebaseapp.com",
  databaseURL: "https://tiems-24d17-default-rtdb.firebaseio.com",
  projectId: "tiems-24d17",
  storageBucket: "tiems-24d17.appspot.com",
  messagingSenderId: "371736927443",
  appId: "1:371736927443:web:9d80c3abc38e399db3c826",
  measurementId: "G-1R2QK5MPPK"
});

export const fire = {
  collection, 
  query, 
  where, 
  doc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  setDoc, 
  addDoc, 
  deleteDoc,
  getStorage,
  ref,
  uploadBytes,
  arrayUnion,
  arrayRemove
};
export const auth = getAuth(app); 
export const db = getFirestore(app);
export const store = getStorage(app); 


