import React, {useState} from 'react'
import { useSortHook } from '../../Hooks/useSortHook'
import {Table, TableHead, TableHeadItem, TableRow, TableBody, TableData} from '../Tables/Table'

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
                  <strong>{group || "Not Assigned"}</strong>
                </div>
                
              </div>
          </div>
          
          <div className="table-container ">
            <Table params="table is-hoverable is-fullwidth is-centered">
              <TableHead params="is-size-6">

              {/**Full Window Header - Not Tags - Not ALL */} 

                <TableRow params="is-hidden-touch">
                  {group != undefined ? headerFields && headerFields.map(col => 
                    <TableHeadItem 
                      params={col.headerName === groupBy ? "is-hidden": ""} 
                      style={{width: '15%', textAlign: "left"}} 
                      key={col.keyProp}
                    >
                      {
                        col.mobile != true ? 
                        <span> 
                          <a onClick={()=> handleSort(col.docField, data)}>
                            {col.headerName && col.headerName}
                          </a> 
                        </span> : 
                        <a onClick={()=> handleSort(col.docField, data)}>
                          {col.headerName && col.headerName} 
                        </a> 
                      }
                    </TableHeadItem>
                  ) : "Not Assigned"}
                </TableRow> 

              {/**Mobile Window Header - Not Tags - Not ALL */} 

                <TableRow params="is-hidden-desktop">
                  {group != undefined ? mobileHeaderFields && mobileHeaderFields.map(col => 
                    <TableHeadItem 
                      params={col.headerName === groupBy ? "is-hidden": ""} 
                      style={{textAlign: "left"}} 
                      key={col.keyProp}
                    >
                      {
                        col.mobile != true ? 
                        <a onClick={()=> handleSort(col.docField, data)}>
                          {col.headerName && col.headerName}
                        </a> : 
                        <a onClick={()=> handleSort(col.docField, data)}>
                          {col.headerName && col.headerName}
                        </a>
                      }
                    </TableHeadItem>
                  ) : ""}
                </TableRow>
              </TableHead>

            {/**Full Window List - Not Tags - Not ALL */} 

            <TableBody params="is-size-7 is-hidden-touch">
              {data && data != undefined ? data.filter(f=> f[groupBy] === group).map(item => 
                <TableRow 
                  handleRowClick={()=>handleClick(item.id)} 
                  key={item.id}
                > 
                  {group != undefined ? headerFields && headerFields.map(col => 
                    <TableData 
                      params={col.headerName === groupBy ? "is-hidden" : "donotwrapcell px-4 py-4"} 
                      key={item[col.headerName]} 
                    >
                      {item[col.docField] && col.type === "currency" ? `$ ${item[col.docField]}` : item[col.docField]} 
                    </TableData>
                  ) : ""}
                </TableRow>
              ) : "" }
          </TableBody> 

          {/**Mobile Window List - Not Tags - Not ALL */}   

          <TableBody params="is-size-7 is-hidden-desktop">
              {data && data != undefined ? data.filter(f => f[groupBy] === group).map(item => 
                <TableRow 
                  handleRowClick={()=>handleClick(item.id)} 
                  key={item.id}
                > 
                  {group != undefined ? mobileHeaderFields && mobileHeaderFields.map(col => 
                    <TableData 
                      params={col.headerName === groupBy ? "is-hidden" : "donotwrapcell py-3"} 
                      key={item[col.headerName]} 
                    >
                      {item[col.docField] && col.type === "currency" ? `$ ${item[col.docField]}` : item[col.docField]}
                    </TableData>
                  ) : ""}
                </TableRow>
              ) : ""}
          </TableBody>   
        </Table>
        </div>
      </div>
        
        
      
        ) : groupBy == "Tags" ? groupedKeys.map((group) => (

          <div className="box is-rounded mx-2">
            <div className="columns is-mobile">     
              <div className="column is-narrow">
                <div className="is-size-6">{isGrid && isGrid}</div>
                  <div className="title">
                    <strong>{group || "No Tags Assigned"}</strong>
                  </div>
              </div>
            </div>
            <div className="table-container ">
            <Table params="table is-hoverable is-fullwidth is-centered">
              <TableHead params="is-size-6">

                {/**Full Window Header - TAGS - Not ALL */} 

              <TableRow params="is-hidden-touch">
                {headerFields && group === "Tags" ? headerFields.map(col => 
                  <TableHead 
                    params={col.headerName === groupBy ? "is-hidden": ""} 
                    style={{width: '15%', textAlign: "left"}} 
                    key={col.keyProp}
                  >
                    {
                      col.mobile != true ? 
                      <span> 
                        <a onClick={()=> handleSort(col.docField, data)}>
                          {col.headerName && col.headerName}
                        </a> 
                      </span> : 
                        <a onClick={()=> handleSort(col.docField, data)}>
                          {col.headerName && col.headerName} 
                        </a> 
                    }
                  </TableHead>
                ) : ""}
              </TableRow>

              {/**Mobile Window Header - TAGS - Not ALL */} 
              
              <TableRow params="is-hidden-desktop">
                {mobileHeaderFields && mobileHeaderFields.map(col => 
                  <TableHead 
                    className={col.headerName === groupBy ? "is-hidden": ""} 
                    style={{textAlign: "left"}} 
                    key={col.keyProp}
                  >
                    {
                      col.mobile != true ? 
                      <a onClick={()=> handleSort(col.docField, data)}>{col.headerName && col.headerName}</a> : 
                      <a onClick={()=> handleSort(col.docField, data)}>{col.headerName && col.headerName}</a>
                    }
                  </TableHead>
                )}
              </TableRow>
            </TableHead>

            {/**Full Window List - TAGS - Not ALL */} 

            <TableBody params="is-size-7 is-hidden-touch">
            
              {data && data != undefined ? data.filter(f => f.Tags && f.Tags.includes(group)).map(item => 
                <TableRow handleRowClick={()=>handleClick(item.id)} key={item.id}> 
                  {headerFields && headerFields.map(col => 
                    <TableData 
                      params={col.headerName === groupBy ? "is-hidden" : "donotwrapcell px-4 py-4"} 
                      key={item[col.headerName]} 
                    >
                      {item[col.docField] && col.type === "currency" ? `$ ${item[col.docField]}` : item[col.docField]} 
                    </TableData>
                  )}
                </TableRow>
              ) : "" }
          </TableBody>

          {/**Mobile Window List - TAGS - Not ALL */}    

          <TableBody params="is-size-7 is-hidden-desktop">
            
              {data && data != undefined ? data.filter(f => f.Tags && f.Tags.includes(group)).map(item => 
                <TableRow handleRowClick={()=>handleClick(item.id)} key={item.id}> 
                  {mobileHeaderFields && mobileHeaderFields.map(col => 
                    <TableData 
                      params={col.headerName === groupBy ? "is-hidden" : "donotwrapcell py-3"} 
                      key={item[col.headerName]} 
                    >
                      {item[col.docField] && col.type === "currency" ? `$ ${item[col.docField]}` : item[col.docField]}  
                    </TableData>
                  )}
                </TableRow>
              ) : ""}
          </TableBody>   
        </Table>
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
        <Table params="table is-hoverable is-fullwidth is-centered">
            <TableHead params="is-size-6">
              {/**Full Window Header - ALL */} 
              <TableRow params="is-hidden-mobile">
                {headerFields && headerFields.map(col => 
                  <TableHeadItem 
                    params={col.headerName === groupBy ? "is-hidden": ""} 
                    style={{width: '15%', textAlign: "left"}} 
                    key={col.keyProp}
                  >
                    {
                      col.mobile != true ? 
                      <a onClick={()=> handleSort(col.docField, data)}>{col.headerName && col.headerName}</a> : 
                      <a onClick={()=> handleSort(col.docField, data)}>{col.headerName && col.headerName}</a>
                    }
                  </TableHeadItem>
                )}
              </TableRow>

              {/**Mobile Window Header - ALL */} 

              <TableRow params="is-hidden-tablet">
                {mobileHeaderFields && mobileHeaderFields.map(col => 
                  <TableHeadItem 
                    params={col.headerName === groupBy ? "is-hidden": ""} 
                    style={{textAlign: "left"}} 
                    key={col.keyProp}
                  >
                    {
                      col.mobile != true ? 
                      <a onClick={()=> handleSort(col.docField, data)}>{col.headerName && col.headerName}</a> : 
                      <a onClick={()=> handleSort(col.docField, data)}>{col.headerName && col.headerName}</a>
                    }

                  </TableHeadItem>
                )}
              </TableRow>
            </TableHead>

            {/**Full Window List - ALL */} 

            <TableBody params="is-size-7 is-hidden-mobile">
              {data && data != undefined ? data.map(item => 
                <TableRow handleRowClick={()=>handleClick(item.id)} key={item.id}> 
                  {headerFields && headerFields.map(col => 
                    <TableData 
                      params="donotwrapcell py-4"
                      key={item[col.headerName]} 
                    >
                      {item[col.docField] && col.type === "currency" ? `$ ${item[col.docField]}` : item[col.docField]} 
                      
                    </TableData>
                  )}
                </TableRow>
              ) : "" }
          </TableBody>   
          {/**Mobile Window List - ALL */} 
          <TableBody params="is-size-7 is-hidden-tablet">
            
              {data && data != undefined ? data.map(item => 
                <TableRow handleRowClick={()=>handleClick(item.id)} key={item.id}> 
                  {mobileHeaderFields && mobileHeaderFields.map(col => 
                    <TableData 
                      params="donotwrapcell py-3" 
                      key={item[col.headerName]} 
                    >
                      {item[col.docField] && col.type === "currency" ? `$ ${item[col.docField]}` : item[col.docField]} 
                      
                    </TableData>
                  )}
                </TableRow>
              ) : ""}
          </TableBody>   
        </Table>
        </div>
      </div>
        )
    }
  </>
    
  )
}
export {groupedKeys}
export default GridGroup