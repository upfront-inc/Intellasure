import React, { useState } from 'react'

const BillingTableContentComponent = (props) => {
  const { records } = props

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
        records.map((record) => {
          return(
            <tr>
              <td style={{fontWeight: 'bold'}}>{record.data.prefix}</td>
              <td>{limitString(record.data.insuranceName)}</td>
              <td>{record.data.network}</td>
              <td>{record.data.facility}</td>
              <td>{record.data.avgResidentialDays} DAYS</td>
              <td>{record.data.totalResidentialPatientCount} VISITS</td>
              <td>{record.data.avgDetoxDays} DAYS</td>
              <td>{record.data.totalDetoxPatientCount} VISITS</td>
              <td>{formatDollarAmount(record.data.prefixChargeAverage)}</td>
              <td>{formatDollarAmount(record.data.prefixPaidAverage)}</td>
              <td>{Math.round(record.data.payoutRatio * 100)}%</td>
              {
                record.data.vobDecision.split(' ')[0] === 'Likely'
                  ? <td>
                      <p style={{fontWeight: '600', color: '#50C878'}}>{record.data.vobDecision.split(' ')[0]}</p>
                    </td>
                  : <td>
                      <p style={{fontWeight: '600', color: '#e94f4e'}}>{record.data.vobDecision.split(' ')[0]}</p>
                    </td>
              }
              {
                record.data.vobPercent >= 70
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
              }
              <td>Open</td>
            </tr>
          )
        })
      }
    </>
  )
}

export default BillingTableContentComponent
