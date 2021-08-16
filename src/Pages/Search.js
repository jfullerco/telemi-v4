import React from 'react'
import {searchResults, setSearchValue} from '../Hooks/useSearch'

const Search = () => {

  const [searchResults, setSearchValue] = useSearch()

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