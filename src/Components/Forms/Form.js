import React from 'react'

export const Form = ({children}) => {
    return (
        <form>{children}</form>
    )
}

export const Field = ({params, children}) => {
    return (
        <div className={`field ${params}`}>
            {children}
        </div>
    )
}

export const FieldBody = ({children}) => {
    return (
        <div className="field-body">
            {children}
        </div>
    )
}

export const FieldLabel = ({params, label}) => {
    return (
        <div className={`field-label ${params}`}>
            <label className='label'>
                {label}
            </label>
        </div>
    )
}

export const FieldSet = ({params, children}) => {
    return (
        <fieldset>{children}</fieldset>
    )
}

export const FieldSetLegend = ({label}) => {
    return (
        <legend>
            {label}
        </legend>
    )
}

export const FieldHelp = ({isActive, params, field, help}) => {
    <p className={`help ${params}`}>
        {
            isActive.on === true &
            isActive.field === field ? 
            help : ""
        }
    </p>
}

export const FormControl = ({params, children}) => {
    return (
        <p className={`control ${params}`}>
            {children}
        </p>
    )
}

export const InputText = ({params, controls, type, placeHolder, handleChange, value}) => {
    return (
        <input 
            className={`input ${params}`} 
            type={type && type} 
            placeHolder={placeHolder && placeHolder} 
            onChange={(e) => handleChange(e)}
        />
    )
}