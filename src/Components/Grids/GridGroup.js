import React, {useState} from 'react'

const GridGroup = ({ data, 
                     isGrid, 
                     headerFields,
                     mobileHeaderFields,
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
  
  

  return(
  
  <>
      
    {groupBy != "ALL" ? groupedKeys.map((group) => 
                                           
        <div className="box is-rounded">
          <div className="columns is-mobile">     {/**Header */}
            <div className="column is-narrow">
              <div className="is-size-6">{isGrid && isGrid}</div>
              <div className="title">
                <strong>{group === undefined ? "Not Assigned" : group}</strong>
              </div>
              
            </div>
        </div>
        <div className="table-container ">
        <table className="table is-hoverable is-fullwidth is-centered">
            <thead className="is-size-6">
              <tr className="is-hidden-mobile ">
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
              <tr className="is-hidden-tablet">
                {mobileHeaderFields && mobileHeaderFields.map(col => 
                  <th className={col.headerName === groupBy ? "is-hidden": ""} style={{textAlign: "left"}} key={col.keyProp}>

                    {
                      col.mobile != true ? 
                      <span > {col.headerName && col.headerName} </span> : 
                      <>{col.headerName && col.headerName} </> 
                    }

                  </th>
                )}
              </tr>
            </thead>
            <tbody className="is-size-7 is-hidden-mobile">
            
              {data && data != undefined ? data.filter(f=> f[groupBy] === group).map(item => 
                <tr onClick={()=>handleClick(item.id)} key={item.id}> 
                  {headerFields && headerFields.map(col => 
                    <td className={col.headerName === groupBy ? "is-hidden" : "py-4"} key={item[col.headerName]} >
                      {item[col.docField] && col.type === "currency" ? "$" : null} 
                      
                      {item[col.docField]} 
                    </td>
                  )}
                </tr>
              ) : "" }
          </tbody>   
          <tbody className="is-size-7 is-hidden-tablet">
            
              {data && data != undefined ? data.filter(f => !groupBy ? f[groupBy] === group : "").map(item => 
                <tr onClick={()=>handleClick(item.id)} key={item.id}> 
                  {mobileHeaderFields && mobileHeaderFields.map(col => 
                    <td className={col.headerName === groupBy ? "is-hidden" : "py-3"} key={item[col.headerName]} >
                      {item[col.docField] && col.type === "currency" ? "$" : null} 
                      
                      {item[col.docField]} 
                    </td>
                  )}
                </tr>
              ) : ""}
          </tbody>   
        </table>
        </div>
      </div>
        
        
      
        ) : (
          
          <div className="box is-rounded">
          <div className="columns is-mobile">     {/**Header */}
            <div className="column is-narrow">
              <div className="title">
                <strong>{isGrid && isGrid}</strong>
              </div>
              
            </div>
        </div>
        <div className="table-container ">
        <table className="table is-hoverable is-fullwidth is-centered">
            <thead className="is-size-6">
              <tr className="is-hidden-mobile ">
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
              <tr className="is-hidden-tablet">
                {mobileHeaderFields && mobileHeaderFields.map(col => 
                  <th className={col.headerName === groupBy ? "is-hidden": ""} style={{textAlign: "left"}} key={col.keyProp}>

                    {
                      col.mobile != true ? 
                      <span > {col.headerName && col.headerName} </span> : 
                      <>{col.headerName && col.headerName} </> 
                    }

                  </th>
                )}
              </tr>
            </thead>
            <tbody className="is-size-7 is-hidden-mobile">
            
              {data && data != undefined ? data.map(item => 
                <tr onClick={()=>handleClick(item.id)} key={item.id}> 
                  {headerFields && headerFields.map(col => 
                    <td className={col.headerName === groupBy ? "is-hidden" : "py-4"} key={item[col.headerName]} >
                      {item[col.docField] && col.type === "currency" ? "$" : null} 
                      
                      {item[col.docField]} 
                    </td>
                  )}
                </tr>
              ) : "" }
          </tbody>   
          <tbody className="is-size-7 is-hidden-tablet">
            
              {data && data != undefined ? data.map(item => 
                <tr onClick={()=>handleClick(item.id)} key={item.id}> 
                  {mobileHeaderFields && mobileHeaderFields.map(col => 
                    <td className={col.headerName === groupBy ? "is-hidden" : "py-3"} key={item[col.headerName]} >
                      {item[col.docField] && col.type === "currency" ? "$" : null} 
                      
                      {item[col.docField]} 
                    </td>
                  )}
                </tr>
              ) : ""}
          </tbody>   
        </table>
        </div>
      </div>
        )
    }
  </>
    
  )
}
export {groupedKeys}
export default GridGroup