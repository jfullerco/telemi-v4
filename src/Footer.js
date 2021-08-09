import React from 'react'
import { useParams } from 'react-router-dom'
import DeleteButtonFooter from './Components/Navs/DeleteButtonFooter'


const Footer = ({handleClick}) => {

  const { isModule, id } = useParams()
  

  return(
    <>
    <nav className="navbar footerblur is-fixed-bottom is-mobile">
    <div className="navbar-menu is-active">
      <div className="navbar-start mr-5">
      

      <DeleteButtonFooter />
     
     
      
      </div>
      </div>
    
    </nav>
    </>
  )
}
export default Footer