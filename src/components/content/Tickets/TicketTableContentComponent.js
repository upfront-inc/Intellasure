import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import '../../../css/general.css'
import { db } from '../../../auth/Firebase';

const TicketTableContentComponent = (props) => {
  const { records,mode } = props

  const [viewDetails, setViewDetails] = useState(null)

  const updateTicketStatus = (ticketId) => {
    const userRef = doc(db, 'Support', ticketId);
    updateDoc(userRef, { status: 'closed' })
        .then(() => {})
        .catch((error) => console.error("Error updating user:", error));
  }

  const displayAccounts = () => {

  }

  return (
    <>
      {
        records.map((record) => {
          return(
            <>
              <tr>
                <td style={{fontWeight: 'bold'}}>{record.data.name}</td>
                <td>{record.data.email}</td>
                <td>{record.data.ticket}</td>
                <td>{record.data.subject}</td>
                <td>
                  <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    ({record.data.status})
                    {
                      record.data.status === 'active'
                        ? mode === 'light'
                            ? <p className='hover-paragraph width: 17px'  onClick={() => {updateTicketStatus(record.id)}} style={{marginLeft: '16px', color: 'blue', textDecoration: 'underline'}} >Close Ticket</p>
                            : <p className='hover-paragraph'  onClick={() => {updateTicketStatus(record.id)}} style={{marginLeft: '16px', color: 'red', textDecoration: 'underline'}} >Close Ticket</p>
                        : null
                    }
                  </div>
                </td>
                <td>
                  <div>
                    {
                      mode === 'light'
                        ? viewDetails === record.id
                            ? <p className='hover-paragraph'  onClick={() => {setViewDetails(null)}} style={{marginLeft: '16px', color: 'blue', textDecoration: 'underline'}} >Close</p>
                            : <p className='hover-paragraph'  onClick={() => {setViewDetails(record.id)}} style={{marginLeft: '16px', color: 'blue', textDecoration: 'underline'}} >Open</p>
                        : viewDetails === record.id
                            ? <p className='hover-paragraph'  onClick={() => {setViewDetails(null)}} style={{marginLeft: '16px', color: 'red', textDecoration: 'underline'}} >Close</p>
                            : <p className='hover-paragraph'  onClick={() => {setViewDetails(record.id)}} style={{marginLeft: '16px', color: 'red', textDecoration: 'underline'}} >Open</p>
                    }
                  </div>
                </td>
              </tr>
              {
                viewDetails === record.id
                  ? <tr><td  colSpan="100%"><p>{record.data.message}</p></td></tr>
                  : null
              }
            </>
          )
        })
      }
    </>
  )
}

export default TicketTableContentComponent
