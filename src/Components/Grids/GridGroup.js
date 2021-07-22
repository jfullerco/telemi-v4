import React, {useState} from 'react'

const GridGroup = ({ data, 
                     isGrid, 
                     headerFields,
                     handleClick, 
                     handleAddBtn,
                     groupBy
                     }) => {

  const groupByOptions = [
    {
      Label: 'Type',
      Value: 'Type',
     },
     {
       Label: 'Location',
       Value: 'LocationName'
     } 
  ]

  

  const arrGroup = (arr, el) => arr && arr.reduce((acc, item) => {
    let key = item[el]
    !acc[key] ? acc[key] = [] :
    acc[key].push(item)
    return acc
  },{})

  const groupedArr = data != undefined ? arrGroup(data, groupBy) : ""
  const groupedKeys = Object.keys(groupedArr)
  
  console.log(groupedKeys, groupBy)

  return(
  
  <>
      
    {groupedKeys && groupedKeys.map((group) => 
                                           
        <div className="box">
          <div className="columns is-mobile">     {/**Header */}
            <div className="column is-narrow">
              <div className="title">
                <strong>{group}</strong>
              </div>
            </div>
        </div>
        <table className="table is-hoverable is-fullwidth">
            <thead className="is-size-6">
              <tr>
                {headerFields && headerFields.map(col => 
                  <th className={col.headerName === groupBy ? "is-hidden": ""} style={{width: '15%', textAlign: "left"}} key={col.keyProp}>

                    {
                      col.mobile != true ? 
                      <span > {col.headerName && col.headerName} </span> : 
                      <>{col.headerName && col.headerName} </> 
                    }

                  </th>
                )}
              </tr>
            </thead>
            <tbody className="is-size-7">
            
              {data && data != undefined ? data.filter(f=> f[groupBy] === group).map(item => 
                <tr onClick={()=>handleClick(item.id)} key={item.id}> 
                  {headerFields && headerFields.map(col => 
                    <td className={col.headerName === groupBy ? "is-hidden" : "py-3"} style={{width: "15%"}} key={item[col.headerName]} >
                      {item[col.docField] && col.type === "currency" ? "$" : null} 
                      
                      {item[col.docField]} 
                    </td>
                  )}
                  {/**Insert Expanding Table Field Here */}
                </tr>
              ) : ""}
          </tbody>   
        </table>
      </div>
        
        
      
        )}
  </>
    
  )
}
export {groupedKeys}
export default GridGroup