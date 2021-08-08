import React from 'react'
import { useParams } from 'react-router-dom'
import DeleteButtonFooter from './Components/Navs/DeleteButtonFooter'


const Footer = ({handleClick}) => {

  const { isModule, id } = useParams()
  

  return(
    <>
    <nav className="navbar footerblur is-fixed-bottom is-mobile">
      <div className="navbar-menu is-active">
      <div className="navbar-end mr-5">
     

      <DeleteButtonFooter />
     
     
      <div className="is-hidden">
      
        <div className="navbar-item has-text-grey is-size-7 pr-3"> Terms </div> 
        <div className="navbar-item has-text-grey is-size-7 pr-3">Settings </div>
        <div className="navbar-item has-text-grey is-size-7 pr-3"> </div>
        <div className="navbar-item has-text-grey is-size-7 pr-3">Developed by J Fuller Co </div>
      
      </div>
      </div>
      </div>
    
    </nav>
    </>
  )
}
export default Footer