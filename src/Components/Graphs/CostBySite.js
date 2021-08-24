import React, { useState, useEffect, useReducer, useContext } from 'react'
import { stateContext } from '../../Contexts/stateContext'

import { ResponsivePie } from '@nivo/pie'

const CostBySite = () => {

  const userContext = useContext(stateContext)
  const {services} = userContext.userSession

  

  /**
   * const grouper = (arr) => arr != "" ? arr.reduce((LocationName, MRC) => {
    
    let total = (parseInt(LocationName[MRC.LocationName]) || 0) + (parseInt(MRC.MRC) || 0)
    !LocationName[MRC.LocationName] ? LocationName[MRC.LocationName] = [] : LocationName
    LocationName[MRC.LocationName].push({
      id: MRC.LocationName,
      label: MRC.LocationName,
      value: MRC.MRC || 0
    }) 
    
    return LocationName
  },[]) : ""
  
  
  const groupLocations = grouper(services)
  
  const total = (sum, value) => {
    return sum += value
  }
**/
  
  const initialData = services != "" ? services.map(service => ({name: service.LocationName, cost: parseInt(service.MRC) || 0})) : ""
  
  const buildData = (arr) => {
    const hashMap = {}

    for (const {name, cost} of arr) {
      hashMap[name] ? hashMap[name].value += cost : 
      hashMap[name] = { id: name, label: name, value: cost
      }
    }
    
    const output = Object.values(hashMap)
    
    return output 
  }
  
  const data = buildData(initialData)
  const pieData = data && data.map(el => ({id: el.id, label: el.label, value: el.value}))
  console.log(pieData)
  return(
    <div style={{height: 400}}>
      <ResponsivePie
      data={pieData}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
      arcLabel={function(e){return `$${e.value}`}}
    />
    </div>
  )
}
export default CostBySite