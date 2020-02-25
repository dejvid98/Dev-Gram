import React, { useEffect, useState } from 'react'
import firebase, { db } from '../../../../firebase'
import './Messages.scss'
import SingleChat from './SingleChat'

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
         const senders = await db
            .collection('messages')
            .doc(currentUser.email)
            .collection('senders')
            .get()
            .then(doc => {
               const sendersData = []
               doc.forEach(message => {
                  sendersData.push(message.data())
               })
               setSenders(sendersData)
            })
      } catch (err) {
         console.log(err)
      }
   }

   useEffect(() => {
      getSenders()
   }, [])
   return (
      <div className="inbox-title-wrapper">
         <div className="inbox-title">
            <p>Private Messages</p>
            <hr />
            <button onClick={sendMessage}>Send message</button>
            {isChat ? (
               <SingleChat target={targetState} />
            ) : (
               <div className="messages-wrapper">
                  {senders.map((sender, index) => {
                     return (
                        <div
                           key={index}
                           className="sender-box"
                           onClick={() => setTarget(sender.senderEmail)}
                        >
                           <div className="sender-avatar">
                              <img src={sender.senderPhoto} alt="avatar" />
                           </div>
                           <div className="sender-name">
                              <p>{sender.senderName}</p>
                           </div>
                        </div>
                     )
                  })}
               </div>
            )}
         </div>
      </div>
   )
}

export default Inbox
