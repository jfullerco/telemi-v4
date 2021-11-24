import React, {useState} from 'react'
import { useSortHook } from '../../Hooks/useSortHook'
import {Table, TableHead, TableHeadItem, TableRow, TableBody, TableData} from '../Tables/Table'

const GridTable = ({ data, 
                     isGrid, 
                     handleClick,
                     groupBy,
                     headerFields
                     }) => {

  const { sortedArr, setArr } = useSortHook() 
  const [groupKey, setGroupKey] = useState(groupBy && groupBy)
  const [gridData, setGridData] = useState()

  const handleSort = (sortBy, colRef) => {
    setArr({sortBy: sortBy, data: colRef})
    
    console.log(sortedArr)
  }

  const arrGroup = (arr, el) => arr && arr.reduce((acc, item) => {
    
    let i = item && item?.fields?.filter(f=>f?.key === el).map(v => ({...v}))
    let key = i && i?.[0]?.value || i?.[0]?.ref?.value
    
    !acc[key] ? (acc[key] = []).push(i) :
    acc[key].push(i)
    //console.log('i', i, 'acc', acc, 'v', v, 'acc[v]', acc[v])
    return acc
  },{})

  const reducer = (arr, el) => arr && arr.reduce((acc, item) => {
    
    let i = item && item.fields.map(v => Object.values(v.label))
    !acc[i] ? acc[i] = [] :
    acc[i].push(i)
    //console.log('i', i, 'acc', acc)
    return acc
  },{})

  // const fields = data && data?.map(v => v.fields?.map(f => ({
  //   ref: f.key, 
  //   label: f.label, 
  //   header: f.params?.header, 
  //   value: f?.value || f?.ref?.value, 
  //   pid: v.id, 
  //   type: f?.type === 'ref' ? f?.ref?.type : f?.type 
  // })))

  // const [fieldsTest] = data && data?.map(v=> v.fields)
  // const fieldsFinal = fieldsTest && fieldsTest.reduce((a, c) => {
  //   a[c.key] = c.value
  //   return a
  // }, {})
  const dataList = data && data?.map(v =>  [...v?.fields])
  const testDataList = dataList && dataList?.map(v => v.reduce((a, c) => { a[c.key] = c?.value || c?.ref?.value; return a}, {}))
  const [activeHeaders] = headerFields && headerFields?.map(f => f?.[isGrid]?.headers )
  //const reduceEach = (arr) => arr?.reduce((a, c) => { a[c.key] = c.value; return a}, {})
  
  //const activeHeaders = headerFields && headerFields.map(v => v.filter(f => f.name === isGrid).map(({headers}) => headers))

  const groupedArr = data != undefined ? arrGroup(data, groupBy) : ''
  const groupedKeys = Object.keys(groupedArr)
  
  
  console.log('testDataList', testDataList && testDataList, 'activeHeaders', activeHeaders )


  return(
  
    <>  
      {
        groupBy != "ALL" & groupBy != "Tags" ? groupedKeys.map((group) =>
              <div className="box is-rounded">
              <div className="columns is-mobile">     
                <div className="column is-narrow">
                  <div className="title">
                    <strong>{group && group}</strong>
                  </div>
                  {console.log('group', group)}
                </div>
            </div>
            <div className="table-container ">
            <Table params="table is-hoverable is-fullwidth is-centered">
                <TableHead params="is-size-6">
                  {/**Full Window Header - ALL */} 

                  <TableRow>
                    {activeHeaders && activeHeaders.map(col => 
                      <TableHeadItem 
                        params={col.visible === true ? "": "is-hidden"} 
                        style={{width: '15%', textAlign: "left"}} 
                        key={col.key}
                      >
                      {/* {console.log('col', col)} */}
                        {
                           
                          <a onClick={()=> handleSort(col.key, data)}>{col.label && col.label}</a> 
                        }
                      </TableHeadItem>
                    )}
                  </TableRow>

      
                </TableHead>

                

              <TableBody params="is-6">
              
              
                {testDataList && testDataList.filter(f => f[groupBy] === group).map(el => 
                  <TableRow 
                      params='py-7'
                      handleRowClick={()=>handleClick(el)} 
                      key={el}
                    > 
                  {activeHeaders && activeHeaders.map(col => 
                  <TableData 
                          params={col.key === groupBy ? "is-hidden" : "donotwrapcell px-4 py-4"} 
                          key={el[col.key]} 
                        >
                          {el[col.key]} 
                        </TableData>
                    
                    )}
                    </TableRow>
                    ) }
              </TableBody>   
            </Table>
            </div>
          </div>
        
         ) : "nothing"}
      
     
  </>
  )  
  
}

export default GridTable