import React from 'react'

export const CardHeader = ({isVisible, bgColor, txtColor, children}) => {
    return (
        <header className={
            isVisible != true ? 
                'is-hidden' : 
                `card-footer ${bgColor && bgColor} ${txtColor && txtColor}`
            }
        >
            {children}
        </header>
    )
}


export const CardHeaderTitle = ({isCentered, children}) => {
    return (
        <p className = {
                isCentered === true ? 
                    'card-header-title is-centered' : 
                    'card-header-title'
            }
        >
            {children}
        </p>
    )
}


export const CardFooter = ({isVisible, bgColor, txtColor, children}) => {
    return (
        <footer className = {
                isVisible != true ? 
                    'is-hidden' : 
                    `card-footer ${bgColor && bgColor} ${txtColor && txtColor}`
            }
        >
            {children}
        </footer>
    )
}


export const CardFooterItem = ({children}) => {
    return (
        {children}
    )
}


export const Card = ({noShadow, children}) => {
    return (
        <div className={noShadow === true ? 'card is-shadowless' : 'card'}>
            {children}
        </div>
    )
}


export const CardContent = ({children}) => {
    return (
        <div className='card-content'>
            {children}
        </div>
    )
}
