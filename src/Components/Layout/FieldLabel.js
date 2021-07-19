import React from 'react'

const FieldLabel = ({size, children}) => {
  return(
    <div className={size}>
      {children}
    </div>
  )
}
export default FieldLabel