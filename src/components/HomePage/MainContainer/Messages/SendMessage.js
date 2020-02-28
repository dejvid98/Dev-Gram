import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import firebase, { db } from '../../../../firebase'
import ReactLoading from 'react-loading'

const SendMessage = props => {
   const currentUser = firebase.auth().currentUser
   const [message, setMessage] = useState('')
   const [receiver, setReceiver] = useState('')
   const [isLoading, setIsLoading] = useState(false)
   const defaultPhoto =
      'https://pngimage.net/wp-content/uploads/2018/06/no-avatar-png-8.png'

   const handleMessage = e => {
      setMessage(e.target.value)
   }

   const handleReceiver = e => {
      setReceiver(e.target.value)
   }

   const sendMessage = async () => {
      setIsLoading(true)
      const time = new Date().toLocaleString()
      const storage = firebase.storage()
      const storageRef = storage.ref()
      let fullName = ''
      let receiverPhoto = ''

      // Looks for a photo in DB, if not found, sets a default one
      try {
         await storageRef
            .child('avatars/' + receiver)
            .getDownloadURL()
            .then(function(url) {
               receiverPhoto = url
            })
      } catch (error) {
         receiverPhoto = defaultPhoto
      }

      // Looks for a user in DB, reterives his info and sets it as metadata in message
      try {
         await db
            .collection('users')
            .doc(receiver)
            .get()
            .then(doc => {
               fullName = `${doc.data().firstName} ${doc.data().lastName}`
            })

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
               receiverName: fullName,
               receiverPhoto,
            })

         await db
            .collection('messages')
            .doc(currentUser.email)
            .collection('senders')
            .doc(receiver)
            .set({
               senderEmail: currentUser.email,
               senderName: currentUser.displayName,
               senderPhoto: currentUser.photoURL,
               receiverEmail: receiver,
               receiverName: fullName,
               receiverPhoto,
            })

         await db
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
               receiverName: fullName,
               text: message,
               timestamp: time,
               receiverPhoto,
            })

         await db
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
               receiverName: fullName,
               text: message,
               timestamp: time,
               receiverPhoto,
            })
            .then(setIsLoading(false))
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
            {isLoading ? (
               <div
                  style={{
                     marginLeft: '0rem',
                     marginTop: '4rem',
                     marginBottom: '3rem',
                  }}
               >
                  <ReactLoading
                     type={'spin'}
                     color={'#ff7373'}
                     height={200}
                     width={200}
                  />
               </div>
            ) : (
               <div>
                  <div className="receiver">
                     <p>Email : </p>
                     <TextField
                        id="standard-basic"
                        label="Receiver"
                        value={receiver}
                        onChange={handleReceiver}
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
            )}
         </div>
         <Button variant="contained" color="primary" onClick={seeInbox}>
            Send
         </Button>
      </div>
   )
}

export default SendMessage
