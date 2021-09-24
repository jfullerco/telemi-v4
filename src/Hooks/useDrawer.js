import React, { useState } from 'react'
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
    const {drawers, handleClose} = props
    console.log('drawer:', drawers)
    return(
      drawers.map((drawer, index) => 
        <SideDrawer 
          direction="right" 
          checked={drawer.open && drawer.open} 
          handleClose={() => handleClose(index)}
          title={drawer.currentCompany && drawer.currentCompany}
        >
          <DetailDrawer
            currentCompanyID={drawer.currentCompanyID}
            id={drawer.currentDocID}
            isModule={drawer.currentModule}
            handleRelatedClick={(e)=>handleRelatedClick(e)}
            isNew={isNewDoc || false}
            isRefreshDrawer={isRefreshDrawer}
            isDrawerActive={isNewDoc || false}
            setIsDetailDrawerOpen={() => setIsDrawerOpen(!isDrawerOpen)}
            isDetailDrawerOpen={isDrawerOpen}
            resetIsNew={()=>setIsNewDoc()}
          />
        </SideDrawer>
      )
    )
  }
  
export default RenderDrawer