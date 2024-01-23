import React, { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../auth/Firebase';
import '../css/admin.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock, faMailBulk, faMailForward, faMessage, faTextSlash, faBars, faEnvelope, faPencil } from '@fortawesome/free-solid-svg-icons'

const SupportComponent = (props) => {
  const {mode} = props
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [ticketRef, setTicketRef] = useState('')
  const [thankYou, setThankYou] = useState(false)

  const handleNameChange = (e) => {
      setName(e.target.value)
  }

  const handleEmailChange = (e) => {
      setEmail(e.target.value)
  }

  const handleSubjectChange = (e) => {
      setSubject(e.target.value)
  }

  const handleMessageChange = (e) => {
      setMessage(e.target.value)
  }

  const submitTicket = () => {
      let ticketNumber =  Math.floor(Math.random() * 100000000) + 1 
      let docData = {
          name: name,
          email: email,
          subject: subject,
          message: message,
          ticket: ticketNumber,
          createdAt: new Date(),
          status: 'active'
      }
      let collectionRef = collection(db, 'Support')
      addDoc(collectionRef, docData)
          .then(response => {
              setName('')
              setEmail('')
              setSubject('')
              setMessage("")
              setTicketRef(ticketNumber)
              setThankYou(true)
          })
          .catch(error => {
              console.log(`Error: ${error}`)
          })
  }

  return (
    <>
      {
        mode === 'light'
          ? <div className='support-panel'>
              <div>
                  <h3>Encountered an Issue? Let Us Know!</h3>
              </div>
              <div style={{width: '60%'}}>
                  <p>If you encounter any issues or have any concerns while using our website, please don't hesitate to reach out. Whether it's a technical problem, a user interface query, or any other challenge, we're here to help. We understand that encountering issues can be frustrating, but rest assured, we're here to ensure a smooth and enjoyable experience on our website. Your feedback and reports are invaluable to us, as they not only help us address your concerns but also contribute to making our website better for everyone.</p>
              </div>
              {
                  thankYou === true 
                      ? <div>
                          <h3>Ticket Submitted</h3>
                          <p>Thank you for submitting a ticket with our support team. Your ticket number is #{ticketRef}</p>
                          <p>Our team will reach out shortly.</p>
                          <button onClick={() => {setThankYou(false)}}>Close</button>
                      </div>
                      : <div className='form-container' style={{marginTop: '24px'}}>
                          <div className='input-container'>
                            <div className='user-input-container'>
                              <FontAwesomeIcon icon={faUser} className="custom-icon-size"/>
                              <input 
                                  className='input'
                                  type="text" 
                                  placeholder="Name..." 
                                  value={name}
                                  onChange={handleNameChange}
                                  />
                            </div>
                          </div>
                          <div className='input-container'>
                            <div className='user-input-container'>
                              <FontAwesomeIcon icon={faEnvelope} className="custom-icon-size"/>
                              <input 
                                  className='input'
                                  type="text" 
                                  placeholder="Email..." 
                                  value={email}
                                  onChange={handleEmailChange}
                              />
                            </div>
                          </div>
                          <div className='input-container'>
                            <div className='user-input-container'>
                              <FontAwesomeIcon icon={faPencil} className="custom-icon-size"/>
                              <input 
                                  className='input'
                                  type="text" 
                                  placeholder="Subject..." 
                                  value={subject}
                                  onChange={handleSubjectChange}
                              />
                            </div>
                          </div>
                          <div className='input-container'>
                            <div className='user-input-container'>
                              <FontAwesomeIcon icon={faMessage} className="custom-icon-size"/>
                              <textarea 
                                  className='input'
                                  type="text" 
                                  placeholder="Message..." 
                                  value={message}
                                  onChange={handleMessageChange}
                              />
                            </div>
                          </div>
                          <div className='' style={{marginTop: '24px'}}>
                              <button className='button' onClick={() => {submitTicket()}}>Submit</button>
                          </div>
                      </div>
                }
            </div>
          : <div className='support-panel-dark'>
              <div>
                  <h3>Encountered an Issue? Let Us Know!</h3>
              </div>
              <div style={{width: '60%'}}>
                  <p>If you encounter any issues or have any concerns while using our website, please don't hesitate to reach out. Whether it's a technical problem, a user interface query, or any other challenge, we're here to help. We understand that encountering issues can be frustrating, but rest assured, we're here to ensure a smooth and enjoyable experience on our website. Your feedback and reports are invaluable to us, as they not only help us address your concerns but also contribute to making our website better for everyone.</p>
              </div>
              {
                  thankYou === true 
                      ? <div>
                          <h3>Ticket Submitted</h3>
                          <p>Thank you for submitting a ticket with our support team. Your ticket number is #{ticketRef}</p>
                          <p>Our team will reach out shortly.</p>
                          <button onClick={() => {setThankYou(false)}}>Close</button>
                      </div>
                      : <div className='form-container' style={{marginTop: '24px'}}>
                          <div className='input-container'>
                            <div className='user-input-container'>
                              <FontAwesomeIcon icon={faUser} className="custom-icon-size"/>
                              <input 
                                  className='input'
                                  type="text" 
                                  placeholder="Name..." 
                                  value={name}
                                  onChange={handleNameChange}
                                  />
                            </div>
                          </div>
                          <div className='input-container'>
                            <div className='user-input-container'>
                              <FontAwesomeIcon icon={faEnvelope} className="custom-icon-size"/>
                              <input 
                                  className='input'
                                  type="text" 
                                  placeholder="Email..." 
                                  value={email}
                                  onChange={handleEmailChange}
                              />
                            </div>
                          </div>
                          <div className='input-container'>
                            <div className='user-input-container'>
                              <FontAwesomeIcon icon={faPencil} className="custom-icon-size"/>
                              <input 
                                  className='input'
                                  type="text" 
                                  placeholder="Subject..." 
                                  value={subject}
                                  onChange={handleSubjectChange}
                              />
                            </div>
                          </div>
                          <div className='input-container'>
                            <div className='user-input-container'>
                              <FontAwesomeIcon icon={faMessage} className="custom-icon-size"/>
                              <textarea 
                                  className='input'
                                  type="text" 
                                  placeholder="Message..." 
                                  value={message}
                                  onChange={handleMessageChange}
                              />
                            </div>
                          </div>
                          <div className='' style={{marginTop: '24px'}}>
                              <button className='button' onClick={() => {submitTicket()}}>Submit</button>
                          </div>
                      </div>
                }
            </div>
      }
    </>
  )
}

export default SupportComponent