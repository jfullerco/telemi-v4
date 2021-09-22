import React from 'react'

const Loading = ({active, children}) => {
  return(
    <>
      <div className={active != false ? "modal is-active" : "modal"}>
        <div className="loading">
        </div>
      </div>
      {active != false ? "" : children}
      
    </>
  )
}
export default Loading