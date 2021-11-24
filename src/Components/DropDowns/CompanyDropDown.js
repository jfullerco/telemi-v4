import React from 'react'
import { useNavigate } from 'react-router-dom'

import { FaAngleUp, FaAngleDown } from 'react-icons/fa'
import {
  Dropdown, 
  DropdownTrigger, 
  DropdownButton, 
  DropdownMenu, 
  DropdownContent,
  DropdownMenuItem
} from './DropdownMenu'

import {FormControl, Field} from '../Forms/Form'

const CompanyDropDown = ({
  currentCompany, 
  companies, 
  isActive, 
  handleClick, 
  handleToggle
}) => {
  const navigate = useNavigate()
  return(
    <>
    <Field params='has-addons'>
    <FormControl params='is-expanded'>
        <Dropdown 
          isActive={isActive}
        >
          <DropdownTrigger>
            <DropdownButton 
              label={currentCompany}
              onClick={handleToggle}
              isActive={isActive}
              params='is-rounded shaded'
            />
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownContent>
                {companies && companies.map(company =>
                  <a
                    className={currentCompany === company.Name ? "dropdown-item is-active" : "dropdown-item"}
                    onClick={() => handleClick({ id: company.id, name: company.Name })}
                    key={company.id}
                  >
                    {company.Name}
                  </a>
                )}
            </DropdownContent>
          </DropdownMenu>
        </Dropdown>
    </FormControl>
    </Field>
    
    {/**---------*/}
  
      <div className={`is-hidden`} >
        <div className="dropdown-trigger ">
          
          <div className="input" onClick={handleToggle}>
            <span className="pr-1">
              <strong>{currentCompany}</strong>
            </span>
            <span className="icon">

              <FaAngleUp onClick={handleToggle} style={{ marginTop: 'auto' }} className={isActive === true ? "icon" : "is-hidden"} />
              <FaAngleDown onClick={handleToggle} style={{ marginTop: 'auto' }} className={isActive === false ? "icon" : "is-hidden"} />
            </span>
          </div>
          
        </div>

        <div className="dropdown-menu">
          <div className="dropdown-content">
            <button className="dropdown-item" onClick={() => history.push("/addcompany")}>Add a company</button>
            <hr className="dropdown-divider" />
            {companies && companies.map(company =>
              <a
                className={currentCompany === company.Name ? "dropdown-item is-active" : "dropdown-item"}
                onClick={() => handleClick({ id: company.id, name: company.Name })}
                key={company.id}
              >
                {company.Name}
              </a>
            )}
          </div>
        </div>

      </div>
    
    </>
    
    
  )
}
export default CompanyDropDown