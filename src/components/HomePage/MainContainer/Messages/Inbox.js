import React, { useEffect, useState, useContext } from 'react'
import firebase, { db } from '../../../../firebase'
import './Messages.scss'
import SingleChat from './SingleChat'
import Button from '@material-ui/core/Button'
import ReactLoading from 'react-loading'
import { AppContext } from '../../../../Context'
import { Link } from 'react-router-dom'

const Inbox = props => {
   const currentUser = firebase.auth().currentUser
   const [senders, setSenders] = useState([])
   const [isChat, setIsChat] = useState(false)
   const [targetState, setTargetState] = useState()
   const [isLoading, setIsLoading] = useState(true)
   const { isLoggedInContext } = useContext(AppContext)
   //eslint-disable-next-line
   const [isLoggedIn, setIsLoggedIn] = isLoggedInContext

   const sendMessage = () => {
      props.handleLayout('sendMessage')
   }

   const setTarget = target => {
      setTargetState(target)
      setIsChat(true)
   }

   // Checks to see with whom user has active chats with
   const getSenders = async () => {
      try {
         const sendersData = []
         await db
            .collection('messages')
            .doc(currentUser.email)
            .collection('senders')
            .onSnapshot(querySnapshot => {
               querySnapshot.forEach(sender => {
                  sendersData.push(sender.data())
               })
               setSenders(sendersData)
            })
         await setIsLoading(false)
      } catch (err) {
         console.log(err)
         await setIsLoading(false)
      }
   }

   useEffect(
      () => {
         getSenders()
      },
      //eslint-disable-next-line
      []
   )

   return (
      <div className="inbox-title-wrapper">
         <div className="inbox-title">
            <p>Private Messages</p>
            {isLoading ? (
               <div className="loader">
                  <ReactLoading
                     type={'spin'}
                     color={'#ff7373'}
                     height={200}
                     width={200}
                  />
               </div>
            ) : null}
            {isLoggedIn ? (
               isChat ? (
                  <SingleChat target={targetState} />
               ) : (
                  <div className="messages-wrapper">
                     {senders.length > 0 ? (
                        senders.map((sender, index) => {
                           return (
                              <div
                                 key={index}
                                 className="sender-box"
                                 onClick={() => {
                                    if (
                                       sender.senderEmail === currentUser.email
                                    ) {
                                       setTarget(sender.receiverEmail)
                                    } else {
                                       setTarget(sender.senderEmail)
                                    }
                                 }}
                              >
                                 <div className="sender-avatar">
                                    {sender.senderPhoto ===
                                    currentUser.photoURL ? (
                                       <img
                                          src={sender.receiverPhoto}
                                          alt="avatar"
                                       />
                                    ) : (
                                       <img
                                          src={sender.senderPhoto}
                                          alt="avatar"
                                       />
                                    )}
                                 </div>
                                 <div className="sender-name">
                                    {sender.senderName ===
                                    currentUser.displayName ? (
                                       <p>{sender.receiverName}</p>
                                    ) : (
                                       <p>{sender.senderName}</p>
                                    )}
                                 </div>
                              </div>
                           )
                        })
                     ) : (
                        <div>
                           <p
                              style={{
                                 fontSize: '2rem',
                                 letterSpacing: '0.1rem',
                                 marginTop: '6rem',
                                 marginBottom: '6rem',
                                 color: '#d6d6d6',
                              }}
                           >
                              You don't have any messages
                           </p>
                        </div>
                     )}
                  </div>
               )
            ) : (
               <div
                  style={{
                     display: 'flex',
                     justifyContent: 'center',
                     flexDirection: 'column',
                     alignItems: 'center',
                     padding: '3rem',
                     color: 'silver',
                  }}
               >
                  <p id="login-offer">Please login to see your messages</p>
                  <Link
                     to="/login"
                     style={{ textDecoration: 'none', width: '5rem' }}
                  >
                     <Button variant="contained" color="secondary">
                        Login
                     </Button>
                  </Link>
               </div>
            )}

            {isLoggedIn ? (
               isChat ? null : (
                  <Button
                     variant="contained"
                     color="primary"
                     onClick={sendMessage}
                  >
                     Start a conversation
                  </Button>
               )
            ) : null}
         </div>
      </div>
   )
}

export default Inbox
