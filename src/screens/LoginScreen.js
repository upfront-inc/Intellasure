import '../css/login.css'
import React, { useState } from 'react'
import image from '../assets/IntellasuranceLogo_2.png'
import SignupScreen from './SignupScreen'
import LoginComponent from '../components/LoginComponent'

const LoginScreen = (props) => {
    const {
        setCurrentView
    } = props

    const [currentTab, setCurrentTab] = useState('Login')

    return (
      <div className='page'>
        <div className='login-container'>
          <div className='image-container'>
            <img className='logo-image' src={image} alt='Intellisurance logo'/>
          </div>
          {
            currentTab === 'Login'
              ? <LoginComponent setCurrentView={setCurrentView} setCurrentTab={setCurrentTab}/>
              : <SignupScreen setCurrentView={setCurrentView} setCurrentTab={setCurrentTab}/>
          }
        </div>
      </div>
    )
}

export default LoginScreen