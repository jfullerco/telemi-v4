import React from 'react'

const TabBar = ({children}) => {
  return(
    <div className="tabs is-fullwidth ">
      <ul>
        {children}
      </ul>
    </div>
  )
}
export default TabBar