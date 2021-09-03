import React, { useState, useEffect, useContext, useCallback } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import { stateContext } from '../Contexts/stateContext'
import { db, store } from '../Contexts/firebase'
import {
  fieldContext } from '../Contexts/fieldContext'
import {stateList} from '../Contexts/states.js'

import Columns from '../Components/Layout/Columns'
import Column from '../Components/Layout/Column'
import DrawerPage from '../Components/DrawerPage'
import DrawerComponent from '../Components/Layout/DrawerComponent'

import Loading from '../Components/Loading'

import PageField from '../Components/Layout/PageField'
import FieldLabel from '../Components/Layout/FieldLabel'
import Field from '../Components/Layout/Field'
import DeleteButton from '../Components/Buttons/DeleteButton'
import DetailViewDropDown from '../Components/Tabs/DetailViewDropDown'

import PageInputFields from '../Components/Forms/PageInputFields'
import RelatedPageInputFields from '../Components/Forms/RelatedPageInputFields'
import MonthlyCostGraph from '../Components/Graphs/MonthlyCostGraph'
import Footer from '../Footer'
import {useRefreshDataHook} from '../Hooks/useRefreshDataHook'

const DetailDrawer = (props) => {

  const history = useHistory()
  
  const { isModule, currentCompanyID } = props && props || null

  const userContext = useContext(stateContext)

  const { serviceTypes, 
          accessTypes, 
          vendorList, 
          isStyle,
          setBills,
          setOrders,
          setCurrentDate,
          setLocations,
          setAccounts,
          setServices,
          setUsers,
          setNotes,
          refreshServices } = userContext

  const { locations,
          services, 
          orders, 
          accounts,
          tickets,
          contracts,
          users,
          bills,
          notes,
          currentCompany,
          currentUser } = userContext.userSession

    const {
      serviceDetailFields,
      orderDetailFields,
      accountDetailFields,
      ticketDetailFields,
      billsDetailFields,
      locationDetailFields,
      contractDetailFields,
      userDetailFields
    } = useContext(fieldContext)
  
  
  const {isNew}  = props || false 
  const {isDrawerActive} = props || false
  
  const [data, setData] = useState("")
  const [active, setActive] = useState("")
  

  const [activeSubtitle, setActiveSubtitle] = useState("")
  const [docIsNew, setDocIsNew] = useState()
  const [loading, setLoading] = useState(true)
  const [updated, setUpdated] = useState(false)

  const [pageFields, setPageFields] = useState([])
  
  const [pageSuccess, setPageSuccess] = useState(false)
  const [pageError, setPageError] = useState(false)
  
  const [isRelatedActive, setIsRelatedActive] = useState(false)
  const [addRelatedValue, setAddRelatedValue] = useState()
  const [relatedInputData, setRelatedInputData] = useState("")
  const [relatedSubmitData, setRelatedSubmitData] = useState("")

  const [isRelatedDrawerOpen, setIsRelatedDrawerOpen] = useState(false)
  const [isArrayMapDrawerOpen, setIsArrayMapDrawerOpen] = useState(false)
  const [isArrayMapInputData, setIsArrayMapInputData] = useState("")
  const [isArrayMapData, setIsArrayMapData] = useState("")
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  
  
  
  const {refreshModule} = useRefreshDataHook(isModule)
  
  
  useEffect(() => {
    
    setLoading(true)
    handlePageFields(isModule)
    checkForNew(isDrawerActive, isNew)
    fetchPage()
    fetchBills()
    fetchNotes()
    
  }, [])

  useEffect(() => {
    setPageFields()
    checkForNew(isDrawerActive, isNew)
    setLoading(true)
    handlePageFields(isModule)
    fetchPage()
    fetchBills()
    fetchNotes()
    
  }, [isModule])

  useEffect(() => {
    
    handlePageFields(isModule)
    fetchBills()
    fetchNotes()
    
    handleSetHeader()
    setUpdated(false)
    handleInitialFields()
    handleFinishedLoading()
    
  },[loading])

  useEffect(() => {
    setLoading(!loading)
    refreshModule(isModule)
    setUpdated(false)
    handleFinishedLoading()
  },[updated])
  

/** Map-List - Side Effect to inherit related data  */

  useEffect(() => {
    relatedInputData.pageFields && relatedInputData.pageFields ? 
    handleInheritedData(relatedInputData) : ""
  },[relatedInputData])

/** Set Page Fields based on initialFields */
  const handlePageFields = (isModule) => {
    
    switch (isModule) {
      case "Services": 
        return (
          setPageFields(serviceDetailFields) 
        )
      case "Accounts":
        return (
          setPageFields(accountDetailFields)
        )
      case "Orders":
        return (
          setPageFields(orderDetailFields)
        )
      case "Tickets":
        return (
          setPageFields(ticketDetailFields)
        )
      case "Locations":
        return (
          setPageFields(locationDetailFields)
        )
      case "Contracts":
        return (
          setPageFields(contractDetailFields)
        )
      case "Bills":
        return (
          setPageFields(billsDetailFields)
        )
      case "Notes": 
        return (
          setPageFields(notesDetailFields)
        )
      case "Users":
        return (
          setPageFields(userDetailFields)
        )
    }
  }
console.log("orders:",orders)

  const checkForNew = (isDrawerActive, isNew) => {
    isDrawerActive === "true" ? setIsDrawerOpen(true) : ""
    isNew === "true" ? 
      setDocIsNew(true) 
      : ""
  }

  const handleInitialFields = () => {
    
    setData({
      ...data, 
      ['CreatedDate']: setCurrentDate(),
      ['CreatedBy']: currentUser,
      ['CompanyID']: currentCompanyID, 
      ['CompanyName']: currentCompany
    }) 
  }

  const handleSetHeader = () => {
    const subtitle = pageFields.filter(f => f.isHeader === true).map(field => setActiveSubtitle(field.dataField))
  }

/** Map inputSource arrays for initialFields */
  const handleInitialFieldMapping = (field, value, arr) => {

    const indexRef = arr.findIndex(i => i.dataField === field)
    arr[indexRef] = {...arr[indexRef], inputSource: value}
  
  }

/** Fetch Document from Firebase */  
  const fetchPage = async() => {
   
    const pageFieldsRef = await db.collection(isModule).doc(props.id).get() 
    const data = pageFieldsRef.data()
    const id = pageFieldsRef.id
    setActive({id: id, ...data})
    setData(data)
  
  }

  const fetchBills = async() => {
    const billsRef = await db.collection("Bills").where("ServiceID", "==", props.id).get()
    const bills = await billsRef.docs.map(doc => ({
      id: doc.id,
      ...doc.data()}))
    await setBills(bills)

  } 

  const fetchOrders = async() => {
    const ordersRef = await db.collection("Orders").where("ServiceID", "==", props.id).get()
    const orders = await ordersRef.docs.map(doc => ({
      id: doc.id,
      ...doc.data()}))
    await setOrders(orders)

  } 
  
  const fetchNotes = async() => {
    const notesRef = await db.collection("Notes").where("ServiceID", "==", props.id).get()
    const notes = await notesRef.docs.map(doc => ({
      id: doc.id,
      ...doc.data()}))
    await setNotes(notes)

  } 

  const handleFileChange = async(e) => {
    const file = e.target.files[0]
    const imageRef = store.ref(currentCompanyID).child(`${data.Name && data.Name}'-'${currentCompany}`)
    await imageRef.put(file)
    const fileURL = await imageRef.getDownloadURL() 
     setData({
       ...data,
       ['FileURL']: fileURL
      })
  }

  const handleFinishedLoading = () => {
    setTimeout(() => {setLoading(false)}, 1000)
  }

  const handleSubmit = () => {
      
      docIsNew === true ? 
      handleSubmitNew(data)
      : 
      handleSubmitUpdated(data)
        
  }
console.log(data)
  const handleSubmitNew = async(data) => {
    
    try {
      
      await db.collection(isModule).doc().set(data) 
      
      setPageSuccess("Changes Saved!")
      setTimeout(() => {setPageSuccess(false)}, 1000)
    } catch {
      setPageError("Error saving")
      setTimeout(() => {setPageError(false)}, 1000)
    } 
    setDocIsNew(false) 
    setUpdated(true)
    setIsDrawerOpen(!isDrawerOpen)
  }

  const handleSubmitUpdated = async() => { 
    
      try {
        
        await db.collection(isModule).doc(props.id).update({
          ...data, 
          ['LastUpdated']: setCurrentDate(), 
          ['LastUpdateBy']: currentUser
        })
        
        setPageSuccess("CHANGES SAVED!")
        setTimeout(() => {setPageSuccess(false)}, 1000)
      } catch {
        setPageError("ERROR SAVING CHANGES")
      } 
      setDocIsNew(false) 
      setUpdated(true)
      setIsDrawerOpen(false)
      setIsArrayMapDrawerOpen(false)
  }

  const handleRelatedSubmit = async() => {
    
    try {
    await db.collection(relatedInputData.collection).doc().set(relatedSubmitData)
      setPageSuccess(`New ${relatedInputData.label} Saved`)
      setTimeout(() => {setPageSuccess(false)}, 1000)
    } catch {
      setPageError(`Error Saving New ${relatedInputData.label}`)
      setTimeout(() => {setPageError(false)}, 1000)
    }  
      setIsRelatedDrawerOpen(!isRelatedDrawerOpen)
      setUpdated(true)
      setLoading(!loading)  
  }



const handleToggle = () => {
  setIsDrawerOpen(!isDrawerOpen)
}

const handleChange = (e) => {
  const {name, value} = e.target
  console.log(name, value)
  setActive({...active, [name]: value})
  setData({...data, [name]: value})
}

const handleRelatedSelectChange = (e, relatedDataField) => {
  e.preventDefault()
  const selectedValue = e.target.options[e.target.selectedIndex].text
  const id = e.target.options[e.target.selectedIndex].id
  const {name, relatedName} = relatedDataField
  const {value} = e.target
  
  console.log({[relatedName]: id, [name]: value})
  setActive({...active, [relatedName]: id, [name]: value})
  setData({...data, [relatedName]: id, [name]: value})
  setUpdated(!updated)
}

const handleGoBack = () => {
  history.goBack()
}

const handleClick = (e) => {
  setLoading(true)
  history.push({
    pathname: `/${e.colRef}/${currentCompanyID}/${e.id}`,
    state: {
    services: services,
    locations: locations,
    accounts: accounts,
    }
  }) 
}
const handleArrayMapDrawer = (field) => {
  
  setIsArrayMapInputData({  
    pageFields: field.relatedInputFields, 
    dataField: field.dataField,
    label: field.label
  })

setIsArrayMapDrawerOpen(true)
  
}

const handleArrayMapChange = (e) => {
  e.preventDefault()
  const {name, value} = e.target
  const mapFieldName = isArrayMapInputData.dataField
  setIsArrayMapData({...isArrayMapData, [name]: value})
}

const handleArrayMapSubmit = async() => {
  try {
        
    await db.collection(isModule).doc(props.id).update({
      ...data, [isArrayMapInputData.dataField]: [
        ...data[isArrayMapInputData.dataField], {...isArrayMapData}],
      ['LastUpdated']: setCurrentDate(), 
      ['LastUpdateBy']: currentUser
    })
    setActive({
      ...data, [isArrayMapInputData.dataField]: [
        ...data[isArrayMapInputData.dataField], {...isArrayMapData}],
      ['LastUpdated']: setCurrentDate(), 
      ['LastUpdateBy']: currentUser
    })
    setData({
      ...data, [isArrayMapInputData.dataField]: [
        ...data[isArrayMapInputData.dataField], {...isArrayMapData}],
      ['LastUpdated']: setCurrentDate(), 
      ['LastUpdateBy']: currentUser
    })
    setPageSuccess("CHANGES SAVED!")
    setTimeout(() => {setPageSuccess(false)}, 1000)
  } catch {
    console.log("ERROR SAVING CHANGES")
  } 
  
  
  setIsArrayMapData()
  setIsArrayMapDrawerOpen(false)

}

const handleRelatedDrawer = (field) => {

  setRelatedInputData({ 
    ...relatedInputData,
    collection: field.relatedCollection, 
    pageFields: field.relatedInputFields, 
    label: field.label
  })

  setRelatedSubmitData({
    [ 'CompanyID' ]: currentCompanyID,
    [ 'CompanyName' ]: currentCompany,
    [ 'CreatedDate' ]: setCurrentDate(),
    [ 'CreatedBy' ]: currentUser,
    [field.relatedDataField]: props.id,
})

setIsRelatedDrawerOpen(true)
  
}

const handleRelatedInputChange = (e) => {
  
  const { name, value } = e.target
  setRelatedSubmitData({
    ...relatedSubmitData,
      [name]: value,
    })
}

const handleInheritedData = (e) => {

  const {pageFields} = e 
  const relatedFields = pageFields.filter(f => 
    f.value != undefined).map(rel => ({
      [rel.dataField]:
      active[rel.value]
    })
  )
  
  const merged = Object.assign({}, ...relatedFields, relatedSubmitData)

  setRelatedSubmitData({...relatedSubmitData, ...merged})

  }

return (
    <Loading active={loading}>

    <DrawerPage
      title={currentCompany}
    >
      {userContext && userContext.userSession != undefined ? 
        <>
          {/** 
           *<DetailViewDropDown 
              views={['BASIC INFO', 'DETAILS', 'SUPPORT', 'BILLING', 'NOTES']}
              activeView='BASIC INFO'
              handleToggle={()=>setViewDropDown(!viewDropDown)}
              isActive={viewDropDown}
              handleView={(e)=>setTab(e)}
              value={active && [active].map(item => item[activeSubtitle] && item[activeSubtitle])}
              title={isModule}
              handleEditDrawer={()=>handleToggle()} 
            />
            */}
          <div className="box is-rounded mx-2" style={{minHeight: '50vh'}}>

            <article className="hero title is-small"> 
              <span className="subtitle is-5">{isModule}</span>
              {active === "" ? 
              <input className="input is-rounded is-disabled is-loading" /> : 
                <span className="title is-3">
                  {[active].map(item => item[activeSubtitle] && item[activeSubtitle])}
                </span>
              }
              
            </article>

            <div className="block">
              {/** Refactor as ViewPageFields Component */}
              {active && pageFields.map(field => 
                <>
                  {[active].map(docItem => 
                    <div className={field.visible != false ? "" : "is-hidden" }> 
                    
                    
                    <Columns options="is-mobile">
                      
                      {field.inputFieldType === "map-list" ? 
                            "" : field.inputFieldType === "tabTitle" ?
                            "" : field.inputFieldType === "array-map-list" ? 
                            "" :
                        <Column size="is-two-fifths pl-5">

                          <FieldLabel>
                            
                                <Columns options="is-mobile">
                                  <Column size="is-11">
                                    <div key={field.label}>{field.label}</div>
                                  </Column>
                                  <Column>:</Column>
                                </Columns>
                            
                          </FieldLabel>

                      </Column>
                    }
                      <Column size="pl-5">
                        
                          {
                            field.inputFieldType === 'tabTitle' ? (
                              <div key={field.label} className="title is-5">
                                <hr />
                                {field.label}
                              </div> 
                            ) : 
                            field.inputFieldType === "map-list" ? 
                              <>
                                <div key={field.label}>{field.label}
                                  <a className="link has-text-weight-normal is-size-7 pl-2" 
                                    onClick={() => handleRelatedDrawer(field)}>(add)</a> </div>
                              </> 
                            : field.inputFieldType === "array-map-list" ? 
                            <>
                              <div key={field.label}>{field.label}
                                <a className="link has-text-weight-normal is-size-7 pl-2" 
                                  onClick={() => handleArrayMapDrawer(field)}>(add)</a> </div>
                            </> 
                          : null
                          }

                          
                          
                          <PageField 
                            field={field}
                            fieldData={docItem}
                            relatedDataMap={
                                field.inputSource && field.inputSource.filter(item => 
                                  item[field.relatedDataField] === docItem.id).map(i => ({...i}))
                              }
                            toggleViewDrawer={()=>handleToggle()}
                            toggleFieldDropDown={()=>setIsRelatedActive(!isRelatedActive)}
                            isViewRelatedActive={isRelatedActive}
                            handleClick={(e)=>handleClick(e)}
                          />
                       
                      </Column>
                    </Columns>
                      
                    </div>
                  )}
                </>
              )}
            </div>

              <DrawerComponent 
                title="Edit"
                checked={isDrawerOpen}
                handleClose={()=>setIsDrawerOpen(!isDrawerOpen)} 
                direction="right"
                handleSubmit={()=> handleSubmit()}
              >

                <PageInputFields 
                  checked={isDrawerOpen}
                  handleClose={()=>setIsDrawerOpen(!isDrawerOpen)}
                  handleChange={(e)=> handleChange(e)}
                  handleRelatedSelectChange={(e, related)=> handleRelatedSelectChange(e, related)}
                  handleFileChange={(e)=> handleFileChange(e)}
                  pageFields={pageFields}
                  active={active}
                  addRelatedValue={addRelatedValue}
                  handleAddRelatedValue={(e)=>handleRelatedDrawer(e)}
                  resetAddRelatedValue={()=>setAddRelatedValue("")}
                  handleUpdated={()=>setUpdated(!updated)}
                  currentCompany={currentCompany}
                  currentCompanyID={currentCompanyID}
                />

                

              </DrawerComponent>

              <DrawerComponent 
                title="Add New"
                checked={isArrayMapDrawerOpen}
                handleClose={()=>setIsArrayMapDrawerOpen(!isArrayMapDrawerOpen)} 
                direction="right"
                handleSubmit={()=> handleArrayMapSubmit()}
              >

                <PageInputFields 
                  
                  handleClose={()=>setIsArrayMapDrawerOpen(!isArrayMapDrawerOpen)}
                  handleChange={(e)=> handleArrayMapChange(e)}
                  handleRelatedSelectChange={(e, related)=> handleRelatedSelectChange(e, related)}
                  handleFileChange={(e)=> handleFileChange(e)}
                  pageFields={isArrayMapInputData.pageFields}
                  active={active}
                  addRelatedValue={addRelatedValue}
                  handleAddRelatedValue={(e)=>handleRelatedDrawer(e)}
                  resetAddRelatedValue={()=>setAddRelatedValue("")}
                  handleUpdated={()=>setUpdated(!updated)}
                  currentCompany={currentCompany}
                  currentCompanyID={currentCompanyID}
                />

                

              </DrawerComponent>
              

              <DrawerComponent
                title="Add New"
                checked={isRelatedDrawerOpen}
                direction="right"
                handleClose={()=>setIsRelatedDrawerOpen(!isRelatedDrawerOpen)}
                handleSubmit={()=>handleRelatedSubmit()}
              >
{/** 
                <QuickAdd 
                  colRef={relatedInputData.collection}
                  dataField={relatedInputData.field}
                  label={relatedInputData.label}
                  handleRelatedInputChange={(e)=>handleRelatedInputChange(e)}
                />
*/}
                <RelatedPageInputFields 
                  relatedFields={relatedInputData.pageFields}
                  handleChange={(e)=>handleRelatedInputChange(e)}
                  handleRelatedField={(e)=> handleRelatedField(e)}
                  handleUpdated={()=>setUpdated(!updated)}
                  activeData={active}
                  relatedData={relatedInputData}
                />

                
              </DrawerComponent>

          </div>
          <Columns>
              {/** Refactor this as LastUpdatedComponent Component with Hook */}
              <Column size="is-narrow">
                <div className="is-size-7 ml-5" style={{fontVariant: [ 'small-caps' ]}}>
                  last updated: {active.LastUpdated && active.LastUpdated}
                </div>
              </Column>
              <Column size="is-narrow">
                <div className="is-size-7 ml-5" style={{fontVariant: [ 'small-caps' ]}}>
                  updated by: {active.LastUpdateBy && active.LastUpdateBy}</div>
                </Column>
             
            </Columns>
        </> : 
          <div className="tile warning"> No record to display </div>
      }    

      {
      /**<MonthlyCostGraph 
        id={params.id}
      />*/
      }

    </DrawerPage>
    <Footer 
      handleEditButton={(e)=> setIsDrawerOpen(e)}
      isDrawerOpen={isDrawerOpen}
      isBookmarked={active.isBookmarked}
      tags={active.Tags}
      handleUpdated={fetchPage}
    />
    </Loading>
    
  )
}
export default DetailDrawer