import React, { useState, useEffect } from 'react'

export const useReduceHook = (props) => {
  
  const [reducerParams, setReducerParams] = useState()
  const [reducedArr, setReducedArr] = useState()

  const {arr, reduceBy} = reducerParams?.arr || []

  useEffect(() => {
    console.log(arr, reduceBy)
    const reducer = reduceArr(arr, reduceBy)
    setReducedArr(reducer)
  },[reduceBy])

  const reduceArr = (arr, el) => arr && arr.reduce((acc, item) => {
    let key = item[el]
    !acc[key] ? acc[key] = [] :
    acc[key].push(item)
    return acc
  },{})
  
  
  
  

  return { reducedArr, setReducerParams }

}

