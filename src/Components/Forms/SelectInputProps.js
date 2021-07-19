import React from 'react'
import Hint from './Hint'

const SelectInputProps = ({fieldLabel, fieldIDRef, fieldInitialOption, fieldInitialValue, placeholder, onChange, isVisible, size, hint,  handleAddValue, addColName, children}) => {
  
 
  return(
      <div className="field">
      <label className="label">{fieldLabel && fieldLabel}</label>
        <div className="control">
        <div className={isVisible != false ? `select ${size} is-rounded is-fullwidth px-2` : "is-hidden"} >
          <select type="select" ref={fieldIDRef} defaultValue={fieldInitialOption} onChange={onChange} >
            <option>{placeholder}</option>
            {fieldInitialValue != undefined ? 
              <option value={fieldInitialValue}>
                {fieldInitialOption && fieldInitialOption}
              </option> 
            : <option></option>}
          {children}
          </select>
        </div>
        
        { hint && <Hint> {hint}</Hint> }
      </div>
    </div>
  )
}

export default SelectInputProps