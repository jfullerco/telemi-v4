import React, { useState, useEffect } from 'react'

const MenuList = (props) => {
  
  return(
    <>
        <ul className="menu-list">
          {props.children}
        </ul>
      </aside>
    </>
  )
}
export default MenuList