import React, { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../auth/Firebase';
import '../css/admin.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock, faMailBulk, faMailForward, faMessage, faTextSlash, faBars, faEnvelope, faPencil } from '@fortawesome/free-solid-svg-icons'

const IntakePanel = (props) => {
  const {mode} = props
  
  return (
    <View>
      
    </View>
  )
}

export default IntakePanel