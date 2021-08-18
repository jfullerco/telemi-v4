import React, { useEffect, useState, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { FaPaperclip } from 'react-icons/fa'
import { db, store } from '../../Contexts/firebase'
import { stateContext } from '../../Contexts/stateContext'

const AddDocButtonFooter = () => {
  
  const userContext = useContext(stateContext)
  const {setCurrentDate} = userContext
  const {currentCompany, currentCompanyID, currentUser} = userContext.userSession
  
  const {isModule, id} = useParams()
  const history = useHistory()
  const [ toggle, setToggle ] = useState(false)
  const [docs, setDocs] = useState("")
  const [newDocData, setNewDocData] = useState("")

  useEffect(() => {
    fetchDocs()
  },[])
  console.log("docs", docs)
  const fetchDocs = async() => {
    const docRef = await db.collection("Attachments").where(`${isModule}ID`, "==", `${id}`).get()
    const docs = docRef.docs.map(doc => ({id: doc.id, ...doc.data()}))
    setDocs(docs)
  }

  const handleClick = async() => {
    
    try {

     await db.collection("Attachments").doc().set(newDocData)
    
    setToggle(false)

    } catch {

      console.log("Error Adding Document")

    }
    
  }

  const handleDelete = async(docID) => {
    
    try {

    const res = await db.collection("Attachments").doc(docID).delete()
    console.log(res)
    
    setToggle(false)

    } catch {

      console.log("Error Deleting Document")

    }
    
  }

  const handleFileChange = async(e) => {
    const file = e.target.files[0]
    const imageRef = store.ref(currentCompanyID).child(`${isModule}'-'${id}'-'${currentCompany}`)
    await imageRef.put(file)
    const fileURL = await imageRef.getDownloadURL() 
     setNewDocData({
       ['CompanyName']: currentCompany,
       ['CompanyID']: currentCompanyID,
       [`${isModule}ID`]: id,
       ['AttachedDate']: setCurrentDate(),
       ['AttachedBy']: currentUser,
       ['FileURL']: fileURL
      })
  }
  console.log(newDocData)
  return(
    <>
      <div 
        className={toggle === true ? 
          "dropdown is-up is-active is-mobile" : "dropdown is-up"}
      >
        <div className="dropdown-trigger navbar-item" onClick={()=> setToggle(!toggle)}>
        
          <FaPaperclip className="icon is-normal" onClick={()=> setToggle(!toggle)} />
        
        </div>

        <div className={toggle === true ? "dropdown-menu " : "is-hidden"}>
          <div className="dropdown-content">

          <div className="dropdown-item ">
            <ul>
            {docs && docs != undefined ? docs.map((file, index) => 
              
              <li className="tag is-info is-light is-rounded mr-1" key={index}><a target="_blank" href={file.FileURL}>{file.AttachedDate && file.AttachedDate}</a> <button className="delete is-small" onClick={()=>handleDelete(file.id)}>x</button></li>
            
          ) : ""}
            </ul>

            <div className="field">
              <div className="control">
              <div className="file is-boxed">
                <label className="file-label">
                  <input className="file-input" type="file" name="resume" onChange={(e) => handleFileChange(e)} />
                  <span className="file-cta">
                    <span className="file-icon">
                      <i className="faUpload"></i>
                    </span>
                    <span className="file-label">Choose a file...</span>
                  </span>
                </label>
              </div>
              </div>
          </div>
            <button type="submit" className="button is-rounded is-link" onClick={handleClick}>Add</button>


          </div>
          
        </div>
        </div>
      </div>
    
    </>
    
  )
}
export default AddDocButtonFooter