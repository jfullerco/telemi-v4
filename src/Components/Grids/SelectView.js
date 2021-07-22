import React from 'react'

const SelectView = ({onChange, children}) => {
  
 
  return(
      <div className="field">
        <div className="control">
        <div className='select is-rounded is-small'>
          <select type="select" onChange={onChange} >
            
          {children}
          </select>
        </div>
      </div>
    </div>
  )
}

export default SelectView