import React from 'react'
import { useParams } from 'react-router-dom'
import DeleteButtonFooter from './Components/Navs/DeleteButtonFooter'
import AddBookmarkFooter from './Components/Navs/AddBookmarkFooter'
import AddNoteButtonFooter from './Components/Navs/AddNoteButtonFooter'



const Footer = ({handleClick}) => {

  const { isModule, id } = useParams()
  

  return(
    <>
    <nav className="navbar footerblur is-fixed-bottom is-active">
    <div className="navbar-menu is-active ">
    
      <div className="navbar-start is-relative">
        <div className="navbar-item is-inline-block-touch">
      <AddBookmarkFooter />
      </div><div className="navbar-item is-inline-block-touch">
      <AddNoteButtonFooter />
      </div><div className="navbar-item is-inline-block-touch">
      <DeleteButtonFooter />
      </div>
      
     
     
      
      </div>
      </div>
    
    </nav>
    </>
  )
}
export default Footer