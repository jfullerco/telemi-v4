import React from 'react'
import { FaAngleUp, FaAngleDown } from 'react-icons/fa'

export const Dropdown = ({isActive, params, children}) => {
    return (
        <div className={isActive && isActive === true ? `dropdown is-active ${params}` : `dropdown`}>
            {children}
        </div>
    )
}

export const DropdownTrigger = ({children}) => {
    return (
        <div className='dropdown-trigger'>{children}</div>
    )
}

export const DropdownButton = ({params, label, toggle, onClick, isActive}) => {
    return (
        <button 
            className={`button ${params}`} 
            aria-haspopup="true" 
            aria-controls="dropdown-menu"
            onClick={onClick}
            onBlur={onClick}
        >
        <span className='icon-text'>
            <span className='has-text-weight-semibold'>{label}</span>
            <span className='icon'>
                <FaAngleDown />
            </span>
            </span>
        </button>
    )
}

export const DropdownMenu = ({children}) => {
    return (
        <div className='dropdown-menu' id='dropdown-menu' role='menu'>
            <div className='dropdown-content'>
                {children}
            </div>
        </div>
    )
}

export const DropdownContent = ({children}) => {
    return (
        <div className='dropdown-content'>
            {children}
        </div>
    )
}

export const DropdownItem = ({children}) => {
    return (
        {children}
    )
}