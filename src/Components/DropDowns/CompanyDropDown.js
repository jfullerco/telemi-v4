import React from 'react'
import { useHistory } from 'react-router-dom'

import { FaChevronCircleUp, FaChevronCircleDown } from 'react-icons/fa'
import Columns from '../Layout/Columns'
import Column from '../Layout/Column'

const CompanyDropDown = ({currentCompany, companies, isActive, handleClick, handleToggle}) => {
  const history = useHistory()
  return(
    <div>
     
      <div className={isActive === true ? `dropdown is-active` : `dropdown`}>
        <div className="dropdown-trigger ">
          
          <div className="title donotwrap" onClick={handleToggle}>
            <span className="pr-1">
              <strong>{currentCompany}</strong>
            </span>
            <span className="icon">

              <FaChevronCircleUp onClick={handleToggle} style={{ marginTop: 'auto' }} className={isActive === true ? "icon is-small" : "is-hidden"} />
              <FaChevronCircleDown onClick={handleToggle} style={{ marginTop: 'auto' }} className={isActive === false ? "icon is-small" : "is-hidden"} />
            </span>
          </div>
          
        </div>

        <div className="dropdown-menu">
          <div className="dropdown-content ">
            <a className="dropdown-item" onClick={() => history.push("/addcompany")}>ADD</a>
            <hr className="dropdown-divider" />
            {companies && companies.map(company =>
              <a
                className={currentCompany === company.Name ? "dropdown-item is-active" : "dropdown-item"}
                style={{ textTransform: "uppercase" }}
                onClick={() => handleClick({ id: company.id, name: company.Name })}
                key={company.id}
              >
                {company.Name}
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
export default CompanyDropDown