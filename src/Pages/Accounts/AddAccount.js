import React, {useEffect, useState, useRef, useContext} from 'react'
import {useHistory} from 'react-router-dom'

import {db} from '../../Contexts/firebase'
import {stateContext} from '../../Contexts/stateContext'

import Page from '../../Components/Page'
import SelectInputProps from '../../Components/Forms/SelectInputProps'
import TextInput from '../../Components/Forms/TextInput'
import TextInputAC from '../../Components/Forms/TextInputAC'

const AddAccount = ({id}) => {

  const history = useHistory()

  const userContext = useContext(stateContext)
  const {vendorList} = userContext
  const {currentCompany, currentCompanyID} = userContext.userSession
  
  const [pageError, setPageError] = useState()
  const [pageSuccess, setPageSuccess] = useState()
  
  const [accounts, setAccounts] = useState()
  
  const accountAccountNum = useRef("")
  const accountSubAccountNum = useRef("")
  const accountVendor = useRef("")
  const accountPreTaxMRC = useRef("")
  const accountPostTaxMRC = useRef("")
  const accountServiceType = useRef("")

  useEffect(() => {
    fetchAccounts()
  },[])

  const fetchAccounts = async() => {
   
    const accountsRef = await db.collection("Accounts").where("CompanyID", "==", currentCompanyID).where("SubAccountNum", "!=", false).get()

    const accounts = accountsRef.docs.map(doc => ({id: doc.id, ...doc.data()}))

    setAccounts(accounts)

  }
  
  const handleSubmit = async() => {
    const data = {

      AccountNum: accountAccountNum.current,
      SubAccountNum: accountSubAccountNum.current.value,
      CompanyID: currentCompanyID,
      CompanyName: currentCompany,
      Vendor: accountVendor.current.value,
      PreTaxMRC: accountPreTaxMRC.current.value,
      PostTaxMRC: accountPostTaxMRC.current.value,
      
    }  

    console.log(data)
    const res = await db.collection("Accounts").doc().set(data)
    userContext.setDataLoading(true)
    autoClose()

  }

  const autoClose = () => {
    setTimeout(() => {history.goBack()}, 1000)
  }

  

  return (
    <Page title="Add Account" handleSubmit={handleSubmit} handleToggleReadOnly={()=> setInputReadOnly(!inputReadOnly)} pageSuccess={pageSuccess} pageError={pageError} autoClose={autoClose}>
      <form>
        
            <TextInput 
              inputFieldLabel="Account Number"
              inputFieldRef={accountAccountNum}
              inputFieldValue={""}
            />

            <TextInput 
              inputFieldLabel="Sub-Account Number"
              inputFieldRef={accountSubAccountNum}
              inputFieldValue={""}
            />

            <SelectInputProps
              fieldLabel="Vendor"
              fieldInitialValue=""
              fieldInitialOption=""
              fieldIDRef={accountVendor}
              hint="">
                {vendorList && vendorList.map(vendor => 
                <option key={vendor.id}>{vendor.Name}</option>
                )}
            </SelectInputProps>

            <TextInput 
              inputFieldLabel="Pre-Tax Cost"
              inputFieldRef={accountPreTaxMRC}
              inputFieldValue={""}
            />

            <TextInput 
              inputFieldLabel="Post-Tax Cost"
              inputFieldRef={accountPostTaxMRC}
              inputFieldValue={""}
            />
            
      </form>
    </Page>
  )
}
export default AddAccount