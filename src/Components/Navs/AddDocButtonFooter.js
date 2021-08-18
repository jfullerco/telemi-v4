import React, { useEffect, useState, useContext } from 'react'

const AddDocButtonFooter = (props) => {
  const values = props.values
  
  const {isModule, id} = useParams()
  const history = useHistory()
  const [ toggle, setToggle ] = useState(false)
  const [docs, setDocs] = useState("")
  const [addDoc, setAddDoc] = useState("")
  const [docValue, setDocValue] = useState("")
  
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
            {docs && docs != undefined ? docs.map((file, index) => 
              
              <li className="tag is-info is-light is-rounded mr-1" key={index}><a target="_blank" href={file.FileURL}>{file.Name && file.Name}</a> <button className="delete is-small" onClick={()=>handleDelete({index})}>x</button></li>
            
          ) : ""}
            </ul>
            
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
            
            <button type="submit" className="button is-rounded is-link" onClick={handleClick}>Add</button>


          </div>
          </div>
        </div>

      </div>

    </>
    
  )
}
export default AddDocFooterButton