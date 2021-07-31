import React, { useState, useEffect } from 'react'

export const useSortHook = () => {

  const [sortedArr, setSortedArr] = useState()
  const [arr, setArr] = useState([])

  useEffect(() => {
    const {sortBy, data} = arr
    const sortingArr = sortArr(sortBy, data)
    setSortedArr(sortingArr)
  },[arr])

  const sortArr = (sortBy, arr) => { 
    console.log("start:", sortBy, arr)
    const sortRef = arr && arr.sort((a, b) => (a[sortBy] > b[sortBy]) ? 1 : -1)
    
    setSortedArr(sortRef)
  }
  

  return { sortedArr, setArr }

}

