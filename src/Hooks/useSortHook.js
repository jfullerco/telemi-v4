import React, { useState, useEffect } from 'react'

export default useSortHook = (colRef, dataRef) => {

  const [arr, setArr] = useState()
  const [sortBy, setSortBy] = useState()
  const [sortedArr, setSortedArr] = useState()

  useEffect(() => {
    colRef ?? setSortBy(colRef)
    dataRef ?? setArr(dataRef)
  },[dataRef])

  useEffect(() => {
    !sortedArr ? sortArrForward(arr) : sortArrBackward(arr)
  },[arr])

  const sortArrForward = (arr, sortBy) => { 
    console.log("start:", sortBy, arr)
    const sortRef = arr.sort((a, b) => a[sortBy] > b[sortBy] ? 1 : -1) 
    setSortedArr(sortRef)
    console.log(sortRef)
  }
  const sortArrBackward = (arr) => { setSortedArr(arr.reverse()) }

  return { sortedArr }
}