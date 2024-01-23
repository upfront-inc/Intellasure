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
    clearSearch,
    setSort,
    setViewTable
  } = props

  const [showSortOptions, setShowSortOptions] = useState(false);
  const [showFacilityFilter, setShowFacilityFilter] = useState(false);


  const handleSortOptionClick = (option) => {
    setSort(option)
    setShowSortOptions(false);
  };

  const handleFacilityFilterClick = (facility) => {
    setViewTable(facility)
    setShowFacilityFilter(false);
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
              <div onClick={() => setShowSortOptions(!showSortOptions)}  className='button-container'>
                <FontAwesomeIcon icon={faSort} className="tb-icon-menu"/>
                <p className='button-text'>Sort</p>
              </div>
              <div className={showSortOptions ? 'sort-options-container visible' : 'sort-options-container'}>
                <div onClick={() => handleSortOptionClick('prefix')}>Prefix</div>
                <div onClick={() => handleSortOptionClick('insuranceName')}>Insurance</div>
                <div onClick={() => handleSortOptionClick('facility')}>Facility</div>
                <div onClick={() => handleSortOptionClick('network')}>Network</div>
                <div onClick={() => handleSortOptionClick('totalCharges')}>Total Charges</div>
                <div onClick={() => handleSortOptionClick('totalPaid')}>Total Paid</div>
                <div onClick={() => handleSortOptionClick('payoutRatio')}>Payout Ratio</div>
              </div>
              <div className='button-container'>
                <FontAwesomeIcon icon={faFilter} className="tb-icon-menu"/>
                <p className='button-text'>Filter</p>
              </div>
              <div onClick={() => setShowFacilityFilter(!showFacilityFilter)} className='button-container button-end'>
                <FontAwesomeIcon icon={faBuilding} className="tb-icon-menu"/>
                <p className='button-text'>Facility</p>
              </div>
              <div className={showFacilityFilter ? 'facility-filter-container visible' : 'facility-filter-container'}>
                <div onClick={() => handleFacilityFilterClick('all')}>All Facilities</div>
                <div onClick={() => handleFacilityFilterClick('affinity')}>Affinity Facility</div>
                <div onClick={() => handleFacilityFilterClick('axis')}>Axis Facility</div>
                <div onClick={() => handleFacilityFilterClick('beachside')}>Beachside Facility</div>
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
              <div onClick={() => setShowSortOptions(!showSortOptions)}  className='button-container hover-paragraph'>
                <FontAwesomeIcon icon={faSort} className="tb-icon-menu"/>
                <p className='button-text'>Sort</p>
              </div>
              <div className={showSortOptions ? 'sort-options-container-dark visible' : 'sort-options-container-dark'}>
                <div onClick={() => handleSortOptionClick('prefix')}>Prefix</div>
                <div onClick={() => handleSortOptionClick('insuranceName')}>Insurance</div>
                <div onClick={() => handleSortOptionClick('facility')}>Facility</div>
                <div onClick={() => handleSortOptionClick('network')}>Network</div>
                <div onClick={() => handleSortOptionClick('totalCharges')}>Total Charges</div>
                <div onClick={() => handleSortOptionClick('totalPaid')}>Total Paid</div>
                <div onClick={() => handleSortOptionClick('payoutRatio')}>Payout Ratio</div>
              </div>
              <div className='button-container'>
                <FontAwesomeIcon icon={faFilter} className="tb-icon-menu"/>
                <p className='button-text'>Filter</p>
              </div>
              <div onClick={() => setShowFacilityFilter(!showFacilityFilter)} className='button-container button-end'>
                <FontAwesomeIcon icon={faBuilding} className="tb-icon-menu"/>
                <p className='button-text'>Facility</p>
              </div>
              <div onClick={() => setShowFacilityFilter(!showFacilityFilter)} className={showFacilityFilter ? 'facility-filter-container-dark visible' : 'facility-filter-container-dark'}>
                <div onClick={() => handleFacilityFilterClick('all')}>All Facilities</div>
                <div onClick={() => handleFacilityFilterClick('affinity')}>Affinity Facility</div>
                <div onClick={() => handleFacilityFilterClick('axis')}>Axis Facility</div>
                <div onClick={() => handleFacilityFilterClick('beachside')}>Beachside Facility</div>
              </div>
            </div>
      }
    </div>
  )
}
export default BillingSearchComponent
