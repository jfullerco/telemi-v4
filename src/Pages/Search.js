import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSearchHook } from '../Hooks/useSearchHook'
import { stateContext } from '../Contexts/stateContext'
import CompanyList from './Companies/CompanyList'
import Page from '../Components/Page'

const Search = (props) => {
  const userContext = useContext(stateContext)
  const {currentCompanyID} = userContext.userSession
  const { handleClick } = props
  const [searchResults, setSearchValue] = useSearchHook()
  const [locationResults, setLocationResults] = useState("")
  const [serviceResults, setServiceResults] = useState("")
  const [orderResults, setOrderResults] = useState("")
  const [ticketResults, setTicketResults] = useState("")
  const navigate = useNavigate()

  const handleSearch = (e) => {
    setSearchValue(e.target.value.toLowerCase())
  }

  
  
  const handleGoBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    
    console.log(searchResults)
    setLocationResults(searchResults.locations && searchResults.locations)
    setServiceResults(searchResults.services && searchResults.services)
    
  },[searchResults])

  return(
    <Page title="Search" handleGoBack={handleGoBack}>
      <div className="hero is-large">
        <p className="block"/>
          <input className="input is-rounded" type='text' placeholder="Search" onChange={(e) => handleSearch(e)} />
          <div className="mt-5">
            {locationResults && locationResults != undefined ? locationResults.map(result => 
              <div className="box" key={result.id}>
                <div className="title is-size-7">Location</div>
                <a onClick={() => handleClick('Locations', result.id)}>
                  <span className="title is-size-5">
                    {result.Name}
                  </span> - {result?.Address1} {result?.Address2} {result?.City} {result?.State} {result.Zip}</a>
                </div>
            ) : ""}
          </div>
          <div>
            {serviceResults && serviceResults != undefined ? serviceResults.map(result =>   
              <div className="box" key={result.id}>
                <div className="title is-size-7">Service</div>
                <a onClick={() => handleClick('Services', result.id)}>
                  <span className="title is-size-5">
                    {result.AssetID}
                  </span> - {result.LocationName}</a>
                </div>
            ) : ""}
          </div>
      </div>
    </Page>
  )
}
export default Search