import React, { useState } from 'react'
import SideDrawer from '../Components/Drawers/SideDrawer'

function useDrawer(props) {
  
  const [drawers, setDrawers] = useState([])

  const handleClose = (index) => {
    setDrawers({
      ...drawers,
      drawers[index].open: false
    })
  }
  
  const RenderDrawer = (drawers) => {
    return(
      [drawers].map((drawer, index) => 
        <SideDrawer 
          direction="right" 
          checked={drawer.open} 
          handleClose={() => handleClose(index)}
          title={currentCompany}
        >
          {/**<DetailDrawer
            currentCompanyID={currentCompanyID}
            id={currentDocID}
            isModule={currentModule}
            handleRelatedClick={(e)=>handleRelatedClick(e)}
            isNew={isNewDoc || false}
            isRefreshDrawer={isRefreshDrawer}
            isDrawerActive={isNewDoc || false}
            setIsDetailDrawerOpen={() => setIsDrawerOpen(!isDrawerOpen)}
            isDetailDrawerOpen={isDrawerOpen}
            resetIsNew={()=>setIsNewDoc()}
          />*/}
        </SideDrawer>
      )
    )
  }
  return {setDrawers, RenderDrawer}
}
export default useDrawer