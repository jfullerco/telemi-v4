import React, { Suspense } from 'react'
import { FaAngleDown } from "react-icons/fa"

const CompanyDropDown = ({currentOption, options, isActive, handleClick, handleToggle, currentCompany}) => {
  
  return(
    <>
    <Suspense fallback={<div>Loading Company</div>} >
      <div className={isActive === true ? `dropdown is-active`: `dropdown`}>
        <div className="dropdown-trigger " >
          <div className="title has-text-black" onClick={handleToggle}>
          {currentCompany}
            <span className="icon is-large">
               <FaAngleDown onClick={handleToggle} style={{marginTop: 'auto'}} />
            </span>
        </div>
      </div>

        <div className="dropdown-menu">
          <div className="dropdown-content">
            {options && options.map(option => 
              <a 
                className={currentOption === option.Name ? "dropdown-item is-active": "dropdown-item"} 
                style={{textTransform: "uppercase"}}
                onClick={()=>handleClick({id: option.id, name: option.Name})}
              >
                {option.Name}
              </a>
            )}
          </div>
        </div>

      </div>
      </Suspense>
    </>
  )
}
export default CompanyDropDown