import React, { useState, useEffect } from 'react'

export const useSortHook = (colRef, dataRef) => {

  const [sortedArr, setSortedArr] = useState()

  const sortArr = (sortBy, arr) => { 
    console.log("start:", sortBy, arr)
    const sortRef = arr && arr.sort((a, b) => (a[sortBy] - b[sortBy]) ? 1 : -1)
    
    setSortedArr(sortRef)
  }
  

  return { sortedArr, sortArr }
}

