import React, { useEffect, useState } from 'react'
import '../../../css/billing.css'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from '../../../auth/Firebase'
import FlaggedTableComponent from './FlaggedTableComponent'

const FlaggedComponent = (props) => {
  const {mode, userAccess} = props

  const [records, setRecords] = useState([])
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    grabBilling()
  }, [])

  const grabBilling = () => {
    const colRef = collection(db, 'Flagged');
    let queryRef = colRef;
    if (sortField) {
        queryRef = query(colRef, orderBy(sortField, sortDirection))
    }
    onSnapshot(queryRef, snapshot => {
        let people = [];
        snapshot.docs.forEach(doc => {
            people.push({data: doc.data(), id: doc.id});
        });
        setRecords(people);
    });
  };

  useEffect(() => {
    grabBilling()
  }, [sortField, sortDirection])

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
                  setSortField={setSortField}
                  setSortDirection={setSortDirection}
                  sortField={sortField}
                  sortDirection={sortDirection}
                />
              </div>
            </div>
          : <div className='main-billing-content-dark'>
              <div className='main-content'>
                <FlaggedTableComponent 
                  records={records}
                  mode={mode}
                  userAccess={userAccess}
                  setSortField={setSortField}
                  setSortDirection={setSortDirection}
                  sortField={sortField}
                  sortDirection={sortDirection}
                />
              </div>
            </div>
      }
    </>
  )
}

export default FlaggedComponent
