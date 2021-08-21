import React, { useState, useEffect, useReducer, useContext } from 'react'
import { stateContext } from '../../Contexts/stateContext'

import { ResponsivePie } from '@nivo/bar'

const CostBySite = () => {
  const userContext = useContext(stateContext)
  const {services} = userContext.userSession
  const initState = services != "" ? services : []
  const reducer = (state, action) => {
    let key = state[action.payload]
    !action[key] ? action[key] = [] :
    action[key].push(state)
    return action
  }
  const [state, dispatch] = useReducer(reducer, initState)

  

  useEffect(()=> {
    dispatch({payload: 'MRC'})
  },[se])

  

  
  
console.log(state)
  
  return(
    <>Check Console</>
  )
}
export default CostBySite