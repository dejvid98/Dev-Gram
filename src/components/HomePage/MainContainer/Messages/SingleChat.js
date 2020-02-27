import React, { useState, useEffect } from 'react'
import firebase, { db } from '../../../../firebase'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import ReactLoading from 'react-loading'

const SingleChat = props => {
   const [messages, setMessages] = useState([])
   const currentUser = firebase.auth().currentUser
   const [message, setMessage] = useState('')
   const [isLoading, setIsLoading] = useState(true)
   
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

   // Listens for updates from database for chat logs
   // and updates them to the state

   const getChat = async () => {
      const messagesCol = []
      await db
         .collection('messages')
         .doc(currentUser.email)
         .collection('senders')
         .doc(props.target)
         .collection('messages')
         .orderBy('timestamp', 'desc')
         .onSnapshot(querySnapshot => {
            if (messagesCol.length > 0) {
               messagesCol.length = 0
            }
            querySnapshot.forEach(doc => {
               messagesCol.push(doc.data())
            })
            setMessages(messagesCol)
         })
   }

   // Does inital loading while waiting for chat logs

   useEffect(() => {
      setTimeout(() => {
         setIsLoading(false)
      }, 2000)
   })

   useEffect(
      () => {
         getChat()
      },
      //eslint-disable-next-line
      []
   )

   return (
      <div>
         <div className="chat-frame">
            {isLoading ? (
               <div
                  style={{
                     marginLeft: '13rem',
                     marginTop: '4rem',
                     marginBottom: '3rem',
                  }}
               >
                  <ReactLoading
                     type={'spin'}
                     color={'#FF4136'}
                     height={200}
                     width={200}
                  />
               </div>
            ) : messages.length > 0 ? (
               messages.map((message, index) => {
                  return (
                     <div key={index} className="chat-bubble">
                        <div className="sender-information">
                           <div className="sender-avatar">
                              <img src={message.senderPhoto} alt="avatar" />
                           </div>
                           <div className="sender-name-wrapper">
                              <p className="sender-name">
                                 {message.senderName}
                              </p>
                              <p id="timestamp">{message.timestamp}</p>
                           </div>
                        </div>
                        <div className="sender-text">
                           <p>{message.text}</p>
                        </div>
                     </div>
                  )
               })
            ) : null}
         </div>
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
