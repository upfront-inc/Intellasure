import React from 'react'
import AccountTableContentComponent from './AccountTableContentComponent'

const AccountTableComponent = (props) => {
  const {
    records,
  } = props
  return (
    <div className='main-content-area'>
      <table className='table-container'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Privileges</th>
            <th>Account</th>
          </tr>
        </thead>
        <tbody>
          <AccountTableContentComponent records={records}/>         
        </tbody>
      </table>
    </div>
  )
}

export default AccountTableComponent
