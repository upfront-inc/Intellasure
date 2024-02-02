import React, { useState } from 'react'
import BillingTableContentComponent from './BillingTableContentComponent'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../../../auth/Firebase'
import SubTableComponent from './SubTableComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesDown, faAnglesUp } from '@fortawesome/free-solid-svg-icons'

const BilingTableComponent = (props) => {
  const {
    affinityRecords,
    beacsideRecords,
    axisRecords,
    billingList,
    viewTable,
    setViewTable,
    mode,
    viewFacility,
    userAccess,
    viewPrefix,
    viewInsurance,
    viewNetwork,
    viewFacilityCol,
    viewResDays,
    viewResVisits,
    viewDetoxDays,
    viewDetoxVisits,
    viewTotalCharge,
    viewTotalPaid,
    viewPayout,
    viewDeciion,
    viewAdmit,
    viewSubTable,
    setViewSubTable,
    setSubTablePrefix,
    setSubTableInsurance,
    setSortField,
    setSortDirection,
    sortField,
    sortDirection,
  } = props

  const [showSubTable, setShowSubTable] = useState(false)
  const [subRecords, setSubRecords] = useState([])

  const [selectedRow, setSelectedRow] = useState(null);


  const handleShowSubRecords = (customer, index) => {
    console.log('show sub table: ', index)
    console.log('show customer: ', customer)
    setSubTablePrefix(customer.data.prefix)
    setSubTableInsurance(customer.data.insuranceName)
    setViewSubTable(true);
  };

  const handleSort = (field) => {
    if (field === sortField) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
        setSortField(field);
        setSortDirection('asc');
    }
  };

  const handleCloseSubRecords = () => {
    console.log('close table')
    setShowSubTable(false)
    setSelectedRow(null)
    setSubRecords([]);
};

  const grabAssociatedRecords = (customer) => {
    const colRef = collection(db, 'BillingDetailsInsurancePolicyDup');
    const q = query(colRef, where('insuranceName', '==', customer.data.insuranceName), where('prefix', '==', customer.data.prefix));
    onSnapshot(q, snapshot => {
      let results = [];
      snapshot.docs.forEach(doc => {
        const docData = doc.data();
        const docId = doc.id;
        results.push({ data: docData, id: docId });
      });
      setSubRecords(results);
    });
  };

  return (
    <>
      {
        mode === 'light'
        ?
          <div className='main-content-area-full'>
            <div className='table-scroll-wrapper'>

              <table className='table-container-light'>
                <thead>
                  {
                    userAccess === 'admin' || userAccess==='dev' || userAccess==='owner'
                      ? <tr>
                          {
                            viewPrefix
                              ? <th onClick={() => handleSort('prefix')}>Prefix
                                {
                                  sortDirection === 'asc' 
                                    ? <FontAwesomeIcon icon={faAnglesDown} className="icon-menu-sort"/>
                                    : <FontAwesomeIcon icon={faAnglesUp} className="icon-menu-sort"/>
                                }
                              </th>
                              : null
                          }
                          {
                            viewInsurance
                              ? <th onClick={() => handleSort('insuranceName')}>Insurance
                                {
                                  sortDirection === 'asc' 
                                    ? <FontAwesomeIcon icon={faAnglesDown} className="icon-menu-sort"/>
                                    : <FontAwesomeIcon icon={faAnglesUp} className="icon-menu-sort"/>
                                }
                              </th>
                              : null
                          }
                          {
                            viewNetwork
                              ? <th onClick={() => handleSort('network')}>Network
                                {
                                  sortDirection === 'asc' 
                                    ? <FontAwesomeIcon icon={faAnglesDown} className="icon-menu-sort"/>
                                    : <FontAwesomeIcon icon={faAnglesUp} className="icon-menu-sort"/>
                                }
                              </th>
                              : null
                          }
                          {
                            viewFacilityCol
                              ? <th onClick={() => handleSort('facility')}>Facility
                                {
                                  sortDirection === 'asc' 
                                    ? <FontAwesomeIcon icon={faAnglesDown} className="icon-menu-sort"/>
                                    : <FontAwesomeIcon icon={faAnglesUp} className="icon-menu-sort"/>
                                }
                              </th>
                              : null
                          }
                          {
                            viewResDays
                              ? <th>Res. Days</th>
                              : null
                          }
                          {
                            viewResVisits
                              ? <th>Res. Visits</th>
                              : null
                          }
                          {
                            viewDetoxDays
                              ? <th>Detox Days</th>
                              : null
                          }
                          {
                            viewDetoxVisits
                              ? <th>Detox Visits</th>
                              : null
                          }
                          {
                            viewTotalCharge
                              ? <th onClick={() => handleSort('prefixChargeAverage')}>Total Charges
                                {
                                  sortDirection === 'asc' 
                                    ? <FontAwesomeIcon icon={faAnglesDown} className="icon-menu-sort"/>
                                    : <FontAwesomeIcon icon={faAnglesUp} className="icon-menu-sort"/>
                                }
                              </th>
                              : null
                          }
                          {
                            viewTotalPaid
                              ? <th onClick={() => handleSort('prefixPaidAverage')}>Total Paid
                                {
                                  sortDirection === 'asc' 
                                    ? <FontAwesomeIcon icon={faAnglesDown} className="icon-menu-sort"/>
                                    : <FontAwesomeIcon icon={faAnglesUp} className="icon-menu-sort"/>
                                }
                              </th>
                              : null
                          }
                          {
                            viewPayout
                              ? <th onClick={() => handleSort('payoutRatio')}>Payout %
                                {
                                  sortDirection === 'asc' 
                                    ? <FontAwesomeIcon icon={faAnglesDown} className="icon-menu-sort"/>
                                    : <FontAwesomeIcon icon={faAnglesUp} className="icon-menu-sort"/>
                                }
                              </th>
                              : null
                          }
                          {
                            viewDeciion
                              ? <th onClick={() => handleSort('vobDecision')}>Admission
                                {
                                  sortDirection === 'asc' 
                                    ? <FontAwesomeIcon icon={faAnglesDown} className="icon-menu-sort"/>
                                    : <FontAwesomeIcon icon={faAnglesUp} className="icon-menu-sort"/>
                                }
                              </th>
                              : null
                          }
                          {
                            viewAdmit
                              ? <th onClick={() => handleSort('vobPercent')}>Admit %
                                {
                                  sortDirection === 'asc' 
                                    ? <FontAwesomeIcon icon={faAnglesDown} className="icon-menu-sort"/>
                                    : <FontAwesomeIcon icon={faAnglesUp} className="icon-menu-sort"/>
                                }
                              </th>
                              : null
                          }
                          <th>Details</th>
                        </tr>
                      : <tr>
                          {
                            viewPrefix
                              ? <th onClick={() => handleSort('prefix')}>Prefix
                                {
                                  sortDirection === 'asc' 
                                    ? <FontAwesomeIcon icon={faAnglesDown} className="icon-menu-sort"/>
                                    : <FontAwesomeIcon icon={faAnglesUp} className="icon-menu-sort"/>
                                }
                              </th>
                              : null
                          }
                          {
                            viewInsurance
                              ? <th onClick={() => handleSort('insuranceName')}>Insurance
                                {
                                  sortDirection === 'asc' 
                                    ? <FontAwesomeIcon icon={faAnglesDown} className="icon-menu-sort"/>
                                    : <FontAwesomeIcon icon={faAnglesUp} className="icon-menu-sort"/>
                                }
                              </th>
                              : null
                          }
                          {
                            viewNetwork
                              ? <th onClick={() => handleSort('network')}>Network
                                {
                                  sortDirection === 'asc' 
                                    ? <FontAwesomeIcon icon={faAnglesDown} className="icon-menu-sort"/>
                                    : <FontAwesomeIcon icon={faAnglesUp} className="icon-menu-sort"/>
                                }
                              </th>
                              : null
                          }
                          {
                            viewFacilityCol
                              ? <th onClick={() => handleSort('facility')}>Facility
                                {
                                  sortDirection === 'asc' 
                                    ? <FontAwesomeIcon icon={faAnglesDown} className="icon-menu-sort"/>
                                    : <FontAwesomeIcon icon={faAnglesUp} className="icon-menu-sort"/>
                                }
                              </th>
                              : null
                          }
                          {
                            viewResDays
                              ? <th>Res. Days</th>
                              : null
                          }
                          {
                            viewResVisits
                              ? <th>Res. Visits</th>
                              : null
                          }
                          {
                            viewDetoxDays
                              ? <th>Detox Days</th>
                              : null
                          }
                          {
                            viewDetoxVisits
                              ? <th>Detox Visits</th>
                              : null
                          }
                          {
                            viewPayout
                              ? <th onClick={() => handleSort('payoutRatio')}>Payout %
                                {
                                  sortDirection === 'asc' 
                                    ? <FontAwesomeIcon icon={faAnglesDown} className="icon-menu-sort"/>
                                    : <FontAwesomeIcon icon={faAnglesUp} className="icon-menu-sort"/>
                                }
                              </th>
                              : null
                          }
                          {
                            viewDeciion
                              ? <th onClick={() => handleSort('vobDecision')}>Admission
                                {
                                  sortDirection === 'asc' 
                                    ? <FontAwesomeIcon icon={faAnglesDown} className="icon-menu-sort"/>
                                    : <FontAwesomeIcon icon={faAnglesUp} className="icon-menu-sort"/>
                                }
                              </th>
                              : null
                          }
                          <th>Details</th>
                        </tr>
                  }
                </thead>
                <tbody>
                  {
                    viewTable === 'all'
                      ? <BillingTableContentComponent 
                          mode={mode} 
                          records={billingList}
                          userAccess={userAccess}
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
                          handleShowSubRecords={handleShowSubRecords}
                          handleCloseSubRecords={handleCloseSubRecords}
                          selectedRow={selectedRow}
                          showSubTable={showSubTable}/>
                      : viewTable === 'affinity'
                          ? <BillingTableContentComponent 
                              mode={mode} 
                              records={affinityRecords}
                              userAccess={userAccess}
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
                              handleShowSubRecords={handleShowSubRecords}
                              handleCloseSubRecords={handleCloseSubRecords}
                              selectedRow={selectedRow}
                              showSubTable={showSubTable}/>
                          : viewTable === 'beachside'
                              ? <BillingTableContentComponent 
                                  mode={mode} 
                                  records={beacsideRecords}
                                  userAccess={userAccess}
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
                                  handleShowSubRecords={handleShowSubRecords}
                                  handleCloseSubRecords={handleCloseSubRecords}
                                  selectedRow={selectedRow}
                                  showSubTable={showSubTable}/>
                              : viewTable === 'axis'
                                  ? <BillingTableContentComponent 
                                      mode={mode} 
                                      records={axisRecords}
                                      userAccess={userAccess}
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
                                      handleShowSubRecords={handleShowSubRecords}
                                      handleCloseSubRecords={handleCloseSubRecords}
                                      selectedRow={selectedRow}
                                      showSubTable={showSubTable}/>
                                  : null
                  }
                </tbody>
              </table>
            </div>
          </div>
        :
          <div className='main-content-area-full'>
            <div className='table-scroll-wrapper'>
              <table className='table-container-dark'>
                <thead>
                  {
                    userAccess === 'admin' || userAccess==='dev' || userAccess==='owner'
                      ? <tr>
                          {
                            viewPrefix
                              ? <th onClick={() => handleSort('prefix')}>Prefix
                                {
                                  sortDirection === 'asc' 
                                    ? <FontAwesomeIcon icon={faAnglesDown} className="icon-menu-sort"/>
                                    : <FontAwesomeIcon icon={faAnglesUp} className="icon-menu-sort"/>
                                }
                              </th>
                              : null
                          }
                          {
                            viewInsurance
                              ? <th onClick={() => handleSort('insuranceName')}>Insurance
                                {
                                  sortDirection === 'asc' 
                                    ? <FontAwesomeIcon icon={faAnglesDown} className="icon-menu-sort"/>
                                    : <FontAwesomeIcon icon={faAnglesUp} className="icon-menu-sort"/>
                                }
                              </th>
                              : null
                          }
                          {
                            viewNetwork
                              ? <th onClick={() => handleSort('network')}>Network
                                {
                                  sortDirection === 'asc' 
                                    ? <FontAwesomeIcon icon={faAnglesDown} className="icon-menu-sort"/>
                                    : <FontAwesomeIcon icon={faAnglesUp} className="icon-menu-sort"/>
                                }
                              </th>
                              : null
                          }
                          {
                            viewFacilityCol
                              ? <th onClick={() => handleSort('facility')}>Facility
                                {
                                  sortDirection === 'asc' 
                                    ? <FontAwesomeIcon icon={faAnglesDown} className="icon-menu-sort"/>
                                    : <FontAwesomeIcon icon={faAnglesUp} className="icon-menu-sort"/>
                                }
                              </th>
                              : null
                          }
                          {
                            viewResDays
                              ? <th>Res. Days</th>
                              : null
                          }
                          {
                            viewResVisits
                              ? <th>Res. Visits</th>
                              : null
                          }
                          {
                            viewDetoxDays
                              ? <th>Detox Days</th>
                              : null
                          }
                          {
                            viewDetoxVisits
                              ? <th>Detox Visits</th>
                              : null
                          }
                          {
                            viewTotalCharge
                              ? <th onClick={() => handleSort('prefixChargeAverage')}>Total Charges
                                {
                                  sortDirection === 'asc' 
                                    ? <FontAwesomeIcon icon={faAnglesDown} className="icon-menu-sort"/>
                                    : <FontAwesomeIcon icon={faAnglesUp} className="icon-menu-sort"/>
                                }
                              </th>
                              : null
                          }
                          {
                            viewTotalPaid
                              ? <th onClick={() => handleSort('prefixPaidAverage')}>Total Paid
                                {
                                  sortDirection === 'asc' 
                                    ? <FontAwesomeIcon icon={faAnglesDown} className="icon-menu-sort"/>
                                    : <FontAwesomeIcon icon={faAnglesUp} className="icon-menu-sort"/>
                                }
                              </th>
                              : null
                          }
                          {
                            viewPayout
                              ? <th onClick={() => handleSort('payoutRatio')}>Payout %
                                {
                                  sortDirection === 'asc' 
                                    ? <FontAwesomeIcon icon={faAnglesDown} className="icon-menu-sort"/>
                                    : <FontAwesomeIcon icon={faAnglesUp} className="icon-menu-sort"/>
                                }
                              </th>
                              : null
                          }
                          {
                            viewDeciion
                              ? <th onClick={() => handleSort('vobDecision')}>Admission
                                {
                                  sortDirection === 'asc' 
                                    ? <FontAwesomeIcon icon={faAnglesDown} className="icon-menu-sort"/>
                                    : <FontAwesomeIcon icon={faAnglesUp} className="icon-menu-sort"/>
                                }
                              </th>
                              : null
                          }
                          {
                            viewAdmit
                              ? <th onClick={() => handleSort('vobPercent')}>Admit %
                                {
                                  sortDirection === 'asc' 
                                    ? <FontAwesomeIcon icon={faAnglesDown} className="icon-menu-sort"/>
                                    : <FontAwesomeIcon icon={faAnglesUp} className="icon-menu-sort"/>
                                }
                              </th>
                              : null
                          }
                          <th>Details</th>
                        </tr>
                      : <tr>
                          {
                            viewPrefix
                              ? <th onClick={() => handleSort('prefix')}>Prefix
                                {
                                  sortDirection === 'asc' 
                                    ? <FontAwesomeIcon icon={faAnglesDown} className="icon-menu-sort"/>
                                    : <FontAwesomeIcon icon={faAnglesUp} className="icon-menu-sort"/>
                                }
                              </th>
                              : null
                          }
                          {
                            viewInsurance
                              ? <th onClick={() => handleSort('insuranceName')}>Insurance
                                {
                                  sortDirection === 'asc' 
                                    ? <FontAwesomeIcon icon={faAnglesDown} className="icon-menu-sort"/>
                                    : <FontAwesomeIcon icon={faAnglesUp} className="icon-menu-sort"/>
                                }
                              </th>
                              : null
                          }
                          {
                            viewNetwork
                              ? <th onClick={() => handleSort('networl')}>Network
                                {
                                  sortDirection === 'asc' 
                                    ? <FontAwesomeIcon icon={faAnglesDown} className="icon-menu-sort"/>
                                    : <FontAwesomeIcon icon={faAnglesUp} className="icon-menu-sort"/>
                                }
                              </th>
                              : null
                          }
                          {
                            viewFacilityCol
                              ? <th onClick={() => handleSort('facility')}>Facility
                                {
                                  sortDirection === 'asc' 
                                    ? <FontAwesomeIcon icon={faAnglesDown} className="icon-menu-sort"/>
                                    : <FontAwesomeIcon icon={faAnglesUp} className="icon-menu-sort"/>
                                }
                              </th>
                              : null
                          }
                          {
                            viewResDays
                              ? <th>Res. Days</th>
                              : null
                          }
                          {
                            viewResVisits
                              ? <th>Res. Visits</th>
                              : null
                          }
                          {
                            viewDetoxDays
                              ? <th>Detox Days</th>
                              : null
                          }
                          {
                            viewDetoxVisits
                              ? <th>Detox Visits</th>
                              : null
                          }
                          {
                            viewPayout
                              ? <th onClick={() => handleSort('payoutRatio')}>Payout %
                                {
                                  sortDirection === 'asc' 
                                    ? <FontAwesomeIcon icon={faAnglesDown} className="icon-menu-sort"/>
                                    : <FontAwesomeIcon icon={faAnglesUp} className="icon-menu-sort"/>
                                }
                              </th>
                              : null
                          }
                          {
                            viewDeciion
                              ? <th onClick={() => handleSort('vobDecision')}>Admission
                                {
                                  sortDirection === 'asc' 
                                    ? <FontAwesomeIcon icon={faAnglesDown} className="icon-menu-sort"/>
                                    : <FontAwesomeIcon icon={faAnglesUp} className="icon-menu-sort"/>
                                }
                              </th>
                              : null
                          }
                          <th>Details</th>
                        </tr>
                  }
                </thead>
                <tbody>
                  {
                    viewTable === 'all'
                      ? <BillingTableContentComponent 
                          mode={mode} 
                          records={billingList}
                          userAccess={userAccess}
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
                          handleShowSubRecords={handleShowSubRecords}
                          handleCloseSubRecords={handleCloseSubRecords}
                          selectedRow={selectedRow}
                          showSubTable={showSubTable}/>
                      : viewTable === 'affinity'
                          ? <BillingTableContentComponent 
                              mode={mode} 
                              records={affinityRecords}
                              userAccess={userAccess}
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
                              handleShowSubRecords={handleShowSubRecords}
                              handleCloseSubRecords={handleCloseSubRecords}
                              selectedRow={selectedRow}
                              showSubTable={showSubTable}/>
                          : viewTable === 'beachside'
                              ? <BillingTableContentComponent 
                                  mode={mode} 
                                  records={beacsideRecords}
                                  userAccess={userAccess}
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
                                  handleShowSubRecords={handleShowSubRecords}
                                  handleCloseSubRecords={handleCloseSubRecords}
                                  selectedRow={selectedRow}
                                  showSubTable={showSubTable}/>
                              : viewTable === 'axis'
                                  ? <BillingTableContentComponent 
                                      mode={mode} 
                                      records={axisRecords}
                                      userAccess={userAccess}
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
                                      handleShowSubRecords={handleShowSubRecords}
                                      handleCloseSubRecords={handleCloseSubRecords}
                                      selectedRow={selectedRow}
                                      showSubTable={showSubTable}/>
                                  : null
                  }
                </tbody>
              </table>
            </div>
        </div>
      }
    </>
  )
}

export default BilingTableComponent
