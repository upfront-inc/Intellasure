import React from 'react'
import '../css/sidebar.css'
import '../css/general.css'
import image from '../assets/IntellasuranceLogo_2.png'
import image2 from '../assets/logo.png'
import { signOut } from 'firebase/auth'
import { auth } from '../auth/Firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faList, faMoneyBills, faUsers, faCode, faReceipt, faQuestionCircle, faRightFromBracket, faAnglesLeft, faAnglesRight, faShield, faShieldAlt } from '@fortawesome/free-solid-svg-icons'

const SidebarComponent = (props) => {
  const {
    contentTab,
    setContentTab,
    userAccess,
    setCurrentView,
    menuSize,
    setMenuSize,
  } = props

  const signoutUser = () => {
    signOut(auth)
    .then(() => {
      setCurrentView('login')
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
  }
  
  return (
    <div className='sidebar'>
      <div className='top-sidebar'>
        <div className='header'>
          {
            menuSize === 'full'
              ? <img style={{height: '46px', width: '190px'}} src={image} alt='Intellisurance logo'/>
              : <img style={{height: '46px', width: '46px'}} src={image2} alt='Intellisurance logo'/>
          }
        </div>
        <div className='sidebar-tabs-menu hover-paragraph'>
          {
            contentTab === 'billing'
              ? <div className='icon-label-button selected'>
                  <FontAwesomeIcon icon={faShieldAlt} className="icon-menu"/>
                  {
                    menuSize === 'half'
                      ? null
                      : <p className='icon-text'>Billing Details</p>
                  }
                </div>
              : <div className='icon-label-button' onClick={() => {setContentTab('billing')}}>
                  <FontAwesomeIcon icon={faList} className="icon-menu"/>
                  {
                    menuSize === 'half'
                      ? null
                      : <p className='icon-text'>Billing Details</p>
                  }
                </div>
          }
          {
            userAccess === 'admin' || userAccess === 'owner'
              ? <>
                  {
                    contentTab === 'dailyRate'
                      ? <div className='icon-label-button selected'>
                          <FontAwesomeIcon icon={faMoneyBills} className="icon-menu"/>
                          {
                            menuSize === 'half'
                              ? null
                              : <p className='icon-text'>Daily Rates</p>
                          }
                        </div>
                      : <div className='icon-label-button hover' onClick={() => {setContentTab('daily')}}>
                          <FontAwesomeIcon icon={faMoneyBills} className="icon-menu"/>
                          {
                            menuSize === 'half'
                              ? null
                              : <p className='icon-text'>Daily Rates</p>
                          }
                        </div>
                  }
                  {
                        contentTab === 'accounts'
                          ? <div className='icon-label-button selected'>
                              <FontAwesomeIcon icon={faUsers} className="icon-menu"/>
                              {
                                menuSize === 'half'
                                  ? null
                                  : <p className='icon-text'>Accounts</p>
                              }
                            </div>
                          : <div className='icon-label-button' onClick={() => {setContentTab('accounts')}}>
                              <FontAwesomeIcon icon={faUsers} className="icon-menu"/>
                              {
                                menuSize === 'half'
                                  ? null
                                  : <p className='icon-text'>Accounts</p>
                              }
                            </div>
                      }
                </>
              : userAccess === 'dev'
                  ? <>
                      {
                        contentTab === 'daily'
                          ? <div className='icon-label-button selected'>
                              <FontAwesomeIcon icon={faMoneyBills} className="icon-menu"/>
                              {
                                menuSize === 'half'
                                  ? null
                                  : <p className='icon-text'>Daily Rates</p>
                              }
                            </div>
                          : <div className='icon-label-button' onClick={() => {setContentTab('daily')}}>
                              <FontAwesomeIcon icon={faMoneyBills} className="icon-menu"/>
                              {
                                menuSize === 'half'
                                  ? null
                                  : <p className='icon-text'>Daily Rates</p>
                              }
                            </div>
                      }
                      {
                        contentTab === 'accounts'
                          ? <div className='icon-label-button selected'>
                              <FontAwesomeIcon icon={faUsers} className="icon-menu"/>
                              {
                                menuSize === 'half'
                                  ? null
                                  : <p className='icon-text'>Accounts</p>
                              }
                            </div>
                          : <div className='icon-label-button' onClick={() => {setContentTab('accounts')}}>
                              <FontAwesomeIcon icon={faUsers} className="icon-menu"/>
                              {
                                menuSize === 'half'
                                  ? null
                                  : <p className='icon-text'>Accounts</p>
                              }
                            </div>
                      }
                      {
                        contentTab === 'backend'
                          ? <div className='icon-label-button selected'>
                              <FontAwesomeIcon icon={faCode} className="icon-menu"/>
                              {
                                menuSize === 'half'
                                  ? null
                                  : <p className='icon-text'>Backend</p>
                              }
                            </div>
                          : <div className='icon-label-button' onClick={() => {setContentTab('backend')}}>
                              <FontAwesomeIcon icon={faCode} className="icon-menu"/>
                              {
                                menuSize === 'half'
                                  ? null
                                  : <p className='icon-text'>Backend</p>
                              }
                            </div>
                      }
                      {
                        contentTab === 'tickets'
                          ? <div className='icon-label-button selected'>
                              <FontAwesomeIcon icon={faReceipt} className="icon-menu"/>
                              {
                                menuSize === 'half'
                                  ? null
                                  : <p className='icon-text'>Tickets</p>
                              }
                            </div>
                          : <div className='icon-label-button' onClick={() => {setContentTab('tickets')}}>
                              <FontAwesomeIcon icon={faReceipt} className="icon-menu"/>
                              {
                                menuSize === 'half'
                                  ? null
                                  : <p className='icon-text'>Tickets</p>
                              }
                            </div>
                      }
                    </>
                  : null
          }
          {
            contentTab === 'help'
              ? <div className='icon-label-button selected'>
                  <FontAwesomeIcon icon={faQuestionCircle} className="icon-menu"/>
                  {
                    menuSize === 'half'
                      ? null
                      : <p className='icon-text'>Help</p>
                  }
                </div>
              : <div className='icon-label-button' onClick={() => {setContentTab('help')}}>
                  <FontAwesomeIcon icon={faQuestionCircle} className="icon-menu"/>
                  {
                    menuSize === 'half'
                      ? null
                      : <p className='icon-text'>Help</p>
                  }
                </div>
          }
          {
            contentTab === 'profile'
              ? <div className='icon-label-button selected'>
                  <FontAwesomeIcon icon={faUser} className="icon-menu"/>
                  {
                    menuSize === 'half'
                      ? null
                      : <p className='icon-text'>Profile</p>
                  }
                </div>
              : <div className='icon-label-button' onClick={() => {setContentTab('profile')}}>
                  <FontAwesomeIcon icon={faUser} className="icon-menu"/>
                  {
                    menuSize === 'half'
                      ? null
                      : <p className='icon-text'>Profile</p>
                  }
                </div>
          }
          <div className='icon-label-button' onClick={() => {signoutUser()}}>
            <FontAwesomeIcon icon={faRightFromBracket} className="icon-menu"/>
            {
              menuSize === 'half'
                ? null
                : <p className='icon-text'>Logout</p>
            }
          </div>
          {
            menuSize === 'full'
              ? <div onClick={() => {setMenuSize('half')}} className="icon-label-button">
                  <FontAwesomeIcon icon={faAnglesLeft} className="icon-menu"/>
                </div>
              : <div onClick={() => {setMenuSize('full')}} className="icon-label-button">
                  <FontAwesomeIcon icon={faAnglesRight} className="icon-menu"/>
                </div>
          }
        </div>
      </div>
      {
        menuSize === 'half'
          ? null
          : <div className='legal-disclaimer-container'>
              <p className='legal-disclaimer'>@2023-2024 Intellasurance Inc.</p>
              <p className='legal-disclaimer'>All rights reserved.</p>
            </div>
      }
    </div>
  )
}

export default SidebarComponent
