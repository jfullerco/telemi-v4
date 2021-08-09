import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { FaTags } from 'react-icons/fa'
import { db } from '../../Contexts/firebase'
import TextBox from '../Forms/TextBox'

const AddTagButtonFooter = ({tags}) => {

  const {isModule, id} = useParams()
  const history = useHistory()
  const [ toggle, setToggle ] = useState(false)
  const [addTag, setAddTag] = useState(tags)

  const handleClick = async() => {
    
    try {

    const res = await db.collection(isModule).doc(id).update({['Tags']: addTag})
    console.log(res)
    
    

    } catch {

      console.log("Error Add Tag to Record")

    }
    
  }

  const handleChange = (e) => {
    e.preventDefault()
    const {name, value} = e.target
    setAddTag({...tags, [name]: value})
  } 

  const autoClose = () => {

    setTimeout(() => { 
      history.push("/dashboard") 
    }, 1500 )

  }
console.log(addTag)
  return(
    <>
      <div 
        className={toggle === true ? 
          "dropdown is-up is-active is-mobile" : "dropdown is-up"}
        
      >
        <div className="dropdown-trigger navbar-item" onClick={()=> setToggle(!toggle)}>
        
          <FaTags className="icon is-normal" onClick={()=> setToggle(!toggle)} />
        
        </div>

        <div className={toggle === true ? "dropdown-menu " : "is-hidden"}>
          <div className="dropdown-content">

          <div className="dropdown-item ">
            <ul>
            {tags && tags != undefined ? [tags].map(tag => 
              
                <li>{tag && tag.value}</li>
              
            ) : ""}
            </ul>

            <TextBox 
              label="Tag:"
              fieldChanged={(e)=>handleChange(e)}
            />
            <button className="button is-rounded is-link" onClick={()=>handleClick()}>Add</button>


          </div>
          </div>
        </div>

      </div>

    </>
  )
}
export default AddTagButtonFooter