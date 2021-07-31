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

import NetworkGraphComponent from '../../Components/NetworkGraph/NetworkGraphComponent'

import { serviceGridColumns,
         serviceGroupByFields,
         serviceMobileGridColumns,
         locationGridColumns,
         locationGroupByFields,
         locationMobileGridColumns,
         ticketGridColumns,
         ticketGroupByFields,
         ticketMobileGridColumns,
         orderGridColumns,
         orderGroupByFields,
         orderMobileGridColumns,
         orderGroupByFields,
         accountGridColumns,
         accountGroupByFields,
         accountMobileGridColumns,
         userGridColumns,
         userGroupByFields,
         contractGridColumns,
         contractGroupByFields } from '../../Contexts/initialFields'

import {serviceGroupByFields as groupByOptions} from '../../Contexts/initialFields'

import SelectView from '../../Components/Grids/SelectView'
import TabBar from '../../Components/Tabs/TabBar'
import Columns from '../../Components/Layout/Columns'
import Column from '../../Components/Layout/Column'

import { useSortHook } from '../../Hooks/useSortHook'

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
  
  const [groupByOptions, setGroupByOptions] = useState(serviceGroupByFields)

  const [groupBy, setGroupBy] = useState("ALL")  

  const [networkMap, setNetworkMap] = useState(false)

  const { sortedArr, sortArr } = useSortHook()

  
  
  useEffect(() => {
    grid === 'SERVICES' ? setGroupByOptions(serviceGroupByFields) : 
    grid === 'TICKETS' ? setGroupByOptions(ticketGroupByFields) :
    grid === 'ORDERS' ? setGroupByOptions(orderGroupByFields) :
    grid === 'ACCOUNTS' ? setGroupByOptions(accountGroupByFields) :
    grid === 'LOCATIONS' ? setGroupByOptions(locationGroupByFields) :
    grid === 'NETWORK' ? setNetworkMap(!networkMap) :
    setGroupByOptions(serviceGroupByFields)
  },[grid])

  const handleSorting = (sortBy, colRef) => {
   const sortedArray = sortArr(sortBy, colRef)
   console.log("this:", sortedArray)

     setLocations(sortedArr) 
      
    
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

  const handleLocationClick = (id) => {
    history.push({
      pathname: `/Locations/${currentCompanyID}/${id}`,
      state: {
      id: id,
      currentCompanyID: currentCompanyID,
      cachedLocations: locations,
      cachedAccounts: accounts
      
      }
    })
}
  
  /** Handle Change when choosing different Grid via Selector */

  const handleGridChange = (e) => {
    const {value} = e.target
    console.log(value)
    setGrid(value)
    setCurrentGrid(value)
    
  }
  
  /** Modifty Grid Name to Title Case */

  const modGridStr = (str) => {
    const strLower = str.toLowerCase()
    return str.charAt(0).toUpperCase() + strLower.slice(1)
  }

  /** Add New Document Button */

  const handleAddClick = (id) => {
    const isModule = modGridStr(grid)
    history.push({
      pathname: `/${isModule}/${currentCompanyID}/${id}`,
      state: {
      currentCompanyID: currentCompanyID,
      isNew: "true",
      isDrawerActive: "true",
      }
    })
  }

  

return (
  <>
    <div className="is-flex is-justify-content-flex-end">
    <Columns options="is-mobile pr-3 pb-3 is-gapless">
      <Column size="is-narrow mr-2 mt-1">View</Column>
      <Column size="is-narrow mr-2">
        <SelectView onChange={(e)=>handleGridChange(e)} value={grid}>
        <option value="SERVICES">Services</option>
        <option value="TICKETS">Tickets</option>
        <option value="ORDERS">Orders</option>
        <option value="ACCOUNTS">Accounts</option>
        <option value="LOCATIONS">Locations</option>
        <option value="USERS">Users</option>
        <option value="CONTRACTS">Contracts</option>
        <option value="NETWORK">Network Map</option>
        </SelectView>
      </Column>
      <Column size="is-narrow mr-2">
        <div className="select is-rounded is-small">
        <select onChange={(e) => setGroupBy(e.target.value)} value={groupBy}>
          <option value="ALL">Show All</option>
          {groupByOptions.map(groupOption => (
            <option value={groupOption.Value}>Group by {groupOption.Label}</option>
          ))}
        </select>
        </div>
      </Column>
      <Column size="is-1">
        <button className="button is-rounded is-link is-small" onClick={()=>handleAddClick()}>Add</button>
      </Column>
      
    </Columns>
    </div>

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
    
    <div className={grid === 'SERVICES' ? "" : "is-hidden"}>
      <GridGroup
        data={grid === "SERVICES" ? services : null}
        isGrid='Services'
        headerFields={serviceGridColumns}
        mobileHeaderFields={serviceMobileGridColumns}
        handleClick={(e) => handleServiceClick(e)}
        handleSort={(e)=>handleSorting(e)}
        groupBy={groupBy}
      />
    </div>
    <div className={grid === 'TICKETS' ? "" : "is-hidden"}>
      <GridGroup
        data={grid === "TICKETS" ? tickets : null}
        isGrid='Tickets'
        headerFields={ticketGridColumns}
        mobileHeaderFields={ticketMobileGridColumns}
        handleClick={(e) => handleTicketClick(e)}
        groupBy={groupBy}
      />
    </div>
    <div className={grid === 'ORDERS' ? "" : "is-hidden"}>
      <GridGroup
        data={grid === "ORDERS" ? orders : null}
        isGrid='Orders'
        headerFields={orderGridColumns}
        mobileHeaderFields={orderMobileGridColumns}
        handleClick={(e) => handleOrderClick(e)}
        groupBy={groupBy}
      />
    </div>
    <div className={grid === 'ACCOUNTS' ? "" : "is-hidden"}>
      <GridGroup
        data={grid === "ACCOUNTS" ? accounts : null}
        isGrid='Accounts'
        headerFields={accountGridColumns}
        mobileHeaderFields={accountMobileGridColumns}
        handleClick={(e) => handleAccountClick(e)}
        groupBy={groupBy}
      />
    </div>
    <div className={grid === 'LOCATIONS' ? "" : "is-hidden"}>
      <GridGroup
        data={grid === "LOCATIONS" ? locations : null}
        isGrid='Locations'
        headerFields={locationGridColumns}
        mobileHeaderFields={locationMobileGridColumns}
        handleClick={(e) => handleLocationClick(e)}
        handleSort={(sortBy, colRef)=>handleSorting(sortBy, colRef)}
        groupBy={groupBy}
      />
    </div>

{/** Replaced with Grid Component
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
        {/** Network Graph 
          <div className={grid === 'NETWORK' ? "card" : "is-hidden"}>
            <NetworkGraphComponent 
              data={locations && locations}
            />
          </div>
      */}
    
  
  </>
  
  )
}


export default DashboardGrids
