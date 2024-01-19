import React, { useState } from 'react'
import '../css/topbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faFilter, faSearch, faSort } from '@fortawesome/free-solid-svg-icons'

const TopBarComponent = (props) => {
  const {
    contentTab,
    setContentTab,
    userAccess,
    setCurrentView,
    menuSize,
    setMenuSize,
  } = props

  const [search, setSearch] = useState('')

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  return (
    <div className='tb-container'>
      {
        contentTab === 'billing'
          ? <div className='tb-menu'>
              <div className='tb-search-bar'>
                <input 
                  className='tb-input'
                  type="text" 
                  placeholder="search prefix..." 
                  value={search}
                  onChange={handleSearchChange}
                />
                <p className='search'>Search</p>
              </div>
              <div className='button-container'>
                <FontAwesomeIcon icon={faSort} className="tb-icon-menu"/>
              </div>
              <div className='button-container'>
                <FontAwesomeIcon icon={faFilter} className="tb-icon-menu"/>
              </div>
              <div className='button-container button-end'>
                <FontAwesomeIcon icon={faBuilding} className="tb-icon-menu"/>
              </div>
            </div>
          : contentTab === 'daily'
              ? <div className='tb-menu'>
                  <div className='tb-search-bar'>
                    <input 
                      className='tb-input'
                      type="text" 
                      placeholder="search prefix..." 
                      value={search}
                      onChange={handleSearchChange}
                    />
                    <p className='search'>Search</p>
                  </div>
                  <div className='button-container'>
                    <FontAwesomeIcon icon={faSort} className="tb-icon-menu"/>
                  </div>
                  <div className='button-container'>
                    <FontAwesomeIcon icon={faFilter} className="tb-icon-menu"/>
                  </div>
                </div>
              : null
      }
    </div>
  )
}

export default TopBarComponent
