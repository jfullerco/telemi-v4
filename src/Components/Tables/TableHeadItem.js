import React from 'react'

const TableHeadItem = (props) => {
  return(
    <th className={props && `table ${props.params}`}>
      {props.children}
    </th>
  )
}
export default TableHeadItem