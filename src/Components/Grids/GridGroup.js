import React from 'react'

const GridGroup = ({data, groupBy, grid}) => {
  const arrGroup = (arr, el) => arr && arr.reduce((acc, item) => {
    let key = item[el]
    !acc[key] ? acc[key] = [] :
    acc[key].push(item)
    return acc
  },{})
  const groupedArr = arrGroup(data, groupBy)
  return(
  
  <>
  {console.log("test:", groupedArr && groupedArr['Data Only'].map(i => console.log(i)))}
  {groupedArr != undefined ? [groupedArr].filter(f => console.log(f)).map(item => console.log(item)) : null }
    {/**groupedArr && [groupedArr].map(item => <>{item.LocationName} - {item.AssetID}</>)**/}
  </>
    
  )
}
export default GridGroup