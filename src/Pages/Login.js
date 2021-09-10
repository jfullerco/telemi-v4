import React, {useState, useEffect, useContext, useRef} from 'react'
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore'
import { useAuth } from '../Contexts/AuthContext'
import {db} from '../Contexts/firebase'

import { useHistory } from 'react-router-dom'
import Columns from '../Components/Layout/Columns'
import Column from '../Components/Layout/Column'

export default function Login() {

  const emailRef = useRef("")
  const passwordRef = useRef("")
  const {login} = useAuth()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [modalState, setModalState] = useState(true)
  const [loginError, setLoginError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    console.log(emailRef.current.value, passwordRef.current.value)
    if (emailRef.current.value && passwordRef.current.value === "") {
      return setLoginError('Both email and password required')
    }
    try {
      setLoginError('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      console.log('signed in')
      const docRef = await addDoc(collection(db, 'AccessLog'), {
        Email: emailRef.current.value,
        Date: new Date()
      })
      history.push("/dashboard")
    } catch {
      setLoginError('Email or Password is incorrect')
      console.log('Email or Password is incorrect')
    }
    setLoading(false)
   
  }

  const handleModalClose = () => {
    history.goBack()
  }

  return(
    <div className={modalState === true ? "modal is-active" : "modal"}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <div className="modal-card-head">Login</div>
        <div className="modal-card-body">
          
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Email</label>
                <div className="control">
                  <input className="input is-rounded" type="email" ref={emailRef} />
                </div>
            </div>
            <div className="field">
              <label>Password</label>
                <div className="control">
                  <input className="input is-rounded" type="password" ref={passwordRef}/>
                </div>
            </div>
          
        
            <div className={loginError != "" ? "block notification is-danger" : "block"}>
              <div>{loginError != "" ? loginError : ""}</div>
            </div>
        
        <div className="modal-card-foot">
          <Columns options="is-mobile">
            <Column>
              <button 
              type="submit" 
              className={loading !== true ? "button is-rounded is-link level-item" : "button is-rounded is-loading"} 
              disabled={loading}
              >
                Login
              </button>
            </Column>
            <Column>
              <button className="button is-rounded" onClick={()=>history.push("/register")}>
                Create account 
              </button>
            </Column>
          </Columns>
          
        
        </div>
        </form>
          <button 
            className="modal-close is-large" 
            aria-label="close" 
            onClick={()=>handleModalClose()}
          >
          </button>  
        </div>
      </div>
    </div>
  )

}