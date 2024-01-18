import { doc, getDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { auth, db } from '../auth/Firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'

const LoginComponent = (props) => {
  const {
      setCurrentTab,
      setCurrentView
  } = props

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const [invalidLogin, setInvalidLogin] = useState(false)

  const [activeAccount, setActiveAccount] = useState(true)

  const [resetEmail, setResetEmail] = useState()
  const [resettingPassword, setResettingPassword] = useState(false)

  const handleLoginEmailChange = (e) => {
      setLoginEmail(e.target.value)
  }

  const handleLoginPasswordChange = (e) => {
      setLoginPassword(e.target.value);
  }

  const handleResetEmailChange = (e) => {
      setResetEmail(e.target.value);
  }

  const grabUserInfo = (userId) => {
    const userRef = doc(db, "users", userId);

    getDoc(userRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          let userInfo = docSnap.data();
          if(userInfo.type === 'active'){
            setCurrentView('content');
          } else {
            setActiveAccount(false)
          }
        } else {
          return null;
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error)
      });
  }
  const loginUser = () => {
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredential) => {
        grabUserInfo(userCredential.user.uid);
      })
      .catch((error) => {
        setInvalidLogin(true);
      });
  }


  return (
    <div className='form-container'>
      <div className='form-header'>Login</div>
      {
        invalidLogin 
          ? <div className='errors'>
              {
                activeAccount === false
                  ? <p className='error'>Account Suspended! Contact Admin</p>
                  : <p className='error'>Email/Password don't match any records</p> 
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
              value={loginEmail}
              onChange={handleLoginEmailChange} 
            />
          </div>
        </div>
        <div className='input-container'>
          <div className='user-input-container'>
            <FontAwesomeIcon icon={faLock} className="custom-icon-size"/>
            <input 
              className='input'
              type="password" 
              placeholder="password..."
              value={loginPassword}
              onChange={handleLoginPasswordChange} 
            />
          </div>
        </div>
        <div className='buttons-container'>
          <button className='button' onClick={() => {loginUser()}}>Login</button>
          <button className='button' onClick={() => {setCurrentTab('Signup')}}>Signup</button>
        </div>
      </div>
    </div>
  )
}

export default LoginComponent
