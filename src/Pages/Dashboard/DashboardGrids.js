import React, {useState, useEffect, useContext, useRef} from 'react'
import { useHistory, Link } from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer';
import Paper from '@material-ui/core/Paper';

import { stateContext } from '../../Contexts/stateContext'
import { db } from '../../Contexts/firebase'

import GridComponent from './Components/GridComponent'
import GridGroup from '../../Components/Grids/GridGroup'
import {useGroupBy, handleIsGroupReducer} from '../../Hooks/useGroupBy'
import {useFilterArray} from '../../Components/Tables/useFilterArray'

import { serviceGridColumns,
         serviceMobileGridColumns,
         ticketGridColumns,
         ticketMobileGridColumns,
         ticketGroupByFields,
         orderGridColumns,
         orderMobileGridColumns,
         orderGroupByFields,
         accountGridColumns,
         accountGroupByFields,
         userGridColumns,
         userGroupByFields,
         contractGridColumns,
         contractGroupByFields } from '../../Contexts/initialFields'

import {serviceGroupByFields as groupByOptions} from '../../Contexts/initialFields'

import SelectView from '../../Components/Grids/SelectView'
import TabBar from '../../Components/Tabs/TabBar'
import Columns from '../../Components/Layout/Columns'
import Column from '../../Components/Layout/Column'



