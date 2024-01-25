import '../css/login.css'
import React, { useState } from 'react'
import image from '../assets/IntellasuranceLogo_2.png'
import imageMountain from '../assets/mountain.jpg'
import LoginComponent from '../components/LoginComponent'
import SignupComponent from '../components/SignupComponent'
import ForgotPasswordComponent from '../components/ForgotPasswordComponent'

const LoginScreen = (props) => {
    const {
      setCurrentView
    } = props

    const [currentTab, setCurrentTab] = useState('Login')

    return (
      <div className='page'>
        <img className='background-image' src={imageMountain} alt='backgroundImage'/>
        <div className='login-container-background'></div>
        <div className='login-container'>
          <div className='image-container'>
            <img className='logo-image' src={image} alt='Intellisurance logo'/>
          </div>
          {
            currentTab === 'Login'
              ? <LoginComponent setCurrentView={setCurrentView} setCurrentTab={setCurrentTab}/>
              : currentTab === 'Reset'
                  ? <ForgotPasswordComponent setCurrentView={setCurrentView} setCurrentTab={setCurrentTab}/>
                  : <SignupComponent setCurrentView={setCurrentView} setCurrentTab={setCurrentTab}/>
          }
        </div>
      </div>
    )
}

export default LoginScreen