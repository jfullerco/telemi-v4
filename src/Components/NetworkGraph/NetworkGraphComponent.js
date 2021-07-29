import React, { useState, useEffect, useContext } from 'react'
import Graph from 'react-graph-vis'


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


  const buildGraph = (data) => {
    const buildNodes = data ? data.map(node => ({
      id: node.id, 
      label: node.Name, 
      title: node.Name
    })) : ""
  
    const buildHub = 'xfufkMEw417UyMgawRNU'
    
    const buildEdges = buildNodes != "" ? buildNodes.filter(f => f.id != buildHub).map(edge => ({ from: buildHub, to: edge.id && edge.id})) : ""
    
    setGraph({
      nodes: buildNodes,
      edges: buildEdges
    })
    console.log(graph)
    setTimeout(() => {setIsDone(true)}, 1000)
  }
  

  console.log(isDone)
  
  const options = {
    autoResize: true,
    nodes: {
      shape: 'dot'
    },
    layout: {
      
      hierarchical: {
        enabled: false,
        parentCentralization: true,
        direction: 'UD',
        sortMethod: 'hubsize'
      },
      improvedLayout: false,
      
    },
    edges: {
      color: "#000000",
      width: 0.15,
    },
    physics: {
      stabilization: false,
      
    },
    
    
    
  }

  const events = {
    select: (event) => { var { nodes, edges } = event }
  }

  return(
    <>
    {isDone === false ? "" :
    <div className="network is-relative">
      <Graph
        graph={graph}
        options={options}
        events={events}

      />
    </div>
       }
    </>
  )
}
export default NetworkGraphComponent