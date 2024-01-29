import React, { useEffect, useState } from 'react'
import '../../../css/billing.css'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../../../auth/Firebase'
import FlaggedTableComponent from './FlaggedTableComponent'

const FlaggedComponent = (props) => {
  const {mode, userAccess} = props

  const [records, setRecords] = useState([])

  useEffect(() => {
    grabBilling()
  }, [])

  const grabBilling = () => {
    const colRef = collection(db, 'Flagged')
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
                <FlaggedTableComponent 
                  records={records}
                  mode={mode}
                  userAccess={userAccess}
                />
              </div>
            </div>
          : <div className='main-billing-content-dark'>
              <div className='main-content'>
                <FlaggedTableComponent 
                  records={records}
                  mode={mode}
                  userAccess={userAccess}
                />
              </div>
            </div>
      }
    </>
  )
}

export default FlaggedComponent
