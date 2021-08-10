import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { FaTags } from 'react-icons/fa'
import { db } from '../../Contexts/firebase'
import TextBox from '../Forms/TextBox'

const AddTagButtonFooter = (props, handleUpdated) => {
  const values = props.values
  
  const {isModule, id} = useParams()
  const history = useHistory()
  const [ toggle, setToggle ] = useState(false)
  const [tags, setTags] = useState("")
  const [addTag, setAddTag] = useState("")
  
  const [updated, setUpdated] = useState()

  useEffect(() => {
    setAddTag(values)
    setTags(values)
  },[values])

  useEffect(() => {
    return () => {
      setAddTag("")
    }
  },[handleUpdated])

  const handleClick = async() => {
    
    try {

    const res = await db.collection(isModule).doc(id).update({'Tags': [...addTag]})
    
    setToggle(false)
    handleUpdated()

    } catch {

      console.log("Error Add Tag to Record")

    }
  
  }

  const handleChange = (e) => {
    e.preventDefault()
    const {name, value} = e.target 
    setAddTag([...tags, value])
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
            {tags && tags != undefined ? tags.map((tag, index) => 
              
              <li className="tag is-info is-light is-rounded mr-1" key={index}>{tag && tag} <button className="delete is-small">x</button></li>
            
          ) : ""}
            </ul>

            <TextBox 
              label="Tag:"
              fieldChanged={(e)=>handleChange(e)}
              
            />
            <button type="submit" className="button is-rounded is-link" onClick={handleClick}>Add</button>


          </div>
          </div>
        </div>

      </div>

    </>
  )
}
export default AddTagButtonFooter