import React, { useState, useEffect, useReducer, useContext } from 'react'
import { stateContext } from '../../Contexts/stateContext'

import { ResponsivePie } from '@nivo/pie'

const CostBySite = () => {
  const userContext = useContext(stateContext)
  const {services} = userContext.userSession

  const grouper = (arr) => arr != "" ? arr.reduce((LocationName, MRC) => {
    LocationName[MRC.LocationName] = (parseInt(LocationName[MRC.LocationName]) || 0) + (parseInt(MRC.MRC) || 0);
    return LocationName;
  }, {}) : ""

  const groupLocations = grouper(services)


  return(
    <>
    <ResponsivePie
      data={groupLocations && groupLocations}
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
    />
    </>
  )
}
export default CostBySite