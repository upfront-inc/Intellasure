import SidebarComponent from '../components/SidebarComponent'
import TopBarComponent from '../components/TopBarComponent'
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
        <div className='top-bar'>  
          <TopBarComponent 
            contentTab={contentTab} 
            setContentTab={setContentTab} 
            userAccess={userAccess}
            setCurrentView={setCurrentView}
            menuSize={menuSize}
            setMenuSize={setMenuSize}
          />
        </div>
      </div>
    </div>
  )
}

export default ContentScreen
