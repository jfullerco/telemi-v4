import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'
import { db } from '../../Contexts/firebase'

const AddBookmarkFooter = ({isBookmarked}) => {

  const {isModule, id} = useParams()
  const history = useHistory()
  const [ toggle, setToggle ] = useState()
  
  useEffect(() => {
    isBookmarked === true ? setToggle(true) : setToggle(false)
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

    setTimeout(() => { 
      history.push("/dashboard") 
    }, 1500 )

  }
  console.log(isBookmarked)

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