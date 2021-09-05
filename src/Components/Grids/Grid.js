import React from 'react'

const Grid = (props) => {
  return(
    <div className="box is-rounded mx-2">
      <div className="columns is-mobile">     
        <div className={props.size && props.size ? `column ${props.size}` : "column"}>
          <div className="is-size-6">
            {props.subtitle}
          </div>
          <div className="title">
            <strong>
              {props.title || "Not Assigned"}
            </strong>
          </div>
          <div className="column">
            {props.children}
          </div>
        </div>
      </div>
    </div>
          
  )
}
export default Grid