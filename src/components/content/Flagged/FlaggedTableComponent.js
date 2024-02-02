import React from 'react'
import '../../../css/billing.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesDown, faAnglesUp, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

const FlaggedTableComponent = (props) => {
  const {
    records,
    mode,
    userAccess,
    setSortField,
    setSortDirection,
    sortField,
    sortDirection,
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

  const handleSort = (field) => {
    if (field === sortField) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
        setSortField(field);
        setSortDirection('asc');
    }
  };

  function convertTimestampToDDMMYYYY(timestamp) {
    // Create a new Date object from the timestamp (convert seconds to milliseconds)
    const date = new Date(timestamp.seconds * 1000);
  
    // Format the date as DD/MM/YYYY
    const day = ("0" + date.getDate()).slice(-2); // Add leading zero if needed
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Add leading zero if needed, month is 0-indexed
    const year = date.getFullYear();
  
    return `${month}/${day}/${year}`;
}

console.log(sortDirection)

  return (
    <div className='main-content-area-full'>
      <div className='table-scroll-wrapper'>
      {
        mode === 'light'
          ? <table className='table-container-light'>
              <thead>
                <tr>
                  <th onClick={() => handleSort('prefix')}>Prefix
                    {
                      sortDirection === 'asc' 
                        ? <FontAwesomeIcon icon={faAnglesDown} className="icon-menu-sort"/>
                        : <FontAwesomeIcon icon={faAnglesUp} className="icon-menu-sort"/>
                    }
                  </th>
                  <th onClick={() => handleSort('insurancePolicy')}>Policy
                    {
                      sortDirection === 'asc' 
                        ? <FontAwesomeIcon icon={faAnglesDown} className="icon-menu-sort"/>
                        : <FontAwesomeIcon icon={faAnglesUp} className="icon-menu-sort"/>
                    }
                  </th>
                  <th onClick={() => handleSort('patientName')}>Name
                    {
                      sortDirection === 'asc' 
                        ? <FontAwesomeIcon icon={faAnglesDown} className="icon-menu-sort"/>
                        : <FontAwesomeIcon icon={faAnglesUp} className="icon-menu-sort"/>
                    }
                  </th>
                  <th onClick={() => handleSort('insuranceName')}>Insurance
                    {
                      sortDirection === 'asc' 
                        ? <FontAwesomeIcon icon={faAnglesDown} className="icon-menu-sort"/>
                        : <FontAwesomeIcon icon={faAnglesUp} className="icon-menu-sort"/>
                    }
                  </th>
                  <th onClick={() => handleSort('network')}>Network
                    {
                      sortDirection === 'asc' 
                        ? <FontAwesomeIcon icon={faAnglesDown} className="icon-menu-sort"/>
                        : <FontAwesomeIcon icon={faAnglesUp} className="icon-menu-sort"/>
                    }
                  </th>
                  <th>Res. Units</th>
                  <th>Res. Admissions</th>
                  <th>Det. Units</th>
                  <th>Det. Admissions</th>
                  {
                    userAccess === 'admin' || userAccess==='dev' || userAccess==='owner'
                      ? <th style={{minWidth: '200px'}} onClick={() => handleSort('totalCharges')}>Charged
                          {
                              sortDirection === 'asc' 
                                ? <FontAwesomeIcon icon={faChevronDown} className="icon-menu-sort"/>
                                : <FontAwesomeIcon icon={faAnglesUp} className="icon-menu-sort"/>
                            }
                        </th>
                      : null
                  }
                  {
                    userAccess === 'admin' || userAccess==='dev' || userAccess==='owner'
                      ? <th onClick={() => handleSort('totalPaid')}>Paid
                          {
                            sortDirection === 'asc' 
                              ? <FontAwesomeIcon icon={faChevronDown} className="icon-menu-sort"/>
                              : <FontAwesomeIcon icon={faAnglesUp} className="icon-menu-sort"/>
                          }
                        </th>
                      : null
                  }
                  <th onClick={() => handleSort('payoutRatio')}>Payout %
                    {
                      sortDirection === 'asc' 
                        ? <FontAwesomeIcon icon={faChevronDown} className="icon-menu-sort"/>
                        : <FontAwesomeIcon icon={faAnglesUp} className="icon-menu-sort"/>
                    }
                  </th>
                  {
                    userAccess === 'admin' || userAccess==='dev' || userAccess==='owner'
                      ? <th>VOB Decision</th>
                      : null
                  }
                  {
                    userAccess === 'admin' || userAccess==='dev' || userAccess==='owner'
                      ? <th>VOB %</th>
                      : null
                  }
                  <th onClick={() => handleSort('latestDate')}>Last Updated</th>
                </tr>
              </thead>
              <tbody>
                { records.map(record => {
                      return(
                        <tr>
                          <td style={{fontWeight: 'bold'}}>{record.data.prefix}</td>
                          <td>{record.data.insurancePolicy}</td>
                          <td>{record.data.first_name} {getFirstLetter(record.data.last_name)}. </td>
                          <td>{limitString(record.data.insuranceName)}</td>
                          <td>{record.data.network}</td>
                          <td>{Math.round(record.data.RTC.averageDaysOfCare)} Days</td>
                          <td>{record.data.RTC.totalVisits} Visits</td>
                          <td>{Math.round(record.data.Detox.averageDaysOfCare)} Days</td>
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
                          {
                            userAccess === 'admin' || userAccess==='dev' || userAccess==='owner'
                              ? record.data.vobDecision 
                                  ? <td>{record.data.vobDecision.split(' ')[0]}</td>
                                  : null
                              : null
                          }
                          {
                            userAccess === 'admin' || userAccess==='dev' || userAccess==='owner'
                              ? <td>{Math.round(record.data.vobPercent)}%</td>
                              : null
                          }
                          <td>{convertTimestampToDDMMYYYY(record.data.latestDate)}</td>
                        </tr>
                      )
                    })
                  }     
              </tbody>
            </table>
          : <table className='table-container-light'>
              <thead>
                <tr>
                  <th className='th-header' onClick={() => handleSort('prefix')}>Prefix
                      {
                        sortDirection === 'asc' 
                          ? <FontAwesomeIcon icon={faAnglesDown} className="icon-menu-sort"/>
                          : <FontAwesomeIcon icon={faAnglesUp} className="icon-menu-sort"/>
                      }
                    </th>
                    <th onClick={() => handleSort('insurancePolicy')}>Policy
                      {
                        sortDirection === 'asc' 
                          ? <FontAwesomeIcon icon={faAnglesDown} className="icon-menu-sort"/>
                          : <FontAwesomeIcon icon={faAnglesUp} className="icon-menu-sort"/>
                      }
                    </th>
                    <th onClick={() => handleSort('patientName')}>Name
                      {
                        sortDirection === 'asc' 
                          ? <FontAwesomeIcon icon={faAnglesDown} className="icon-menu-sort"/>
                          : <FontAwesomeIcon icon={faAnglesUp} className="icon-menu-sort"/>
                      }
                    </th>
                    <th onClick={() => handleSort('insuranceName')}>Insurance
                      {
                        sortDirection === 'asc' 
                          ? <FontAwesomeIcon icon={faAnglesDown} className="icon-menu-sort"/>
                          : <FontAwesomeIcon icon={faAnglesUp} className="icon-menu-sort"/>
                      }
                    </th>
                    <th onClick={() => handleSort('network')}>Network
                      {
                        sortDirection === 'asc' 
                          ? <FontAwesomeIcon icon={faAnglesDown} className="icon-menu-sort"/>
                          : <FontAwesomeIcon icon={faAnglesUp} className="icon-menu-sort"/>
                      }
                    </th>
                    <th>Res. Units</th>
                    <th>Res. Admissions</th>
                    <th>Det. Units</th>
                    <th>Det. Admissions</th>
                    {
                      userAccess === 'admin' || userAccess==='dev' || userAccess==='owner'
                        ? <th onClick={() => handleSort('totalCharges')}>Total Charged
                            {
                                sortDirection === 'asc' 
                                  ? <FontAwesomeIcon icon={faAnglesDown} className="icon-menu-sort"/>
                                  : <FontAwesomeIcon icon={faAnglesUp} className="icon-menu-sort"/>
                              }
                          </th>
                        : null
                    }
                    {
                      userAccess === 'admin' || userAccess==='dev' || userAccess==='owner'
                        ? <th onClick={() => handleSort('totalPaid')}>Total Paid
                            {
                              sortDirection === 'asc' 
                                ? <FontAwesomeIcon icon={faAnglesDown} className="icon-menu-sort"/>
                                : <FontAwesomeIcon icon={faAnglesUp} className="icon-menu-sort"/>
                            }
                          </th>
                        : null
                    }
                    <th onClick={() => handleSort('payoutRatio')}>Payout %
                      {
                        sortDirection === 'asc' 
                          ? <FontAwesomeIcon icon={faAnglesDown} className="icon-menu-sort"/>
                          : <FontAwesomeIcon icon={faAnglesUp} className="icon-menu-sort"/>
                      }
                    </th>
                    {
                      userAccess === 'admin' || userAccess==='dev' || userAccess==='owner'
                        ? <th>VOB Decision</th>
                        : null
                    }
                    {
                      userAccess === 'admin' || userAccess==='dev' || userAccess==='owner'
                        ? <th>VOB %</th>
                        : null
                    }
                </tr>
              </thead>
              <tbody>
                { records.map(record => {
                      return(
                        <tr>
                          <td style={{fontWeight: 'bold'}}>{record.data.prefix}</td>
                          <td>{record.data.insurancePolicy}</td>
                          <td>{record.data.first_name} {getFirstLetter(record.data.last_name)}. </td>
                          <td>{limitString(record.data.insuranceName)}</td>
                          <td>{record.data.network}</td>
                          <td>{Math.round(record.data.RTC.averageDaysOfCare)} Days</td>
                          <td>{record.data.RTC.totalVisits} Visits</td>
                          <td>{Math.round(record.data.Detox.averageDaysOfCare)} Days</td>
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
                          {
                            userAccess === 'admin' || userAccess==='dev' || userAccess==='owner'
                              ? record.data.vobDecision 
                                  ? <td>{record.data.vobDecision.split(' ')[0]}</td>
                                  : null
                              : null
                          }
                          {
                            userAccess === 'admin' || userAccess==='dev' || userAccess==='owner'
                              ? <td>{Math.round(record.data.vobPercent)}%</td>
                              : null
                          }
                          <td>{convertTimestampToDDMMYYYY(record.data.latestDate)}</td>
                        </tr>
                      )
                    })
                  }     
              </tbody>
            </table>
      }
      </div>
    </div>
  )
}

export default FlaggedTableComponent
