import React, { useEffect, useState } from 'react'
import BilingTableComponent from './BilingTableComponent'
import BillingSearchComponent from './BillingSearchComponent'
import '../../../css/billing.css'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from '../../../auth/Firebase'
import PrefixDetailsComponent from './PrefixDetailsComponent'

const BillingComponent = (props) => {
  const {mode, contentTab, userAccess, setContentTab} = props

  const [searchTerm, setSearchTerm] = useState('')
  const [sort, setSort] = useState('insuranceName')
  const [activeSearch, setActiveSearch] = useState(false)
  const [viewFacility, setViewFacility] = useState('all')

  const [affinityRecords, setAffinityRecords] = useState([])
  const [beacsideRecords, setBeachsideRecords] = useState([])
  const [axisRecords, setAxisRecords] = useState([])
  const [billingList, setBillingList] = useState([])

  const [viewTable, setViewTable] = useState('all')

  const [viewPrefix, setViewPrefix] = useState(true)
  const [viewInsurance, setViewInsurance] = useState(true)
  const [viewNetwork, setViewNetwork] = useState(true)
  const [viewFacilityCol, setViewFacilityCol] = useState(true)
  const [viewResDays, setViewResDays] = useState(true)
  const [viewResVisits, setViewResVisits] = useState(true)
  const [viewDetoxDays, setViewDetoxDays] = useState(true)
  const [viewDetoxVisits, setViewDetoxVisits] = useState(true)
  const [viewTotalCharge, setViewTotalCharge] = useState(true)
  const [viewTotalPaid, setViewTotalPaid] = useState(true)
  const [viewPayout, setViewPayout] = useState(true)
  const [viewDeciion, setViewDeciion] = useState(true)
  const [viewAdmit, setViewAdmit] = useState(true)

  const [viewSubTable, setViewSubTable] = useState(false)
  const [subTablePrefix, setSubTablePrefix] = useState('')
  const [subTableInsurance, setSubTableInsurance] = useState('')

  useEffect(() => {
    grabBilling()
  }, [])

  useEffect(() => {
    console.log(sort)
    searchSortQuery()
  }, [sort])

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
      console.log(snapshot.docs.length)
      if(snapshot.docs.length < 1){
        alert(`No records found with prefix ${searchTerm.toUpperCase()}`)
      } else {
        let billings = [];
        snapshot.docs.forEach(doc => {
            billings.push({data: doc.data(), id: doc.id});
        });
        setBillingList(billings)
      }
    });
  }

  const searchSortQuery = () => {
    let queryRefBilling;
    queryRefBilling = query(collection(db, 'BillingDetailsPrefixVOB'),orderBy(sort));
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
  }

  return (
    <>
      {
        mode == 'light'
          ? viewSubTable
              ? <PrefixDetailsComponent 
                  prefix={subTablePrefix} 
                  insuranceName={subTableInsurance} 
                  mode={mode} 
                  userAccess={userAccess}
                  setViewSubTable={setViewSubTable}/>
              : <div className='main-billing-content'>
              <div className='top-bar'>  
                <BillingSearchComponent 
                  searchTerm={searchTerm}
                  handleSearchChange={handleSearchChange}
                  mode={mode}
                  searchCurrentQuery={searchCurrentQuery}
                  activeSearch={activeSearch}
                  setActiveSearch={setActiveSearch}
                  clearSearch={clearSearch}
                  setSort={setSort}
                  setViewTable={setViewTable}

                  viewPrefix={viewPrefix}
                  viewInsurance={viewInsurance}
                  viewNetwork={viewNetwork}
                  viewFacilityCol={viewFacilityCol}
                  viewResDays={viewResDays}
                  viewResVisits={viewResVisits}
                  viewDetoxDays={viewDetoxDays}
                  viewDetoxVisits={viewDetoxVisits}
                  viewTotalCharge={viewTotalCharge}
                  viewTotalPaid={viewTotalPaid}
                  viewPayout={viewPayout}
                  viewDeciion={viewDeciion}
                  viewAdmit={viewAdmit}

                  setViewPrefix={setViewPrefix}
                  setViewInsurance={setViewInsurance}
                  setViewNetwork={setViewNetwork}
                  setViewFacilityCol={setViewFacilityCol}
                  setViewResDays={setViewResDays}
                  setViewResVisits={setViewResVisits}
                  setViewDetoxDays={setViewDetoxDays}
                  setViewDetoxVisits={setViewDetoxVisits}
                  setViewTotalCharge={setViewTotalCharge}
                  setViewTotalPaid={setViewTotalPaid}
                  setViewPayout={setViewPayout}
                  setViewDeciion={setViewDeciion}
                  setViewAdmit={setViewAdmit}

                  userAccess={userAccess}
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
                  viewFacility={viewFacility}

                  viewPrefix={viewPrefix}
                  viewInsurance={viewInsurance}
                  viewNetwork={viewNetwork}
                  viewFacilityCol={viewFacilityCol}
                  viewResDays={viewResDays}
                  viewResVisits={viewResVisits}
                  viewDetoxDays={viewDetoxDays}
                  viewDetoxVisits={viewDetoxVisits}
                  viewTotalCharge={viewTotalCharge}
                  viewTotalPaid={viewTotalPaid}
                  viewPayout={viewPayout}
                  viewDeciion={viewDeciion}
                  viewAdmit={viewAdmit}
                  
                  viewSubTable={viewSubTable}
                  setViewSubTable={setViewSubTable}
                  setSubTablePrefix={setSubTablePrefix}
                  setSubTableInsurance={setSubTableInsurance}

                  userAccess={userAccess}
                />
              </div>
            </div>
          : viewSubTable
              ? <PrefixDetailsComponent 
                  prefix={subTablePrefix} 
                  insuranceName={subTableInsurance} 
                  mode={mode} 
                  userAccess={userAccess}
                  setViewSubTable={setViewSubTable}/>
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
                      setSort={setSort}
                      setViewTable={setViewTable}

                      viewPrefix={viewPrefix}
                      viewInsurance={viewInsurance}
                      viewNetwork={viewNetwork}
                      viewFacilityCol={viewFacilityCol}
                      viewResDays={viewResDays}
                      viewResVisits={viewResVisits}
                      viewDetoxDays={viewDetoxDays}
                      viewDetoxVisits={viewDetoxVisits}
                      viewTotalCharge={viewTotalCharge}
                      viewTotalPaid={viewTotalPaid}
                      viewPayout={viewPayout}
                      viewDeciion={viewDeciion}
                      viewAdmit={viewAdmit}

                      setViewPrefix={setViewPrefix}
                      setViewInsurance={setViewInsurance}
                      setViewNetwork={setViewNetwork}
                      setViewFacilityCol={setViewFacilityCol}
                      setViewResDays={setViewResDays}
                      setViewResVisits={setViewResVisits}
                      setViewDetoxDays={setViewDetoxDays}
                      setViewDetoxVisits={setViewDetoxVisits}
                      setViewTotalCharge={setViewTotalCharge}
                      setViewTotalPaid={setViewTotalPaid}
                      setViewPayout={setViewPayout}
                      setViewDeciion={setViewDeciion}
                      setViewAdmit={setViewAdmit}

                      userAccess={userAccess}
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
                      viewFacility={viewFacility}

                      viewPrefix={viewPrefix}
                      viewInsurance={viewInsurance}
                      viewNetwork={viewNetwork}
                      viewFacilityCol={viewFacilityCol}
                      viewResDays={viewResDays}
                      viewResVisits={viewResVisits}
                      viewDetoxDays={viewDetoxDays}
                      viewDetoxVisits={viewDetoxVisits}
                      viewTotalCharge={viewTotalCharge}
                      viewTotalPaid={viewTotalPaid}
                      viewPayout={viewPayout}
                      viewDeciion={viewDeciion}
                      viewAdmit={viewAdmit}

                      viewSubTable={viewSubTable}
                      setViewSubTable={setViewSubTable}
                      setSubTablePrefix={setSubTablePrefix}
                      setSubTableInsurance={setSubTableInsurance}

                      userAccess={userAccess}
                    />
                  </div>
                </div>
      }
    </>
  )
}

export default BillingComponent
