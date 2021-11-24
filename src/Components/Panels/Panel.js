import React from 'react'

export const Panel = ({params, children}) => {
    return (
        <nav className={`panel ${params}`}>
            {children}
        </nav>
    )
}

export const PanelHeader = ({params, children}) => {
    return (
        <p className={`panel-heading`}>
            {children}
        </p>
    )
}

export const PanelBlock = ({children}) => {
    return (
        <div className='panel-block'>
            {children}
        </div>
    )
}

export const PanelTabs = ({children}) => {
    return (
        <p className='panel-tabs'>
            {children}
        </p>
    )
}

