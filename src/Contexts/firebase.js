// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
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
} from 'firebase/firestore'
import { getStorage, ref, uploadBytes } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2bcK_vkMuuLB2SmD0dHZdDqj3YLuod5Y",
  authDomain: "tiems-24d17.firebaseapp.com",
  databaseURL: "https://tiems-24d17-default-rtdb.firebaseio.com",
  projectId: "tiems-24d17",
  storageBucket: "tiems-24d17.appspot.com",
  messagingSenderId: "371736927443",
  appId: "1:371736927443:web:654f431bd4833cf9b3c826",
  measurementId: "G-4YK9LJLX6X"
};

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
  uploadBytes
} 

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app) 
export const db = getFirestore(app)
export const store = getStorage(app) 


export default app