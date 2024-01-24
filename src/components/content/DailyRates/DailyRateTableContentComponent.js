import React from 'react'

const DailyRateTableContentComponent = (props) => {
  const { records, mode } = props
  
  const formatDollarAmount = (str) => {
    const num = parseFloat(str);
    return num.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

  return (
    <>
      {
        records.map((record) => {
          if(mode === 'light'){
            return(
              <tr className='tr-light'>
                <td style={{fontWeight: 'bold'}}>{record.data.insurancePrefix}</td>
                <td>{record.data.insuranceName}</td>
                <td>{record.data.insuranceLoc}</td>
                <td>{record.data.admitted.toUpperCase()} </td>
                <td>{formatDollarAmount(record.data.dailyRate)}</td>
                <td>{new Date(record.data.lastUpdate.seconds * 1000).toLocaleDateString()}</td>
              </tr>
            )
          } else {
            return(
              <tr className='tr-dark'>
                <td style={{fontWeight: 'bold'}}>{record.data.insurancePrefix}</td>
                <td>{record.data.insuranceName}</td>
                <td>{record.data.insuranceLoc}</td>
                <td>{record.data.admitted.toUpperCase()} </td>
                <td>{formatDollarAmount(record.data.dailyRate)}</td>
                <td>{new Date(record.data.lastUpdate.seconds * 1000).toLocaleDateString()}</td>
              </tr>
            )
          }
        })
      }
    </>
  )
}

export default DailyRateTableContentComponent
