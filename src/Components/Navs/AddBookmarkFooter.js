import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'
import { db } from '../../Contexts/firebase'

const AddBookmarkFooter = (props) => {

  const {isModule, id, isBookmarked} = props
  const history = useHistory()
  const [ toggle, setToggle ] = useState()
  
  useEffect(() => {
    props.isBookmarked === true ? setToggle(true) : setToggle(false)
  },[isBookmarked])

  const handleClick = async() => {
    try {
      const res = await db.collection(isModule).doc(id).update({['isBookmarked']: !isBookmarked})
      console.log(res)
      setToggle(!toggle)
    } catch {
      console.log("Error Bookmarking Record")
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