import React, { useState, useContext } from 'react'
import { stateContext } from '../../Contexts/stateContext'

const MonthlyCostGraph = ({id}) => {
  const userContext = useContext(stateContext)
  const { accounts, bills, locations } = userContext.userSession
  const numberOfMonths = bills != "" ? 
    bills.filter(f => f.ServiceID === id) : ""
  const dataToGraph = bills != "" ? 
    bills.filter(f => f.ServiceID === id).map((bill, index) => 
      ({
        label: bill.Date,
        yValue: bill.TotalMRC && parseInt(bill.TotalMRC),
        xValue: index + 1
      }) 
    ) : ""
  const maxForX = dataToGraph != "" ? Math.max(...dataToGraph.map(e => e.xValue)) : ""
  const maxForY = dataToGraph != "" ? Math.max(...dataToGraph.map(e => e.yValue)) : ""

  const points = dataToGraph != "" ? dataToGraph.map(el => {
    const x = (el.xValue / maxForX) * 3 + .2

    const y = 2 - (el.yValue / maxForY) * 2 + .1
    return `${x},${y}`
  }).join(' ') : ""

  const Axis = ({points}) => (
    <polyline 
      fill="none"
      stroke="#ccc"
      strokeWidth=".2"
      points={points}
    />
  )

  const XAxis = () => (
    <Axis points='0, 2 4, 2' />
  )

  const YAxis = () => (
    <Axis points='0, 0 0, 2' />
  )
  
    console.log("points", points, "dataGraph:", dataToGraph)
  return(
    <>
     <svg
      viewBox='0 0 24 26'
     >
       <Axis />
       <XAxis />
       <YAxis />
       <polyline 
        fill="none"
        stroke="blue"
        strokeWidth=".1"
        points={points}
       />
    </svg>
    </>
  )
}
export default MonthlyCostGraph