import React from 'react'

const GridGroup = ({data, groupBy, grid}) => {
  const arrGroup = data && data.map(d => 
    d.Type).reduce((acc, item) => {
    
    !acc['Type'] ? acc['Type'] = [] :
    acc['Type'].push(item)
    return acc
  })
  
  return(
  
  <>
  {console.log(arrGroup)}
    {/**groupedArr && [groupedArr].map(item => <>{item.LocationName} - {item.AssetID}</>)**/}
  </>
    
  )
}
export default GridGroup