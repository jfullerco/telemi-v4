import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const DeleteButtonFooter = () => {

  const {isModule, id} = useParams()
  const [ toggle, setToggle ] = useState(false)

  const handleClick = async() => {
    
    try {

    const res = await db.collection(isModule).doc(id).delete()
    console.log(res)
    setDeleteSuccess("Successfully Deleted Record")
    autoClose()

    } catch {

      setDeleteError("Error Deleting Record")

    }
    
  }

  return(
    <>
      <div 
        className={toggle === true ? 
          "navbar-item has-dropdown has-dropdown-up is-active" : "navbar-item has-dropdown has-dropdown-up"}
        onClick={()=>setToggle(!toggle)}>
       <a className="navbar-link">Delete</a>
       <div className="navbar-dropdown is-rounded">
         <div className="navbar-item">
          <title className="is-size-6">Confirm</title>
          <a className="button is-small is-rounded is-danger mr-2" onClick={()=>handleClick()}>
              Yes Delete
          </a>
          <a className="button is-small is-rounded is-light" onClick={()=>setToggle(false)}>
           No Cancel
          </a>
        </div>
         
       </div>
     </div>
    </>
  )
}