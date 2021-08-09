import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { FaPencil } from 'react-icons/fa'
import { db } from '../../Contexts/firebase'

const EditButtonFooter = () => {

  const {isModule, id} = useParams()
  const history = useHistory()
  const [ toggle, setToggle ] = useState(false)

  const handleClick = async() => {
    
    
    
  }

  const autoClose = () => {

    setTimeout(() => { 
      history.push("/dashboard") 
    }, 1500 )

  }

  return(
    <>
      
       <div className="navbar-item">
        
        <FaPencil className={toggle === true ? "icon is-normal" : "icon is-normal is-link"} />
        
        </div>

        

    </>
  )
}
export default EditButtonFooter