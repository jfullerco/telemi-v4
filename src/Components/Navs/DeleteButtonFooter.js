import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'
import { db } from '../../Contexts/firebase'
import {useRefreshDataHook} from '../../Hooks/useRefreshDataHook'

const DeleteButtonFooter = (props) => {

  
  const history = useHistory()
  const [ toggle, setToggle ] = useState(false)
  const {isModule, id, handleClose} = props
  const {refreshModule} = useRefreshDataHook(isModule)

  const handleClick = async() => {
    
    try {

    const res = await db.collection(isModule).doc(id).delete()
    console.log(res)
    refreshModule(isModule)
    autoClose()

    } catch {

      console.log("Error Deleting Record")

    }
    
  }

  const autoClose = () => {

    setTimeout(() =>  
      handleClose()
    , 1500 )

  }

  return(
    <>
      <div 
        className={toggle === true ? 
          "dropdown is-up is-active is-mobile" : "dropdown is-up"}
        onClick={()=>setToggle(!toggle)}
      >
        <div className="dropdown-trigger navbar-item" onClick={()=> {setToggle(!toggle)}}>
        
        <FaTrash className={toggle === true ? "icon is-normal" : "icon is-normal is-link"} />
        
        </div>

        <div className={toggle === true ? "dropdown-menu" : "is-hidden"}>
          <div className="dropdown-content">

          <div className="dropdown-item">

            <a className="button is-rounded is-danger mr-2" onClick={()=>{handleClick()}}>
              Yes Delete
            </a>

            <a className="delete is-small ml-3" onClick={()=>{setToggle(false)}} /> 

          </div>
          </div>
        </div>

      </div>

    </>
  )
}
export default DeleteButtonFooter