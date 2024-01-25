import React from 'react'
import DailyRateTableContentComponent from './DailyRateTableContentComponent'

const DailyRateTableComponent = (props) => {
  const {
    records,
    mode
  } = props
  
  return (
    <>
      {
        mode === 'light'
          ? <div className='main-content-area-full'>
              <table className='table-container-light'>
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
                  <DailyRateTableContentComponent records={records} mode={mode}/>
                </tbody>
              </table>
            </div>
          : <div className='main-content-area-full'>
              <table className='table-container-dark'>
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
                  <DailyRateTableContentComponent records={records}  mode={mode}/>
                </tbody>
              </table>
            </div>
      }
    </>
  )
}

export default DailyRateTableComponent
