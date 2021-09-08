import React from 'react'

const LabeledTextField = (props) => {
  return(
    <div className="input text-field is-hidden-tablet">
      <div className="text-field-label has-text-link">{props.label}</div>
      <div className="text-field-input"><input className="input is-static has-text-weight-semi-bold" placeholder={props.label} value={props.value} readOnly/></div>
    </div>
  )
}
export default LabeledTextField