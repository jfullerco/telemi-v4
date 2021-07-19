import React, {useState, useEffect, useContext, useRef} from 'react'
import {useParams, useHistory} from 'react-router-dom'

import {stateContext} from '../Contexts/stateContext'
import { db } from '../Contexts/firebase'
import {
  serviceDetailFields,
  orderDetailFields,
  accountDetailFields,
  ticketDetailFields,
  billsDetailFields } from '../Contexts/initialFields'

import Columns from '../Components/Layout/Columns'
import Column from '../Components/Layout/Column'
import Page from '../Components/Page'
import PageInputFields from '../Components/Forms/PageInputFields'
import DrawerComponent from '../Components/Layout/DrawerComponent'
import DeleteButton from '../Components/Buttons/DeleteButton'

import TabBar from '../Components/Tabs/TabBar'

import PageField from '../Components/Layout/PageField'
import AddBill from './Accounts/Bill/AddBill'
import Loading from '../Components/Loading'
import CheckIfNeedsCache from '../Components/Conditions/CheckIfNeedsCache'
import QuickAdd from './QuickAdd'
import FieldLabel from '../Components/Layout/FieldLabel'


const RelatedDetailModule = (state) => {

  const params = useParams()
  const history = useHistory()
  
  const { isModule } = params.isModule && params || null

  const userContext = useContext(stateContext)

  const { serviceTypes, 
          accessTypes, 
          serviceStatusType,
          vendorList, 
          isStyle,
          setBills,
          setCurrentDate,
          setLocations,
          setAccounts } = userContext

  const { locations,
          services, 
          orders, 
          accounts,
          tickets,
          bills,
          currentCompany,
          currentUser } = userContext.userSession
  
  const { currentCompanyID } = params
  const {isNew}  = state.location.state || false 
  const {isDrawerActive} = state.location.state || false
  const { cachedLocations } = state.location.state || []
  const { cachedAccounts } = state.location.state || []
  
  const [data, setData] = useState("")
  const [active, setActive] = useState("")
  const [activeSubtitle, setActiveSubtitle] = useState("")
  const [docIsNew, setDocIsNew] = useState()
  const [loading, setLoading] = useState(true)
  const [updated, setUpdated] = useState(false)
  const [pageFields, setPageFields] = useState([])
  const [isQuickAddDataField, setIsQuickAddDataField] = useState("")
  const [isQuickAddDrawerOpen, setIsQuickAddDrawerOpen] = useState(false)
  
  const [pageSuccess, setPageSuccess] = useState(false)
  const [pageError, setPageError] = useState(false)
    
  const [relatedInputData, setRelatedInputData] = useState("")
  const [isRelatedDrawerOpen, setIsRelatedDrawerOpen] = useState(false)
  
  const [tab, setTab] = useState("BASIC_INFO")
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  
  const [addRelatedValue, setAddRelatedValue] = useState()
  const [isRelatedActive, setIsRelatedActive] = useState(false)
  

  useEffect(() => {
    handlePageFields()
    checkForNew(isDrawerActive, isNew)
    setLoading(true)
    fetchPage()
    fetchBills()
    
  }, [])

  useEffect(() => {
    
    handlePageFields()
    handleInitialFieldMapping("Vendor", vendorList, pageFields)
    handleInitialFieldMapping("LocationName", locations, pageFields)
    handleInitialFieldMapping("Type", serviceTypes, pageFields)
    handleInitialFieldMapping("AccessType", accessTypes, pageFields)
    handleInitialFieldMapping("Status", serviceStatusType, pageFields)
    handleInitialFieldMapping("OrderNum", orders, pageFields)
    handleInitialFieldMapping("ServiceID", services, pageFields)
    handleInitialFieldMapping("AccountNum", accounts, pageFields)
    handleInitialFieldMapping("Bills", bills, pageFields)
    handleSetHeader()
    
  },[loading])

  useEffect(() => {

    handlePageFields()
    handleSetLastUpdatedFields()
    handleInitialFieldMapping("Vendor", vendorList, pageFields)
    handleInitialFieldMapping("LocationName", locations, pageFields)
    handleInitialFieldMapping("Type", serviceTypes, pageFields)
    handleInitialFieldMapping("AccessType", accessTypes, pageFields)
    handleInitialFieldMapping("Status", serviceStatusType, pageFields)
    handleInitialFieldMapping("OrderNum", orders, pageFields)
    handleInitialFieldMapping("ServiceID", services, pageFields)
    handleInitialFieldMapping("AccountNum", accounts, pageFields)
    handleInitialFieldMapping("Bills", bills, pageFields)
    
  },[updated])

  const handlePageFields = () => {
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
      case "Bills":
        return (
          setPageFields(billsDetailFields)
        )
    }
  }

  const checkForNew = (isDrawerActive, isNew) => {
    isDrawerActive === "true" ? setIsDrawerOpen(true) : ""
    isNew === "true" ? setDocIsNew(true) : ""
  }

  const handleSetHeader = () => {
    const subtitle = pageFields.filter(f => f.isHeader === true).map(field => setActiveSubtitle(field.dataField))
    setLoading(false)
  }

  const handleInitialFieldMapping = (field, value, arr) => {

    const indexRef = arr.findIndex(i => i.dataField === field)
    arr[indexRef] = {...arr[indexRef], inputSource: value}
  
  }
  
  const fetchPage = async() => {
   
    const pageFieldsRef = await db.collection(isModule).doc(params.id).get()
    
    const data = await pageFieldsRef.data()
    const id = await pageFieldsRef.id
    setActive({id: id, ...data})
    setData(data)
    console.log("fetch:", active, data)
  }
