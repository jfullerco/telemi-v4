import React, { useState, useEffect, useContext, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { stateContext } from '../Contexts/stateContext'
import { db, fire, store } from '../Contexts/firebase'
import { fieldContext } from '../Contexts/fieldContext'
import { useRefreshDataHook } from '../Hooks/useRefreshDataHook'
import { useLoading } from '../Hooks/useLoading'
import Columns from '../Components/Layout/Columns'
import Column from '../Components/Layout/Column'
import DrawerPage from '../Components/DrawerPage'
import DrawerComponent from '../Components/Layout/DrawerComponent'
import Loading from '../Components/Loading'
import PageField from '../Components/Layout/PageField'
import TabBar from '../Components/Tabs/TabBar'
import Tab from '../Components/Tabs/Tab'

import PageInputFields from '../Components/Forms/PageInputFields'
import RelatedPageInputFields from '../Components/Forms/RelatedPageInputFields'
import Footer from '../Footer'


const DetailDrawer = (props) => {

  const history = useHistory()
  
  const { isModule, isDetailDrawerOpen, id } = props && props || null

  const userContext = useContext(stateContext)
  const {
    collection, 
    query, 
    where, 
    getDocs, 
    getDoc, 
    addDoc, 
    updateDoc, 
    doc,
    arrayUnion,
    arrayRemove
  } = fire

  const { 
    serviceTypes, 
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
    refreshServices 
  } = userContext

  const { 
    locations,
    services, 
    orders, 
    accounts,
    tickets,
    contracts,
    users,
    bills,
    notes,
    currentCompany,
    currentCompanyID,
    currentUser 
  } = userContext.userSession

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
  
  const [data, setData] = useState("")
  const [active, setActive] = useState("")
  const [tab, setTab] = useState("BASIC INFO")

  const [activeSubtitle, setActiveSubtitle] = useState("")
  const [docIsNew, setDocIsNew] = useState()
  
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
  const [loading, toggleLoading] = useLoading(true)
  
  useEffect(() => {
    
    toggleLoading(true)
    handlePageFields(isModule)
    checkForNew(props.isDrawerActive, props.isNew)
    props.isNew === false ? fetchPage() : ""
    props.isNew === false ? fetchBills() : ""
    props.isNew === false ? fetchNotes() : ""
     
  }, [])

  useEffect(() => {

    toggleLoading(true)
    setPageFields(isModule)
    checkForNew(props.isDrawerActive, props.isNew)
    handlePageFields(isModule)
    props.isNew === false ? fetchPage() : ""
    props.isNew === false ? fetchBills() : ""
    props.isNew === false ? fetchNotes() : ""
    
  }, [isModule, isDetailDrawerOpen])

  useEffect(() => {
    
    handlePageFields(isModule)
    props.isNew === false ? fetchPage() : ""
    props.isNew === false ? fetchBills() : ""
    props.isNew === false ? fetchNotes() : ""
    handleSetHeader()
    setUpdated(false)
    handleInitialFields()
    handleFinishedLoading()
    
  },[loading])

  useEffect(() => {

    toggleLoading(true)
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

  const checkForNew = (isDrawerActive, isNew) => {
    isDrawerActive === true ? setIsDrawerOpen(true) : ""
    isNew === true ? setDocIsNew(true) : ""

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

  const handleFinishedLoading = () => {

    setTimeout(() => {
      toggleLoading(false)
    }, 1500)

  }

  const handleSetHeader = () => {

    const subtitle = pageFields.filter(f => f.isHeader === true).map(field => setActiveSubtitle(field.dataField))

  }

/** Map inputSource arrays for initialFields 
  const handleInitialFieldMapping = (field, value, arr) => {

    const indexRef = arr.findIndex(i => i.dataField === field)
    arr[indexRef] = {...arr[indexRef], inputSource: value}
  
  }

  */

/** Fetch Document from Firebase */  
  const fetchPage = async() => {
    
    const docRef = doc(db, props.isModule, props.id)
    const docSnap = await getDoc(docRef) 
    console.log(docSnap)
    const data = docSnap.data()
    const id = docSnap.id
    setActive({id: id, ...data})
    setData(data)
  
  }

  const fetchBills = async() => {

    const q = query(collection(db, "Bills"), where("ServiceID", "==", props.id))
    const billsRef = await getDocs(q)
    const bills = await billsRef.docs.map(doc => ({
      id: doc.id,
      ...doc.data()}))
    await setBills(bills)

  } 

  const fetchOrders = async() => {

    const q = query(collection(db, "Orders"), where("ServiceID", "==", props.id))
    const ordersRef = await getDocs(q)
    const orders = await ordersRef.docs.map(doc => ({
      id: doc.id,
      ...doc.data()}))
    await setOrders(orders)

  } 
  
  const fetchNotes = async() => {

    const q = query(collection(db, "Notes"), where("ServiceID", "==", props.id))
    const notesRef = await getDocs(q)
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

  const handleSubmit = () => {
      
      docIsNew === true ? 
      handleSubmitNew(data) : 
      handleSubmitUpdated(data)
        
  }

  const handleSubmitNew = async(data) => {
    
    try {

      await addDoc(collection(db, isModule), data) 
      console.log("Changes Saved!")
      setTimeout(() => {setPageSuccess(false)}, 1000)

    } catch {

      console.log("Error saving")
      setTimeout(() => {setPageError(false)}, 1000)

    } 
    
    setUpdated(true)
    setIsDrawerOpen(!isDrawerOpen)

  }

  const handleSubmitUpdated = async(data) => { 

    const docData = {
      ...data, 
      ['LastUpdated']: setCurrentDate(), 
      ['LastUpdateBy']: currentUser
    }

    const docRef = doc(db, isModule, id)

      try {
        
        await updateDoc(docRef, docData)
        
        console.log("Document updated!")
        
      } catch {

        console.log("Error updating document")

      } 

      setDocIsNew(false) 
      setUpdated(true)
      setIsDrawerOpen(false)
      setIsArrayMapDrawerOpen(false)

  }

  const handleRelatedSubmit = async() => {

    const docData = relatedSubmitData
    const docRef = doc(db, relatedInputData.collection)

    try {

    await addDoc(docRef, docData)
      console.log(`Successfully saved new ${relatedInputData.label}`)

    } catch {

      console.log(`Error saving new ${relatedInputData.label}`)
      
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

const handleArrayMapDelete = (e, arr, field) => {
  
  setIsArrayMapInputData({  
    pageFields: field.relatedInputFields, 
    dataField: field.dataField,
    label: field.label
  })

  const deleteRef = data[field.dataField].splice(e, 1)

    try {
        handleSubmitUpdated()
      } catch {
        console.log("Error Deleting Item")
      }

}
console.log('data:', data, 'active:', active, 'isArrayMapData:', isArrayMapData)
const handleArrayMapSubmit = async(data) => {

  /**const docD = {
    [isArrayMapInputData.dataField]: [isArrayMapData]
  }*/

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

  const docData = {
    ...data, 
    ['LastUpdated']: setCurrentDate(), 
    ['LastUpdateBy']: currentUser
  }
  
  
  

  try {     
    await updateDoc(doc(db, isModule, id), docData)
    console.log("Successfully saved array value")
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

    <DrawerPage>
      {userContext && userContext.userSession != undefined ? 
        <> 
          <TabBar>
            <Tab 
              data={pageFields}
              active={tab}
              handleClick={(e)=>setTab(e)}
            />
          </TabBar>

          <div className="box is-rounded mx-2" style={{minHeight: '50vh'}}>

            <article className="hero title is-small"> 
              <span className="subtitle is-5">{isModule}</span>
              <span className="title is-3">
                {[active].map(item => item[activeSubtitle] && item[activeSubtitle])}
              </span>
            </article>

              <div className="block">
                {/** Refactor as ViewPageFields Component */}
                {active && pageFields.map(field => 
                  <>
                    {[active].map(docItem => 
                      
                      <div className={field.visible != false & field.tab === tab ? "" : "is-hidden" }> 
                      <hr className={field.hasBreakBefore === true ? "" : "is-hidden"} />
                      
                        <Columns options="is-mobile">
                          <Column size="pl-3 pr-3">
                            <PageField 
                              loading={loading}
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
                              handleArrayMapDelete={(e, arr)=>handleArrayMapDelete(e, arr, field)}
                              handleArrayMapDrawer={(field) => handleArrayMapDrawer(field)}
                              handleRelatedDrawer={(field) => handleRelatedDrawer(field)}
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
                <RelatedPageInputFields 
                  relatedFields={relatedInputData.pageFields}
                  handleChange={(e)=>handleRelatedInputChange(e)}
                  handleRelatedField={(e)=> handleRelatedField(e)}
                  handleRelatedSelectChange={(e, related)=> handleRelatedSelectChange(e, related)}
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
          <div className="notification warning"> No record to display </div>
      }    
    </DrawerPage>
    <Footer 
      handleEditButton={(e)=> setIsDrawerOpen(e)}
      isDrawerOpen={isDrawerOpen}
      handleClose={()=>props.setIsDetailDrawerOpen()}
      isBookmarked={active.isBookmarked}
      tags={active.Tags}
      handleUpdated={fetchPage}
      isModule={props.isModule}
      id={props.id}
    />
    </Loading>
    
  )
}
export default DetailDrawer