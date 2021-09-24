import React from 'react'
import { useHistory } from 'react-router-dom'
import { FaFileContract } from 'react-icons/fa'
import MapListTable from '../Tables/MapListTable'
import TagCloud from '../Tags/TagCloud'
import Columns from './Columns'
import Column from './Column'
import LabeledTextField from '../Fields/LabeledTextField'
import LabeledTextRelatedField from '../Fields/LabeledTextRelatedField'

const PageField = ({
    loading,
    field, 
    fieldData,  
    relatedDataMap, 
    handleClick,
    handleRelatedDrawer,
    handleArrayMapDrawer,
    
    handleArrayMapDelete 
  }) => {
  const history = useHistory()
  
  return(
    <>
    {field && [field].map(item => {
      switch (item.inputFieldType) {

          case "text":
            return (
              <>
              {loading === true ? <input className="input is-rounded is-small" disabled /> : 
              <>
              <div className="is-hidden-mobile"> 
                <Columns options="is-mobile">
                  <Column size="is-4-mobile is-3-tablet is-3-desktop is-2-fullhd">
                    <div key={field.label}>{field.label}</div>
                  </Column>
                  <Column size="1 is-narrow">:</Column>
                  <Column size="7">
                    {[fieldData].map(data => data[item.dataField] != "" || undefined ? data[item.dataField] : "--"  )} 
                  </Column>
                </Columns>
              </div>
              <LabeledTextField 
                label={field.label}
                value={[fieldData].map(data => data[item.dataField] != "" || undefined ? data[item.dataField] : "--"  )}
              />
            </>
            }
            </>  
            )
          case "text-area":
            return (
              <>
              {loading === true ? <input className="input is-rounded is-small" disabled /> :
              <>
              <div className="is-hidden-mobile">
                <Columns options="is-mobile">
                  <Column size="is-4-mobile is-3-tablet is-3-desktop is-2-fullhd">
                    <div key={field.label}>{field.label}</div>
                  </Column>
                  <Column size="1 is-narrow">:</Column>
                  <Column size="7">
                    <div className="textareafield">
                      {[fieldData].map(data => data[item.dataField] != "" || undefined ? data[item.dataField] : "--")}
                    </div>
                  </Column>
                </Columns>
              </div>
              <LabeledTextField 
                label={field.label}
                value={[fieldData].map(data => data[item.dataField] != "" || undefined ? data[item.dataField] : "--"  )}
              />
              </>
              }
              </> 
            )
          case "currency":
            return (
              <>
              {loading === true ? <input className="input is-rounded is-small" disabled /> :
              <>
              <div className="is-hidden-mobile">
                <Columns options="is-mobile">
                  <Column size="is-4-mobile is-3-tablet is-3-desktop is-2-fullhd">
                    <div key={field.label}>{field.label}</div>
                  </Column>
                  <Column size="1 is-narrow">:</Column>
                  <Column size="7">
                    $ {[fieldData].map(data => data[item.dataField] && data[item.dataField] != "" ? data[item.dataField] : "--"  )}
                  </Column>
                </Columns>
              </div>
              <LabeledTextField 
                label={field.label}
                value={`$ ${[fieldData].map(data => data[item.dataField] != "" || undefined ? data[item.dataField] : "--"  )}`}
              />
              </>
              }
              </>
            )
          case "related-select":
            return (
              <>
              {loading === true ? <input className="input is-rounded is-small" disabled /> :
              <>
              <div className="is-hidden-mobile">
                <Columns options="is-mobile">
                  <Column size="is-4-mobile is-3-tablet is-3-desktop is-2-fullhd">
                    <div key={field.label}>{field.label}</div>
                  </Column>
                  <Column size="1 is-narrow">:</Column>
                  <Column size="7">
                    {
                      fieldData && item.relatedDataType === "Location" ?
                        item.inputSource != "" ? 
                          item.inputSource.filter(f => f.id === fieldData[item.relatedDataField]).map(location =>  
                      
                            <table>
                              <thead>
                                <tr>
                                <th>{location.Name}</th>
                                </tr>
                              </thead>
                              <tbody>
                                {location != undefined ? 
                                  <div className="is-size-7" key={location.id}>
                                    {`
                                      ${location.Address1 || ""} 
                                      ${location.Address2 || ""} 
                                      ${location.City || ""}, 
                                      ${location.State || ""} 
                                      ${location.Zip || ""}
                                    `}
                                  </div> 
                                : "Full Address not entered"}
                              </tbody>
                            </table>
                      ) : null : 
                        fieldData && item.relatedDataType === "Account" ? 
                          <a onClick={(e)=> handleClick({colRef: "Accounts", id: fieldData[item.relatedDataField]})}> 
                            {[fieldData].map(data => data[item.dataField] != "" || undefined ? data[item.dataField] : "--")} 
                          </a> 
                      : 
                        fieldData && item.relatedDataType === "Service" ? 
                          <a onClick={(e)=> handleClick({colRef: "Services", id: fieldData[item.relatedDataField]})}> 
                            {[fieldData].map(data => data[item.dataField] != "" || undefined ? data[item.dataField] : "--")} 
                          </a> 
                      : 
                      fieldData && item.relatedDataType === "Order" ? 
                      <a onClick={(e)=> handleClick({colRef: "Orders", id: fieldData[item.relatedDataField]})}> 
                        {[fieldData].map(data => data[item.dataField] != "" || undefined ? data[item.dataField] : "--")} 
                      </a> 
                      : null
                    }
                  </Column>
                </Columns>
                </div>
                <LabeledTextRelatedField 
                  label={field.label}
                  value={
                    fieldData && item.relatedDataType === "Location" ?
                      item.inputSource != "" ? 
                        item.inputSource.filter(f => f.id === fieldData[item.relatedDataField]).map(location =>  
                          location != undefined ? 
                            <p className="donotwrapfield is-hidden-tablet" key={location.id}>
                              {location.Name} -
                                {`
                                  ${location.Address1 || ""} 
                                  ${location.Address2 || ""} 
                                  ${location.City || ""}, 
                                  ${location.State || ""} 
                                  ${location.Zip || ""}
                                `}
                            </p> : "Full Address not entered"
                          ) : null : 
                      fieldData && item.relatedDataType === "Account" ? 
                        <a onClick={(e)=> handleClick({colRef: "Accounts", id: fieldData[item.relatedDataField]})}> 
                          {[fieldData].map(data => data[item.dataField] != "" || undefined ? data[item.dataField] : "--")} 
                        </a> 
                    : 
                      fieldData && item.relatedDataType === "Service" ? 
                        <a onClick={(e)=> handleClick({colRef: "Services", id: fieldData[item.relatedDataField]})}> 
                          {[fieldData].map(data => data[item.dataField] != "" || undefined ? data[item.dataField] : "--")} 
                        </a> 
                    : 
                      fieldData && item.relatedDataType === "Order" ? 
                      <a onClick={(e)=> handleClick({colRef: "Orders", id: fieldData[item.inputID]})}> 
                        {[fieldData].map(data => data[item.dataField] != "" || undefined ? data[item.dataField] : "--")} 
                      </a> 
                    : null
                  }
                />
              </>
              }
              </>
            )
            
          case "map-list":
            return (
              <>
              {loading === true ? <input className="input is-rounded is-small" disabled /> :
              <>
                <Columns options="is-mobile is-centered is-multiline">
                  <Column size="is-12">
                    <div key={field.label}>
                      {field.label} 
                      <a 
                        className="link has-text-weight-normal is-size-7 pl-2" 
                        onClick={() => handleRelatedDrawer(field)}
                      >
                        (add)
                      </a>
                    </div>
                  </Column>
                  <Column size="is-12">
                    <MapListTable 
                      headerFields={item.relatedInputFields}
                      data={relatedDataMap}
                      colRef={item.relatedCollection}
                      handleClick={(e)=>handleClick(e)}
                    />  
                  </Column>
                </Columns>
              </>
              }
              </>
            )

            case "array-map-list":
            return (
              <>
              {loading === true ? <input className="input is-rounded is-small" disabled /> :
              <>
                <Columns options="is-mobile is-multiline">
                  <Column size="is-12">
                    <div key={field.label}>
                      {field.label} 
                      <a 
                        className="link has-text-weight-normal is-size-7 pl-2" 
                        onClick={() => handleArrayMapDrawer(field)}
                      >
                        (add)
                      </a>
                    </div>
                  </Column>
                  <Column size="is-12">
                    <MapListTable 
                      headerFields={item.relatedInputFields}
                      data={fieldData[item.dataField]}
                      colRef={item.relatedCollection}
                      handleClick={(e) => handleArrayMapDrawer(e)}
                      handleDelete={(e, arr)=>handleArrayMapDelete(e, arr)}
                    /> 
                  </Column>
                </Columns>
              </>
              }
              </>
            )
          
          case "status":
            return (
              <>
              {loading === true ? <input className="input is-rounded is-small" disabled /> :
              <>
              <div className='is-hidden-mobile'>
                <Columns options="is-mobile">
                  <Column size="is-4-mobile is-3-tablet is-3-desktop is-2-fullhd">
                    <div key={field.label}>{field.label}</div>
                  </Column>
                  <Column size="1 is-narrow">:</Column>
                  <Column size="7">
                    
                  {[fieldData].map(data => data[item.dataField] != "" || undefined ? (
                  <div key={data[item.label]} className={
                    data[item.dataField] === 'Active' ? "tag is-success" :
                    data[item.dataField] === 'Disconnected' ? "tag is-danger" : 
                    data[item.dataField] === 'Pending Activation' || 'Pending Disconnect' ? "tag is-warning" : ""}>{data[item.dataField]}
                  </div>
                  ) : "--"  )}
                  
                  </Column>
                </Columns>
                </div>
                <LabeledTextField 
                  label={field.label}
                  value={[fieldData].map(data => data[item.dataField] != "" || undefined ? data[item.dataField] : "--"  )}
                />
              </>
              }
              </>
            )
          
          case "tags":
            return (
              <>
              {loading === true ? <input className="input is-rounded is-small" disabled /> :
              <> 
              <div className='is-hidden-mobile'>
                <Columns options="is-mobile">
                  <Column size="is-4-mobile is-3-tablet is-3-desktop is-2-fullhd">
                    <div key={field.label}>{field.label}</div>
                  </Column>
                  <Column size="1 is-narrow">:</Column>
                  <Column size="7">
                    
                  {
                    [fieldData].map(data => data[item.dataField] != "" || undefined ? 
                      <TagCloud data={data[item.dataField]} /> 
                    : "--"  )
                  }
                  
                  </Column>
                </Columns> 
                </div>
                <LabeledTextField 
                  label={field.label}
                  value={[fieldData].map(data => data[item.dataField] != "" || undefined ? data[item.dataField] : "--"  )}
                />
              </>
              }
              </>
            )

            case "file-field":
              return (
                <>
                {loading === true ? <input className="input is-rounded is-small" disabled /> :
                <>
                  <Columns options="is-mobile">
                  <Column size="is-4-mobile is-3-tablet is-3-desktop is-2-fullhd">
                    <div key={field.label}>{field.label}</div>
                  </Column>
                  <Column size="1 is-narrow">:</Column>
                  <Column size="7">
                  {
                    [fieldData].map(data =>  
                      <>
                        <a href={data[item.dataField]} target="_blank">
                          <FaFileContract className="icon is-medium" />
                        </a>
                      </>
                    )
                  }
                  </Column>
                </Columns> 
                </>
                }
                </>
              )

              

          default:
              return (
                <>
                {loading === true ? <input className="input is-rounded is-small" disabled /> :
                <>
                <div className='is-hidden-mobile'>
                <Columns options="is-mobile">
                  <Column size="is-4-mobile is-3-tablet is-3-desktop is-2-fullhd">
                    <div key={field.label}>{field.label}</div>
                  </Column>
                  <Column size="1 is-narrow">:</Column>
                  <Column size="7">
                  {
                    [fieldData].map(data => 
                      data[item.dataField] != "" || undefined ? data[item.dataField] : "--"  
                    )
                  } 
                  </Column>
                </Columns>
                </div>
                <LabeledTextField 
                  label={field.label}
                  value={[fieldData].map(data => data[item.dataField] != "" || undefined ? data[item.dataField] : "--"  )}
                />
                </>
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