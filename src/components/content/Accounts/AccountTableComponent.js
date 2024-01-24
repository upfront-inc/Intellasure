import React from 'react'
import AccountTableContentComponent from './AccountTableContentComponent'

const AccountTableComponent = (props) => {
  const {
    records, mode
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
                  <th>Status</th>
                  <th>Privileges</th>
                  <th>Account</th>
                </tr>
              </thead>
              <tbody>
                <AccountTableContentComponent records={records} mode={mode}/>         
              </tbody>
            </table>
          : <table className='table-container-dark'>
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
                <AccountTableContentComponent records={records} mode={mode}/>         
              </tbody>
            </table>
      }
    </div>
  )
}

export default AccountTableComponent
