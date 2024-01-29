import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../../../auth/Firebase'
import '../../../css/subtable.css'

const PrefixDetailsComponent = (props) => {
  const {
    prefix,
    insuranceName,
    userAccess,
    mode,
    setViewSubTable
  } = props

  const [subRecrds, setSubRecrds] = useState([])

  useEffect(() => {
    grabSubRecords()
  }, [])

  const grabSubRecords = () => {
    console.log('grabbing sub records')
    console.log(prefix)
    const colRef = collection(db, 'PolicyRecordsIndividual')
    const q = query(colRef, where('prefix', '==', prefix), where('insuranceName', '==', insuranceName))
    onSnapshot(q, snapshot => {
        let billings = [];
        snapshot.docs.forEach(doc => {
          billings.push({data: doc.data(), id: doc.id});
        });
        setSubRecrds(billings)
    });
  }

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

  function getLatestDate(datesString) {
    if (!datesString) {
        return 'NaN'; // Return null if the input is null or undefined
    }

    // Split the string by commas and filter out any "undefined" values
    const datesArray = datesString.split(',').filter(date => date.trim() !== 'undefined' && date.trim() !== '');

    if (datesArray.length === 0) {
        return 'NaN'; // Return null if there are no valid dates
    }

    // Further split each element by new lines and flatten the resulting arrays
    const allDates = datesArray.flatMap(date => date.split('\n').map(d => d.trim())).filter(d => d !== '');

    // Convert each date string to a Date object and sort the array
    const sortedDates = allDates.map(date => new Date(date)).sort((a, b) => b - a);

    // Get the latest date (the first date in the sorted array)
    const latestDate = sortedDates[0];

    // Format the latest date to MM/DD/YYYY
    const month = (latestDate.getMonth() + 1).toString().padStart(2, '0');
    const day = latestDate.getDate().toString().padStart(2, '0');
    const year = latestDate.getFullYear();

    return `${month}/${day}/${year}`;
  }

  const handleCloseSubtable = () => {
    setViewSubTable(false)
  }

  return (
    <div className='main-content-sub-area-full'>
      <div onClick={() => {handleCloseSubtable()}} className='hover-paragraph' style={{display: 'flex', flexDirection: 'row', marginBottom: '16px'}}>
        <p style={{marginRight: 8, color: 'red'}}>Close</p>
      </div>
      <table className='table-container-dark'>
        <thead>
          <tr>
            <th>Prefix</th>
            <th>Name</th>
            <th>Policy</th>
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
            subRecrds.map(record => {
              return(
                <tr>
                  <td style={{fontWeight: 'bold'}}>{record.data.prefix}</td>
                  <td>{record.data.first_name} {getFirstLetter(record.data.last_name)}. </td>
                  <td>{record.data.insurancePolicy}</td>
                  <td>{record.data.insuranceName}</td>
                  <td>{record.data.network}</td>
                  <td>{record.data.RTC.averageDaysOfCare} Days</td>
                  <td>{record.data.RTC.totalVisits} Visits</td>
                  <td>{record.data.Detox.averageDaysOfCare} Days</td>
                  <td>{record.data.Detox.totalVisits} Visits</td>
                  {
                    userAccess === 'admin' || userAccess==='dev' || userAccess==='owner'
                      ? <td>{formatDollarAmount(record.data.totalCharges)}</td>
                      : null
                  }
                  {
                    userAccess === 'admin' || userAccess==='dev' || userAccess==='owner'
                      ? <td>{formatDollarAmount(record.data.totalPaid)}</td>
                      : null
                  }
                  <td>{Math.round(record.data.payoutRatio * 100)}%</td>
                  <td>{getLatestDate(record.data.datesPaid)}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default PrefixDetailsComponent
