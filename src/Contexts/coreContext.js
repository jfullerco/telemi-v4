import React, { useState, createContext, useContext } from 'react'

export const coreContext = createContext({})

export const CoreProvider = (props) => {
    
  const {Provider} = coreContext
  const coreModules = [
    {
      id: "",
      Name: "Services"
    },
    {
      id: "",
      Name: "Accounts"
    },
    {
      id: "",
      Name: "Bills"
    },
    {
      id: "",
      Name: "Companies"
    },
    {
      id: "",
      Name: "Contracts"
    },
    {
      id: "",
      Name: "Contacts"
    },
    {
      id: "",
      Name: "Locations"
    },
    {
      id: "",
      Name: "Orders"
    },
    {
      id: "",
      Name: "Tickets"
    },
    {
      id: "",
      Name: "Users"
    }
  ]
  const coreFieldTypes = [
    {
      id: "",
      Name: "text",
      Params: [
        "label",
        "dataField",
        "tab"
      ]
    },
    {
      id: "",
      Name: "select",
      Params: [
        "label",
        "dataField",
        "inputSource",
        "inputID",
        "inputValue",
        "tab"
      ]
    },
    {
      id: "",
      Name: "related-select",
      Params: [
        "label",
        "dataField",
        "inputSource",
        "inputID",
        "inputValue",
        "relatedCollection",
        
      ]
    }
  ]
  return (
    <Provider value={{ 
      }}>
      {props.children}
    </Provider>
  )
}