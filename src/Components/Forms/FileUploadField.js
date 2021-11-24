import React from 'react'
import { faUpload } from 'react-icons/fa'

const FileUploadField = ({handleFileChange}) => {
  return(
    <div className="file is-boxed">
      <label className="file-label">
      <input 
        className="file-input" 
        type="file" 
        name="resume" 
        onChange={(e) => handleFileChange(e)} 
      />
          <span className="file-cta">
            <span className="file-icon">
              <i className="faUpload"></i>
            </span>
          <span className="file-label">Choose a file...</span>
          </span>
      </label>
    </div>
  )
}
export default FileUploadField