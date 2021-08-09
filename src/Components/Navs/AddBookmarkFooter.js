import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'
import { db } from '../../Contexts/firebase'

const AddBookmarkFooter = () => {

  const {isModule, id} = useParams()
  const history = useHistory()
  const [ toggle, setToggle ] = useState(false)

  const handleClick = async() => {
    
    try {

    const res = await db.collection(isModule).doc(id).update({['isBookmarked']: toggle})
    console.log(res)
    
    

    } catch {

      console.log("Error Bookmarking Record")

    }
    
  }

  const autoClose = () => {

    setTimeout(() => { 
      history.push("/dashboard") 
    }, 1500 )

  }

  return(
    <>
      
        
          <div className="navbar-item">
            <FaBookmark className={toggle === true ? "icon is-normal" : "is-hidden"} />
            <FaRegBookmark className={toggle === false ? "icon is-normal" : "is-hidden"} />
          </div>
        
        

    </>
  )
}
export default AddBookmarkFooter