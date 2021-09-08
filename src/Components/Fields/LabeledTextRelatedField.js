import React from 'react'

const LabeledTextRelatedField = (props) => {
  return(
    <div className="input text-field is-hidden-tablet">
      <div className="text-field-label has-text-link">{props.label}</div>
      <div className="text-field-input">
        <p className="has-text-weight-semi-bold" placeholder={props.label}>
          {props.value}
        </p>
      </div>
    </div>
  )
}
export default LabeledTextRelatedField