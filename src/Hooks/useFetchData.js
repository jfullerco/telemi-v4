import React, { useState, useEffect, useContext } from 'react'
import {stateContext} from '../Contexts/stateContext'

export function useFetchData({isModule, id}) {
  const {
    collection, 
    query, 
    where, 
    getDocs, 
    getDoc, 
    addDoc, 
    updateDoc, 
    doc,
    arrayUnion,
    arrayRemove
  } = fire
  const userContext = useContext(stateContext)
  
  

  const fetchPage = async(isModule, id) => {
    
    const docRef = doc(db, isModule, id)
    const docSnap = await getDoc(docRef) 
    console.log(docSnap)
    const data = docSnap.data()
    const docID = docSnap.id
    setActive({id: docID, ...data})
    setData(data)
  
  }
  return {refreshModule}
}
