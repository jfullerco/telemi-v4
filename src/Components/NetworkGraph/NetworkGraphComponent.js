import React, { useState, useEffect } from 'react'
import Graph from 'react-graph-vis'



const NetworkGraphComponent = ({data}) => {

  const [ graph, setGraph ] = useState({
    nodes: "",
    edges: ""
  })

  const [ arr, setArr ] = useState([])

  useEffect(() => {
    data && data ? setArr(data) 
    : []
  },[])

  useEffect(() => {
    buildGraph()
  },[arr])

  const buildGraph = () => {
    setGraph({
      nodes: buildNodes,
      edges: buildEdges
    })
  }
  
  const buildNodes = arr? arr.map(node => ({
    id: node.id, 
    label: node.Name, 
    title: node.Name
  })) : null

  const buildHub = buildNodes? buildNodes[24].id : null
  
  const buildEdges = buildNodes? buildNodes.map(edge => ({ from: buildHub, to: edge.id && edge.id})) : ""

  console.log(data)
  
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
    <>{locationNodes != "" ? 
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