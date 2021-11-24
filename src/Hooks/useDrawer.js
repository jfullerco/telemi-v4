import React, { useState, useContext } from 'react'
import {stateContext} from '../Contexts/stateContext'
import SideDrawer from '../Components/Drawers/SideDrawer'
import DetailDrawer from '../Pages/DetailDrawer'
import DetailDrawer2 from '../Pages/DetailDrawer2'

export function useDrawer() {
  
  const [drawers, setDrawers] = useState([])
  
  //console.log('Hook:', drawers)
  const handleClose = (index) => {
    drawers.splice(index, 1)
  }

  return {drawers, setDrawers}
}

const RenderDrawer = (props) => {
  const userContext = useContext(stateContext)
  const {currentModule, currentDocID} = userContext.userSession

    const {drawers, handleAddDrawer, handleClose} = props
    const [tab, setTab] = useState('Essentials')
    
    //console.log('drawer:', drawers, 'currentModule', currentModule)
    return (
      drawers.map((drawer, index) => 
        <SideDrawer 
          direction="right" 
          checked={drawer.open && drawer.open} 
          handleClose={() => handleClose(index)}
          handleSetTab={(e)=> setTab(e)}
          title={drawer.currentCompany && drawer.currentCompany}
        >
          <DetailDrawer2
            currentCompanyID={drawer.currentCompanyID}
            id={currentDocID}
            isModule={drawer.isModule}
            handleRelatedClick={(e)=>handleAddDrawer(e)}
            isNew={false}
            id={drawer.docID}
            drawers={drawers}
            setIsDetailDrawerOpen={""}
            isDetailDrawerOpen={drawer.open}
            resetIsNew={""}
            tab={tab}
          />
        </SideDrawer>
      )
    )
  }
  
export default RenderDrawer