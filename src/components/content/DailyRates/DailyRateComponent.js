import React, { useEffect, useState } from 'react'
import '../../../css/billing.css'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../../../auth/Firebase'
import DailyRateTableComponent from './DailyRateTableComponent'
import DailyTableSearchComponent from './DailyTableSearchComponent'

const DailyRateComponent = (props) => {

  const [searchTerm, setSearchTerm] = useState('')

  const [resulls, setResults] = useState([])

  useEffect(() => {
    grabDailyRates()
  }, [])

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

  console.log('dailt rate')

  return (
    <div className='main-billing-content'>
      <div className='top-bar'>  
        <DailyTableSearchComponent 
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
        />
      </div>
      <div className='main-content'>
        <DailyRateTableComponent 
          records={resulls}
        />
      </div>
    </div>
  )
}

export default DailyRateComponent
