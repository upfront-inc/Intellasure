import React from 'react'
import DailyRateTableContentComponent from './DailyRateTableContentComponent'

const DailyRateTableComponent = (props) => {
  const {
    records
  } = props
  return (
    <div className='main-content-area'>
      <table className='table-container'>
        <thead>
          <tr>
            <th>Prefix</th>
            <th>Insurance</th>
            <th>Level Of Care</th>
            <th>Admitted</th>
            <th>Daily Rate</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          <DailyRateTableContentComponent records={records}/>
        </tbody>
      </table>
    </div>
  )
}

export default DailyRateTableComponent
