import React, { useState } from 'react'
import { FaAngleDown } from "react-icons/fa"

const SquareSelectField = ({label, placeholder, value, handleChange, name, handleAddValue, showAddLink, field}) => {

  const [isActive, setIsActive] = useState(false)

  const handleToggle = () => {
    setIsActive(!isActive)
  }

  return(
    <div className={isActive === true ? `dropdown is-active`: `dropdown `}>
      <div className="dropdown-trigger " >
        <div className="text-field-label has-text-link">{label}</div>
        <div className="text-field-input" onClick={handleToggle}>
          {placeholder}
        <span className="icon is-large">
           <FaAngleDown onClick={handleToggle} style={{marginTop: 'auto'}} />
        </span>
        </div>
      </div>

      <div className="dropdown-menu">
      <div className="dropdown-content">
        <option>test</option>
        <option>this</option>
        <option>is</option>
      </div>
      </div>
    </div>
  )
}

export default SquareSelectField