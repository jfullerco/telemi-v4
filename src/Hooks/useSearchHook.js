import React, { useState, useEffect, useContext } from 'react'
import {stateContext} from '../Contexts/stateContext'

export function useSearchHook() {
  const userContext = useContext(stateContext)
  const { 
    locations, 
    services, 
    tickets, 
    orders } = userContext.userSession

  const [searchValue, setSearchValue] = useState("")
  const [data, setData] = useState([])
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    
    const locationResults = searchValue && locations && locations != undefined ? locations.filter(({Name, Address1, City, State, Zip}) => 
      Name.toLowerCase().indexOf(searchValue) > -1 || Address1.toLowerCase().indexOf(searchValue) > -1 || City.toLowerCase().indexOf(searchValue) > -1 || State.toLowerCase().indexOf(searchValue) > -1 || Zip.toLowerCase().indexOf(searchValue) > -1
    ) : "";

    const serviceResults = searchValue && services && services != undefined ? services.filter((obj) => Object.keys(obj).some((el) => obj[el].toString().toLowerCase().indexOf(searchValue) > -1)) : ""

    setSearchResults(serviceResults)
    console.log(searchResults) 
  },[searchValue])

  return [searchResults, setSearchValue]
}
