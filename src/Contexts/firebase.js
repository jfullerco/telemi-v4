import * as firebase from "firebase/app"

import 'firebase/firestore'
import 'firebase/storage'

const appInit = firebase.initializeApp({
  apiKey: "AIzaSyCLcH3HfDZU-0Qa8k90hHYhQZZRyOAy8j4",
  authDomain: "tiems-24d17.firebaseapp.com",
  databaseURL: "https://tiems-24d17-default-rtdb.firebaseio.com",
  projectId: "tiems-24d17",
  storageBucket: "tiems-24d17.appspot.com",
  messagingSenderId: "371736927443",
  appId: "1:371736927443:web:9d80c3abc38e399db3c826",
  measurementId: "G-1R2QK5MPPK"
})

export const auth = appInit.getAuth()
export const db = appInit.firestore()
export const store = appInit.storage()


export default appInit