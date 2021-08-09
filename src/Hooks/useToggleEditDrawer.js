import React, { useState, useCallback } from 'react'

const useToggle = (initialValue) => {
  const [toggleEditDrawer, setToggleEditDrawer] = useState(initialValue)
  const [test, setTest] = useState(false)

  
  return {test, setTest, toggleEditDrawer, setToggleEditDrawer}
}
export default useToggleEditDrawer

