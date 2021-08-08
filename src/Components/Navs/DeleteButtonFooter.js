import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { db } from '../../Contexts/firebase'

const DeleteButtonFooter = () => {

  const {isModule, id} = useParams()
  const history = useHistory()
  const [ toggle, setToggle ] = useState(false)

  const handleClick = async() => {
    
    try {

    const res = await db.collection(isModule).doc(id).delete()
    console.log(res)
    
    autoClose()

    } catch {

      console.log("Error Deleting Record")

    }
    
  }

  const autoClose = () => {

    setTimeout(() => { 
      history.push("/dashboard") 
    }, 1500 )

  }

  return(
    <>

      <div 
        className={toggle === true ? 
          "navbar-item has-dropdown has-dropdown-up is-active" : "navbar-item has-dropdown has-dropdown-up"}
        onClick={()=>setToggle(!toggle)}
      >

        <a className="navbar-link navbar-dropdown is-arrowless">
          Delete
        </a>

        <div className="navbar-dropdown is-rounded">

          <div className="navbar-item">

            <title className="is-size-6">
              Confirm
            </title>

            <a className="button is-small is-rounded is-danger mr-2" onClick={()=>{handleClick()}}>
              Yes Delete
            </a>

            <a className="button is-small is-rounded is-light" onClick={()=>{setToggle(false)}}>
              No Cancel
            </a>

          </div>
          
        </div>

     </div>

    </>
  )
}
export default DeleteButtonFooter