import React, {useContext, useState, useEffect} from 'react'
import { db, fire, store } from '../../Contexts/firebase'
import {fieldContext} from '../../Contexts/fieldContext'
import RenderModule, {useCore} from '../../Hooks/useCore'
import {Panel, PanelHeader, PanelBlock} from '../../Components/Panels/Panel'
const Admin = () => {
  const {
    collection, 
    query, 
    where, 
    getDocs, 
    getDoc, 
    addDoc, 
    updateDoc, 
    doc,
    ref,
    setDoc,
    deleteDoc,
    uploadBytes,
    getDownloadURL,
    arrayUnion,
    arrayRemove
  } = fire

  const {
    serviceGridColumns, 
    serviceMobileGridColumns,
    serviceGroupByFields,
    locationGridColumns,
    locationMobileGridColumns,
    locationGroupByFields,
    locationDetailFields,
    ticketGridColumns, 
    ticketGroupByFields,
    ticketMobileGridColumns,
    orderGridColumns, 
    orderGroupByFields,
    orderMobileGridColumns,
    accountGridColumns, 
    accountGroupByFields,
    accountMobileGridColumns,
    userGridColumns,
    userDetailFields, 
    userProfileFields,
    contractGridColumns,
    contractMobileGridColumns,
    contractDetailFields,
    contractGroupByFields,
    serviceDetailFields,
    ticketDetailFields,
    accountDetailFields,
    orderDetailFields,
    billsDetailFields,
    contactDetailFields,
    eventDetailFields
  } = useContext(fieldContext)

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isModuleList, setIsModuleList] = useState()
  const [updated, setUpdated] = useState(false)

  const {editModule, setEditModule} = useCore()
  const {fields, setFields} = useCore()

  useEffect(() => {
    isModuleList != undefined ? console.log('Did not fetch') : fetchModules()
  },[])

  useEffect(() => {
    updated != true ? console.log('Not updated') : fetchModules()
  }, [updated])

  const newModule = {
    open: true,
    group: '',
    fields: {
        label: 'Field1',
        module: 'Field1',
        type: 'text',
        key: 'Field1',
        params: {
          header: 'true',
          visible: 'true',
          tab: 'Essentials'
        }
      }
    }

  const baseField = {
    label: 'Field',
    type: 'text',
    key: 'Field',
    params: {
      header: true,
      visible: true,
      tab: 'Essentials'
    }
  }

  const baseRefField = {
    label: 'Field',
    type: 'text',
    key: 'Field',
    params: {
      header: true,
      visible: true,
      tab: 'Essentials'
    }
  }

  const fetchModules = async() => {
    try {
    const q = query(collection(db, "Core"))
    const modulesRef = await getDocs(q)
    const modules = await modulesRef.docs.map(doc => ({
      id: doc.id,
      ...doc.data()}))
    await setIsModuleList(modules)
    } catch {
      console.log('Error fetching')
    }
    setUpdated(false)
  } 

  const handleSetModule = (mod) => {
    setEditModule(mod)
    setFields(mod.fields)
    setIsDrawerOpen(true)
  }

  const handleAddNewModule = () => {
    setEditModule(newModule)
    handleToggleDrawer()
  }

  const handleTextChange = (e, {prev, index}) => {
    e.preventDefault()
    const {name, value} = e.target
    const fieldChanged = {...prev, [name]: value}
    const newFields = [...fields]
    newFields[index] = {...fieldChanged}
    setFields([...newFields])
    console.log('index', index, 'fieldChanged', fieldChanged, 'fields', fields)
  }

  const handleSelectChange = (e, {prev, index, name}) => {
    e.preventDefault()
    const {value} = e.target
    const fieldChanged = {...prev, [name]: value}
    const newFields = [...fields]
    newFields[index] = {...fieldChanged}
    setFields([...newFields])
    console.log('index', index, 'fieldChanged', fieldChanged, 'fields', fields)
  }

  const handleModuleTextChange = (e) => {
    e.preventDefault()
    const {name, value} = e.target
    setEditModule({...editModule, ['label']: value, ['id']: value})
  }

  const handleToggleVisibleChange = ({prev, index}) => {
    const fieldChanged = {...prev, ['params']: {...prev.params, visible: !prev.params.visible}}
    const newFields = [...fields]
    newFields[index] = {...fieldChanged}
    setFields([...newFields])
  }

  const handleToggleCurrencyChange = ({prev, index}) => {
    const fieldChanged = {...prev, ['params']: {...prev.params, currency: !prev.params?.currency}}
    const newFields = [...fields]
    newFields[index] = {...fieldChanged}
    setFields([...newFields])
  }

  const handleToggleHeaderChange = ({prev, index}) => {
    const fieldChanged = {...prev, ['params']: {...prev.params, header: !prev.params.header}}
    const newFields = [...fields]
    newFields[index] = {...fieldChanged}
    setFields([...newFields])
  }

  const handleParamsTextChange = (e, {prev, index}) => {
    const {name, value} = e.target
    const fieldChanged = {...prev, ['params']: {...prev.params, [name]: value}}
    const newFields = [...fields]
    newFields[index] = {...fieldChanged}
    setFields([...newFields])
  }

  const handleRefTextChange = (e, {prev, index}) => {
    const {name, value} = e.target
    const optionValues = value?.split(',').map(item => item.trim())
    const fieldChanged = {...prev, ['ref']: {...prev.ref, ['fields']: [...optionValues]}}
    const newFields = [...fields]
    newFields[index] = {...fieldChanged}
    setFields([...newFields])
  }

  const handleAddRefField = ({prev, index}) => {
    
    const copyRefFields = prev?.ref?.fields ? [...prev.ref.fields] : []
    const newRefFields = [...copyRefFields, baseField]
    const fieldChanged = {...prev, ['ref']: {...prev.ref, ['fields']: [...newRefFields]}}
    const newFields = [...fields]
    newFields[index] = {...fieldChanged}
    setFields([...newFields])
  }

  const handleRefFieldChange = (e, {prevField, fieldIndex, prevObj, objIndex}) => {
    const {name, value} = e.target
    const copyFields = [...fields] //copy Fields array
    const oldObj = prevField?.ref?.fields[objIndex] //copy Object state that is being changed
    const newObj = {...oldObj, [name]: value} //update Object state
    const copyRefFields = prevField?.ref?.fields ? [...prevField.ref.fields] : [] //copy Ref array of current Field that is being changed
    copyRefFields[objIndex] = {...newObj} //update Ref array of current Field with new Object
    copyFields[fieldIndex] = {...prevField, ['ref']: {...prevField.ref, ['fields']: [...copyRefFields]}} //update copy of Fields array with updated Ref array
    setFields([...copyFields]) //update Fields array with updated Field state
  }

