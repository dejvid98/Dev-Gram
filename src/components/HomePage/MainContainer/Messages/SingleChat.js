import React, { useState, useEffect } from 'react'
import firebase, { db } from '../../../../firebase'

const SingleChat = props => {
   const [messages, setMessages] = useState([])
   const currenUser = firebase.auth().currentUser
   const [newMessage, setNewMessage] = useState(0)

   const getChat = async () => {
      const messagesCol = []
      await db
         .collection('messages')
         .doc(currenUser.email)
         .collection('senders')
         .doc(props.target)
         .collection('messages')
         .get()
         .then(doc => {
            doc.forEach(docData => {
               messagesCol.push(docData.data())
            })
         })
      setMessages(messagesCol)
   }
   useEffect(() => {
      getChat()
      console.log('HIIIIIII')
   }, [newMessage])
   return (
      <div className="chat-frame">
         {messages.length > 0
            ? messages.map((message, index) => {
                 return (
                    <div key={index} className="chat-bubble">
                       <div className="sender-information">
                          <div className="sender-avatar">
                             <img src={message.senderPhoto} alt="avatar" />
                          </div>
                          <div className="sender-name-wrapper">
                             <p className="sender-name">{message.senderName}</p>
                             <p id="timestamp">{message.timestamp}</p>
                          </div>
                       </div>
                       <div className="sender-text">
                          <p>{message.text}</p>
                       </div>
                    </div>
                 )
              })
            : null}
      </div>
   )
}

export default SingleChat
