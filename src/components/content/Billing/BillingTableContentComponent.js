import React, { useState } from 'react'

const BillingTableContentComponent = (props) => {
  const { 
    records,
    mode,
    userAccess,
    viewPrefix,
    viewInsurance,
    viewNetwork,
    viewFacilityCol,
    viewResDays,
    viewResVisits,
    viewDetoxDays,
    viewDetoxVisits,
    viewTotalCharge,
    viewTotalPaid,
    viewPayout,
    viewDeciion,
    viewAdmit,
    showSubTable,
    handleCloseSubRecords,
    handleShowSubRecords,
    selectedRow,
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

  return (
    <>
      {
        records.map((record, index) => {
          if(mode === 'light'){
            if(index === selectedRow){

              return(
                <tr className='tr-light'>
                  {
                    viewPrefix
                      ? <td style={{fontWeight: 'bold'}}>{record.data.prefix}</td>
                      : null
                  }
                  {
                    viewInsurance
                      ? <td>{limitString(record.data.insuranceName)}</td>
                      : null
                  }
                  {
                    viewNetwork
                      ? <td>{record.data.network}</td>
                      : null
                  }
                  {
                    viewFacilityCol
                      ? <td>{record.data.facility}</td>
                      : null
                  }
                  {
                    viewResDays
                      ? <td>{record.data.avgResidentialDays} DAYS</td>
                      : null
                  }
                  {
                    viewResVisits
                      ? <td>{record.data.totalResidentialPatientCount} VISITS</td>
                      : null
                  }
                  {
                    viewDetoxDays
                      ? <td>{record.data.avgDetoxDays} DAYS</td>
                      : null
                  }
                  {
                    viewDetoxVisits
                      ? <td>{record.data.totalDetoxPatientCount} VISITS</td>
                      : null
                  }
                  {
                    userAccess === 'admin' || userAccess==='dev' || userAccess==='owner'
                      ? viewTotalCharge
                        ? <td>{formatDollarAmount(record.data.prefixChargeAverage)}</td>
                        : null
                      : null
                  }
                  {
                    userAccess === 'admin' || userAccess==='dev' || userAccess==='owner'
                      ? viewTotalPaid
                        ? <td>{formatDollarAmount(record.data.prefixPaidAverage)}</td>
                        : null
                      : null
                  }
                  {
                    viewPayout
                      ? <td>{Math.round(record.data.payoutRatio * 100)}%</td>
                      : null
                  }
                  {
                    viewDeciion
                      ? record.data.vobDecision.split(' ')[0] === 'Likely'
                          ? <td>
                              <p style={{fontWeight: '600', color: '#50C878'}}>{record.data.vobDecision.split(' ')[0]}</p>
                            </td>
                          : <td>
                              <p style={{fontWeight: '600', color: '#e94f4e'}}>{record.data.vobDecision.split(' ')[0]}</p>
                            </td>
                      : null
                  }
                  {
                    userAccess === 'admin' || userAccess==='dev' || userAccess==='owner'
                      ? viewAdmit
                        ? record.data.vobPercent >= 70
                            ? <td>
                                <p style={{fontWeight: 'bold', color: '#50C878'}}>{record.data.vobPercent}%</p>
                              </td>
                            : record.data.vobPercent >= 60
                                ? <td>
                                    <p style={{fontWeight: 'bold', color: '#FDDA0D'}}>{record.data.vobPercent}%</p>
                                  </td>
                                : <td>
                                    <p style={{fontWeight: 'bold', color: '#e94f4e'}}>{record.data.vobPercent}%</p>
                                  </td>
                        : null
                      : null
                  }
                  {
                      index === selectedRow
                        ? showSubTable
                            ? <td className='hover-paragraph' onClick={() => {handleCloseSubRecords()}}><p style={{color: 'blue'}}>Close</p></td>
                            : <td className='hover-paragraph' onClick={() => {handleShowSubRecords(record, index)}}><p style={{color: 'blue'}}>Open</p></td>
                        : <td className='hover-paragraph' onClick={() => {handleShowSubRecords(record, index)}}><p style={{color: 'blue'}}>Open</p></td>
                  }
                </tr>
              )
            } else {
              return(
                <tr className='tr-light'>
                  {
                    viewPrefix
                      ? <td style={{fontWeight: 'bold'}}>{record.data.prefix}</td>
                      : null
                  }
                  {
                    viewInsurance
                      ? <td>{limitString(record.data.insuranceName)}</td>
                      : null
                  }
                  {
                    viewNetwork
                      ? <td>{record.data.network}</td>
                      : null
                  }
                  {
                    viewFacilityCol
                      ? <td>{record.data.facility}</td>
                      : null
                  }
                  {
                    viewResDays
                      ? <td>{record.data.avgResidentialDays} DAYS</td>
                      : null
                  }
                  {
                    viewResVisits
                      ? <td>{record.data.totalResidentialPatientCount} VISITS</td>
                      : null
                  }
                  {
                    viewDetoxDays
                      ? <td>{record.data.avgDetoxDays} DAYS</td>
                      : null
                  }
                  {
                    viewDetoxVisits
                      ? <td>{record.data.totalDetoxPatientCount} VISITS</td>
                      : null
                  }
                  {
                    userAccess === 'admin' || userAccess==='dev' || userAccess==='owner'
                      ? viewTotalCharge
                        ? <td>{formatDollarAmount(record.data.prefixChargeAverage)}</td>
                        : null
                      : null
                  }
                  {
                    userAccess === 'admin' || userAccess==='dev' || userAccess==='owner'
                      ? viewTotalPaid
                        ? <td>{formatDollarAmount(record.data.prefixPaidAverage)}</td>
                        : null
                      : null
                  }
                  {
                    viewPayout
                      ? <td>{Math.round(record.data.payoutRatio * 100)}%</td>
                      : null
                  }
                  {
                    viewDeciion
                      ? record.data.vobDecision.split(' ')[0] === 'Likely'
                          ? <td>
                              <p style={{fontWeight: '600', color: '#50C878'}}>{record.data.vobDecision.split(' ')[0]}</p>
                            </td>
                          : <td>
                              <p style={{fontWeight: '600', color: '#e94f4e'}}>{record.data.vobDecision.split(' ')[0]}</p>
                            </td>
                      : null
                  }
                  {
                    userAccess === 'admin' || userAccess==='dev' || userAccess==='owner'
                      ? viewAdmit
                        ? record.data.vobPercent >= 70
                            ? <td>
                                <p style={{fontWeight: 'bold', color: '#50C878'}}>{record.data.vobPercent}%</p>
                              </td>
                            : record.data.vobPercent >= 60
                                ? <td>
                                    <p style={{fontWeight: 'bold', color: '#FDDA0D'}}>{record.data.vobPercent}%</p>
                                  </td>
                                : <td>
                                    <p style={{fontWeight: 'bold', color: '#e94f4e'}}>{record.data.vobPercent}%</p>
                                  </td>
                        : null
                      : null
                  }
                  {
                      index === selectedRow
                        ? showSubTable
                            ? <td className='hover-paragraph' onClick={() => {handleCloseSubRecords()}}><p style={{color: 'blue'}}>Close</p></td>
                            : <td className='hover-paragraph' onClick={() => {handleShowSubRecords(record, index)}}><p style={{color: 'blue'}}>Open</p></td>
                        : <td className='hover-paragraph' onClick={() => {handleShowSubRecords(record, index)}}><p style={{color: 'blue'}}>Open</p></td>
                  }
                </tr>
              )
            }
          } else {
            if(index === selectedRow){
              return(
                <tr className='tr-dark'>
                  {
                    viewPrefix
                      ? <td style={{fontWeight: 'bold'}}>{record.data.prefix}</td>
                      : null
                  }
                  {
                    viewInsurance
                      ? <td>{limitString(record.data.insuranceName)}</td>
                      : null
                  }
                  {
                    viewNetwork
                      ? <td>{record.data.network}</td>
                      : null
                  }
                  {
                    viewFacilityCol
                      ? <td>{record.data.facility}</td>
                      : null
                  }
                  {
                    viewResDays
                      ? <td>{record.data.avgResidentialDays} DAYS</td>
                      : null
                  }
                  {
                    viewResVisits
                      ? <td>{record.data.totalResidentialPatientCount} VISITS</td>
                      : null
                  }
                  {
                    viewDetoxDays
                      ? <td>{record.data.avgDetoxDays} DAYS</td>
                      : null
                  }
                  {
                    viewDetoxVisits
                      ? <td>{record.data.totalDetoxPatientCount} VISITS</td>
                      : null
                  }
                  {
                    userAccess === 'admin' || userAccess==='dev' || userAccess==='owner'
                      ? viewTotalCharge
                        ? <td>{formatDollarAmount(record.data.prefixChargeAverage)}</td>
                        : null
                      : null
                  }
                  {
                    userAccess === 'admin' || userAccess==='dev' || userAccess==='owner'
                      ? viewTotalPaid
                        ? <td>{formatDollarAmount(record.data.prefixPaidAverage)}</td>
                        : null
                      : null
                  }
                  {
                    viewPayout
                      ? <td>{Math.round(record.data.payoutRatio * 100)}%</td>
                      : null
                  }
                  {
                    viewDeciion
                      ? record.data.vobDecision.split(' ')[0] === 'Likely'
                          ? <td>
                              <p style={{fontWeight: '600', color: '#50C878'}}>{record.data.vobDecision.split(' ')[0]}</p>
                            </td>
                          : <td>
                              <p style={{fontWeight: '600', color: '#e94f4e'}}>{record.data.vobDecision.split(' ')[0]}</p>
                            </td>
                      : null
                  }
                  {
                    userAccess === 'admin' || userAccess==='dev' || userAccess==='owner'
                      ? viewAdmit
                        ? record.data.vobPercent >= 70
                            ? <td>
                                <p style={{fontWeight: 'bold', color: '#50C878'}}>{record.data.vobPercent}%</p>
                              </td>
                            : record.data.vobPercent >= 60
                                ? <td>
                                    <p style={{fontWeight: 'bold', color: '#FDDA0D'}}>{record.data.vobPercent}%</p>
                                  </td>
                                : <td>
                                    <p style={{fontWeight: 'bold', color: '#e94f4e'}}>{record.data.vobPercent}%</p>
                                  </td>
                        : null
                      : null
                  }
                  {
                      index === selectedRow
                        ? showSubTable
                            ? <td className='hover-paragraph' onClick={() => {handleCloseSubRecords()}}><p style={{color: '#009ea1', fontWeight: 'bold'}}>Close</p></td>
                            : <td className='hover-paragraph' onClick={() => {handleShowSubRecords(record, index)}}><p style={{color: '#009ea1', fontWeight: 'bold'}}>Open</p></td>
                        : <td className='hover-paragraph' onClick={() => {handleShowSubRecords(record, index)}}><p style={{color: '#009ea1', fontWeight: 'bold'}}>Open</p></td>
                  }
                </tr>
              )
            } else {
              return(
                <tr className='tr-dark'>
                  {
                    viewPrefix
                      ? <td style={{fontWeight: 'bold'}}>{record.data.prefix}</td>
                      : null
                  }
                  {
                    viewInsurance
                      ? <td>{limitString(record.data.insuranceName)}</td>
                      : null
                  }
                  {
                    viewNetwork
                      ? <td>{record.data.network}</td>
                      : null
                  }
                  {
                    viewFacilityCol
                      ? <td>{record.data.facility}</td>
                      : null
                  }
                  {
                    viewResDays
                      ? <td>{record.data.avgResidentialDays} DAYS</td>
                      : null
                  }
                  {
                    viewResVisits
                      ? <td>{record.data.totalResidentialPatientCount} VISITS</td>
                      : null
                  }
                  {
                    viewDetoxDays
                      ? <td>{record.data.avgDetoxDays} DAYS</td>
                      : null
                  }
                  {
                    viewDetoxVisits
                      ? <td>{record.data.totalDetoxPatientCount} VISITS</td>
                      : null
                  }
                  {
                    userAccess === 'admin' || userAccess==='dev' || userAccess==='owner'
                      ? viewTotalCharge
                        ? <td>{formatDollarAmount(record.data.prefixChargeAverage)}</td>
                        : null
                      : null
                  }
                  {
                    userAccess === 'admin' || userAccess==='dev' || userAccess==='owner'
                      ? viewTotalPaid
                        ? <td>{formatDollarAmount(record.data.prefixPaidAverage)}</td>
                        : null
                      : null
                  }
                  {
                    viewPayout
                      ? <td>{Math.round(record.data.payoutRatio * 100)}%</td>
                      : null
                  }
                  {
                    viewDeciion
                      ? record.data.vobDecision.split(' ')[0] === 'Likely'
                          ? <td>
                              <p style={{fontWeight: '600', color: '#50C878'}}>{record.data.vobDecision.split(' ')[0]}</p>
                            </td>
                          : <td>
                              <p style={{fontWeight: '600', color: '#e94f4e'}}>{record.data.vobDecision.split(' ')[0]}</p>
                            </td>
                      : null
                  }
                  {
                    userAccess === 'admin' || userAccess==='dev' || userAccess==='owner'
                      ? viewAdmit
                        ? record.data.vobPercent >= 70
                            ? <td>
                                <p style={{fontWeight: 'bold', color: '#50C878'}}>{record.data.vobPercent}%</p>
                              </td>
                            : record.data.vobPercent >= 60
                                ? <td>
                                    <p style={{fontWeight: 'bold', color: '#FDDA0D'}}>{record.data.vobPercent}%</p>
                                  </td>
                                : <td>
                                    <p style={{fontWeight: 'bold', color: '#e94f4e'}}>{record.data.vobPercent}%</p>
                                  </td>
                        : null
                      : null
                  }
                  {
                      index === selectedRow
                        ? showSubTable
                            ? <td className='hover-paragraph' onClick={() => {handleCloseSubRecords()}}><p style={{color: '#009ea1', fontWeight: 'bold'}}>Close</p></td>
                            : <td className='hover-paragraph' onClick={() => {handleShowSubRecords(record, index)}}><p style={{color: '#009ea1', fontWeight: 'bold'}}>Open</p></td>
                        : <td className='hover-paragraph' onClick={() => {handleShowSubRecords(record, index)}}><p style={{color: '#009ea1', fontWeight: 'bold'}}>Open</p></td>
                  }
                </tr>
              )
            }
          }
        })
      }
    </>
  )
}

export default BillingTableContentComponent
