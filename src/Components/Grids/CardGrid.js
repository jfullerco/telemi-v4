import React, { useState } from 'react'

const CardGrid = ({title, children}) => {
  return(
    <>
      <div className="card is-rounded">
        <header className="card-header">
          <p className="title card-header-title">
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