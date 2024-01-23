import React, { useEffect, useState } from 'react'
import '../css/profile.css'
import { auth, db } from '../auth/Firebase'
import { collection, onSnapshot, query, where } from 'firebase/firestore'

const ProfileComponent = (props) => {
  const {mode, setMode} = props

  const [user, setUser] = useState(null)

  useEffect(() => {
      getCompanyUsers()
  }, [])

  const getCompanyUsers = () => {
    const collRef = collection(db, 'users')
    const q = query(collRef, where('userId', '==', auth.currentUser.uid))
    onSnapshot(q, (snapshot) => {
      snapshot.forEach(doc => {
        console.log(doc.data())
        setUser({data: doc.data(), id: doc.id})
      })
    })
  }

  const handleModeToggle = () => {
    mode === 'light'
      ? setMode('dark')
      : setMode('light')
  }

  return (
    <div className='profile-panel'>
      {
        mode === 'light'
          ? <div className='panel-component'>
              {
                user === null 
                  ? null 
                  : <div style={{width: '100%'}}>
                      <div className='profile-header'>
                        <p className='userName'>{user.data.name}</p>
                        <div onClick={() => {handleModeToggle()}} className='toggle-mode-container'>
                          <p style={{fontSize: '12px', marginRight: '12px', fontWeight: 'bold'}}>Light Mode</p>
                          <div className="mode-toggle-light">
                            <div className='light-toggle selected-light'>
                            </div>
                            <div className='dark-toggle unselected-light'>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className='userEmail'>{user.data.email}</p>
                      </div>
                    </div>
              }
            </div>
          : <div className='panel-component-dark'>
              {
                user === null 
                  ? null 
                  : <div style={{width: '100%'}}>
                      <div className='profile-header'>
                        <p className='userName'>{user.data.name}</p>
                        <div onClick={() => {handleModeToggle()}} className='toggle-mode-container'>
                          <p style={{fontSize: '12px', marginRight: '12px', fontWeight: 'bold'}}>Dark Mode</p>
                          <div className="mode-toggle-dark">
                            <div className='light-toggle unselected-dark'>
                            </div>
                            <div className='dark-toggle selected-dark'>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className='userEmail'>{user.data.email}</p>
                      </div>
                    </div>
              }
            </div>
        }
      </div>
  )
}

export default ProfileComponent
