import React from 'react'

export const Table = (props) => {
  return(
    <table className={props && `table ${props.params}`}>
      {props.children}
    </table>
  )
}

export const TableHead = (props) => {
  return(
    <thead className={props && props.params} style={props.style}>
      {props.children}
    </thead>
  )
}

export const TableHeadItem = (props) => {
  return(
    <th className={props && props.params} style={props.style}>
      {props.children}
    </th>
  )
}

export const TableRow = (props) => {
  return(
    <tr className={props && props.params} onClick={props.handleRowClick}>
      {props.children}
    </tr>
  )
}

export const TableBody = (props) => {
  return(
    <tbody className={props && props.params}>
      {props.children}
    </tbody>
  )
}

export const TableData = (props) => {
  return(
    <td className={props && props.params} style={props.style} onClick={props.handleDataClick}>
      {props.children}
    </td>
  )
}

