import React from 'react'
import { useParams } from 'react-router-dom'
import DeleteButtonFooter from './Components/Navs/DeleteButtonFooter'
import AddBookmarkFooter from './Components/Navs/AddBookmarkFooter'
import AddNoteButtonFooter from './Components/Navs/AddNoteButtonFooter'
import EditButtonFooter from './Components/Navs/EditButtonFooter'



const Footer = ({handleClick}) => {

  const { isModule, id } = useParams()
  

  return(
    <>
    <nav className="navbar footerblur is-fixed-bottom is-active">
    <div className="navbar-menu is-active ">
    
      <div className="navbar-menu is-justify-content-center is-relative">
      <div className="navbar-item is-inline-block-touch pl-5 pr-5">
          <EditButtonFooter />
        </div>
        <div className="navbar-item is-inline-block-touch pl-5 pr-5">
          <AddBookmarkFooter />
        </div>
        <div className="navbar-item is-inline-block-touch pl-5 pr-5">
          <AddNoteButtonFooter />
        </div>
        <div className="navbar-item is-inline-block-touch pl-5 pr-5">
          <DeleteButtonFooter />
        </div>
      </div>
      </div>
    
    </nav>
    </>
  )
}
export default Footer