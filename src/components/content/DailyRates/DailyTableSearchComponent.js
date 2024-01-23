import React, { useState } from 'react'
import '../../../css/topbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faFilter, faSearch, faSort } from '@fortawesome/free-solid-svg-icons'

const DailyTableSearchComponent = (props) => {
  const {
    searchTerm,
    handleSearchChange,
    mode
  } = props

  return (
    <div className='tb-container'>
      {
        mode === 'light'
          ? <div className='tb-menu'>
              <div className='tb-search-bar'>
                <input 
                  className='tb-input'
                  type="text" 
                  placeholder="search prefix..." 
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <p className='search'>Search</p>
              </div>
              <div className='button-container'>
                <FontAwesomeIcon icon={faSort} className="tb-icon-menu"/>
              </div>
              <div className='button-container button-end'>
                <FontAwesomeIcon icon={faBuilding} className="tb-icon-menu"/>
              </div>
            </div>
          : <div className='tb-menu-dark'>
              <div className='tb-search-bar-dark'>
                <input 
                  className='tb-input-dark'
                  type="text" 
                  placeholder="search prefix..." 
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <p className='search'>Search</p>
              </div>
              <div className='button-container'>
                <FontAwesomeIcon icon={faSort} className="tb-icon-menu"/>
              </div>
              <div className='button-container button-end'>
                <FontAwesomeIcon icon={faBuilding} className="tb-icon-menu"/>
              </div>
            </div>
      }
    </div>
  )
}
export default DailyTableSearchComponent
