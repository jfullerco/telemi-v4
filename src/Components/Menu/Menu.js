import React, { useState, useEffect } from 'react'

const CompanyMenu = (props) => {
  const {data, handleClick, active} = props
  return(
   
      <aside className="menu has-text-dark menuDiv">
        <p className="menu-label pt-4 pl-4">
          Companies
        </p>
        <ul className="menu-list">
        <li>
          <ul>
          {data && data.map(company => 
            <li>
            <a 
              className={company.id === active ? `is-active px-4 py-2`: "px-4 py-2"}
              onClick={() => handleClick({id: company.id, Name: company.Name})}
            >{company.Name}</a></li>
          )}
        </ul>
        </li>
        </ul>
      </aside>
  )
}
export default CompanyMenu