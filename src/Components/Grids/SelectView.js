import React from 'react'

const SelectView = ({onChange, value, params, children}) => {
  
 
  return(
      <div className="field">
        <div className="control">
        <div className={`select ${params}`}>
          <select type="select" onChange={onChange} defaultValue={value}>
          {children}
          </select>
        </div>
      </div>
    </div>
  )
}

export default SelectView