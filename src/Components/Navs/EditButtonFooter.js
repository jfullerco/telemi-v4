import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { FaPencilAlt } from 'react-icons/fa'


const EditButtonFooter = ({handleClick, isDrawerOpen}) => {

  const {isModule, id} = useParams()
  const history = useHistory()
  
  

  return(
    <>
      
       <div className="navbar-item" onClick={()=>handleClick(!isDrawerOpen)}>
        
        <FaPencilAlt className={isDrawerOpen === true ? "icon is-normal" : "icon is-normal is-link"}  />
        
        </div>

        

    </>
  )
}
export default EditButtonFooter