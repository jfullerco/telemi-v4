import React, {useState, createContext, useReducer} from 'react'
import stateReducer from './stateReducer'
import {db} from './firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'



export const stateContext = createContext({})

export const StateProvider = (props) => {
    
    const {Provider} = stateContext

    const initialState = {

      userType: "",
      currentUser: "",
      userFirstName: "",
      loggedIn: false,
      companies: "",
      services: "",
      locations: "",
      accounts: "",
      bills: "",
      orders: "",
      quotes: "",
      contracts: "",
      notes: "",
      users: "",
      userDefaults: "",
      currentCompanyID: "",
      currentCompany: "",
      currentLocationID: "",
      currentLocationName: "",
      currentServiceID: "",
      currentServiceName: "",
      currentTicketID: "",
      currentTicketNum: "",
      currentOrderID: "",
      currentOrderNum: "",
      currentAccountID: "",
      currentAccountNum: "",     
      dataLoading: false,

    }
    

    //** Global Service Calls */

    const fetchLocations = async() => {
      const q = query(collection(db, "Locations"),
      where("CompanyID", "==", userSession.currentCompanyID))
      const locationsRef = await getDocs(q)
      const locations = locationsRef.docs.map(doc => ({
        id: doc.id, 
        ...doc.data()
      }))
      console.log('Fetched Locations')
      setLocations(locations)
    }

    const refreshLocations = async(id) => {
      const q = query(collection(db, "Locations"), 
      where("CompanyID", "==", id))
      const locationsRef = await getDocs(q)
      const locations = locationsRef.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      console.log('Refreshed Locations')
      setLocations(locations)
    }

    const fetchServices = async() => {
      const q = query(collection(db, "Services"),
      where("CompanyID", "==", userSession.currentCompanyID))
      const servicesRef = await getDocs(q)
      const services = servicesRef.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setServices(services)
      console.log("Fetched Services")
    }

    const refreshServices = async() => {
      const q = query(collection(db, "Services"), 
      where("CompanyID", "==", userSession.currentCompanyID))
      const servicesRef = await getDocs(q)
      const services = servicesRef.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setServices(services)
      console.log("Refreshed Services")
    }

    const fetchTickets = async() => {
      const q = query(collection(db, "Tickets"), where("CompanyID", "==", userSession.currentCompanyID))
      const ticketsRef = await getDocs(q)
      const tickets = ticketsRef.docs.map(doc => ({
        id: doc.id,
        ...doc.data()}))
      setTickets(tickets)
      console.log("Fetched Tickets")
    }

    const refreshTickets = async() => {
      const q = query(collection(db, "Tickets"), where("CompanyID", "==", userSession.currentCompanyID))
      const ticketsRef = await getDocs(q)
      const tickets = ticketsRef.docs.map(doc => ({
        id: doc.id,
        ...doc.data()}))
      setTickets(tickets)
      console.log("Refreshed Tickets")
    }

    const fetchOrders = async() => {
      const q = query(collection(db, "Orders"), where("CompanyID", "==", userSession.currentCompanyID))
      const ordersRef = await getDocs(q)
      const orders = ordersRef.docs.map(doc => ({
        id: doc.id,
        ...doc.data()}))
      setOrders(orders)
      console.log("Fetched Orders")
    }

    const refreshOrders = async() => {
      const q = query(collection(db, "Orders"), where("CompanyID", "==", userSession.currentCompanyID))
      const ordersRef = await getDocs(q)
      const orders = ordersRef.docs.map(doc => ({
        id: doc.id,
        ...doc.data()}))
      setOrders(orders)
      console.log("Refreshed Orders")
    }

    const fetchAccounts = async() => {
      const q = query(collection(db, "Accounts"), where("CompanyID", "==", userSession.currentCompanyID))
      const accountsRef = await getDocs(q)
      const accounts = accountsRef.docs.map(doc => ({
        id: doc.id,
        ...doc.data()}))
      setAccounts(accounts)
    }

    const refreshAccounts = async() => {
      const q = query(collection(db, "Accounts"), where("CompanyID", "==", userSession.currentCompanyID))
      const accountsRef = await getDocs(q)
      const accounts = accountsRef.docs.map(doc => ({
        id: doc.id,
        ...doc.data()}))
      setAccounts(accounts)
    }

    const fetchBills = async() => {
      const q = query(collection(db, "Bills"), where("CompanyID", "==", userSession.currentCompanyID))
      const billsRef = await getDocs(q)
      const bills = billsRef.docs.map(doc => ({
        id: doc.id, 
        ...doc.data()
      }))
      setBills(bills)
    }
    
    const refreshBills = async() => {
      const q = query(collection(db, "Bills"), where("CompanyID", "==", userSession.currentCompanyID))
      const billsRef = await getDocs(q)
      const bills = billsRef.docs.map(doc => ({
        id: doc.id, 
        ...doc.data()
      }))
      setBills(bills)
    }

    const fetchUsers = async() => {
      const q = query(collection(db, "Users"), where("Companies", "array-contains", userSession.currentCompanyID))
      const usersRef = await getDocs(q)
      const users = usersRef.docs.map(doc => ({
        id: doc.id,
        ...doc.data()}))
      setUsers(users)
    }

    const refreshUsers = async() => {
      const q = query(collection(db, "Users"), where("Companies", "array-contains", userSession.currentCompanyID))
      const usersRef = await getDocs(q)
      const users = usersRef.docs.map(doc => ({
        id: doc.id,
        ...doc.data()}))
      setUsers(users)
    }

    const fetchNotes = async() => {
      const q = query(collection(db, "Notes"), where("CompanyID", "==", userSession.currentCompanyID))
      const notesRef = await getDocs(q)
      const notes = notesRef.docs.map(doc => ({
        id: doc.id,
        ...doc.data()}))
      setNotes(notes)
    }

    const refreshNotes = async() => {
      const q = query(collection(db, "Notes"), where("CompanyID", "==", userSession.currentCompanyID))
      const notesRef = await getDocs(q)
        .where("CompanyID", "==", userSession.currentCompanyID).get()
      const notes = notesRef.docs.map(doc => ({
        id: doc.id,
        ...doc.data()}))
      setNotes(notes)
    }

    const fetchContracts = async() => {
      const q = query(collection(db, "Contracts"), where("CompanyID", "==", userSession.currentCompanyID))
      const contractsRef = await getDocs(q)
      const contracts = contractsRef.docs.map(doc => ({
        id: doc.id,
        ...doc.data()}))
      setContracts(contracts)
    }

    const refreshContracts = async() => {
      const q = query(collection(db, "Contracts"), where("CompanyID", "==", userSession.currentCompanyID))
      const contractsRef = await getDocs(q)
      const contracts = contractsRef.docs.map(doc => ({
        id: doc.id,
        ...doc.data()}))
      setContracts(contracts)
    }

    const handleSubmitNew = async(isModule, data) => {
    
      try {
        await db.collection(isModule).doc().set(data) 
      } catch {
        console.log("Error submitting new document")
      } 

    }
    
    /** Global Style Variables */
    const isStyle = {
      headerStyle: {
        borderBottomStyle: "solid",
        bottomBorderColor: "black"
      }
    }

    const [toggleAdmin, setToggleAdmin] = useState(false)
    const [toggleDevTools, setToggleDevTools] = useState(false)

    const fetchCompanies = async(currentUser) => {
      const q = query(collection(db, "Companies"), where("Users", "array-contains", currentUser))
      return await getDocs(q)
    }
    
    const [userSession, dispatch] = useReducer(stateReducer, initialState)

      const setUserFirstName = (name) => {
        dispatch({
          type: "SET_USER_FNAME",
          payload: name
        })
      };  

      const setUserType = (userType) => {
        dispatch({
          type: "SET_USER_TYPE",
          payload: userType
        })
      };

      const setCurrentUser = (user) => {
        dispatch({
          type: "SET_CURRENT_USER",
          payload: user
        })
      };
    
      const setLoggedIn = (loginState) => {
          dispatch({
            type: "LOGGED_IN",
            payload: loginState
          })
      };

      const setCompanies = (companies) => {
        dispatch({
          type: "SET_COMPANIES",
          payload: companies
        })
      };

      const setLocations = (locations) => {
        dispatch({
          type: "SET_LOCATIONS",
          payload: locations
        })
      };

      const setServices = (services) => {
        dispatch({
          type: "SET_SERVICES",
          payload: services
        })
      };

      const setTickets = (tickets) => {
        dispatch({
          type: "SET_TICKETS",
          payload: tickets
        })
      };

      const setOrders = (orders) => {
        dispatch({
          type: "SET_ORDERS",
          payload: orders
        })
      }

      const setAccounts = (accounts) => {
        dispatch({
          type: "SET_ACCOUNTS",
          payload: accounts
        })
      };

      const setBills = (bills) => {
        dispatch({
          type: "SET_BILLS",
          payload: bills
        })
      };

      const setUsers = (users) => {
        dispatch({
          type: "SET_USERS",
          payload: users
        })
      }

      const setContracts = (contracts) => {
        dispatch({
          type: "SET_CONTRACTS",
          payload: contracts
        })
      }

      const setNotes = (notes) => {
        dispatch({
          type: "SET_NOTES",
          payload: notes
        })
      }

      const setCurrentCompanyID = (id) => {
        dispatch({
          type: "SET_CURRENT_COMPANYID",
          payload: id
        })
      };

      const setCurrentCompany = (name) => {
        
        dispatch({
          type: "SET_CURRENT_COMPANY",
          payload: name
        })
      };

      const setCurrentLocationID = (id) => {
        dispatch({
          type: "SET_CURRENT_LOCATIONID",
          payload: id
        })
      };

      const setCurrentLocationName = (name) => {
        dispatch({
          type: "SET_CURRENT_LOCATION_NAME",
          payload: name
        })
      };

      const setCurrentServiceID = (id) => {
        dispatch({
          type: "SET_CURRENT_SERVICEID",
          payload: id
        })
      };

      const setCurrentServiceName = (name) => {
        dispatch({
          type: "SET_CURRENT_SERVICE_NAME",
          payload: name
        })
      };

      const setCurrentTicketID = (id) => {
        dispatch({
          type: "SET_CURRENT_TICKETID",
          payload: id
        })
      };

      const setCurrentTicketNum = (num) => {
        dispatch({
          type: "SET_CURRENT_TICKET_NUM",
          payload: num
        })
      };

      const setCurrentOrderID = (id) => {
        dispatch({
          type: "SET_CURRENT_ORDERID",
          payload: id
        })
      };

      const setCurrentOrderNum = (num) => {
        dispatch({
          type: "SET_CURRENT_ORDER_NUM",
          payload: num
        })
      };

      const setCurrentAccountID = (id) => {
        dispatch({
          type: "SET_CURRENT_ACCOUNTID",
          payload: id
        })
      };

      const setCurrentAccountNum = (num) => {
        dispatch({
          type: "SET_CURRENT_ACCOUNT_NUM",
          payload: num
        })
      };

      const setDataLoading = (id) => {
        dispatch({
          type: "SET_DATA_LOADING",
          payload: id
        })
      };

      const setCurrentGrid = (name) => {
        dispatch({
          type: "SET_CURRENT_GRID",
          payload: name
        })
      };

      const setCurrentDate = () => {
        const currentDate = new Date()
        return currentDate.toISOString().substring(0, 10)
      }

      const setUserDefaults = (userDefaults) => {
        dispatch({
          type: "SET_USER_DEFAULTS",
          payload: userDefaults
        })
      }

    
    return (
      <Provider value={{ 
          isStyle,

          setUserFirstName,
          setUserType,
          setCurrentUser,
          setLoggedIn,
          setCurrentDate,

          setCompanies,
          setLocations,
          setServices,
          setTickets,
          setOrders,
          setAccounts,
          setBills,
          setUsers,
          setUserDefaults,
          setContracts,
          setNotes,

          setCurrentCompanyID,
          setCurrentCompany,
          setCurrentLocationID,
          setCurrentLocationName,
          setCurrentServiceID,
          setCurrentServiceName,
          setCurrentTicketID,
          setCurrentTicketNum,
          setCurrentOrderID,
          setCurrentOrderNum,
          setCurrentAccountID,
          setCurrentAccountNum,
          
          fetchCompanies,
          fetchLocations,
          refreshLocations,
          fetchServices,
          refreshServices,
          fetchTickets,
          refreshTickets,
          fetchOrders,
          refreshOrders,
          fetchAccounts,
          refreshAccounts,
          fetchBills,
          refreshBills,
          fetchUsers,
          refreshUsers,
          fetchContracts,
          refreshContracts,
          fetchNotes,
          refreshNotes,
          handleSubmitNew,

          

          setDataLoading,
          setCurrentGrid,

          userSession
      }}>
        {props.children}
      </Provider>
    )
  
}

