import React from 'react'
import TicketTableContentComponent from './TicketTableContentComponent'
import '../../../css/billing.css'

const TicketTableComponent = (props) => {
  const {
    records,
    mode
  } = props
  return (
    <div className='main-content-area-full'>
      {
        mode === 'light'
          ? <table className='table-container-light'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Ticket</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                <TicketTableContentComponent records={records} mode={mode}/>         
              </tbody>
            </table>
          : <table className='table-container-dark'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Ticket</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                <TicketTableContentComponent records={records} mode={mode}/>         
              </tbody>
            </table>
      }
    </div>
  )
}

export default TicketTableComponent
