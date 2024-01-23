import React from 'react'
import BillingTableContentComponent from './BillingTableContentComponent'

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
  } = props
  return (
    <div className='main-content-area'>
      <table className='table-container'>
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
                  viewAdmit={viewAdmit}/>
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
                      viewAdmit={viewAdmit}/>
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
                          viewAdmit={viewAdmit}/>
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
                              viewAdmit={viewAdmit}/>
                          : null
          }
        </tbody>
      </table>
    </div>
  )
}

export default BilingTableComponent
