export default (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_COMPANYID":
      return {
        ...state,
        currentCompanyID: action.payload
      }
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload
      }
    case "SET_CURRENT_COMPANY":
      return {
        ...state,
        currentCompany: action.payload
      }
      case "SET_CURRENT_GRID":
        return {
          ...state,
          currentGrid: action.payload
        }  
    case "LOGGED_IN":
      return {
        ...state,
        loggedIn: action.payload
      };
    case "SET_CURRENT_LOCATIONID":
      return {
        ...state,
        currentLocationID: action.payload
      };
    case "SET_CURRENT_LOCATION_NAME":
      return {
        ...state,
        currentLocationName: action.payload
      }; 
    case "SET_CURRENT_SERVICEID":
      return {
        ...state,
        currentServiceID: action.payload
      };
    case "SET_CURRENT_SERVICE_NAME":
      return {
        ...state,
        currentServiceName: action.payload
      };
    case "SET_CURRENT_TICKETID": 
      return {
        ...state,
        currentTicketID: action.payload
      };
    case "SET_CURRENT_TICKET_NUM": 
      return {
        ...state,
        currentTicketNum: action.payload
      };
    case "SET_CURRENT_ORDERID":
      return {
        ...state,
        currentOrderID: action.payload
      }; 
    case "SET_CURRENT_ORDER_NUM": 
      return {
        ...state,
        currentOrderNum: action.payload
      };   
    case "SET_CURRENT_ACCOUNTID":
      return {
        ...state,
        currentAccountID: action.payload
      };  
    case "SET_CURRENT_ACCOUNT_NUM": 
      return {
        ...state,
        currentAccountNum: action.payload
      };
    case "SET_DATA_LOADING":
      return {
        ...state,
        dataLoading: action.payload
      };  
    case "SET_USER_TYPE":
      return {
        ...state,
        userType: action.payload
      };  
    case "SET_USER_FNAME":
      return {
        ...state,
        userFirstName: action.payload
      };  
    case "SET_COMPANIES":
      return {
        ...state,
        companies: action.payload
      };
    case "SET_SERVICES":
      return {
        ...state,
        services: action.payload
      };
    case "SET_TICKETS":
      return {
        ...state,
        tickets: action.payload
      };
    case "SET_ORDERS":
      return {
        ...state,
        orders: action.payload
      };
    case "SET_ACCOUNTS":
      return {
        ...state,
        accounts: action.payload
      }; 
    case "SET_BILLS":
      return {
        ...state,
        bills: action.payload
      };
    case "SET_EVENTS":
      return {
        ...state,
        events: action.payload
      };
    case "SET_NOTES":
      return {
        ...state,
        notes: action.payload
      };
    case "SET_USERS":
      return {
        ...state,
        users: action.payload
      }; 
    case "SET_USER_DEFAULTS":
      return {
        ...state,
        userDefaults: action.payload
      }; 
    case "SET_CONTRACTS":
      return {
        ...state,
        contracts: action.payload
      }; 
    case "SET_LOCATIONS":
      return {
        ...state,
        locations: action.payload
      }; 
    case "SET_CURRENT_MODULE":
      return {
        ...state,
        currentModule: action.payload
      }; 
    case "SET_CURRENT_DOC_ID":
      return {
        ...state,
        currentDocID: action.payload
      }; 
        
  };
}
