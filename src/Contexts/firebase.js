// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { auth } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLcH3HfDZU-0Qa8k90hHYhQZZRyOAy8j4",
  authDomain: "tiems-24d17.firebaseapp.com",
  databaseURL: "https://tiems-24d17-default-rtdb.firebaseio.com",
  projectId: "tiems-24d17",
  storageBucket: "tiems-24d17.appspot.com",
  messagingSenderId: "371736927443",
  appId: "1:371736927443:web:9d80c3abc38e399db3c826",
  measurementId: "G-1R2QK5MPPK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = app.auth()
export const db = app.firestore()
export const store = app.storage()


export default app