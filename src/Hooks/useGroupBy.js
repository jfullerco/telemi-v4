import React, { useState, useEffect } from 'react'

export const useGroupBy = () => {
  const [arrToGroup, setArrToGroup] = useState()
  const [isGroupedBy, setIsGroupedBy] = useState()
  const [isGroupedKeys, setIsGroupedKeys] = useState()
  
  useEffect(() => {
    handleIsGroupReducer(arrToGroup)
    
  },[arrToGroup])
  
    const handleIsGroupReducer = (arrToGroup, isGroupedBy) => {
    const fetchKeys = arrToGroup & isGroupedBy && isGroupReducer(arrToGroup, isGroupedBy)
    const groupKeys = Object.keys(fetchKeys != undefined ? fetchKeys : "")
    setIsGroupedKeys(groupKeys && groupKeys)
  }

  const isGroupReducer = (arrToGroup, isGroupedBy) => arrToGroup && arrToGroup.reduce((acc, item) => {
      let key = item[isGroupedBy]
      !acc[key] ? acc[key] = [] :
      acc[key].push(item)
      return acc
    },{})
  
  return [isGroupedKeys, setArrToGroup, isGroupedBy, setIsGroupedBy]
  
}
