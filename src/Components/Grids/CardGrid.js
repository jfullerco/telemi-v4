import React, { useState } from 'react'

const CardGrid = ({title, children}) => {
  return(
    <>
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">
            {title}
          </p>
        </header>
        <div className="card-content">
          {children}
        </div>
      </div>
    </>
  )
}
export default CardGrid