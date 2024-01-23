import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import '../../../css/general.css'
import { db } from '../../../auth/Firebase';

const AccountTableContentComponent = (props) => {
  const { records, mode } = props

  const makeAdmin = (userId) => {
    if (window.confirm("Are you sure you want to make this user an admin?")) {
        const userRef = doc(db, 'users', userId);
        updateDoc(userRef, { status: 'admin' })
            .then(() => {})
            .catch((error) => console.error("Error updating user:", error));
    }
};

const removeAdmin = (userId) => {
    if (window.confirm("Are you sure you want to remove this user from admin?")) {
        const userRef = doc(db, 'users', userId);
        updateDoc(userRef, { status: 'staff' })
            .then(() => {})
            .catch((error) => console.error("Error updating user:", error));
    }
};

const deleteUserDocument = (userId) => {
    if (window.confirm("Are you sure you want to delete this user's account?")) {
        const userRef = doc(db, 'users', userId);
        updateDoc(userRef, { type: 'suspended' })
            .then(() => {})
            .catch((error) => console.error("Error updating user:", error));
    }
};

  return (
    <>
      {
        records.map((record) => {
          return(
            <tr>
              <td style={{fontWeight: 'bold'}}>{record.data.name}</td>
              <td>{record.data.email}</td>
              <td>
                <p>{record.data.type}</p>
              </td>
              <td>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                  <p>({record.data.status})</p>
                  {
                    mode === 'light'
                      ? record.data.status === 'staff'
                          ? <p className='hover-paragraph' onClick={() => {makeAdmin(record.data.userId)}} style={{marginLeft: '16px', color: 'blue', textDecoration: 'underline'}}>Make Admin</p>
                          : record.data.status === 'admin'
                              ? <p className='hover-paragraph' onClick={() => {removeAdmin(record.data.userId)}} style={{marginLeft: '16px', color: 'blue', textDecoration: 'underline'}}>Remove Admin</p>
                              : null
                      : record.data.status === 'staff'
                          ? <p className='hover-paragraph' onClick={() => {makeAdmin(record.data.userId)}} style={{marginLeft: '16px', color: 'red', textDecoration: 'underline'}}>Make Admin</p>
                          : record.data.status === 'admin'
                              ? <p className='hover-paragraph' onClick={() => {removeAdmin(record.data.userId)}} style={{marginLeft: '16px', color: 'red', textDecoration: 'underline'}}>Remove Admin</p>
                              : null
                  }
                </div>
              </td>
              <td>
                {
                  mode === 'light'
                    ? record.data.status === 'staff'
                        ? <p className='hover-paragraph' onClick={() => {deleteUserDocument(record.data.userId)}} style={{color: 'blue', textDecoration: 'underline'}}>Remove User</p>
                        : null
                    : record.data.status === 'staff'
                        ? <p className='hover-paragraph' onClick={() => {deleteUserDocument(record.data.userId)}} style={{color: 'red', textDecoration: 'underline'}}>Remove User</p>
                        : null
                }
              </td>
            </tr>
          )
        })
      }
    </>
  )
}

export default AccountTableContentComponent
