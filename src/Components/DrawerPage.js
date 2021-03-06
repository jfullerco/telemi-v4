import React, { useMemo } from 'react'
import Columns from './Layout/Columns'
import Column from './Layout/Column'


const DrawerPage = ({title, children}) => {

  return(
    <> 
        <Columns options="is-mobile is-vcentered">
          <Column size="is-narrow">
          </Column>
          <Column>
            <span className="title"><div className="donotwrap">{title}</div></span>
          </Column>
        </Columns>
        
          
      <div>
        {children} 
      </div>
    </>
  )
}
export default DrawerPage