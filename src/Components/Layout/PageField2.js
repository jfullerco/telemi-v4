import React, { useState, useEffect, useContext, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaFileContract } from 'react-icons/fa'

import MappedList from '../Fields/MappedList'
import MappedText from '../Fields/MappedText'
import TextField from '../Fields/TextField.js'
import DateField from '../Fields/DateField.js'

import RelatedSelectField from '../Fields/RelatedSelectField'
import LabeledTextField from '../Fields/LabeledTextField'
import LabeledTextRelatedField from '../Fields/LabeledTextRelatedField'
import { stateContext } from '../../Contexts/stateContext'
import {
  Card, 
  CardHeader, 
  CardHeaderTitle, 
  CardContent
} from '../Layout/Card'

const PageField2 = ({
    loading,
    field, 
    fieldData,  
    relatedDataMap, 
    handleClick,
    handleRelatedDrawer,
    handleArrayMapDrawer,
    handleDocRelations,
    handleArrayMapDelete 
  }) => {
    const userContext = useContext(stateContext)
    const coreModules = userContext.userSession
    const fetchContext = (module) => {
        return coreModules[module]
    }
    
  return(
    <>
        {field && [field].map(item => {
            switch (item.type) {
                case "text":
                    return (
                        <>
                            {loading === true ? <input className="input is-rounded is-small" disabled /> :
                                <>
                                        <TextField 
                                            label={field?.label}
                                            headers={item?.ref?.fields}
                                            data={fieldData?.[item.key]}
                                            colRef={fetchContext(item.collection)}
                                            handleClick={(e) => handleArrayMapDrawer(e)}
                                            handleDelete={(e, arr)=>handleArrayMapDelete(e, arr)}
                                        />     
                                </>
                            }
                        </>
                    )

            case "textarea":
                return (
                    <>
                        {loading === true ? <input className="input is-rounded is-small" disabled /> :
                            <> 
                                <dt>{field.label}</dt>
                                <dd>{[fieldData].map(data => data[item.key] != "" || undefined ? data[item.key] : "--"  )}</dd>
                            </>
                        }
                    </> 
                )

            case "currency":
                return (
                    <>
                        {loading === true ? <input className="input is-rounded is-small" disabled /> :
                            <>
                                <dt>{field.label}</dt>
                                <dd>$ {[fieldData].map(data => data[item.key] != "" || undefined ? data[item.key] : "--"  )}</dd>
                            </>
                        }
                    </>
                )

                case "datepicker":
                    return (
                        <>
                            {loading === true ? <input className="input is-rounded is-small" disabled /> :
                                <>
                                        <DateField 
                                            label={field?.label}
                                            headers={item?.ref?.fields}
                                            data={fieldData?.[item.key]}
                                            colRef={fetchContext(item.collection)}
                                            handleClick={(e) => handleArrayMapDrawer(e)}
                                            handleDelete={(e, arr)=>handleArrayMapDelete(e, arr)}
                                        />     
                                </>
                            }
                        </>
                    )

                    case "datalist":
                    return (
                        <>
                            {loading === true ? <input className="input is-rounded is-small" disabled /> :
                                <>
                                        <MappedList 
                                            label={field?.label}
                                            headers={item?.ref?.fields}
                                            data={fieldData?.[item.key]}
                                            colRef={fetchContext(item.collection)}
                                            handleClick={(e) => handleArrayMapDrawer(e)}
                                            handleDelete={(e, arr)=>handleArrayMapDelete(e, arr)}
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
                                    <MappedText 
                                        label={field?.label}
                                        headers={item?.ref?.fields}
                                        data={fetchContext(item.collection)?.filter(f => 
                                                    f.id === fieldData[item.key])}
                                        colRef={fetchContext(item.collection)}
                                        handleClick={(e) => handleArrayMapDrawer(e)}
                                        handleDelete={(e, arr)=>handleArrayMapDelete(e, arr)}
                                    />   
                                </>
                            }
                        </>
                    )
                }
            }   
        )
    }
    </>
  )
}

export default PageField2