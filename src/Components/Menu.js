import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const Menu = ({title}) => {
  const history = useHistory()
  return(
    <>
      <aside className="menu">
        <p className="menu-label">
          {title}
        </p>
        <ul className="menu-list">
          <li><a onClick={history.push('/dashboard')}>Dashboard</a></li>
          <li><a onClick={history.push('/settings')}>Settings</a></li>
        </ul>
      </aside>
    </>
  )
}