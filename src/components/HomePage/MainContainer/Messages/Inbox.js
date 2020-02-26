import React, { useEffect, useState } from 'react'
import firebase, { db } from '../../../../firebase'
import './Messages.scss'
import SingleChat from './SingleChat'
import Button from '@material-ui/core/Button'

const Inbox = props => {
   const currentUser = firebase.auth().currentUser
   const [senders, setSenders] = useState([])
   const [isChat, setIsChat] = useState(false)
   const [targetState, setTargetState] = useState()

   const sendMessage = () => {
      props.handleLayout('sendMessage')
   }

   const setTarget = target => {
      setTargetState(target)
      setIsChat(true)
   }

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
      } catch (err) {
         console.log(err)
      }
   }

   useEffect(() => {
      getSenders()
   }, [senders])
   return (
      <div className="inbox-title-wrapper">
         <div className="inbox-title">
            <p>Private Messages</p>
            {/* <hr /> */}

            {isChat ? (
               <SingleChat target={targetState} />
            ) : (
               <div className="messages-wrapper">
                  {senders.length > 0 ? (
                     senders.map((sender, index) => {
                        console.log(sender)
                        return (
                           <div
                              key={index}
                              className="sender-box"
                              onClick={() => {
                                 if (sender.senderEmail === currentUser.email) {
                                    setTarget(sender.receiverEmail)
                                 } else {
                                    setTarget(sender.senderEmail)
                                 }
                              }}
                           >
                              <div className="sender-avatar">
                                 <img src={sender.senderPhoto} alt="avatar" />
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
            )}

            {isChat ? null : (
               <Button
                  variant="contained"
                  color="primary"
                  onClick={sendMessage}
               >
                  Send message
               </Button>
            )}
         </div>
      </div>
   )
}

export default Inbox
