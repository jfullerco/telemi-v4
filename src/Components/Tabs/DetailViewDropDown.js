import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { FaChevronCircleDown } from "react-icons/fa"
import { FaChevronCircleUp } from "react-icons/fa"
import DeleteButton from '../Buttons/DeleteButton'


const RelatedFieldDropDown = ({isActive, handleToggle, views, activeView, handleView, value, title, handleEditDrawer}) => {
  const history = useHistory()
  const {isModule, id} = useParams()

  return(
    <>
    
    <div className="box is-rounded mx-2 is-12">
      
      <nav className="level">
      <div className="content"><span className="is-size-6">{title}</span><br/>
      <span className="is-size-4 title">{value}</span></div>
      <div className={isActive === true ? `dropdown is-active` : `dropdown`}>
        <div className="dropdown-trigger" >
          <div className="pl-1" onClick={handleToggle}>
            
            <span className="pr-1">
              {activeView && activeView}
            </span>
            <span className="icon pl-1">

              <FaChevronCircleUp onClick={handleToggle} style={{ marginTop: 'auto' }} className={isActive === true ? "icon is-small" : "is-hidden"} />
              <FaChevronCircleDown onClick={handleToggle} style={{ marginTop: 'auto' }} className={isActive === false ? "icon is-small" : "is-hidden"} />

            </span>
          </div>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            
            {views.map(view =>

              <a className="dropdown-item" onClick={() => handleView(view)}>{view}</a>

            )}
            <hr className="dropdown-divider" />
            
          </div>
        </div>
      </div>
    </nav>
    </div>
</>
  )
}
export default RelatedFieldDropDown