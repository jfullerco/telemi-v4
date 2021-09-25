import React, { useState, useEffect, useContext } from 'react'
import {stateContext} from '../Contexts/stateContext'

export function useRefreshDataHook() {
  const userContext = useContext(stateContext)
  const {refreshServices,
    refreshOrders,
    refreshTickets,
    refreshLocations,
    refreshAccounts,
    refreshBills,
    refreshUsers,
    refreshContracts,
    refreshNotes
  } = userContext
  const {currentModule} = userContext.userSession

   function refreshModule(currentModule) {
    switch (currentModule) {
      case "Services": 
        return (
          refreshServices() 
        )
      case "Accounts":
        return (
          refreshAccounts()
        )
      case "Orders":
        return (
          refreshOrders()
        )
      case "Tickets":
        return (
          refreshTickets()
        )
      case "Locations":
        return (
          refreshLocations()
        )
      case "Contracts":
        return (
          refreshContracts()
        )
      case "Bills":
        return (
          refreshBills()
        )
      case "Notes": 
        return (
          refreshNotes()
        )
      case "Users":
        return (
          refreshUsers()
        )
    }
  }
  return {refreshModule}
}
