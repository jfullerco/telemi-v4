import React, { useState, useEffect, useContext } from 'react'
import {stateContext} from '../Contexts/stateContext'

export function useSearchHook() {
  const userContext = useContext(stateContext)
  const { 
    locations, 
    services, 
    tickets, 
    orders,
    accounts } = userContext.userSession

  const [searchValue, setSearchValue] = useState("")
  const [data, setData] = useState([])
  const [searchResults, setSearchResults] = useState([])

  const searchLocationRef = [...locations]
  const searchServiceRef = [...services]
  const searchTicketRef = [...tickets]
  const searchOrderRef = [...orders]
  const searchAccountRef = [...accounts]

  useEffect(() => {
    
    const locationResults = searchValue && searchLocationRef && searchLocationRef != undefined ? searchLocationRef.filter((obj) => Object.keys(obj).some((el) => obj[el].toString().toLowerCase().indexOf(searchValue) > -1)) : ""

    const serviceResults = searchValue && searchServiceRef && searchServiceRef != undefined ? searchServiceRef.filter((obj) => Object.keys(obj).some((el) => obj[el].toString().toLowerCase().indexOf(searchValue) > -1)) : ""

    const ticketResults = searchValue && searchTicketRef && searchTicketRef != undefined ? searchTicketRef.filter((obj) => Object.keys(obj).some((el) => obj[el].toString().toLowerCase().indexOf(searchValue) > -1)) : ""

    const orderResults = searchValue && searchOrderRef && searchOrderRef != undefined ? searchOrderRef.filter((obj) => Object.keys(obj).some((el) => obj[el].toString().toLowerCase().indexOf(searchValue) > -1)) : ""

    const accountResults = searchValue && searchAccountRef && searchAccountRef != undefined ? searchAccountRef.filter((obj) => Object.keys(obj).some((el) => obj[el].toString().toLowerCase().indexOf(searchValue) > -1)) : ""

    setSearchResults({...searchResults, ['locations']: locationResults, ['services']: serviceResults, ['tickets']: ticketResults, ['orders']: orderResults, ['accounts']: accountResults})
    console.log(searchResults) 
  },[searchValue])

  return [searchResults, setSearchValue]
}
