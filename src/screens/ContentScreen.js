import ProfileComponent from '../components/ProfileComponent'
import SidebarComponent from '../components/SidebarComponent'
import SupportComponent from '../components/SupportComponent'
import AccountComponent from '../components/content/Accounts/AccountComponent'
import BillingComponent from '../components/content/Billing/BillingComponent'
import DailyRateComponent from '../components/content/DailyRates/DailyRateComponent'
import FlaggedComponent from '../components/content/Flagged/FlaggedComponent'
import MissingComponent from '../components/content/Missing/MissingComponent'
import TicketComponent from '../components/content/Tickets/TicketComponent'
import '../css/content.css'
import React, { useEffect, useState } from 'react'

const ContentScreen = (props) => {
  const {userAccess, setCurrentView} = props

  const [contentTab, setContentTab] = useState('billing')
  const [menuSize, setMenuSize] = useState('full')

  const [mode, setMode] = useState('light')

  return (
    <>
      {
        mode === 'light'
          ? <div className='content-container-light'>
              {
                menuSize === 'full'
                  ? <div className='sidebar-container-light'>
                      <SidebarComponent 
                        contentTab={contentTab} 
                        setContentTab={setContentTab} 
                        userAccess={userAccess}
                        setCurrentView={setCurrentView}
                        menuSize={menuSize}
                        setMenuSize={setMenuSize}
                        mode={mode}
                      />
                    </div>
                  : <div className='sidebar-container-half-light'>
                      <SidebarComponent 
                        contentTab={contentTab} 
                        setContentTab={setContentTab} 
                        userAccess={userAccess}
                        setCurrentView={setCurrentView}
                        menuSize={menuSize}
                        setMenuSize={setMenuSize}
                        mode={mode}
                      />
                    </div>
              }
              <div className='content'>
                {
                  contentTab === 'billing'
                    ? <BillingComponent 
                        contentTab={contentTab} 
                        setContentTab={setContentTab} 
                        userAccess={userAccess}
                        setCurrentView={setCurrentView}
                        menuSize={menuSize}
                        setMenuSize={setMenuSize}
                        mode={mode}
                      />
                    : contentTab === 'daily'
                        ? <DailyRateComponent 
                            contentTab={contentTab} 
                            setContentTab={setContentTab} 
                            userAccess={userAccess}
                            setCurrentView={setCurrentView}
                            menuSize={menuSize}
                            setMenuSize={setMenuSize}
                            mode={mode}
                          />
                        : contentTab === 'accounts'
                            ? <AccountComponent 
                                contentTab={contentTab} 
                                setContentTab={setContentTab} 
                                userAccess={userAccess}
                                setCurrentView={setCurrentView}
                                menuSize={menuSize}
                                setMenuSize={setMenuSize}
                                mode={mode}
                              />
                            : contentTab === 'flagged'
                              ? <FlaggedComponent 
                                  contentTab={contentTab} 
                                  setContentTab={setContentTab} 
                                  userAccess={userAccess}
                                  setCurrentView={setCurrentView}
                                  menuSize={menuSize}
                                  setMenuSize={setMenuSize}
                                  mode={mode}
                                />
                              : contentTab === 'tickets'
                                  ? <TicketComponent 
                                      contentTab={contentTab} 
                                      setContentTab={setContentTab} 
                                      userAccess={userAccess}
                                      setCurrentView={setCurrentView}
                                      menuSize={menuSize}
                                      setMenuSize={setMenuSize}
                                      mode={mode}
                                    />
                                  : contentTab === 'missing'
                                      ? <MissingComponent 
                                          contentTab={contentTab} 
                                          setContentTab={setContentTab} 
                                          userAccess={userAccess}
                                          setCurrentView={setCurrentView}
                                          menuSize={menuSize}
                                          setMenuSize={setMenuSize}
                                          mode={mode}
                                        />
                                      : contentTab === 'help'
                                          ? <SupportComponent mode={mode}/>
                                          : contentTab === 'profile'
                                              ? <ProfileComponent mode={mode} setMode={setMode}/>
                                              : null
                }
              </div>
            </div>
          : <div className='content-container-dark'>
              {
                menuSize === 'full'
                  ? <div className='sidebar-container-dark'>
                      <SidebarComponent 
                        contentTab={contentTab} 
                        setContentTab={setContentTab} 
                        userAccess={userAccess}
                        setCurrentView={setCurrentView}
                        menuSize={menuSize}
                        setMenuSize={setMenuSize}
                        mode={mode}
                      />
                    </div>
                  : <div className='sidebar-container-half-dark'>
                      <SidebarComponent 
                        contentTab={contentTab} 
                        setContentTab={setContentTab} 
                        userAccess={userAccess}
                        setCurrentView={setCurrentView}
                        menuSize={menuSize}
                        setMenuSize={setMenuSize}
                        mode={mode}
                      />
                    </div>
              }
              <div className='content'>
                {
                  contentTab === 'billing'
                    ? <BillingComponent 
                        contentTab={contentTab} 
                        setContentTab={setContentTab} 
                        userAccess={userAccess}
                        setCurrentView={setCurrentView}
                        menuSize={menuSize}
                        setMenuSize={setMenuSize}
                        mode={mode}
                      />
                    : contentTab === 'daily'
                        ? <DailyRateComponent 
                            contentTab={contentTab} 
                            setContentTab={setContentTab} 
                            userAccess={userAccess}
                            setCurrentView={setCurrentView}
                            menuSize={menuSize}
                            setMenuSize={setMenuSize}
                            mode={mode}
                          />
                        : contentTab === 'accounts'
                            ? <AccountComponent 
                                contentTab={contentTab} 
                                setContentTab={setContentTab} 
                                userAccess={userAccess}
                                setCurrentView={setCurrentView}
                                menuSize={menuSize}
                                setMenuSize={setMenuSize}
                                mode={mode}
                              />
                            : contentTab === 'flagged'
                                ? <FlaggedComponent 
                                    contentTab={contentTab} 
                                    setContentTab={setContentTab} 
                                    userAccess={userAccess}
                                    setCurrentView={setCurrentView}
                                    menuSize={menuSize}
                                    setMenuSize={setMenuSize}
                                    mode={mode}
                                  />
                                : contentTab === 'tickets'
                                    ? <TicketComponent 
                                        contentTab={contentTab} 
                                        setContentTab={setContentTab} 
                                        userAccess={userAccess}
                                        setCurrentView={setCurrentView}
                                        menuSize={menuSize}
                                        setMenuSize={setMenuSize}
                                        mode={mode}
                                      />
                                    : contentTab === 'missing'
                                        ? <MissingComponent 
                                            contentTab={contentTab} 
                                            setContentTab={setContentTab} 
                                            userAccess={userAccess}
                                            setCurrentView={setCurrentView}
                                            menuSize={menuSize}
                                            setMenuSize={setMenuSize}
                                            mode={mode}
                                          />
                                        : contentTab === 'help'
                                            ? <SupportComponent mode={mode}/>
                                            : contentTab === 'profile'
                                                ? <ProfileComponent mode={mode} setMode={setMode}/>
                                                : null
                }
              </div>
            </div>
      }
    </>
  )
}

export default ContentScreen
