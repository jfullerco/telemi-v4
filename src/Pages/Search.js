import React from 'react'
import {searchResults, setSearchValue} from '../Hooks/useSearchHook'

const Search = () => {

  const {searchResults, setSearchValue} = useSearchHook()

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
  }

  console.log(searchResults)

  return(

    <>
      <input type='text' onChange={(e) => handleSearch(e)} />

      {searchResults != undefined ? searchResults.map(result => 
        <div>
          {...result}
        </div>
      ) : ""}
    </>

  )
}
export default Search