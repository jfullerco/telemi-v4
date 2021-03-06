import React, {useState} from 'react'
import { useSortHook } from '../../Hooks/useSortHook'

const GridGroup = ({ data, 
                     isGrid, 
                     headerFields,
                     mobileHeaderFields,
                     handleClick,
                     groupBy
                     }) => {

  const { sortedArr, setArr } = useSortHook() 

  const [gridData, setGridData] = useState()

  const handleSort = (sortBy, colRef) => {
    setArr({sortBy: sortBy, data: colRef})
    
    console.log(sortedArr)
  }

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
      
    {groupBy != "ALL" & groupBy != "Tags" ? groupedKeys.map((group) => 

                                    
        <div className="box is-rounded mx-2">
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
              {/**Full Window Header - Not Tags - Not ALL */} 
              <tr className="is-hidden-touch">
                {group != undefined ? headerFields && headerFields.map(col => 
                  <th className={col.headerName === groupBy ? "is-hidden": ""} style={{width: '15%', textAlign: "left"}} key={col.keyProp}>

                    {
                      col.mobile != true ? 
                      <span > <a onClick={()=> handleSort(col.docField, data)}>{col.headerName && col.headerName}</a> </span> : 
                      <a onClick={()=> handleSort(col.docField, data)}>{col.headerName && col.headerName} </a> 
                    }

                  </th>
                ) : ""}
              </tr> 
              {/**Mobile Window Header - Not Tags - Not ALL */} 
              <tr className="is-hidden-desktop">
                {group != undefined ? mobileHeaderFields && mobileHeaderFields.map(col => 
                  <th className={col.headerName === groupBy ? "is-hidden": ""} style={{textAlign: "left"}} key={col.keyProp}>

                    {
                      col.mobile != true ? 
                      <a onClick={()=> handleSort(col.docField, data)}>{col.headerName && col.headerName}</a> : 
                      <a onClick={()=> handleSort(col.docField, data)}>{col.headerName && col.headerName}</a>
                    }

                  </th>
                ) : ""}
              </tr>
            </thead>
            {/**Full Window List - Not Tags - Not ALL */} 
            <tbody className="is-size-7 is-hidden-touch">
            
              {data && data != undefined ? data.filter(f=> f[groupBy] === group).map(item => 
                <tr onClick={()=>handleClick(item.id)} key={item.id}> 
                  {group != undefined ? headerFields && headerFields.map(col => 
                    <td className={col.headerName === groupBy ? "is-hidden" : "donotwrapcell px-4 py-4"} key={item[col.headerName]} >
                      {item[col.docField] && col.type === "currency" ? "$" : null} 
                      
                      {item[col.docField]} 
                    </td>
                  ) : ""}
                </tr>
              ) : "" }
          </tbody> 
          {/**Mobile Window List - Not Tags - Not ALL */}   
          <tbody className="is-size-7 is-hidden-desktop">
            
              {data && data != undefined ? data.filter(f => f[groupBy] === group).map(item => 
                <tr onClick={()=>handleClick(item.id)} key={item.id}> 
                  {group != undefined ? mobileHeaderFields && mobileHeaderFields.map(col => 
                    <td className={col.headerName === groupBy ? "is-hidden" : "donotwrapcell py-3"} key={item[col.headerName]} >
                      {item[col.docField] && col.type === "currency" ? "$" : null} 
                      
                      {item[col.docField]} 
                    </td>
                  ) : ""}
                </tr>
              ) : ""}
          </tbody>   
        </table>
        </div>
      </div>
        
        
      
        ) : groupBy == "Tags" ? groupedKeys.map((group) => (

          <div className="box is-rounded mx-2">
          <div className="columns is-mobile">     {/**Header */}
            <div className="column is-narrow">
              <div className="is-size-6">{isGrid && isGrid}</div>
              <div className="title">
                <strong>{group === "Tags" ? group : "No Tags Assigned"}</strong>
              </div>
              {console.log(group)}
            </div>
        </div>
        <div className="table-container ">
        <table className="table is-hoverable is-fullwidth is-centered">
            <thead className="is-size-6">
              {/**Full Window Header - TAGS - Not ALL */} 
              <tr className="is-hidden-touch">
                {headerFields && group === "Tags" ? headerFields.map(col => 
                  <th className={col.headerName === groupBy ? "is-hidden": ""} style={{width: '15%', textAlign: "left"}} key={col.keyProp}>

                    {
                      col.mobile != true ? 
                      <span > <a onClick={()=> handleSort(col.docField, data)}>{col.headerName && col.headerName}</a> </span> : 
                      <a onClick={()=> handleSort(col.docField, data)}>{col.headerName && col.headerName} </a> 
                    }

                  </th>
                ) : ""}
              </tr>
              {/**Mobile Window Header - TAGS - Not ALL */} 
              <tr className="is-hidden-desktop">
                {mobileHeaderFields && mobileHeaderFields.map(col => 
                  <th className={col.headerName === groupBy ? "is-hidden": ""} style={{textAlign: "left"}} key={col.keyProp}>

                    {
                      col.mobile != true ? 
                      <a onClick={()=> handleSort(col.docField, data)}>{col.headerName && col.headerName}</a> : 
                      <a onClick={()=> handleSort(col.docField, data)}>{col.headerName && col.headerName}</a>
                    }

                  </th>
                )}
              </tr>
            </thead>
            {/**Full Window List - TAGS - Not ALL */} 
            <tbody className="is-size-7 is-hidden-touch">
            
              {data && data != undefined ? data.filter(f => f.Tags && f.Tags.includes(group)).map(item => 
                <tr onClick={()=>handleClick(item.id)} key={item.id}> 
                  {headerFields && headerFields.map(col => 
                    <td className={col.headerName === groupBy ? "is-hidden" : "donotwrapcell px-4 py-4"} key={item[col.headerName]} >
                      {item[col.docField] && col.type === "currency" ? "$" : null} 
                      
                      {item[col.docField]} 
                    </td>
                  )}
                </tr>
              ) : "" }
          </tbody>
          {/**Mobile Window List - TAGS - Not ALL */}    
          <tbody className="is-size-7 is-hidden-desktop">
            
              {data && data != undefined ? data.filter(f => f.Tags && f.Tags.includes(group)).map(item => 
                <tr onClick={()=>handleClick(item.id)} key={item.id}> 
                  {mobileHeaderFields && mobileHeaderFields.map(col => 
                    <td className={col.headerName === groupBy ? "is-hidden" : "donotwrapcell py-3"} key={item[col.headerName]} >
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

        )) : (
          
          <div className="box is-rounded mx-2">
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
              {/**Full Window Header - ALL */} 
              <tr className="is-hidden-touch">
                {headerFields && headerFields.map(col => 
                  <th className={col.headerName === groupBy ? "is-hidden": ""} style={{width: '15%', textAlign: "left"}} key={col.keyProp}>

                    {
                      col.mobile != true ? 
                      <a onClick={()=> handleSort(col.docField, data)}>{col.headerName && col.headerName}</a> : 
                      <a onClick={()=> handleSort(col.docField, data)}>{col.headerName && col.headerName}</a>
                    }

                  </th>
                )}
              </tr>
              {/**Mobile Window Header - ALL */} 
              <tr className="is-hidden-desktop">
                {mobileHeaderFields && mobileHeaderFields.map(col => 
                  <th className={col.headerName === groupBy ? "is-hidden": ""} style={{textAlign: "left"}} key={col.keyProp}>

                    {
                      col.mobile != true ? 
                      <a onClick={()=> handleSort(col.docField, data)}>{col.headerName && col.headerName}</a> : 
                      <a onClick={()=> handleSort(col.docField, data)}>{col.headerName && col.headerName}</a>
                    }

                  </th>
                )}
              </tr>
            </thead>
            {/**Full Window List - ALL */} 
            <tbody className="is-size-7 is-hidden-touch">
            
              {data && data != undefined ? data.map(item => 
                <tr onClick={()=>handleClick(item.id)} key={item.id}> 
                  {headerFields && headerFields.map(col => 
                    <td className={col.headerName === groupBy ? "is-hidden" : "donotwrapcell py-4"} key={item[col.headerName]} >
                      {item[col.docField] && col.type === "currency" ? "$" : null} 
                      
                      {item[col.docField]} 
                    </td>
                  )}
                </tr>
              ) : "" }
          </tbody>   
          {/**Mobile Window List - ALL */} 
          <tbody className="is-size-7 is-hidden-tablet">
            
              {data && data != undefined ? data.map(item => 
                <tr onClick={()=>handleClick(item.id)} key={item.id}> 
                  {mobileHeaderFields && mobileHeaderFields.map(col => 
                    <td className={col.headerName === groupBy ? "is-hidden" : "donotwrapcell py-3"} key={item[col.headerName]} >
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