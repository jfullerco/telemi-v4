import React from 'react'

const Tab = ({data, handleClick, active, children}) => {

  // const arrGroup = (arr, el) => arr && arr.reduce((acc, item) => {
  //   let key = item[el]
  //   !acc[key] ? acc[key] = [] :
  //   acc[key].push(item)
  //   return acc
  // },{})
  // const dataArr = data != undefined ? data.filter(f => f.tab != undefined) : ""
  // const groupedArr = data != undefined ? arrGroup(dataArr, 'tab') : ""
  // const tabs = Object.keys(groupedArr) || ['Essentials', 'Details', 'Support', 'Related']

  const tabs = ['Essentials', 'Details', 'Support', 'Related']
  
  return(
    <>
      {
        tabs.filter(f => f != undefined).map(tab => 
          <li className={active == tab ? "is-active" : ""}>
            <a className="tab" onClick={()=>handleClick(tab)}>
              {tab}
            </a>
          </li>
        )
      }          
    </>
  )
}
export default Tab