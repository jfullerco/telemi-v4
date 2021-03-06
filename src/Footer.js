import React from 'react'
import { useParams } from 'react-router-dom'
import DeleteButtonFooter from './Components/Navs/DeleteButtonFooter'
import AddBookmarkFooter from './Components/Navs/AddBookmarkFooter'
import AddNoteButtonFooter from './Components/Navs/AddNoteButtonFooter'
import EditButtonFooter from './Components/Navs/EditButtonFooter'
import AddTagButtonFooter from './Components/Navs/AddTagButtonFooter'
import AddDocButtonFooter from './Components/Navs/AddDocButtonFooter'



const Footer = (props) => {

  const {handleEditButton, isDrawerOpen, isBookmarked, tags, isModule, id, handleClose} = props
  
  return(
    <>
    <nav className="navbar footerblur is-fixed-bottom is-active">
    <div className="navbar-menu footer-menu">
    
      <div className="navbar-menu is-justify-content-center is-relative footer-menu">
      <div className="navbar-item is-inline-block-touch pl-4 pr-4">
          <EditButtonFooter 
            handleClick={handleEditButton}
            isDrawerOpen={isDrawerOpen}
          />
        </div>
        <div className="navbar-item is-inline-block-touch pl-4 pr-4">
          <AddBookmarkFooter 
            isBookmarked={isBookmarked}
            id={id}
            isModule={isModule}
            handleClose={()=>handleClose()}
          />
        </div>
        <div className="navbar-item is-inline-block-touch pl-4 pr-4 is-hidden">
          <AddNoteButtonFooter />
        </div>
        <div className="navbar-item is-inline-block-touch pl-4 pr-4">
          <AddDocButtonFooter />
        </div>
        <div className="navbar-item is-inline-block-touch pl-4 pr-4">
          <AddTagButtonFooter 
            values={tags}
            handleUpdated={props.handleUpdated}
            isModule={isModule}
            id={id}
          />
        </div>
        <div className="navbar-item is-inline-block-touch pl-4 pr-4">
          <DeleteButtonFooter 
            isModule={isModule}
            id={id}
            handleClose={()=>handleClose()}
          />
        </div>
      </div>
      </div>
    
    </nav>
    </>
  )
}
export default Footer