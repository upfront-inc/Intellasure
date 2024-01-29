import React, { useState } from 'react'
import BillingTableContentComponent from './BillingTableContentComponent'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../../../auth/Firebase'
import SubTableComponent from './SubTableComponent'

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
        showSubTable
          ? mode === 'light'
              ?
                <div className='main-content-area-split-full'>
                  <div className='main-content-area-split-top'>
                    <table className='table-container-light'>
                      <thead>
                        {
                          userAccess === 'admin' || userAccess==='dev' || userAccess==='owner'
                            ? <tr>
                                {
                                  viewPrefix
                                    ? <th>Prefix</th>
                                    : null
                                }
                                {
                                  viewInsurance
                                    ? <th>Insurance</th>
                                    : null
                                }
                                {
                                  viewNetwork
                                    ? <th>Network</th>
                                    : null
                                }
                                {
                                  viewFacilityCol
                                    ? <th>Facility</th>
                                    : null
                                }
                                {
                                  viewResDays
                                    ? <th>Res. Units</th>
                                    : null
                                }
                                {
                                  viewResVisits
                                    ? <th>Res. Addmissions</th>
                                    : null
                                }
                                {
                                  viewDetoxDays
                                    ? <th>Detox Units</th>
                                    : null
                                }
                                {
                                  viewDetoxVisits
                                    ? <th>Detox Addmissions</th>
                                    : null
                                }
                                {
                                  viewTotalCharge
                                    ? <th>Total Charges</th>
                                    : null
                                }
                                {
                                  viewTotalPaid
                                    ? <th>Total Paid</th>
                                    : null
                                }
                                {
                                  viewPayout
                                    ? <th>Payout %</th>
                                    : null
                                }
                                {
                                  viewDeciion
                                    ? <th>Admission</th>
                                    : null
                                }
                                {
                                  viewAdmit
                                    ? <th>Admit %</th>
                                    : null
                                }
                                <th>Details</th>
                              </tr>
                            : <tr>
                                {
                                  viewPrefix
                                    ? <th>Prefix</th>
                                    : null
                                }
                                {
                                  viewInsurance
                                    ? <th>Insurance</th>
                                    : null
                                }
                                {
                                  viewNetwork
                                    ? <th>Network</th>
                                    : null
                                }
                                {
                                  viewFacilityCol
                                    ? <th>Facility</th>
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
                                    ? <th>Payout %</th>
                                    : null
                                }
                                {
                                  viewDeciion
                                    ? <th>Admission</th>
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
                  <SubTableComponent subRecords={subRecords} userAccess={userAccess}/>
                </div>
              :
              <div className='main-content-area-split-full'>
                <div className='main-content-area-split-top'>
                  <table className='table-container-dark'>
                    <thead>
                      {
                        userAccess === 'admin' || userAccess==='dev' || userAccess==='owner'
                          ? <tr>
                              {
                                viewPrefix
                                  ? <th>Prefix</th>
                                  : null
                              }
                              {
                                viewInsurance
                                  ? <th>Insurance</th>
                                  : null
                              }
                              {
                                viewNetwork
                                  ? <th>Network</th>
                                  : null
                              }
                              {
                                viewFacilityCol
                                  ? <th>Facility</th>
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
                                  ? <th>Total Charges</th>
                                  : null
                              }
                              {
                                viewTotalPaid
                                  ? <th>Total Paid</th>
                                  : null
                              }
                              {
                                viewPayout
                                  ? <th>Payout %</th>
                                  : null
                              }
                              {
                                viewDeciion
                                  ? <th>Admission</th>
                                  : null
                              }
                              {
                                viewAdmit
                                  ? <th>Admit %</th>
                                  : null
                              }
                              <th>Details</th>
                            </tr>
                          : <tr>
                              {
                                viewPrefix
                                  ? <th>Prefix</th>
                                  : null
                              }
                              {
                                viewInsurance
                                  ? <th>Insurance</th>
                                  : null
                              }
                              {
                                viewNetwork
                                  ? <th>Network</th>
                                  : null
                              }
                              {
                                viewFacilityCol
                                  ? <th>Facility</th>
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
                                  ? <th>Payout %</th>
                                  : null
                              }
                              {
                                viewDeciion
                                  ? <th>Admission</th>
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
                <SubTableComponent subRecords={subRecords} userAccess={userAccess}/>
              </div>
          
          : mode === 'light'
              ?
                <div className='main-content-area-full'>
                  <table className='table-container-light'>
                    <thead>
                      {
                        userAccess === 'admin' || userAccess==='dev' || userAccess==='owner'
                          ? <tr>
                              {
                                viewPrefix
                                  ? <th>Prefix</th>
                                  : null
                              }
                              {
                                viewInsurance
                                  ? <th>Insurance</th>
                                  : null
                              }
                              {
                                viewNetwork
                                  ? <th>Network</th>
                                  : null
                              }
                              {
                                viewFacilityCol
                                  ? <th>Facility</th>
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
                                  ? <th>Total Charges</th>
                                  : null
                              }
                              {
                                viewTotalPaid
                                  ? <th>Total Paid</th>
                                  : null
                              }
                              {
                                viewPayout
                                  ? <th>Payout %</th>
                                  : null
                              }
                              {
                                viewDeciion
                                  ? <th>Admission</th>
                                  : null
                              }
                              {
                                viewAdmit
                                  ? <th>Admit %</th>
                                  : null
                              }
                              <th>Details</th>
                            </tr>
                          : <tr>
                              {
                                viewPrefix
                                  ? <th>Prefix</th>
                                  : null
                              }
                              {
                                viewInsurance
                                  ? <th>Insurance</th>
                                  : null
                              }
                              {
                                viewNetwork
                                  ? <th>Network</th>
                                  : null
                              }
                              {
                                viewFacilityCol
                                  ? <th>Facility</th>
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
                                  ? <th>Payout %</th>
                                  : null
                              }
                              {
                                viewDeciion
                                  ? <th>Admission</th>
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
              :
                <div className='main-content-area-full'>
                <table className='table-container-dark'>
                  <thead>
                    {
                      userAccess === 'admin' || userAccess==='dev' || userAccess==='owner'
                        ? <tr>
                            {
                              viewPrefix
                                ? <th>Prefix</th>
                                : null
                            }
                            {
                              viewInsurance
                                ? <th>Insurance</th>
                                : null
                            }
                            {
                              viewNetwork
                                ? <th>Network</th>
                                : null
                            }
                            {
                              viewFacilityCol
                                ? <th>Facility</th>
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
                                ? <th>Total Charges</th>
                                : null
                            }
                            {
                              viewTotalPaid
                                ? <th>Total Paid</th>
                                : null
                            }
                            {
                              viewPayout
                                ? <th>Payout %</th>
                                : null
                            }
                            {
                              viewDeciion
                                ? <th>Admission</th>
                                : null
                            }
                            {
                              viewAdmit
                                ? <th>Admit %</th>
                                : null
                            }
                            <th>Details</th>
                          </tr>
                        : <tr>
                            {
                              viewPrefix
                                ? <th>Prefix</th>
                                : null
                            }
                            {
                              viewInsurance
                                ? <th>Insurance</th>
                                : null
                            }
                            {
                              viewNetwork
                                ? <th>Network</th>
                                : null
                            }
                            {
                              viewFacilityCol
                                ? <th>Facility</th>
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
                                ? <th>Payout %</th>
                                : null
                            }
                            {
                              viewDeciion
                                ? <th>Admission</th>
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
      }
    </>
  )
}

export default BilingTableComponent
