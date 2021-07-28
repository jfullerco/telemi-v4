import React, { useState, useEffect, useContext } from 'react'
import Graph from 'react-graph-vis'

import {stateContext} from '../../Contexts/stateContext'

const NetworkGraphComponent = (props) => {
  const {data} = props

  

  const [ graph, setGraph ] = useState()
  const [ isDone, setIsDone ] = useState(false)
  const [ arr, setArr ] = useState()
  const valuesLoaded = data != "" ? true : false
  const valuesChanged = data != arr ? true : false
  
  useEffect(() => {
    data != undefined ? setArr(data) 
    : ""
  },[valuesLoaded])

  useEffect(() => {
    buildGraph(data)
  },[data])

console.log(graph)
  const buildGraph = (data) => {
    const buildNodes = data ? data.map(node => ({
      id: node.id, 
      label: node.Name, 
      title: node.Name
    })) : ""
  
    const buildHub = 'xfufkMEw417UyMgawRNU'
    
    const buildEdges = buildNodes != "" ? buildNodes.map(edge => ({ from: buildHub, to: edge.id && edge.id})) : ""
    
    setGraph({
      nodes: buildNodes,
      edges: buildEdges
    })
    console.log(graph)
    graph != undefined ? setIsDone(true) : null
  }
  

  
  
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