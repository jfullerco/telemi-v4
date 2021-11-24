import React, { useMemo } from 'react'
import Columns from './Layout/Columns'
import Column from './Layout/Column'


const DrawerPage = ({title, children}) => {

  return(
    <>
      <div className='drawerContent'>
        {children} 
      </div>
    </>
  )
}
export default DrawerPage