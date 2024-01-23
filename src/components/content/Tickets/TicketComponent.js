import React, { useEffect, useState } from 'react'
import '../../../css/billing.css'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../../../auth/Firebase'
import TicketTableComponent from './TicketTableComponent'

const TicketComponent = (props) => {
  const {mode} = props

  const [records, setRecords] = useState([])

  useEffect(() => {
    grabBilling()
  }, [])

  const grabBilling = () => {
    const colRef = collection(db, 'Support')
    onSnapshot(colRef, snapshot => {
        let people = [];
        snapshot.docs.forEach(doc => {
          people.push({data: doc.data(), id: doc.id});
        });
        setRecords(people)
    });
  }

  return (
    <>
      {
        mode === 'light'
          ? <div className='main-billing-content'>
              <div className='main-content'>
                <TicketTableComponent 
                  records={records}
                />
              </div>
            </div>
          : <div className='main-billing-content-dark'>
              <div className='main-content'>
                <TicketTableComponent 
                  records={records}
                />
              </div>
            </div>
      }
    </>
  )
}

export default TicketComponent
