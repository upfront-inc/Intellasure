import { sendPasswordResetEmail } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../auth/Firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'

const ForgotPasswordComponent = (props) => {
  const {
    setCurrentTab,
    setCurrentView
} = props

const [resetEmail, setResetEmail] = useState()

const handleResetEmailChange = (e) => {
  setResetEmail(e.target.value)
}

const resetPasswordForUser = () => {
  sendPasswordResetEmail(auth, resetEmail.toLowerCase())
  .then(response => {
    setResetEmail('false')
  })
  .catch(error => {
    console.log(error)
  })
}

return (
  <div className='form-container'>
    <div className='form-header'>Reset Email</div>
    <div className='form-content'>
      <div className='input-container'>
        <div className='user-input-container'>
          <FontAwesomeIcon icon={faUser} className="custom-icon-size"/>
          <input 
            className='input'
            type="text" 
            placeholder="email..."
            value={resetEmail}
            onChange={handleResetEmailChange} 
          />
        </div>
      </div>
      <div className='buttons-container-full'>
        <button className='button-full' onClick={() => {resetPasswordForUser()}}>Confirm Account</button>
      </div>
      <div onClick={() => {setCurrentTab('Login')}}><p className='go-back-text'>Back to Login</p></div>
    </div>
  </div>
)
}
export default ForgotPasswordComponent
