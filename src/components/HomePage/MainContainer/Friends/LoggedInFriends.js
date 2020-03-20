import React, { useState, useEffect } from 'react'
import firebase from '../../../../firebase'
import Alert from '../../../MicroComponents/Alert'
import TextField from '@material-ui/core/TextField'
import { Add } from '@material-ui/icons'

const LoggedInFriends = () => {
   const currentUser = firebase.auth().currentUser
   const db = firebase.firestore()
   const [friendEmail, setFriendEmail] = useState('')
   const [findError, setFindError] = useState(false)
   const [friendList, setFriendList] = useState([])
   const [isAdded, setIsAdded] = useState(false)

   const addFriend = async () => {
      try {
         const storage = firebase.storage()
         const storageRef = storage.ref()
         let friendInfo
         let receiverPhoto = ''

         // Looks for a photo in DB, if not found, sets a default one
         try {
            await storageRef
               .child('avatars/' + friendEmail)
               .getDownloadURL()
               .then(function(url) {
                  receiverPhoto = url
               })
         } catch (error) {
            console.log('No photo found')
         }

         // Find friend info
         await db
            .collection('users')
            .doc(friendEmail)
            .get()
            .then(doc => {
               if (doc.exists) {
                  friendInfo = doc.data()
               } else {
                  setFindError(true)
                  setTimeout(() => {
                     setFindError(false)
                  }, 4000)
                  return
               }
            })
         await db
            .collection('friends')
            .doc(currentUser.email)
            .collection('friendList')
            .doc(friendEmail)
            .set({
               email: friendInfo.email,
               firstName: friendInfo.firstName,
               lastName: friendInfo.lastName,
               photoURL: receiverPhoto ? receiverPhoto : friendInfo.photoURL,
            })
         setIsAdded(true)
         setTimeout(() => {
            setIsAdded(false)
         }, 3000)
         setFriendEmail('')
      } catch (e) {
         console.log(e)
         setFindError(true)
         setTimeout(() => {
            setFindError(false)
         }, 4000)
      }
   }

   const getFriendList = async () => {
      await db
         .collection('friends')
         .doc(currentUser.email)
         .collection('friendList')
         .onSnapshot(querySnapshot => {
            setFriendList([])
            querySnapshot.forEach(doc => {
               setFriendList(oldArr => [...oldArr, doc.data()])
            })
         })
   }

   useEffect(
      () => {
         getFriendList()
      },
      //eslint-disable-next-line
      []
   )

   return (
      <div
         style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
         }}
      >
         {findError ? (
            <Alert
               severity="error"
               message="Couldn't find user with that email"
            />
         ) : null}
         {isAdded ? (
            <Alert severity="success" message="Friend successfuly added!" />
         ) : null}
         <div className="photos-list"></div>
         <div className="add-friend-wrapper">
            <TextField
               id="outlined-basic"
               variant="outlined"
               label="Friend email"
               style={{ width: '18rem' }}
               value={friendEmail}
               onChange={e => setFriendEmail(e.target.value)}
            />
            <div className="plus-icon-wrapper" onClick={addFriend}>
               <Add
                  color="primary"
                  fontSize="large"
                  style={{ color: 'white' }}
               />
            </div>
         </div>
         <div className="messages-wrapper">
            {friendList.length > 0 ? (
               friendList.map((friend, index) => {
                  return (
                     <div key={index} className="sender-box">
                        <div className="sender-avatar">
                           <img src={friend.photoURL} alt="avatar" />
                        </div>
                        <div className="sender-name">
                           <p>{`${friend.firstName} ${friend.lastName}`}</p>
                        </div>
                     </div>
                  )
               })
            ) : (
               <div
                  style={{
                     display: 'flex',
                     flexDirection: 'column',
                     justifyContent: 'center',
                     alignItems: 'center',
                  }}
               >
                  <p
                     style={{
                        fontSize: 30,
                        color: 'gray',
                        marginTop: '10rem',
                        letterSpacing: '2px',
                     }}
                  >
                     Your friends list is empty
                  </p>
                  <p
                     style={{
                        fontSize: 20,
                        color: 'gray',
                        marginTop: '1rem',
                        letterSpacing: '1px',
                     }}
                  >
                     Starting adding some friends!
                  </p>
               </div>
            )}
         </div>
      </div>
   )
}

export default LoggedInFriends
