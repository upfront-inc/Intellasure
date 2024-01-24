import React, { useEffect, useState } from 'react'
import '../../../css/billing.css'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from '../../../auth/Firebase'
import DailyRateTableComponent from './DailyRateTableComponent'
import DailyTableSearchComponent from './DailyTableSearchComponent'

const DailyRateComponent = (props) => {
  const {mode} = props

  const [searchTerm, setSearchTerm] = useState('')
  const [sort, setSort] = useState('insuranceName')
  const [activeSearch, setActiveSearch] = useState(false)

  const [resulls, setResults] = useState([])

  useEffect(() => {
    grabDailyRates()
  }, [])

  useEffect(() => {
    console.log(sort)
    searchSortQuery()
  }, [sort])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const grabDailyRates = () => {
    const colRef = collection(db, 'CurrentInsurance')
    onSnapshot(colRef, snapshot => {
        let billings = [];
        snapshot.docs.forEach(doc => {
          billings.push({data: doc.data(), id: doc.id});
        });
        setResults(billings)
    });
  }

  const searchCurrentQuery = () => {
    setActiveSearch(true)
    let queryRefDaily;
    queryRefDaily = query(collection(db, 'CurrentInsurance'), where('insurancePrefix', '==', searchTerm.toUpperCase()),orderBy(sort));
    onSnapshot(queryRefDaily, snapshot => {
      let billings = [];
      snapshot.docs.forEach(doc => {
          billings.push({data: doc.data(), id: doc.id});
      });
      setResults(billings)
    });
  }

  const searchSortQuery = () => {
    let queryRefDaily;
    queryRefDaily = query(collection(db, 'CurrentInsurance'), orderBy(sort));
    onSnapshot(queryRefDaily, snapshot => {
      let billings = [];
      snapshot.docs.forEach(doc => {
          billings.push({data: doc.data(), id: doc.id});
      });
      setResults(billings)
    });
  }

  const clearSearch = () => {
    grabDailyRates()
    setActiveSearch(false)
    setSearchTerm('')
  }

  return (
    <>
      {
        mode === 'light'
          ? <div className='main-billing-content'>
              <div className='top-bar'>  
                <DailyTableSearchComponent 
                  searchTerm={searchTerm}
                  handleSearchChange={handleSearchChange}
                  mode={mode}
                  searchCurrentQuery={searchCurrentQuery}
                  activeSearch={activeSearch}
                  setActiveSearch={setActiveSearch}
                  clearSearch={clearSearch}
                  setSort={setSort}
                />
              </div>
              <div className='main-content'>
                <DailyRateTableComponent 
                  records={resulls}
                  mode={mode}
                />
              </div>
            </div>
          : <div className='main-billing-content-dark'>
              <div className='top-bar'>  
                <DailyTableSearchComponent 
                  searchTerm={searchTerm}
                  handleSearchChange={handleSearchChange}
                  mode={mode}
                  searchCurrentQuery={searchCurrentQuery}
                  activeSearch={activeSearch}
                  setActiveSearch={setActiveSearch}
                  clearSearch={clearSearch}
                  setSort={setSort}
                />
              </div>
              <div className='main-content'>
                <DailyRateTableComponent 
                  records={resulls}
                  mode={mode}
                />
              </div>
            </div>
      } 
    </>
  )
}

export default DailyRateComponent
