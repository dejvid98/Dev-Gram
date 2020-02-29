import React, { useState, useEffect } from 'react'
import firebase, { db } from '../../../../firebase'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import ReactLoading from 'react-loading'
import SendIcon from '@material-ui/icons/Send'

const SingleChat = props => {
   const [messages, setMessages] = useState([])
   const currentUser = firebase.auth().currentUser
   const [message, setMessage] = useState('')
   const [isLoading, setIsLoading] = useState(true)

   const handleMessage = e => {
      setMessage(e.target.value)
   }

   const sendMessage = async e => {
      const time = new Date().toLocaleString()
      if (message) {
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
   }

   const handleSendButton = e => {
      e.preventDefault()
      sendMessage()
   }

   // Listens for updates from database for chat logs
   // and updates them to the state
   const getChat = async () => {
      try {
         await db
            .collection('messages')
            .doc(currentUser.email)
            .collection('senders')
            .doc(props.target)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot(querySnapshot => {
               setMessages([])
               querySnapshot.forEach(doc => {
                  setMessages(oldArr => [...oldArr, doc.data()])
               })
            })
         setIsLoading(false)
      } catch (err) {
         console.log(err)
         setIsLoading(false)
      }
   }
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
            <div className="messages-list">
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
               ) : null}
               {messages.length > 0
                  ? messages.map((message, index) => {
                       return (
                          <div key={index} className="chat-bubble">
                             <div className="sender-information">
                                <div className="sender-avatar">
                                   <img
                                      src={message.senderPhoto}
                                      alt="avatar"
                                   />
                                </div>
                                <div className="sender-name-wrapper">
                                   <p className="sender-name">
                                      {message.senderName}
                                   </p>
                                   <p id="timestamp">{message.timestamp}</p>
                                </div>
                             </div>
                             <div className="sender-text-wrapper">
                                {message.senderEmail === currentUser.email ? (
                                   <div className="sender-text">
                                      <p>{message.text}</p>
                                   </div>
                                ) : (
                                   <div className="receiver-text">
                                      <p>{message.text}</p>
                                   </div>
                                )}
                             </div>
                          </div>
                       )
                    })
                  : null}
            </div>
            <form onSubmit={sendMessage}>
               <div className="send-button-wrapper">
                  <div className="send-buttons">
                     <TextField
                        variant="outlined"
                        multiline={true}
                        rows="3"
                        fullWidth={true}
                        value={message}
                        onChange={handleMessage}
                        onKeyDown={e => {
                           if (e.keyCode === 13) {
                              sendMessage()
                           }
                        }}
                     />
                  </div>
                  <div className="send-button">
                     <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                        style={{
                           borderRadius: '2rem',
                           marginLeft: '1rem',
                           height: '4rem',
                        }}
                        onClick={handleSendButton}
                     >
                        <SendIcon />
                     </Button>
                  </div>
               </div>
            </form>
         </div>
      </div>
   )
}

export default SingleChat
