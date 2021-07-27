import React from 'react'
import Graph from 'react-graph-vis'



const NetworkGraphComponent = ({data}) => {
  
  const locationNodes = !data ? "" : data.map((location, index) => ({id: location.id, label: location.Name, title: location.Name}))
  const hubLocation = locationNodes != undefined ? locationNodes[24].id : ""
  const locationEdges = locationNodes != undefined ?  locationNodes.map(edge => ({ from: hubLocation, to: edge.id})) : ""

  console.log(locationNodes)
  
  const graph = {
    nodes: locationNodes,
    edges: locationEdges
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