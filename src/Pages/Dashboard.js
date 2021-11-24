import React, { useState, useEffect, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { stateContext } from '../Contexts/stateContext'
import { getFirestore, collection, onSnapshot, query, where, getDocs } from 'firebase/firestore'
import { db } from '../Contexts/firebase'

import CompanyList from './Companies/CompanyList'
import Columns from '../Components/Layout/Columns'
import Column from '../Components/Layout/Column'
import Loading from '../Components/Loading'

import DashboardGrids from './Dashboard/DashboardGrids'
import CompanyMenu from '../Components/Menu/Menu'
import Login from './Login'


const Dashboard = () => {
  
  const userContext = useContext(stateContext)
  const { setUserType,
          setUserFirstName,
          setCurrentCompany, 
          setCurrentCompanyID, 
          setCompanies, 
          setDataLoading,
          fetchLocations,
          fetchServices,
          fetchTickets,
          fetchOrders,
          fetchAccounts,
          fetchBills,
          fetchEvents,
          fetchUsers,
          fetchContracts,
          setLocations,
          setServices,
          setTickets,
          setOrders,
          setAccounts,
          setUsers,
          setUserDefaults,
          setBills,
          setContracts } = userContext

  const { currentUser, 
          userType, 
          currentCompany, 
          companies,
          dataLoading,
          currentCompanyID,
          locations,
          services,
          tickets,
          orders,
          accounts,
          bills,
          users,
          contracts } = userContext.userSession
    
  

  const isUserLoggedIn = currentUser != undefined ? currentUser : ""
  const isUserAdmin = userType != undefined ? userType : ""
  const isReadyForPageBuild = userType != undefined ? userType : ""
  

  const [ toggleCompanyList, setToggleCompanyList ] = useState(false)
  const [ toggleDashboard, setToggleDashboard ] = useState(false)
  const [ loading, setLoading ] = useState(false)
  
  

  useEffect(() => {
    fetchUser(currentUser)
    
  },[isUserLoggedIn])

  useEffect(() => {
    isCurrentCompany()
    setLoading(true)
  },[isUserAdmin])

  useEffect(() => {
    loading != false ? fetchPageData() : ""
  },[loading])

  useEffect(()=> {
    fetchPageData()
  },[currentCompany])

  const fetchUser = async(email) => {
    
    const q = query(collection(db, "Users"), where("Email", "==", email))
    const userRef = await getDocs(q)
    const user = userRef.docs.map(doc => ({id: doc.id, FirstName: doc.FirstName, Type: doc.Type, ...doc.data()}))
    //console.log(user)
    await setUserFirstName(user[0]?.FirstName)
    await setUserType(user[0]?.Type)
    await setUserDefaults(user[0]?.Defaults)
    
  }

  const isCurrentCompany = () => {
    userType != "" & userType === "Admin" ?
    currentCompany === "" ? fetchCompaniesAdmin() : "" : 
    currentCompany === "" ? fetchCompanies() : ""
    
  }

  const fetchPageData = async() => {
    
      await fetchLocations(),
      await fetchServices(),
      await fetchTickets(),
      await fetchOrders(),
      await fetchAccounts(),
      await fetchBills(),
      await fetchEvents(),
      await fetchUsers()
      await fetchContracts()
      const timer = setTimeout(() => {
        setLoading(false)
      }, 1500)
      
      return () => clearTimeout(timer)
      
  }

  const fetchCompanies = async() => {
    const q = query(collection(db, "Companies"), where("Users", "array-contains", currentUser))
    const companiesRef = await getDocs(q)
     
    const companies = await companiesRef.docs.map(doc => ({id: doc.id, ...doc.data()}))
    
    setCurrentCompanyID(companies[0]?.id)
    setCurrentCompany(companies[0]?.Name)
    setCompanies(companies)
  }

  const fetchCompaniesAdmin = async() => {

    const q = query(collection(db, 'Companies'))

    const companiesRef = await getDocs(collection(db, "Companies"))

    const companies = await companiesRef.docs.map(doc => ({id: doc.id, ...doc.data()}))
    
    setCurrentCompanyID(companies[0].id)
    setCurrentCompany(companies[0].Name)
    setCompanies(companies)
  }

  const handleCompanyMenuClick = (e) => {
    setLoading(true)
    const {id, Name} = e
    setCurrentCompany(Name)
    setCurrentCompanyID(id)
  }
  
  return (   
    <Loading active={loading}>

      {currentUser != undefined ?
        <Columns options="is-12 is-mobile ">
          <Column size="is-3 is-hidden-mobile">
          
            <CompanyMenu 
              data={companies && companies}
              handleClick={(e) => handleCompanyMenuClick(e)}
              active={currentCompanyID}
            />
          
          </Column>
          <Column size="is-hidden"></Column>
        <Column>
        <>
          
            <div className="pt-4 pl-4 is-hidden-tablet">
              <CompanyList /> 
            </div>
          

          <div className="block">

            <DashboardGrids />
            
          </div>
        </>
        </Column>
        <Column size="is-hidden"></Column>
        </Columns>
        :
        <>

          <Login />

        </>
        
      }
    </Loading>
  )
}

export default Dashboard