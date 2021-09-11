import React, { useState, useEffect } from 'react'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'
import { db, fire } from '../../Contexts/firebase'

const AddBookmarkFooter = (props) => {

  const {isModule, id, isBookmarked} = props

  const {doc, updateDoc} = fire

  const [ toggle, setToggle ] = useState()
  
  useEffect(() => {
    props.isBookmarked === true ? setToggle(true) : setToggle(false)
  },[isBookmarked])

  const handleClick = async() => {
    const docData = {
      ['isBookmarked']: !isBookmarked
    }
    const docRef = doc(db, isModule, id)
    try {
      await updateDoc(docRef, docData)
      console.log("Successfully bookmarked document")
      setToggle(!toggle)
    } catch {
      console.log("Error bookmarking document")
    } 
  }

  const autoClose = () => {
    setTimeout(() =>  
      handleClose(), 1500 
    )
  }
  
  return(
    <>
          <div className="navbar-item" onClick={()=>handleClick()}>
            <FaBookmark className={toggle != true ? "is-hidden" : "icon is-normal"} />
            <FaRegBookmark className={toggle === undefined || toggle === false ? "icon is-normal" : "is-hidden"} />
          </div>
    </>
  )
}
export default AddBookmarkFooter