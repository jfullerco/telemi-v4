import React from 'react'
import { useParams } from 'react-router-dom'
import DeleteButton from './Components/Buttons/DeleteButton'


const Footer = ({handleClick}) => {
  const { isModule, id } = useParams()

  return(
    <>
    <nav className="navbar footerblur is-fixed-bottom">
      
        <div className="navbar-item is-hoverable">
         
          <DeleteButton
            colRef={isModule}
            docRef={id}
            size="is-small"
            isIcon={true}
          />
          
        </div>
      

      <div className="is-hidden">
      
        <div className="navbar-item has-text-grey is-size-7 pr-3"> Terms </div> 
        <div className="navbar-item has-text-grey is-size-7 pr-3">Settings </div>
        <div className="navbar-item has-text-grey is-size-7 pr-3"> </div>
        <div className="navbar-item has-text-grey is-size-7 pr-3">Developed by J Fuller Co </div>
     
      </div>
      </nav>
    </>
  )
}
export default Footer