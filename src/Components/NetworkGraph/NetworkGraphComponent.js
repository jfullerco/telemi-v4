import React, { useState, useEffect, useContext } from 'react'
import Graph from 'react-graph-vis'

import {stateContext} from '../../Contexts/stateContext'

const NetworkGraphComponent = () => {
  
  const userContext = useContext(stateContext)
  
   

  const [ graph, setGraph ] = useState()
  const [isDone, setIsDone] = useState(false)
  const [ arr, setArr ] = useState()
  const valuesLoaded = locations.userContext.userSession != "" ? true : false
  
  useEffect(() => {
    locations.userContext.userSession ? setArr(locations.userContext.userSession) 
    : ""
  },[valuesLoaded])

  useEffect(() => {
    buildGraph()
  },[valuesLoaded])

  const buildGraph = () => {
    console.log(locations.userContext.userSession)
    setGraph({
      nodes: buildNodes,
      edges: buildEdges
    })
    setIsDone(true)
  }
  
  const buildNodes = arr != undefined ? arr && arr.map(node => ({
    id: node.id, 
    label: node.Name, 
    title: node.Name
  })) : ""

  const buildHub = 'xfufkMEw417UyMgawRNU'
  
  const buildEdges = buildNodes != "" ? buildNodes.map(edge => ({ from: buildHub, to: edge.id && edge.id})) : ""

  
  
  const options = {
    layout: {
      hierarchical: true
    },
    edges: {
      color: "#000000"
    },
    height: "500px"
  }

  const events = {
    select: (event) => { var { nodes, edges } = event }
  }

  return(
    <>{isDone === true ? 
      <Graph
        graph={graph}
        options={options}
        events={events}

      />
      : "" }
    </>
  )
}
export default NetworkGraphComponent