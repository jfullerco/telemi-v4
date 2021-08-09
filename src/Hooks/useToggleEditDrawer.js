import React, { useState, useEffect } from 'react'

export default function useToggleEditDrawer() {
  const [toggleEditDrawer, setToggleEditDrawer] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => {
    setIsDrawerOpen(!isDrawerOpen)
  },)

  return {isDrawerOpen, setToggleEditDrawer}
}
