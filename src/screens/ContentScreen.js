import SidebarComponent from '../components/SidebarComponent'
import SupportComponent from '../components/SupportComponent'
import AccountComponent from '../components/content/Accounts/AccountComponent'
import BillingComponent from '../components/content/Billing/BillingComponent'
import DailyRateComponent from '../components/content/DailyRates/DailyRateComponent'
import TicketComponent from '../components/content/Tickets/TicketComponent'
import '../css/content.css'
import React, { useEffect, useState } from 'react'

const ContentScreen = (props) => {
  const {userAccess, setCurrentView} = props

  const [contentTab, setContentTab] = useState('billing')
  const [menuSize, setMenuSize] = useState('full')

  useEffect(() => {
    console.log(contentTab)
  }, [contentTab])

  return (
    <div className='content-container'>
      {
        menuSize === 'full'
          ? <div className='sidebar-container'>
              <SidebarComponent 
                contentTab={contentTab} 
                setContentTab={setContentTab} 
                userAccess={userAccess}
                setCurrentView={setCurrentView}
                menuSize={menuSize}
                setMenuSize={setMenuSize}
              />
            </div>
          : <div className='sidebar-container-half'>
              <SidebarComponent 
                contentTab={contentTab} 
                setContentTab={setContentTab} 
                userAccess={userAccess}
                setCurrentView={setCurrentView}
                menuSize={menuSize}
                setMenuSize={setMenuSize}
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
              />
            : contentTab === 'daily'
                ? <DailyRateComponent 
                    contentTab={contentTab} 
                    setContentTab={setContentTab} 
                    userAccess={userAccess}
                    setCurrentView={setCurrentView}
                    menuSize={menuSize}
                    setMenuSize={setMenuSize}
                  />
                : contentTab === 'accounts'
                    ? <AccountComponent 
                        contentTab={contentTab} 
                        setContentTab={setContentTab} 
                        userAccess={userAccess}
                        setCurrentView={setCurrentView}
                        menuSize={menuSize}
                        setMenuSize={setMenuSize}
                      />
                    : contentTab === 'tickets'
                        ? <TicketComponent 
                            contentTab={contentTab} 
                            setContentTab={setContentTab} 
                            userAccess={userAccess}
                            setCurrentView={setCurrentView}
                            menuSize={menuSize}
                            setMenuSize={setMenuSize}
                          />
                        : contentTab === 'help'
                            ? <SupportComponent/>
                            : null
        }
      </div>
    </div>
  )
}

export default ContentScreen
