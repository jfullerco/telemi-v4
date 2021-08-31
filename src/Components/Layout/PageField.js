import React from 'react'
import { useHistory } from 'react-router-dom'

import MapListTable from '../Tables/MapListTable'

import { FaFileContract } from 'react-icons/fa'

const PageField = ({
    field, 
    fieldData, 
    relatedDataMap, 
    handleClick 
}) => {
  const history = useHistory()
  /**console.log("field:",field, "fieldData:", fieldData) */
  return(
    <>
    {field && [field].map(item => {
      switch (item.inputFieldType) {

          case "text":
            return (
              
              <>  {[fieldData].map(data => data[item.dataField] != "" || undefined ? data[item.dataField] : "--"  )} </>
              
            )
          case "text-area":
            return (
              <div className="textareafield">{[fieldData].map(data => data[item.dataField] != "" || undefined ? data[item.dataField] : "--")}</div>
            )
          case "currency":
            return (
              <>
                $ {[fieldData].map(data => data[item.dataField] && data[item.dataField] != "" ? data[item.dataField] : "--"  )}
              </>
            )
          case "related-select":
            return (
              <>
                {fieldData && item.relatedDataType === "Location" ?
                item.inputSource != "" ? item.inputSource.filter(f => f.id === fieldData[item.relatedDataField]).map(location =>  
                  
                

                
                  <table>
                    <thead>
                      <th>
                      {location.Name}
                      </th>
                    </thead>
                    <tbody>
                      {location != undefined ? <div className="is-size-7" key={location.id}>{`${location.Address1 || ""} ${location.Address2 || ""} ${location.City || ""}, ${location.State || ""} ${location.Zip || ""}`}</div> : "Full Address not entered"}
                    </tbody>
                  </table>
                
                  
                 
                )
                : null : 
                fieldData && item.relatedDataType === "Account" ? <a onClick={
                  (e)=> handleClick({colRef: "Accounts", id: fieldData[item.relatedDataField]})}> {[fieldData].map(data => data[item.dataField] != "" || undefined ? data[item.dataField] : "--")} </a> 
                : 
                fieldData && item.relatedDataType === "Service" ? <a onClick={
                  (e)=> handleClick({colRef: "Services", id: fieldData[item.relatedDataField]})}> {[fieldData].map(data => data[item.dataField] != "" || undefined ? data[item.dataField] : "--")} </a> 
                : null
                }
                
              </>
            )
            
          case "map-list":
            return (
              <>
                <MapListTable 
                  headerFields={item.relatedInputFields}
                  data={relatedDataMap}
                  colRef={item.relatedCollection}
                  handleClick={(e)=>handleClick(e)}
                /> 
              </>
            )
          
          case "status":
            return (
              <>
                {[fieldData].map(data => data[item.dataField] != "" || undefined ? (
                  <div className={
                    data[item.dataField] === 'Active' ? "tag is-success" :
                    data[item.dataField] === 'Disconnected' ? "tag is-danger" : 
                    data[item.dataField] === 'Pending Activation' || 'Pending Disconnect' ? "tag is-warning" : ""}>{data[item.dataField]}</div>
                ) : "--"  )}
              </>
            )

            case "file-field":
              return (
                <>
                  {
                    [fieldData].map(data =>  
                      <>
                        <a href={data[item.dataField]} target="_blank">
                          <FaFileContract className="icon is-medium" />
                        </a>
                      </>
                    )
                  }
                </>
              )

          default:
              return (
                <>
                  {
                    [fieldData].map(data => 
                      data[item.dataField] != "" || undefined ? data[item.dataField] : "--"  
                    )
                  } 
                </>
              )
            }
        })
      } 
    </>
  )
}

export default PageField