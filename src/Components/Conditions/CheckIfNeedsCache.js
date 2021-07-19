import React from 'react'

const CheckIfNeedsCache = ({value, setValue, fallbackValue, handleSetCache, children}) => {
  value != undefined & value != "" ? value : fallbackValue != undefined ? handleSetCache(fallbackValue, setValue) : null
  return(
    <>
      {children}
    </>
  ) 
}
export default CheckIfNeedsCache