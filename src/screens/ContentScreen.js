import SidebarComponent from '../components/SidebarComponent'
import BillingComponent from '../components/content/BillingComponent'
import '../css/content.css'
import React, { useState } from 'react'

const ContentScreen = (props) => {
  const {userAccess, setCurrentView} = props

  const [contentTab, setContentTab] = useState('billing')
  const [menuSize, setMenuSize] = useState('full')

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
            : null
        }
      </div>
    </div>
  )
}

export default ContentScreen
