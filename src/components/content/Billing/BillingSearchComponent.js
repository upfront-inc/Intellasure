import React, { useState } from 'react'
import '../../../css/topbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackspace, faBuilding, faCancel, faFilter, faSearch, faSort } from '@fortawesome/free-solid-svg-icons'

const BillingSearchComponent = (props) => {
  const {
    searchTerm,
    handleSearchChange,
    mode,
    searchCurrentQuery,
    activeSearch,
    clearSearch
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
                {
                  activeSearch
                    ? <p onClick={() => {clearSearch()}} className='search-red hover-paragraph'>Clear</p>
                    : <p onClick={() => {searchCurrentQuery()}} className='search hover-paragraph'>Search</p>
                }
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
          : <div className='tb-menu-dark'>
              <div className='tb-search-bar-dark'>
                <input 
                  className='tb-input-dark'
                  type="text" 
                  placeholder="search prefix..." 
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <p onClick={() => {searchCurrentQuery()}} className='search'>Search</p>
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
      }
    </div>
  )
}
export default BillingSearchComponent
