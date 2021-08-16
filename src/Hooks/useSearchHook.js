import React, { useState, useEffect, useContext } from 'react'
import {stateContext} from '../Contexts/stateContext'

const useSearchHook = () => {
  const userContext = useContext(stateContext)
  const { 
    locations, 
    services, 
    tickets, 
    orders } = userContext.userSession

  const [searchValue, setSearchValue] = useState("")
  const [data, setData] = useState(locations, services, tickets, orders)
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    const results = value && data && data.filter(el => 
      el.toLowerCase().includes(searchValue)
    );
    setSearchResults(results)
  },[searchValue])

  return {searchResults, setSearchValue}
}
export default useSearchHook