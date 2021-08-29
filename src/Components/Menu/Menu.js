import React, { useState, useEffect } from 'react'

const Menu = (props) => {
  
  return(
    <>
      <aside className="menu">
        <p className="menu-label">
          {props.title}
        </p>
          {props.children}
      </aside>
    </>
  )
}
export default Menu