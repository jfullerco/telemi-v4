import React, {useState, useContext} from 'react'
import {Link, Redirect, useNavigate} from 'react-router-dom'

import {stateContext} from '../Contexts/stateContext'
import {useAuth} from '../Contexts/AuthContext'
import {auth} from '../Contexts/firebase'

import {FaSearch, FaUser, FaCog} from 'react-icons/fa'

const NavBar = () => {

  const navigate = useNavigate()
  const userContext = useContext(stateContext)
  const {userFirstName} = userContext.userSession
  const {currentUser, logOutUser} = useAuth()
  
  const [isActive, setIsActive] = useState(false)

  const handleNewUserButton = () => {
    navigate('/register')
  }

  const logOut = async() => {
    
    await auth.signOut()
    logOutUser()
    navigate('/')
    
  }

  return (
    <nav className="navbar is-black is-fixed-top " role="navigation" aria-label="main navigation">
    <div className="navbar-brand">

      <div className="navbar-item">
        <a onClick={()=>navigate('/')} className='has-text-white is-size-4'>
          <strong>TELEMI</strong>
        </a>
        <span className="is-size-7 pl-1">beta</span>
      </div>
    
    <a 
      onClick={() => setIsActive(!isActive)}
      role='button'
      className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
      aria-label='menu'
      aria-expanded='false'
      data-target='tiemsNavbar'
    >
      <span aria-hidden='true'></span>
      <span aria-hidden='true'></span>
      <span aria-hidden='true'></span>
    </a>
      </div>
      <div 
        className={`navbar-menu ${isActive === true ? 'is-active' : ''}`}
        aria-label='menu' 
        id='tiemsNavbar'
      >

      <div className="navbar-end">
        
        {currentUser != undefined ? ( 
          <>
            <a className="navbar-item" onClick={()=> navigate("/search")}>
              <span className="icon is-medium">
                <FaSearch />
              </span>
            </a>
            
            <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link" onClick={()=>navigate("/dashboard")} ><span className="icon is-medium"><FaUser /></span></a>
            <a className="navbar-link" onClick={()=>navigate("/settings")} ><span className="icon is-medium"><FaCog /></span></a>
          <div className="navbar-dropdown">
          <a onClick={()=>logOut()} className="navbar-item">
            Logout 
          </a>
          </div>
          </div>
          </>
        ) : (
          <>
          <div className="navbar-item" onClick={()=>handleNewUserButton()}>
          <button className="button is-small is-rounded has-background-grey-lighter">Create Account</button>
          </div>
          <a onClick={()=> navigate('/login')} className="navbar-item" >
            Login
          </a>
          </>
        )}

      </div>
    </div>
  </nav>
    
  )
}
export default NavBar