console.log("after", active, data)
  const fetchBills = async() => {
    const billsRef = await db.collection("Bills").where("ServiceID", "==", params.id).get()
    const bills = await billsRef.docs.map(doc => ({
      id: doc.id,
      ...doc.data()}))
    await setBills(bills)
    
    await setLoading(false)
  }  
console.log(pageFields)
  const handleSubmit = () => {
    
    
      docIsNew === true ?
        
      handleSubmitNew(data) : handleSubmitUpdated(data)
  }

  const autoClose = () => {
    setTimeout(() => {history.push("/dashboard")}, 1500)
  }

  const handleSubmitNew = async(data) => {
    try {
      await db.collection(isModule).doc().set(data) 
      
      setPageSuccess("Saved")
    } catch {
      setPageError("Error saving")
    } 
    setDocIsNew(false) 
    setUpdated(true)
    setIsDrawerOpen(!isDrawerOpen)
  }

  const handleSubmitUpdated = async(data) => { 
      try {
        await db.collection(isModule).doc(params.id).update(data)
        
        setPageSuccess("Saved")
      } catch {
        setPageError("Error saving")
      } 
      setDocIsNew(false) 
      setUpdated(true)
      setIsDrawerOpen(!isDrawerOpen)
  }
  
  const handleToggle = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }


const handleSetLastUpdatedFields = () => {
  setActive({
    ...active,  
    ['LastUpdated']: setCurrentDate(),
    ['LastUpdatedBy']: currentUser,
    ['CompanyID']: currentCompanyID, 
    ['CompanyName']: currentCompany
  })
  setData({
    ...data, 
    ['LastUpdated']: setCurrentDate(),
    ['LastUpdatedBy']: currentUser,
    ['CompanyID']: currentCompanyID, 
    ['CompanyName']: currentCompany
  })
}  

