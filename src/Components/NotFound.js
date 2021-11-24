import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaRobot } from 'react-icons/fa'

const NotFound = () => {
  const navigate = useNavigate()
  return(
    <div className="hero is-medium">

      <div className="hero-body">
        <div className="card is-rounded px-4 py-4">
       <p className="title"> <FaRobot /> Sorry about this... </p>
       <p className="block"> Click 
         <a className="pl-1" onclick={()=>navigate('/dashboard')}>
          here
        </a> 
        to return to the dashboard</p></div> 
      </div>
    </div>

  )
}
export default NotFound
