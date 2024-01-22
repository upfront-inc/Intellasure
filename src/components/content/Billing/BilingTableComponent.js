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
  } = props
  return (
    <div className='main-content-area'>
      <table className='table-container'>
        <thead>
          <tr>
            <th>Prefix</th>
            <th>Insurance</th>
            <th>Netword</th>
            <th>Facility</th>
            <th>Res. Days</th>
            <th>Res. Visits</th>
            <th>Det. Days</th>
            <th>Det. Visits</th>
            <th>Total Charged</th>
            <th>Total Paid</th>
            <th>Payout %</th>
            <th>Admission</th>
            <th>Admit %</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {
            viewTable === 'all'
              ? <BillingTableContentComponent records={billingList}/>
              : viewTable === 'affinity'
                  ? <BillingTableContentComponent records={affinityRecords}/>
                  : viewTable === 'beachsie'
                      ? <BillingTableContentComponent records={beacsideRecords}/>
                      : viewTable === 'axis'
                          ? <BillingTableContentComponent records={axisRecords}/>
                          : null
          }
        </tbody>
      </table>
    </div>
  )
}

export default BilingTableComponent
