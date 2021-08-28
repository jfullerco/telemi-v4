import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { FaTags } from 'react-icons/fa'
import { db } from '../../Contexts/firebase'
import TextBox from '../Forms/TextBox'

const AddTagButtonFooter = (props) => {
  const values = props.values
  
  const {isModule, id} = useParams()
  const history = useHistory()
  const [ toggle, setToggle ] = useState(false)
  const [tags, setTags] = useState("")
  const [addTag, setAddTag] = useState("")
  const [tagValue, setTagValue] = useState("")
  
  

  useEffect(() => {
    setAddTag(values)
    setTags(values)
  },[values])

  useEffect(() => {
    return () => {
      setAddTag("")
    }
  },[props.handleUpdated])

  const handleClick = async() => {
    
    try {

    const res = await db.collection(isModule).doc(id).update({'Tags': [...addTag]})
    
    setToggle(false)
    props.handleUpdated()
    setTagValue("")
    
    } catch {

      console.log("Error Add Tag to Record")

    }
  
  }

  const handleDelete = async(e) => {
    const updateTags = tags.splice(e, 1)
    try {

      const res = await db.collection(isModule).doc(id).update({'Tags': [...tags]})
      
      setToggle(false)
      props.handleUpdated()
      setTagValue("")
      } catch {
  
        console.log("Error Add Tag to Record")
  
      }
    
    }
    
  

  const handleChange = ({value}) => {
    const newTag = value
    tags != undefined ?
    (
      setAddTag([newTag, ...tags]),
      setTagValue(value)
    )
    : (
      setAddTag([newTag]),
      setTagValue(value)
      )
  } 

  
console.log(tags)
  return(
    <>
      <div 
        className={toggle === true ? 
          "dropdown is-up is-right is-active is-mobile" : "dropdown is-up"}
        
      >
        <div className="dropdown-trigger navbar-item" onClick={()=> setToggle(!toggle)}>
        
          <FaTags className="icon is-normal" onClick={()=> setToggle(!toggle)} />
        
        </div>

        <div className={toggle === true ? "dropdown-menu " : "is-hidden"}>
          <div className="dropdown-content">

          <div className="dropdown-item ">
            <ul>
            {tags && tags != undefined ? tags.map((tag, index) => 
              
              <li className="tag is-info is-light is-rounded mr-1" key={index}>{tag && tag} <button className="delete is-small" onClick={()=>handleDelete({index})}>x</button></li>
            
          ) : ""}
            </ul>

            <TextBox 
              label="Tag:"
              fieldChanged={(e)=>handleChange(e.target)}
              value={tagValue}
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