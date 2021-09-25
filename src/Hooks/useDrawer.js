import React, { useState, useContext } from 'react'
import ReactDom from 'react-dom'
import {stateContext} from '../Contexts/stateContext'
import SideDrawer from '../Components/Drawers/SideDrawer'
import DetailDrawer from '../Pages/DetailDrawer'

export function useDrawer() {
  
  const [drawers, setDrawers] = useState([])
  console.log('Hook:', drawers)
  const handleClose = (index) => {
    drawers.splice(index, 1)
  }

  return {drawers, setDrawers}
}

const RenderDrawer = (props) => {
  const userContext = useContext(stateContext)
  const {currentModule, currentDocID} = userContext.userSession

    const {drawers, handleAddDrawer, handleClose} = props
    console.log('drawer:', drawers, 'currentModule', currentModule)
    return ReactDOM.createPortal(
      drawers.map((drawer, index) => 
        <SideDrawer 
          direction="right" 
          checked={drawer.open && drawer.open} 
          handleClose={() => handleClose(index)}
          title={drawer.currentCompany && drawer.currentCompany}
        >
          <DetailDrawer
            currentCompanyID={drawer.currentCompanyID}
            id={currentDocID}
            isModule={drawer.isModule}
            handleRelatedClick={(e)=>handleAddDrawer(e)}
            isNew={false}
            
            
            setIsDetailDrawerOpen={}
            isDetailDrawerOpen={drawer.open}
            resetIsNew={}
          />
        </SideDrawer>
      ,document.b)
    )
  }
  
export default RenderDrawer