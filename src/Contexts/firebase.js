import * as firebase from 'firebase/app'


const app = firebase.initializeApp({
  apiKey: "AIzaSyBi2EZr6TAuP_M0GDf2t6kYjVSBr-EEHgI",
  authDomain: "telemi-develop.firebaseapp.com",
  projectId: "telemi-develop",
  storageBucket: "telemi-develop.appspot.com",
  messagingSenderId: "208473651772",
  appId: "1:208473651772:web:b7d880afd16985ad626139",
  measurementId: "G-K3F50P2C8N"
})

export const auth = app.auth() 
export const db = app.firestore()
export const store = app.storage()


export default app