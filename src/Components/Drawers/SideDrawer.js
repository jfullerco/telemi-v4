import React from 'react'
import Drawer from '@material-ui/core/Drawer'

import Columns from '../Layout/Columns'
import Column from '../Layout/Column'
import { FaArrowLeft } from 'react-icons/fa'

const SideDrawer = (props) => {
  
  return(

    <Drawer anchor={props.direction} open={props.checked} onClose={props.handleClose}>

      <div className="drawer-paper-full">
        
        <Columns options="is-mobile is-vcentered">
          <Column size="is-narrow">
            <div className="icon is-large">
              <FaArrowLeft className="icon pl-1 mx-2 my-2" onClick={() => props.handleClose()}/> 
            </div>
          </Column>
          <Column>
            <span className="title"><div className="donotwrap">{props.title}</div></span>
          </Column>
        </Columns>
        
        <div> 
          {props.children}
        </div>

      </div>
    </Drawer>
  )
}
export default SideDrawer