import React from 'react'
import { useParams } from 'react-router-dom'
import DeleteButtonFooter from './Components/Navs/DeleteButtonFooter'
import AddBookmarkFooter from './Components/Navs/AddBookmarkFooter'
import AddNoteButtonFooter from './Components/Navs/AddNoteButtonFooter'
import EditButtonFooter from './Components/Navs/EditButtonFooter'
import AddTagButtonFooter from './Components/Navs/AddTagButtonFooter'
import AddDocButtonFooter from './Components/Navs/AddDocButtonFooter'



const Footer = (props) => {
  const {handleEditButton, isDrawerOpen, isBookmarked, tags} = props
  const { isModule, id } = useParams()
  

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
          />
        </div>
        <div className="navbar-item is-inline-block-touch pl-4 pr-4">
          <AddNoteButtonFooter />
        </div>
        <div className="navbar-item is-inline-block-touch pl-4 pr-4">
          <AddDocButtonFooter />
        </div>
        <div className="navbar-item is-inline-block-touch pl-4 pr-4">
          <AddTagButtonFooter 
            values={tags}
            handleUpdated={props.handleUpdated}
          />
        </div>
        <div className="navbar-item is-inline-block-touch pl-4 pr-4">
          <DeleteButtonFooter />
        </div>
      </div>
      </div>
    
    </nav>
    </>
  )
}
export default Footer