const DashboardGrids = ({visible}) => {

  const userContext = useContext(stateContext)
  const history = useHistory()

  const { isStyle, 
          fetchLocations,
          fetchServices,
          fetchTickets,
          fetchOrders,
          fetchAccounts,
          fetchBills,
          fetchUsers,
          fetchContracts,
          setLocations,
          setServices,
          setTickets,
          setOrders,
          setAccounts,
          setUsers,
          setBills,
          setContracts,
          setDataLoading,
          setCurrentGrid, } = userContext

  const { dataLoading,
          currentUser,
          currentCompany,
          currentCompanyID,
          locations,
          services,
          tickets,
          orders,
          accounts,
          bills,
          users,
          contracts,
          currentGrid } = userContext.userSession

  const searchRef = useRef("")

  const [grid, setGrid] = useState(currentGrid != undefined ? currentGrid : "SERVICES")
  const [groupBy, setGroupBy] = useState('Type')
  

   
    
  
  const handleChangeSearchServices = (e) => {
    
    const {value} = e.target
    value == "" ? fetchServices() : ""
    const servicesAC = services.filter(({LocationName, AssetID, Vendor, Type}) => LocationName.indexOf(value) > -1 || AssetID.indexOf(value) > -1 || Vendor.indexOf(value) > -1 || Type.indexOf(value) > -1 )
    searchRef.current = value
    setServices(servicesAC)   
  }

  const handleServicesSuggestedRef = (name, id) => {
    console.log(name)
    console.log(id)
    ticketLocationID.current = id
    ticketLocationName.current = name
    setDropDown("")
  }
  
/**Row Clicks */
  const handleServiceClick = (id) => {
                  
                    history.push({
                      pathname: `/Services/${currentCompanyID}/${id}`,
                      state: {
                        currentCompanyID: currentCompanyID,
                        cachedLocations: locations,
                        cachedAccounts: accounts,
                        cachedServices: services,
                      }
                    })
  }

  const handleTicketClick = (id) => {
                    history.push({
                      pathname: `/Tickets/${currentCompanyID}/${id}`,
                      state: {
                      id: id,
                      services: services,
                      locations: locations,
                      accounts: accounts,
                      tickets: tickets
                      }
                    })
  }

  const handleAccountClick = (id) => {
                    history.push({
                      pathname: `/Accounts/${currentCompanyID}/${id}`,
                      state: {
                      id: id,
                      services: services,
                      locations: locations,
                      accounts: accounts
                      }
                    })
  }

  const handleOrderClick = (id) => {
                    history.push({
                      pathname: `/Orders/${currentCompanyID}/${id}`,
                      state: {
                      id: id,
                      currentCompanyID: currentCompanyID,
                      cachedLocations: locations,
                      cachedAccounts: accounts
                      
                      }
                    })
  }
  
{/**Add Buttons */}
  const handleAddServiceBtn = (id) => {
                    history.push({
                      pathname: `/Services/${currentCompanyID}/${id}`,
                      state: {
                      currentCompanyID: currentCompanyID,
                      isNew: "true",
                      isDrawerActive: "true",
                      cacheLocations: locations && locations
                      }
                    })
  }

  const handleAddOrderBtn = (id) => {
                    history.push({
                      pathname: `/Orders/${currentCompanyID}/${id}`,
                      state: {
                      isNew: "true",
                      isDrawerActive: "true",
                      services: services,
                      locations: locations,
                      orders: orders
                      }
                    })
  }

  const handleAddTicketBtn = (id) => {
                    history.push({
                      pathname: `/Tickets/${currentCompanyID}/${id}`,
                      state: {
                      isNew: "true",
                      isDrawerActive: "true",
                      services: services,
                      locations: locations,
                      accounts: accounts,
                      tickets: tickets
                      }
                    })
  }

  const handleAddAccountBtn = (id) => {
                    {
                    history.push({
                      pathname: `/Accounts/${currentCompanyID}/${id}`,
                      state: {
                      isNew: "true",
                      isDrawerActive: "true",
                      services: services,
                      locations: locations,
                      accounts: accounts,
                      tickets: tickets
                      }
                    })
  }
  }

  const handleFilterServiceClick = (data, colRef, filterRef) => {
     
    const filteredArray = useFilterArray(data, colRef, filterRef)
    setServices(filteredArray)

  }

  const handleFilterTicketClick = (data, colRef, filterRef) => {
     
    const filteredArray = useFilterArray(data, colRef, filterRef)
    setTickets(filteredArray)

  }

  const handleFilterOrderClick = (data, colRef, filterRef) => {
     
    const filteredArray = useFilterArray(data, colRef, filterRef)
    setOrders(filteredArray)

  }

  const handleFilterAccountClick = (data, colRef, filterRef) => {
     
    const filteredArray = useFilterArray(data, colRef, filterRef)
    setAccounts(filteredArray)

  }
  
  const handleGridChange = (e) => {
    const {value} = e.target
    console.log(value)
    setGrid(value)
    setCurrentGrid(value)
  }

  

return (
  <>

    <Columns options="is-mobile is-justify-content-flex-end">
      <Column size="is-narrow">
        <SelectView onChange={(e)=>handleGridChange(e)}>
        <option value="SERVICES">Services</option>
        <option value="TICKETS">Tickets</option>
        <option value="ORDERS">Orders</option>
        <option value="ACCOUNTS">Accounts</option>
        <option value="USERS">Users</option>
        <option value="CONTRACTS">Contracts</option>
        </SelectView>
      </Column>
      <Column size="is-narrow">
        <div className="select is-rounded is-small">
        <select onChange={(e) => setGroupBy(e.target.value)}>
          {groupByOptions.map(groupOption => (
            <option value={groupOption.Value} >Group by {groupOption.Label}</option>
          ))}
        </select>
        </div>
      </Column>
      <Column size="is-narrow">
        <button className="button is-rounded is-link is-small">Add</button>
      </Column>
      <Column size="is-narrow">
       <span className="pr-5"> <button className="button is-rounded is-small">Print</button></span>
      </Column>
    </Columns>
   

    {/** 
     * 
     * 
     * <GridGroup
      data={services}
      isGrid='Services'
      headerFields={serviceGridColumns}
      handleClick={(e)=> handleServiceClick(e)}
    />
    */}
    

    <GridGroup
      data={grid === "SERVICES" ? services : null}
      isGrid='Services'
      headerFields={serviceGridColumns}
      mobileHeaderFields={serviceMobileGridColumns}
      handleClick={(e) => handleServiceClick(e)}
      groupBy={groupBy}
    />

    <GridGroup
      data={grid === "TICKETS" ? tickets : null}
      isGrid='Tickets'
      headerFields={ticketGridColumns}
      mobileHeaderFields={ticketMobileGridColumns}
      handleClick={(e) => handleTicketClick(e)}
      groupBy={groupBy}
    />

    <GridGroup
      data={grid === "ORDERS" ? orders : null}
      isGrid='Orders'
      headerFields={orderGridColumns}
      mobileHeaderFields={orderMobileGridColumns}
      handleClick={(e) => handleOrderClick(e)}
      groupBy={groupBy}
    />

{/** 
 * <GridComponent 
      label="SERVICES"
      headerFields={serviceGridColumns}
      data={services}
      resetter={(e)=>setServices(e)}
      handleFilter={(e)=>handleFilterServiceClick(e)}
      handleSearch={(e)=>handleChangeSearchServices(e)}
      handleClick={(e)=>handleServiceClick(e)}
      handleAddBtn={() => handleAddServiceBtn()}
      isVisible={grid}
      isGrid="SERVICES"
      toggleIsVisible={()=>{setServiceIsVisible(!serviceIsVisible)}}
    />

    <GridComponent 
      label="TICKETS"
      headerFields={ticketGridColumns}
      data={tickets}
      resetter={(e)=>setTickets(e)}
      handleFilter={(e)=>handleFilterTicketClick(e)}
      handleSearch={(e)=>handleChangeSearchTickets(e)}
      handleClick={(e)=>handleTicketClick(e)}
      handleAddBtn={() => handleAddTicketBtn()}
      isVisible={grid}
      isGrid="TICKETS"
      toggleIsVisible={()=>{setTicketIsVisible(!ticketIsVisible)}}
    /> 

    <GridComponent 
      label="ORDERS"
      headerFields={orderGridColumns}
      data={orders}
      resetter={(e)=>setOrders(e)}
      handleFilter={(e)=>handleFilterOrderClick(e)}
      handleClick={(e)=>handleOrderClick(e)}
      handleAddBtn={() => handleAddOrderBtn()}
      isVisible={grid}
      isGrid="ORDERS"
      toggleIsVisible={()=>{setOrderIsVisible(!orderIsVisible)}}
    /> 

    <GridComponent 
      label="ACCOUNTS"
      headerFields={accountGridColumns}
      data={accounts}
      resetter={(e)=>setAccounts(e)}
      handleFilter={(e)=>handleFilterAccountClick(e)}
      handleClick={(e)=>handleAccountClick(e)}
      handleAddBtn={() => handleAddAccountBtn()}
      isVisible={grid}
      isGrid="ACCOUNTS"
      toggleIsVisible={()=>{setAccountIsVisible(!accountIsVisible)}}
    /> 

    <GridComponent 
      label="USERS"
      headerFields={userGridColumns}
      data={users}
      handleClick={(e)=>handleAccountClick(e)}
      handleAddBtn={() => history.push("/adduser")}
      isVisible={grid}
      isGrid="USERS"
      toggleIsVisible={()=>{setUserIsVisible(!userIsVisible)}}
    /> 

    <GridComponent 
      label="CONTRACTS"
      headerFields={contractGridColumns}
      data={contracts}
      handleClick={(e)=>handleAccountClick(e)}
      handleAddBtn={() => history.push("/addcontract")}
      isVisible={grid}
      isGrid="CONTRACTS"
      toggleIsVisible={()=>{setContractIsVisible(!contractIsVisible)}}
    />
*/}
    
    <p/>
    
  
  
  </>
  
  )
}


export default DashboardGrids
