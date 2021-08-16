import React, { useEffect, useState } from 'react'
import { useSearchHook } from '../Hooks/useSearchHook'

const Search = () => {

  const [searchResults, setSearchValue] = useSearchHook()
  const [locationResults, setLocationResults] = useState("")
  const [serviceResults, setServiceResults] = useState("")
  const [orderResults, setOrderResults] = useState("")
  const [ticketResults, setTicketResults] = useState("")

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
  }

  const handleClick = (id) => {
    console.log(id)
  }

  useEffect(() => {
    
    console.log(searchResults)
    setLocationResults(searchResults.locations && searchResults.locations)
    setServiceResults(searchResults.services && searchResults.services)
    
  },[searchResults])

  return(

    <div className="hero is-large">
      <p className="block"/>
      <label>Search</label>
      <input className="input is-rounded" type='text' onChange={(e) => handleSearch(e)} />

      {locationResults && locationResults != undefined ? locationResults.map(result => 
        <div key={result.id}>
          <a onClick={() => handleClick(id)}>{result.Name}</a>
        </div>
      ) : ""}

      {serviceResults && serviceResults != undefined ? serviceResults.map(result =>   
        <div key={result.id}>
          <a onClick={() => handleClick(id)}>{result.AssetID}</a>
        </div>
      ) : ""}
    </div>

  )
}
export default Search