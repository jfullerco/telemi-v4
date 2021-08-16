import React from 'react'
import { useSearchHook } from '../Hooks/useSearchHook'

const Search = () => {

  const [searchResults, setSearchValue] = useSearchHook()

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
  }

  console.log(searchResults)

  return(

    <div className="hero is-large">
      <p className="block"/>
      <input type='text' onChange={(e) => handleSearch(e)} />

      {searchResults && searchResults != undefined ? searchResults.map(result => 
        <li key={result.id}>
          {console.log(result)}
        </li>
      ) : ""}
    </div>

  )
}
export default Search