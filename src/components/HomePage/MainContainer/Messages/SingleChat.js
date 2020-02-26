import React, { useState, useEffect } from 'react'
import firebase, { db } from '../../../../firebase'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const SingleChat = props => {
   const [messages, setMessages] = useState([])
   const currentUser = firebase.auth().currentUser
   const [message, setMessage] = useState('')
   const handleMessage = e => {
      setMessage(e.target.value)
   }

   const sendMessage = async () => {
      const time = new Date().toLocaleString()
      try {
         await db
            .collection('messages')
            .doc(props.target)
            .collection('senders')
            .doc(currentUser.email)
            .collection('messages')
            .add({
               senderEmail: currentUser.email,
               senderName: currentUser.displayName,
               senderPhoto: currentUser.photoURL,
               text: message,
               timestamp: time,
            })
            .then(
               db
                  .collection('messages')
                  .doc(currentUser.email)
                  .collection('senders')
                  .doc(props.target)
                  .collection('messages')
                  .add({
                     senderEmail: currentUser.email,
                     senderName: currentUser.displayName,
                     senderPhoto: currentUser.photoURL,
                     text: message,
                     timestamp: time,
                  })
            )
            .then(setMessage(''))
      } catch (err) {
         console.log(err)
      }
   }

   const getChat = async () => {
      const messagesCol = []
      messagesCol.length = 0

      const chatResult = await db
         .collection('messages')
         .doc(currentUser.email)
         .collection('senders')
         .doc(props.target)
         .collection('messages')
         .orderBy('timestamp', 'desc')
         .onSnapshot(querySnapshot => {
            querySnapshot.forEach(doc => {
               console.log(doc.data())
               messagesCol.push(doc.data())
            })
            setMessages(messagesCol)
         })
   }
   useEffect(() => {
      getChat()
   }, [message])

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
         <div className="send-button-wrapper">
            <div className="send-buttons">
               <TextField
                  variant="outlined"
                  multiline={true}
                  rows="3"
                  fullWidth={true}
                  value={message}
                  onChange={handleMessage}
               />
            </div>
            <Button
               variant="contained"
               color="primary"
               size="large"
               style={{
                  borderRadius: '5rem',
                  width: '7rem',
                  marginLeft: '1rem',
                  marginTop: '1rem',
               }}
               onClick={sendMessage}
            >
               Send
            </Button>
         </div>
      </div>
   )
}

export default SingleChat
