import React, {useState} from 'react'

const GridGroup = ({data, grid, children}) => {
  const groupByOptions = ['Type', 'Product', 'LocationName']
  const [groupBy, setGroupBy] = useState(groupByOptions[0])
  const arrGroup = (arr, el) => arr && arr.reduce((acc, item) => {
    let key = item[el]
    !acc[key] ? acc[key] = [] :
    acc[key].push(item)
    return acc
  },{})
  const groupedArr = arrGroup(data, groupBy)
  const groupedKeys = Object.keys(groupedArr)
  
  
  return(
  
  <>
 
    {groupedKeys && groupedKeys.map((group) => 
      <>                                          {/**Box */}
        <div className="box">
          <div className="columns is-mobile">     {/**Header */}
            <div className="column is-narrow">
              <div className="title">
                <strong>{group}</strong>
              </div>
            </div>
          <div className="column is-narrow">
            <div className="select is-rounded">
              <select onClick={(e)=>setGroupBy(e.target.value)}>
                {groupedKeys && groupByOptions.map(groupOption => (
                  <option value={groupOption}>{groupOption}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {data && data.filter(f=> f[groupBy] === group).map(i => (
          <div>
            {i.AssetID}
          </div>
        ))}
        </div>
      </> 
        )}
  </>
    
  )
}
export {groupedKeys}
export default GridGroup