import React from 'react'

const TabBar = ({children}) => {
  return(
    <>
    <div className="tabs is-fullwidth is-small is-hidden-tablet">
      <ul>
        {children}
      </ul>
    </div>
    
    <div className="tabs is-hidden-mobile">
    <ul>
      {children}
    </ul>
  </div>
  </>
  )
}
export default TabBar