import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../auth/Firebase'
import { doc, setDoc } from 'firebase/firestore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'

const SignupComponent = (props) => {
  const {
    setCurrentTab,
    setCurrentView
  } = props

  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [signupVerify, setSignupVerify] = useState('')
  const [signupName, setSignupName] = useState('')

  const [invalidLogin, setInvalidLogin] = useState(false)

  const [validSignupEmail, setValidSignupEmail] = useState(false)
  const [validPasswordLength, setValidPasswordLength] = useState(false)
  const [validPasswordNumber, setValidPasswordNumber] = useState(false)
  const [validMatchingPassword, setValidMatchingPassword] = useState(false)

  const handleSignupNameChange = (e) => {
      setSignupName(e.target.value);
  }

  const handleSignupEmailChange = (e) => {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      emailRegex.test(e.target.value)
          ? setValidSignupEmail(true)
          : setValidSignupEmail(false)
      setSignupEmail(e.target.value);
  }

  const handleSignupPasswordChange = (e) => {
      const hasMinLength = e.target.value.length >= 8;
      hasMinLength 
          ? setValidPasswordLength(true)
          : setValidPasswordLength(false)
      const hasNumber = /\d/.test(e.target.value);
      hasNumber
          ? setValidPasswordNumber(true)
          : setValidPasswordNumber(false)
      setSignupPassword(e.target.value);
  }

  const handleSignupVerifyChange = (e) => {
      const areSame = signupPassword === e.target.value;
      areSame
          ? setValidMatchingPassword(true)
          : setValidMatchingPassword(false)
      setSignupVerify(e.target.value);
  }

  const signupUser = () => {
      if(validMatchingPassword && validPasswordLength && validPasswordNumber && validSignupEmail){
          createUserAccount()
      } else {
        setInvalidLogin(true)
      }
  }
  const createUserAccount = () => {
      createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
          .then((userCredential) => {
              createProfile(userCredential.user)
          })
          .catch((error) => {
              console.error('Error creating account:', error.message);
          });
      }
      
  const createProfile = (user) => {
      const userRef = doc(db, "users", user.uid);
      const userData = {
          userId: user.uid,
          email: user.email,
          name: signupName,
          company: 'PHG',
          status: 'staff',
          createdAt: new Date(),
          type: 'active'
      }
      setDoc(userRef, userData)
          .then((response) => {
              setCurrentView('content')
          })
          .catch((error) => {
              console.log(`error: ${error}`)
          })
  }

return (
  <div className='form-container'>
    <div className='form-header'>Signup</div>
    {
      invalidLogin 
        ? <div className='errors'>
            {
                validSignupEmail
                ? null
                : <p className='error'>Please enter a valid email!</p>
            }
            {
                validPasswordLength
                ? null 
                : <p className='error'>Passwords must be 8 characters</p>
            }
            {
                validPasswordNumber
                ? null 
                : <p className='error'>Passwords must include (0-9)</p>
            }
            {
                validMatchingPassword
                    ? null 
                    : <p className='error'>Password / Verify Don't match</p>
            }
          </div>
        : null
    }
    <div className='form-content'>
      <div className='input-container'>
        <div className='user-input-container'>
          <FontAwesomeIcon icon={faUser} className="custom-icon-size"/>
          <input 
            className='input'
            type="text" 
            placeholder="email..."
            value={signupEmail}
            onChange={handleSignupEmailChange} 
          />
        </div>
      </div>
      <div className='input-container'>
        <div className='user-input-container'>
          <FontAwesomeIcon icon={faUser} className="custom-icon-size"/>
          <input 
            className='input'
            type="text" 
            placeholder="name..."
            value={signupName}
            onChange={handleSignupNameChange} 
          />
        </div>
      </div>
      <div className='input-container'>
        <div className='user-input-container'>
          <FontAwesomeIcon icon={faUser} className="custom-icon-size"/>
          <input 
            className='input'
            type="password" 
            placeholder="password..."
            value={signupPassword}
            onChange={handleSignupPasswordChange} 
          />
        </div>
      </div>
      <div className='input-container' style={{marginBottom: '16px'}}>
        <div className='user-input-container'>
          <FontAwesomeIcon icon={faLock} className="custom-icon-size"/>
          <input 
            className='input'
            type="password" 
            placeholder="verify password..."
            value={signupVerify}
            onChange={handleSignupVerifyChange} 
          />
        </div>
      </div>
      <div className='buttons-container'>
        <button className='button' onClick={() => {signupUser()}}>Signup</button>
        <button className='button' onClick={() => {setCurrentTab('Login')}}>Login</button>
      </div>
    </div>
  </div>
)
}

export default SignupComponent
