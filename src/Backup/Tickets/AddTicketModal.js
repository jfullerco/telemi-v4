import React, {useEffect, useState, useRef, useContext} from 'react'
import {useNavigate} from 'react-router-dom'

import {db} from '../../Contexts/firebase'
import {stateContext} from '../../Contexts/stateContext'

import TextInput from '../../Components/Forms/TextInput'
import TextArea from '../../Components/Forms/TextArea'
import SelectInputProps from '../../Components/Forms/SelectInputProps'
import TextInputAC from '../../Components/Forms/TextInputAC'
import Modal from '../../Components/Modal'

const AddTicket = (props) => {

  const userContext = useContext(stateContext)

  const navigate = useNavigate()
  
  const [modalState, setModalState] = useState(true)

  const [locations, setLocations] = useState(props.locations)
  const [accounts, setAccounts] = useState(props.accounts)
  const [dropDown, setDropDown] = useState(false)
  
  const ticketNum = useRef("")
  const ticketLocationID = useRef("")
  const ticketLocationName = useRef("")
  const ticketVendor = useRef("")
  const ticketDate = useRef("")
  const ticketType = useRef("")
  const ticketStatus = useRef("")
  const ticketDetails = useRef("")
  const ticketAccountID = useRef("")
  const ticketAccountNum = useRef("")
  const ticketCompletedDate = useRef("")
  

  const handleSubmit = async(e) => {
    const data = {
      TicketNum: ticketNum.current.value,
      CompanyID: userContext.userSession.currentCompanyID,
      CompanyName: userContext.userSession.currentCompany,
      DateSubmitted: ticketDate.current.value,
      Type: ticketType.current.value,
      Status: ticketStatus.current.value,
      Details: ticketDetails.current.value,
      LocationID: ticketLocationID.current,
      LocationName: ticketLocationName.current,
      AccountID: ticketAccountID.current.value,
      AccountNum: ticketAccountID.current[ticketAccountID.current.selectedIndex].text,
      Vendor: ticketVendor.current.value

    }  
    console.log(data)
    const res = await db.collection("Tickets").doc().set(data)
    autoClose()
  }

  const handleModalClose = () => {
    setModalState(false)
  }

  const autoClose = () => {
    setTimeout(() => {setModalState(!modalState)}, 1000)
  }

  const handleChange = (e) => {
    setDropDown("")
    const {value} = e.target
    const locationAC = locations.filter(({Name, Address1, State, City}) => Name.indexOf(value) > -1 || Address1.indexOf(value) > 1 || State.indexOf(value) > -1 || City.indexOf(value) > -1 )
    ticketLocationName.current = value
    setDropDown(locationAC)
  }

  const handleSuggestedRef = (name, id) => {
    console.log(name)
    console.log(id)
    ticketLocationID.current = id
    ticketLocationName.current = name
    setDropDown("")
  }
  

  return (
    <Modal title="Add Ticket" handleSubmit={handleSubmit} modalState={modalState}>
          <form>
            <TextInput 
              inputFieldLabel="Ticket Number"
              inputFieldRef={ticketNum}
              inputFieldValue={""}
            />

            <TextInputAC handleChange={(e)=>handleChange(e)} 
              label="Service Location" 
              value={ticketLocationName.current} 
              dropDownState={dropDown}>
                {dropDown != "" ? 
                  <ul> 
                  {dropDown.map(d => 
                    <a className="dropdown-item" key={d.id} onClick={()=> handleSuggestedRef(d.Name, d.id)}>
                      <li >{d.Name}</li>
                    </a>
                  )}
                  </ul> : ""} 
            </TextInputAC>

            <SelectInputProps 
              fieldLabel="Related Account"
              fieldInitialValue={""}
              fieldInitialOption={""}
              fieldIDRef={ticketAccountID}>
                {accounts != undefined ? 
                  accounts.map(account => (
                    <option value={account.id} key={account.id}> 
                    {account.AccountNum}</option>
                )) : (
                  <option></option>
                )}
            </SelectInputProps>

            <SelectInputProps
              fieldLabel="Vendor"
              fieldInitialValue=""
              fieldInitialOption=""
              fieldIDRef={ticketVendor}>
                <option>AT&T</option>
                <option>Verizon</option>
                <option>CenturyLink</option>
                <option>Lumos</option>
                <option>Windstream</option>
                <option>Spectrum</option>
                <option>Comcast</option>
                <option>Masergy</option>
                <option>Microsoft</option>
            </SelectInputProps>

            <TextInput 
              inputFieldLabel="Date Submitted"
              inputFieldRef={ticketDate}
              inputFieldValue={""}
            />

            <SelectInputProps
              fieldLabel="Type"
              fieldInitialValue=""
              fieldInitialOption=""
              fieldIDRef={ticketType}>
                <option> Dispute </option>
                <option> Disconnect </option>
                <option> Service </option>
                <option> Order </option>
            </SelectInputProps>
            
            <SelectInputProps
              fieldLabel="Status"
              fieldInitialValue=""
              fieldInitialOption=""
              fieldIDRef={ticketStatus}>
                <option> Active </option>
                <option> Closed/Resolved </option>
                <option> Closed/Unresolved </option>
                <option> Completed </option>
            </SelectInputProps>

            <TextArea 
              inputFieldLabel="Details"
              inputFieldRef={ticketDetails}
              inputFieldValue={""}
            />

          </form>
    </Modal>    
  )
}
export default AddTicket