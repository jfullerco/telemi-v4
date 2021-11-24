import React, { useState, useCallback } from 'react'

export function useMappedArray() {
    const [mappedArray, setMappedArray] = useState([])
    const [obj, setObj] = useState({})
    const [arr, setArr] = useState([])
    const [currObj, setCurrObj] = useState({})
    const [currArr, setCurrArr] = useState([])

    const addArray = () => {
        const copyMappedArray = [...mappedArray]
        const newArr = [...copyMappedArray, arr]
        setMappedArray([...newArr])
    }

    const addObjectToArray = (prev) => {
        
    }

    const removeFromArray = (index) => {
        const newArr = mappedArray.filter((f, i) => i !== index)
        setMappedArray([...newArr])
    }



    const changeToEntry = (e) => {
        const {name, value} = e.target
        const newEntry = {currentEntry && ...currentEntry, [name]: value}
        setCurrentEntry(newEntry)
    }

    const handleSaveEntry = () => {

    }
}