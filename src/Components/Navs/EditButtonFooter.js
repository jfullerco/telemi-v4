import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { FaPencilAlt } from 'react-icons/fa'
import useToggleEditDrawer from '../../Hooks/useToggleEditDrawer'

const EditButtonFooter = () => {

  const {isModule, id} = useParams()
  const history = useHistory()
  const { isDrawerOpen, setToggleEditDrawer } = useToggleEditDrawer()
console.log("button", isDrawerOpen)
  const handleClick = async() => {
    
    console.log("nope")
    
  }

  return(
    <>
      
       <div className="navbar-item" onClick={()=>{setToggleEditDrawer(!isDrawerOpen)}}>
        
        <FaPencilAlt className={isDrawerOpen === true ? "icon is-normal" : "icon is-normal is-link"}  />
        
        </div>

        

    </>
  )
}
export default EditButtonFooter