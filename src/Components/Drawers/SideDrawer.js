import React from 'react'
import Drawer from '@mui/material/Drawer'
import Columns from '../Layout/Columns'
import Column from '../Layout/Column'
import TabBar from '../Tabs/TabBar'
import Tab from '../Tabs/Tab'
import { FaArrowLeft } from 'react-icons/fa'

const SideDrawer = (props) => {
  
  return(

    <Drawer anchor={props.direction} open={props.checked} onClose={props.handleClose}>

      <div className="drawer-paper-full">
      <div className='drawerHead'>
        
        <Columns options="is-mobile is-vcentered">
          <Column size="is-narrow is-flex">
            <div className="icon is-large">
              <FaArrowLeft className="icon pl-1 mx-2 my-2" onClick={() => props.handleClose()}/> 
            </div>
          </Column>
          <Column size='is-flex'>
            <span className="title"><div className="donotwrap">{props.title}</div></span>
          </Column>
        </Columns>
        <TabBar>
            <Tab 
              
              active={props.tab}
              handleClick={(e)=>props.handleSetTab(e)}
            />
          </TabBar>
        </div>
        <div className='drawerContent'> 
          {props.children}
        </div>

      </div>
    </Drawer>
  )
}
export default SideDrawer