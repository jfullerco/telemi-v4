import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useSearchHook } from '../Hooks/useSearchHook'
import { stateContext } from '../Contexts/stateContext'

const Search = () => {
  const userContext = useContext(stateContext)
  const {currentCompanyID} = userContext.userSession
  const [searchResults, setSearchValue] = useSearchHook()
  const [locationResults, setLocationResults] = useState("")
  const [serviceResults, setServiceResults] = useState("")
  const [orderResults, setOrderResults] = useState("")
  const [ticketResults, setTicketResults] = useState("")
  const history = useHistory()

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
  }

  const handleClick = (view, id) => {
    history.push(`/${view}/${currentCompanyID}/${id}`)
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
      <div className="mt-5">
      {locationResults && locationResults != undefined ? locationResults.map(result => 
        <div className="box" key={result.id}>
          <div className="title is-size-7">Location</div>
          <a onClick={() => handleClick('Locations', result.id)}><span className="title is-size-5">{result.Name}</span> - {result?.Address1} {result?.Address2} {result?.City} {result?.State} {result.Zip}</a>
        </div>
      ) : ""}

      {serviceResults && serviceResults != undefined ? serviceResults.map(result =>   
        <div className="box" key={result.id}>
          <p className="title is-size-7">Service</p>
          <a onClick={() => handleClick('Services', result.id)}><span className="title is-size-5">{result.AssetID}</span> - {result.LocationName}</a>
        </div>
      ) : ""}
      </div>
    </div>

  )
}
export default Search