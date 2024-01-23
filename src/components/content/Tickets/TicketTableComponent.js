import React from 'react'
import TicketTableContentComponent from './TicketTableContentComponent'

const TicketTableComponent = (props) => {
  const {
    records,
    mode
  } = props
  return (
    <div className='main-content-area'>
      <table className='table-container'>
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
    </div>
  )
}

export default TicketTableComponent
