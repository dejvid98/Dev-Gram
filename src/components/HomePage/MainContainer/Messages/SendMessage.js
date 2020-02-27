import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import firebase, { db } from '../../../../firebase'

const SendMessage = props => {
   const currentUser = firebase.auth().currentUser
   const [message, setMessage] = useState('')
   const [receiver, setReceiver] = useState('')
   const [receiverName, setReceiverName] = useState('')

   const handleMessage = e => {
      setMessage(e.target.value)
   }

   const handleReceiver = e => {
      setReceiver(e.target.value)
   }

   const handleReceiverName = e => {
      setReceiverName(e.target.value)
   }

   const sendMessage = async () => {
      const time = new Date().toLocaleString()
      try {
         await db
            .collection('messages')
            .doc(receiver)
            .collection('senders')
            .doc(currentUser.email)
            .set({
               senderEmail: currentUser.email,
               senderName: currentUser.displayName,
               senderPhoto: currentUser.photoURL,
               receiverEmail: receiver,
               receiverName: receiverName,
            })

            .then(
               db
                  .collection('messages')
                  .doc(currentUser.email)
                  .collection('senders')
                  .doc(receiver)
                  .set({
                     senderEmail: currentUser.email,
                     senderName: currentUser.displayName,
                     senderPhoto: currentUser.photoURL,
                     receiverEmail: receiver,
                     receiverName: receiverName,
                  })
            )
            .then(
               db
                  .collection('messages')
                  .doc(receiver)
                  .collection('senders')
                  .doc(currentUser.email)
                  .collection('messages')
                  .add({
                     senderEmail: currentUser.email,
                     senderName: currentUser.displayName,
                     senderPhoto: currentUser.photoURL,
                     receiverEmail: receiver,
                     receiverName: receiverName,
                     text: message,
                     timestamp: time,
                  })
            )
            .then(
               db
                  .collection('messages')
                  .doc(currentUser.email)
                  .collection('senders')
                  .doc(receiver)
                  .collection('messages')
                  .add({
                     senderEmail: currentUser.email,
                     senderName: currentUser.displayName,
                     senderPhoto: currentUser.photoURL,
                     receiverEmail: receiver,
                     receiverName: receiverName,
                     text: message,
                     timestamp: time,
                  })
            )
      } catch (err) {
         console.log(err)
      }
   }
   const seeInbox = async () => {
      await sendMessage()
      await props.handleLayout('inbox')
   }

   return (
      <div className="inbox-title-wrapper">
         <div className="inbox-title">
            <p>Send a Message</p>
            <hr />
         </div>
         <div className="send-box">
            <div className="receiver">
               <p>Email : </p>
               <TextField
                  id="standard-basic"
                  label="Receiver"
                  value={receiver}
                  onChange={handleReceiver}
               />
            </div>
            <div className="receiver">
               <p>Name : </p>
               <TextField
                  id="standard-basic"
                  label="Receiver"
                  value={receiverName}
                  onChange={handleReceiverName}
               />
            </div>
            <div className="message-text">
               <p>Message Text</p>
               <TextField
                  id="standard-basic"
                  fullWidth={true}
                  multiline={true}
                  rows="4"
                  variant="outlined"
                  value={message}
                  onChange={handleMessage}
               />
            </div>
         </div>
         <Button variant="contained" color="primary" onClick={seeInbox}>
            Send
         </Button>
      </div>
   )
}

export default SendMessage
