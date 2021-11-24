import React, {useEffect, useState, useRef, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import {fieldsCompanies} from '../../Contexts/initialFieldContext'
import { db, fire, store } from '../../Contexts/firebase'
import {stateContext} from '../../Contexts/stateContext'

import TextInput from '../../Components/Forms/TextInput'
import Page from '../../Components/Page'
import Button from '../../Components/Buttons/Button'
import Columns from '../../Components/Layout/Columns'
import Column from '../../Components/Layout/Column'


const AddCompany = ({open}) => {
  const navigate = useNavigate()
  const userContext = useContext(stateContext)
  const { setDataLoading } = userContext
  const { currentUser } = userContext.userSession
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
  const [checked, setChecked] = useState(true)
  
  const [pageError, setPageError] = useState()
  const [pageSuccess, setPageSuccess] = useState()
  
  const companyName = useRef("")
  
  
  const handleSubmit = async(e) => {
    const nameField = fieldsCompanies ? fieldsCompanies.filter(f=> f.uid === 'Name').map(field => {
      value: companyName.current.value
    }) : ''
    const userField = fieldsCompanies ? fieldsCompanies.filter(f=> f.uid === 'Users').map(field => {
      value: [currentUser]
    }) : ''

    const docData = {
      fields: [
        ...fieldsCompanies,
        nameField,
        userField
      ]
    }  
    console.log('name', nameField, 'data', docData)
  }

  const autoClose = () => {
    setTimeout(() => {navigate('/dashboard')}, 1500)
  }
  

  return (
    
    <Page subtitle="Add Company" handleSubmit={handleSubmit} status="new" handleToggleReadOnly={() => setInputReadOnly(!inputReadOnly)} pageSuccess={pageSuccess} pageError={pageError} handleGoBack={()=>history.goBack()}>

      <form>
        <TextInput
          inputFieldLabel="Company Name"
          inputFieldRef={companyName}
        />
        <Columns options="is-mobile">

          <Column size="is-narrow">
            <Button label="Add" handleSubmit={handleSubmit} options="is-link" />
          </Column>
          <Column size="is-narrow">
            <Button label="Cancel" handleSubmit={() => navigate('/dashboard')} />
          </Column>

        </Columns>

      </form>
    </Page>
    
  )
}
export default AddCompany