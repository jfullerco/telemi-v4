import React from 'react'

const GridTable = () => {
  return(
    <div className="box is-rounded mx-2">
      <div className="columns is-mobile">     
        <div className="column is-narrow">
          <div className="title">
            <strong>{isGrid && isGrid}</strong>
          </div> 
        </div>
      </div>
          
      <div className="table-container">
      <Table params="table is-hoverable is-fullwidth is-centered">
      <TableHead params="is-size-6">
      <TableRow params="is-hidden-touch">
        {headers != undefined ? headers && headers.map(col => 
          <TableHeadItem 
            params=""
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
        <TableBody params="is-size-7">
          {data && data != undefined ? data.map(item => 
            <TableRow 
              handleRowClick={()=>handleClick(item.id)} 
              key={item.id}
            > 
              {headers != undefined ? headers && headers.map(col => 
                <TableData 
                  params="" 
                  key="" 
                >
                  {item[col.docField] && item[col.docField] : "--"}
                </TableData>
              ) : ""}
            </TableRow>
          ) : ""}
        </TableBody>   
        </Table>
      </div>
  )
}
export default GridTable