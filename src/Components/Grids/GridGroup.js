import React from 'react'

const GridGroup = ({data, groupBy, grid}) => {
  const arrGroup = (arr, el) => arr && arr.reduce((acc, item) => {
    let key = item[el]
    !acc[key] ? acc[key] = [] :
    acc[key].push(item)
    return acc
  },{})
  const groupedArr = arrGroup(data, groupBy)
  const groupedKeys = Object.keys(groupedArr)
  console.log(groupedKeys)
  return(
  
  <>
  {console.log("test:", groupedKeys && [groupedArr].map(key => 
  key.indexOf(groupedKeys)))}
  
    {/**groupedArr && [groupedArr].map(item => <>{item.LocationName} - {item.AssetID}</>)**/}
  </>
    
  )
}
export default GridGroup