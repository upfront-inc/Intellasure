import React, { useState } from 'react'
import '../../../css/topbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faFilter, faSearch, faSort } from '@fortawesome/free-solid-svg-icons'

const DailyTableSearchComponent = (props) => {
  const {
    searchTerm,
    handleSearchChange,
    mode,
    searchCurrentQuery,
    activeSearch,
    clearSearch,
    setSort
  } = props

  const [showSortOptions, setShowSortOptions] = useState(false);

  const handleSortOptionClick = (option) => {
    setSort(option)
    setShowSortOptions(false);
  };

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
              <div onClick={() => setShowSortOptions(!showSortOptions)}  className='button-container hover-paragraph'>
                <FontAwesomeIcon icon={faSort} className="tb-icon-menu"/>
                <p className='button-text'>Sort</p>
              </div>
              <div className={showSortOptions ? 'daily-sort-options-container visible' : 'daily-sort-options-container'}>
                <div onClick={() => handleSortOptionClick('insurancePrefix')}>Prefix</div>
                <div onClick={() => handleSortOptionClick('insuranceName')}>Insurance</div>
                <div onClick={() => handleSortOptionClick('insuranceLoc')}>Level Of Care</div>
                <div onClick={() => handleSortOptionClick('lastUpdate')}>Last Updated</div>
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
              <div onClick={() => setShowSortOptions(!showSortOptions)}  className='button-container hover-paragraph'>
                <FontAwesomeIcon icon={faSort} className="tb-icon-menu"/>
                <p className='button-text'>Sort</p>
              </div>
              <div className={showSortOptions ? 'daily-sort-options-container-dark visible' : 'daily-sort-options-container-dark'}>
                <div onClick={() => handleSortOptionClick('insurancePrefix')}>Prefix</div>
                <div onClick={() => handleSortOptionClick('insuranceName')}>Insurance</div>
                <div onClick={() => handleSortOptionClick('insuranceLoc')}>Level Of Care</div>
                <div onClick={() => handleSortOptionClick('lastUpdate')}>Last Updated</div>
              </div>
            </div>
      }
    </div>
  )
}
export default DailyTableSearchComponent
