import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { db } from '../Contexts/firebase'


export default function useBuildForm({fields}) {
  const [data, setData] = useState()
  const [collection, setCollection] = useState()
  const [pageFields, setPageFields] = useState()
  
  return
}
