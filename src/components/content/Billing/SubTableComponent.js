import React, { useState } from 'react'
import BillingTableContentComponent from './BillingTableContentComponent'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../../../auth/Firebase'

const SubTableComponent = (props) => {
  const {
    subRecords,
    userAccess
  } = props

  const limitString = (str) => {
    if (str.length > 25) {
      return str.substring(0, 25) + '...';
    } else {
      return str;
    }
  }

  const formatDollarAmount = (str) => {
    const num = parseFloat(str);
    return num.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed in JavaScript
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
  
    return `${month}/${day}/${year}`;
  }

  function getFirstLetter(str) {
    if (str && str.length > 0) {
      return str[0];
    } else {
      return ''; // Return an empty string if the input is empty or not a string
    }
  }

  return (
    <div className='main-content-area-split-bottom'>
      <table className='table-container-dark'>
        <thead>
          <tr>
            <th>Prefix</th>
            <th>Policy</th>
            <th>Name</th>
            <th>Insurance</th>
            <th>Network</th>
            <th>Res. Units</th>
            <th>Res. Admissions</th>
            <th>Det. Unites</th>
            <th>Det. Admissions</th>
            {
              userAccess === 'admin' || userAccess==='dev' || userAccess==='owner'
                ? <th>Total Charged</th>
                : null
            }
            {
              userAccess === 'admin' || userAccess==='dev' || userAccess==='owner'
                ? <th>Total Paid</th>
                : null
            }
            <th>Payout %</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {
            subRecords.map(record => {
              return(
                <tr>
                  <td style={{fontWeight: 'bold'}}>{record.data.prefix}</td>
                  <td style={{fontWeight: 'bold'}}>{record.data.insurancePolicy}</td>
                  <td style={{fontWeight: 'bold'}}>{record.data.firstName} {getFirstLetter(record.data.lastName)}. </td>
                  <td style={{fontWeight: 'bold'}}>{record.data.insuranceName}</td>
                  <td style={{fontWeight: 'bold'}}>{record.data.network}</td>
                  <td style={{fontWeight: 'bold'}}>{record.data.residentialDaysAverage} Days</td>
                  <td style={{fontWeight: 'bold'}}>{record.data.residentialCount} Visits</td>
                  <td style={{fontWeight: 'bold'}}>{record.data.detoxDaysAverage} Days</td>
                  <td style={{fontWeight: 'bold'}}>{record.data.detoxCount} Visits</td>
                  {
                    userAccess === 'admin' || userAccess==='dev' || userAccess==='owner'
                      ? <td style={{fontWeight: 'bold'}}>{formatDollarAmount(record.data.totalCharges)}</td>
                      : null
                  }
                  {
                    userAccess === 'admin' || userAccess==='dev' || userAccess==='owner'
                      ? <td style={{fontWeight: 'bold'}}>{formatDollarAmount(record.data.totalPaid)}</td>
                      : null
                  }
                  <td style={{fontWeight: 'bold'}}>{Math.round(record.data.payoutRatio * 100)}%</td>
                  <td style={{fontWeight: 'bold'}}>{formatDate(record.data.dayOut)}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default SubTableComponent
