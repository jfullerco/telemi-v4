import React from 'react'

const TabBar = ({children}) => {
  return(
    <>
      <div className="tabs">
        <ul>
          {children}
        </ul>
      </div>
    </>
  )
}
export default TabBar