const handleChange = (e) => {
  const {name, value} = e.target
  console.log(name, value)
  setActive({...active, [name]: value})
  setData({...data, [name]: value})
  setUpdated(!updated)
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

const handleAddRelatedValue = (e) => {
  console.log(e)
  setAddRelatedValue(e)
}

const handleSetCache = (value, setValue) => {
  setValue(value)
}

const handleClick = (e) => {
  setLoading(true)
  history.push({
    pathname: `/${e.colRef}/${currentCompanyID}/${e.id}`,
    state: {
    
    services: services,
    locations: locations,
    accounts: accounts
    }
  }) 
}

const handleRelatedSubmit = async() => {
  console.log(relatedInputData)
  try {
  await db.collection(relatedInputData.collection).doc().set(relatedInputData.data)
    setPageSuccess(`New ${relatedInputData.label} Saved`)
  } catch {
    setPageError(`Error Saving New ${relatedInputData.label}`)
  }
    
    setUpdated(true)
    
}

const handleRelatedDrawer = (colRef, dataField, dataLabel, relatedDataField) => {
  console.log({collection: colRef, field: dataField, label: dataLabel})
  setRelatedInputData({collection: colRef, field: dataField, label: dataLabel, fieldRelated: relatedDataField})
  setIsRelatedDrawerOpen(true)
}

const handleRelatedInputChange = (e) => {
  const {name, value} = e.target
  setRelatedInputData({
    ...relatedInputData, 
    data: {
      [name]: value,
      CompanyID: currentCompanyID,
      CompanyName: currentCompany,
      CreatedDate: setCurrentDate(),
      CreatedBy: currentUser,
      [relatedInputData.fieldRelated]: params.id
    }})
}
return (
    <Loading active={loading}>

    <Page 
      title="DETAILS" 
      subtitle={active && [active].map(item => item[activeSubtitle] && item[activeSubtitle])} 
      status="view" 
      handleToggle={()=> handleToggle()} 
      pageSuccess={pageSuccess} 
      pageError={pageError}
    >
      {userContext && userContext.userSession != undefined ? 
        <>
          <TabBar>{/** Refactor this as Array/Map */}
            <ul>  
              <li className={tab === "BASIC_INFO" ? "is-active" : ""}><a onClick={()=>setTab("BASIC_INFO")}>Basic Info</a></li>
              <li className={tab === "DETAILS" ? "is-active" : ""}><a onClick={()=>setTab("DETAILS")}>Details</a></li>
              <li className={tab === "SUPPORT" ? "is-active" : ""}><a onClick={()=>setTab("SUPPORT")}>Support</a></li>
              <li className={tab === "BILLING" ? "is-active" : ""}><a onClick={()=>setTab("BILLING")}>Billing</a></li>
              <li className={tab === "NOTES" ? "is-active" : ""}><a onClick={()=>setTab("NOTES")}>Notes</a></li>
            </ul>
          </TabBar>

          <div className="box p-4 is-rounded has-text-black">

              <nav className="breadcrumb" aria-label="breadcrumbs"> {/** Refactor this as LastUpdatedComponent Component with Hook */}
                <ul>
                  <li className="is-size-7 is-uppercase">last updated: {active.LastUpdated && active.LastUpdated}</li>
                  <li className="is-size-7 is-uppercase pl-2">updated by: {active.LastUpdatedBy && active.LastUpdatedBy}</li>
                </ul>
              </nav>

              {/** Refactor as ViewPageFields Component */}
              {active && pageFields.map(field => 
                <>
                  {[active].map(docItem => 
                    <div className={field.visible != false & field.tab === tab ? "" : "is-hidden" }> 
                    <Columns options="is-mobile">
                      <Column size="is-3">

                        <FieldLabel>
                          <Columns options="is-mobile">
                            <Column size="is-11">
                              <div key={field.label}>{field.label} 

                                {field.addBtn === true ? 
                                  <a className="link has-text-weight-normal is-size-7 pl-2" 
                                    onClick={(e) => handleRelatedDrawer(field.relatedCollection, field.dataField, field.relatedInputLabel, field.relatedDataField)}>   
                                    (add) {/**handleToggleRelatedDrawer({colRef: field.relatedCollection, dataField: field.dataField }) */}
                                  </a> : null}
                                </div>
                              </Column>
                              <Column>:</Column>
                            </Columns>
                        </FieldLabel>

                      </Column>
                     
                      <Column size="pl-5">
                      
                      <CheckIfNeedsCache 
                          value={accounts} 
                          setValue={setAccounts} 
                          handleSetCache={(value, setValue)=>handleSetCache(value, setValue)} fallbackValue={cachedAccounts}
                        >  
                        <CheckIfNeedsCache 
                          value={locations} 
                          setValue={setLocations} 
                          handleSetCache={(value, setValue)=>handleSetCache(value, setValue)} fallbackValue={cachedLocations}
                        >   
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
                        </CheckIfNeedsCache>
                        </CheckIfNeedsCache>
                      </Column>
                    </Columns>
                    </div>
                  )}
                </>
              )}

              <DrawerComponent 
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
                  pageFields={pageFields}
                  active={active}
                  tab={tab}
                  addRelatedValue={addRelatedValue}
                  handleAddRelatedValue={(e)=>handleAddRelatedValue(e)}
                  resetAddRelatedValue={()=>setAddRelatedValue("")}
                  handleUpdated={()=>setUpdated(!updated)}
                  currentCompany={currentCompany}
                  currentCompanyID={currentCompanyID}
                />

                <DeleteButton 
                  colRef={isModule}
                  docRef={active.id}
                />

              </DrawerComponent>

              

              <DrawerComponent
                checked={isRelatedDrawerOpen}
                direction="right"
                handleClose={()=>setIsRelatedDrawerOpen(!isRelatedDrawerOpen)}
                handleSubmit={()=>handleRelatedSubmit()}
              >

                <QuickAdd 
                  colRef={relatedInputData.collection}
                  dataField={relatedInputData.field}
                  label={relatedInputData.label}
                  
                  
                  handleRelatedInputChange={(e)=>handleRelatedInputChange(e)}
                />
                
              </DrawerComponent>

          </div>

        </> : 
          <div className="tile warning"> No record to display </div>
      }    
    </Page>

    </Loading>
    
  )
}
export default RelatedDetailModule