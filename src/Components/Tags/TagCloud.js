import React from 'react'

const TagCloud = ({data, handleTagDelete}) => {

  return(
    <div className="field is-grouped is-grouped-multiline">
        <div className="control">
          <div className="tags">
            {!data ? null : data.map(tag => 
              
                <span className="tag is-rounded">
                  {tag}
                  <button className="delete is-small is-hidden" onClick={()=>handleTagDelete()}></button>
                </span>
              
            )}
          </div>
        </div>
    </div>
  )
}
export default TagCloud