import React from 'react'

const TabBar = ({children}) => {
  return(
    <div className="tabs is-fullwidth is-toggle is-toggle-rounded">
      <ul>
        {children}
      </ul>
    </div>
  )
}
export default TabBar