import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { FaRegStickyNote, FaStickyNote } from 'react-icons/fa'
import { db } from '../../Contexts/firebase'

const AddNoteButtonFooter = () => {

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
          "dropdown is-up is-active is-mobile" : "dropdown is-up"}
        onClick={()=>setToggle(!toggle)}
      >
        <div className="dropdown-trigger navbar-item" onClick={()=> {setToggle(!toggle)}}>
        
          <FaStickyNote className={toggle === true ? "icon is-normal" : "is-hidden"}  />
          <FaRegStickyNote className={toggle === false ? "icon is-normal" : "is-hidden"} />
        
        </div>

        <div className={toggle === true ? "dropdown-menu " : "is-hidden"}>
          <div className="dropdown-content">

          <div className="dropdown-item ">

            <a className="button is-small is-rounded is-danger mr-2" onClick={()=>{handleClick()}}>
              Yes Delete
            </a>

            <a className="button is-small is-rounded is-light" onClick={()=>{setToggle(false)}}>
              No Cancel
            </a>

          </div>
          </div>
        </div>

      </div>

    </>
  )
}
export default AddNoteButtonFooter