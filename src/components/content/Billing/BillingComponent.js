import React, { useEffect, useState } from 'react'
import BilingTableComponent from './BilingTableComponent'
import BillingSearchComponent from './BillingSearchComponent'
import '../../../css/billing.css'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from '../../../auth/Firebase'

const BillingComponent = (props) => {
  const {mode, contentTab, setContentTab} = props

  const [searchTerm, setSearchTerm] = useState('')
  const [sort, setSort] = useState('insuranceName')
  const [activeSearch, setActiveSearch] = useState(false)

  const [affinityRecords, setAffinityRecords] = useState([])
  const [beacsideRecords, setBeachsideRecords] = useState([])
  const [axisRecords, setAxisRecords] = useState([])
  const [billingList, setBillingList] = useState([])

  const [viewTable, setViewTable] = useState('all')

  useEffect(() => {
    grabBilling()
  }, [])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const grabBilling = () => {
    let affinity = []
    let beachside = []
    let axis = []
    const colRef = collection(db, 'BillingDetailsPrefixVOB')
    onSnapshot(colRef, snapshot => {
        let billings = [];
        snapshot.docs.forEach(doc => {
          let docData = doc.data()
          billings.push({data: doc.data(), id: doc.id});
          if(docData.facility === 'AFFINITY'){
            affinity.push({data: doc.data(), id: doc.id})
          } else if(docData.facility === 'BEACHSIDE'){
            beachside.push({data: doc.data(), id: doc.id})
          } else if(docData.facility === 'AXIS'){
            axis.push({data: doc.data(), id: doc.id})
          } else {
            console.log('facility not found')
          }
        });
        setAffinityRecords(affinity)
        setBeachsideRecords(beachside)
        setAxisRecords(axis)
        setBillingList(billings)
    });
  }

  const searchCurrentQuery = () => {
    setActiveSearch(true)
    let queryRefBilling;
    queryRefBilling = query(collection(db, 'BillingDetailsPrefixVOB'), where('prefix', '==', searchTerm.toUpperCase()),orderBy(sort));
    onSnapshot(queryRefBilling, snapshot => {
      let billings = [];
      snapshot.docs.forEach(doc => {
          billings.push({data: doc.data(), id: doc.id});
      });
      setBillingList(billings)
    });
  }

  const clearSearch = () => {
    grabBilling()
    setActiveSearch(false)
    setSearchTerm('')
  }

  return (
    <>
      {
        mode == 'light'
          ? <div className='main-billing-content'>
              <div className='top-bar'>  
                <BillingSearchComponent 
                  searchTerm={searchTerm}
                  handleSearchChange={handleSearchChange}
                  mode={mode}
                  searchCurrentQuery={searchCurrentQuery}
                  activeSearch={activeSearch}
                  setActiveSearch={setActiveSearch}
                  clearSearch={clearSearch}
                />
              </div>
              <div className='main-content'>
                <BilingTableComponent 
                  affinityRecords={affinityRecords}
                  beacsideRecords={beacsideRecords}
                  axisRecords={axisRecords}
                  billingList={billingList}
                  viewTable={viewTable}
                  setViewTable={setViewTable}
                  mode={mode}
                />
              </div>
            </div>
          : <div className='main-billing-content-dark'>
              <div className='top-bar'>  
                <BillingSearchComponent 
                  searchTerm={searchTerm}
                  handleSearchChange={handleSearchChange}
                  mode={mode}
                  searchCurrentQuery={searchCurrentQuery}
                  activeSearch={activeSearch}
                  setActiveSearch={setActiveSearch}
                  clearSearch={clearSearch}
                />
              </div>
              <div className='main-content'>
                <BilingTableComponent 
                  affinityRecords={affinityRecords}
                  beacsideRecords={beacsideRecords}
                  axisRecords={axisRecords}
                  billingList={billingList}
                  viewTable={viewTable}
                  setViewTable={setViewTable}
                  mode={mode}
                />
              </div>
            </div>
      }
    </>
  )
}

export default BillingComponent
