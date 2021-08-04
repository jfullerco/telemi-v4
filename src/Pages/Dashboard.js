import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { stateContext } from '../Contexts/stateContext'

import { db } from '../Contexts/firebase'

import CompanyList from './Companies/CompanyList'

import Loading from '../Components/Loading'

import DashboardGrids from './Dashboard/DashboardGrids'

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
          fetchUsers,
          fetchContracts,
          setLocations,
          setServices,
          setTickets,
          setOrders,
          setAccounts,
          setUsers,
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
    
  const history = useHistory()

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
    
    fetchPageData()
  },[loading])

  useEffect(()=> {
    fetchPageData()
  },[currentCompany])

  const fetchUser = async(email) => {
    
    const userRef = await db.collection("Users").where("Email", "==", email).get()
    const user = await userRef.docs.map(doc => ({id: doc.id, FirstName: doc.FirstName, Type: doc.Type, ...doc.data()}))
    
    await setUserFirstName(user[0].FirstName)
    await setUserType(user[0].Type)
    
  }

  const isCurrentCompany = () => {
    userType != "" & userType === "Admin" ?
    currentCompany == "" ? fetchCompaniesAdmin() : "" : 
    currentCompany == "" ? fetchCompanies() : ""
  }

  const fetchPageData = async() => {
    
      await fetchLocations(),
      await fetchServices(),
      await fetchTickets(),
      await fetchOrders(),
      await fetchAccounts()
      await fetchUsers()
      await fetchContracts()
      const timer = setTimeout(() => {
        setLoading(false)
      }, 1500)
      
      return () => clearTimeout(timer)
  }

  const fetchCompanies = async() => {
    const companiesRef = await db.collection("Companies").where("Users", "array-contains", currentUser).get() 
     
    const companies = await companiesRef.docs.map(doc => ({id: doc.id, ...doc.data()}))
    
    setCurrentCompanyID(companies[0].id)
    setCurrentCompany(companies[0].Name)
    setCompanies(companies)
    setDataLoading(false)
    
  }

  const fetchCompaniesAdmin = async() => {
    const companiesRef = await db.collection("Companies").get() 
    
    const companies = await companiesRef.docs.map(doc => ({id: doc.id, ...doc.data()}))
    
    setCurrentCompanyID(companies[0].id)
    setCurrentCompany(companies[0].Name)
    setCompanies(companies)
    setDataLoading(false)
    
  }
  
  return (   
    <Loading active={loading}>

      {currentUser != undefined ?
        <>
          <section className="hero is-small">
            <div className="hero-body">

              <CompanyList />

            </div>
          </section>

          <div className={toggleCompanyList != false ? "block" : "is-hidden"} id="companyList">

            <CompanyList />

          </div>

          <div className="">

            <DashboardGrids />
            

          </div>
        </>
        :
        <>

          <Login />

        </>
      }
    </Loading>
  )
}

export default Dashboard