const handleAddField = () => {
  const newFields = [...fields, baseField]
  setFields([...newFields])
}

const handleSaveModule = () => {
  setEditModule({...editModule, fields})
  console.log(editModule)
}

const handleSubmitModule = async() => {
    console.log('editModule', editModule, 'label', editModule.label, )
  const docData = {...editModule}
  try {
    await setDoc(doc(db, 'Core', editModule.label), {...docData}) 
    closeToAdmin()
    console.log("Saved!")
  } catch {
    console.log("Error")
  } 
  setUpdated(true)
}

const handleToggleDrawer = () => {
  setIsDrawerOpen(!isDrawerOpen)
}

const closeToAdmin = () => {
  setIsDrawerOpen(!isDrawerOpen)
  setEditModule('')
  setFields('')
}

const handleDeleteField = ({index}) => {
  const copyArr = [...fields]
  const totalFields = fields.length
  copyArr.splice(index, totalFields)
  setFields([...copyArr])
}

const handleDeleteModule = async(mod) => {
  console.log(mod)
  try {
    await deleteDoc(doc(db, 'Core', mod.id)) 
    
    console.log("Saved!")
  } catch {
    console.log("Error")
  } 
  setUpdated(true)
}

console.log('ismodulelist', isModuleList)
  return(
    <div className='adminDrawer'>
    <Panel>
      <PanelHeader>Edit Module Pages</PanelHeader>
      <>
        {isModuleList && isModuleList?.map((mod, index) => 
        <PanelBlock>
          <p className='control has-icons-right'>
            <button className='button is-fullwidth' onClick={() => handleSetModule(mod)}>{mod.id}
            <span className='icon is-small is-right'>
              <i className='delete is-small' onClick={()=>handleDeleteModule(mod)}></i>
            </span>
            </button>
          </p>
        </PanelBlock>
        )}
        <PanelBlock>
          <button className='button' onClick={()=>handleToggleDrawer()}>Add Module</button>
        </PanelBlock>
      </>
    </Panel>
    
    <RenderModule 
      moduleData={editModule && editModule}
      fields={fields && fields}
      checked={isDrawerOpen}
      handleToggleDrawer={handleToggleDrawer}
      handleTextChange={(e, prev, index)=>handleTextChange(e, prev, index)}
      handleSelectChange={(e, prev, index, name)=>handleSelectChange(e, prev, index, name)}
      handleToggleVisible={(prev, index)=>handleToggleVisibleChange(prev, index)}
      handleToggleHeader={(prev, index)=>handleToggleHeaderChange(prev, index)}
      handleToggleCurrency={(prev, index)=>handleToggleCurrencyChange(prev, index)}
      handleParamsTextChange={(e, prev, index)=>handleParamsTextChange(e, prev, index)}
      handleRefTextChange={(e, prev, index)=>handleRefTextChange(e, prev, index)}
      handleModuleTextChange={(e)=>handleModuleTextChange(e)}
      handleDeleteField={(index)=>handleDeleteField(index)}
      handleAddField={()=>handleAddField()}
      handleSaveModule={()=>handleSaveModule()}
      handleSubmitModule={()=>handleSubmitModule()}
      handleAddRefField={(prev, index)=>handleAddRefField(prev, index)}
      handleRefFieldChange={(e, prevField, fieldIndex, prevObj, objIndex)=>handleRefFieldChange(e, prevField, fieldIndex, prevObj, objIndex)}
    />
    </div>
  )
}
export default Admin