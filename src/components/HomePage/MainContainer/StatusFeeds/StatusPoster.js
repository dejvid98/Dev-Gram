import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import firebase, { db } from '../../../../firebase'

const StatusPoster = () => {
   const currentUser = firebase.auth().currentUser
   let [text, setText] = useState()
   const [photoURLState, setPhotoURLState] = useState()
   //eslint-disable-next-line
   const [displayNameState, setDisplayNameState] = useState()
   //eslint-disable-next-line
   const [fullNameState, setFullNameState] = useState()
   const [firstNameState, setFirstNameState] = useState()
   const [lastNameState, setLastNameState] = useState()

   if (!photoURLState) {
      setPhotoURLState(
         'https://pngimage.net/wp-content/uploads/2018/06/no-avatar-png-8.png'
      )
   }

   const handleText = e => {
      setText(e.target.value)
   }

   // Creates a new post in database
   const handleSubmit = () => {
      const timestamp = new Date().toLocaleString()

      db.collection('posts')
         .add({
            firstName: firstNameState,
            lastName: lastNameState,
            text,
            photoURL: photoURLState,
            timestamp,
            numberOfLikes: 0,
         })
         .then(function() {
            setText('')
         })
         .catch(function(error) {
            console.error('Error writing document: ', error)
         })

      setText('')
   }

   useEffect(
      () => {
         firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
               setPhotoURLState(currentUser.photoURL)
               setDisplayNameState(currentUser.displayName)
               const displayName = currentUser.displayName
               const fullNamee = displayName.split(' ')
               setFullNameState(fullNamee)
               const firstName = fullNamee[0]
               const lastName = fullNamee[1]
               setFirstNameState(firstName)
               setLastNameState(lastName)
            }
         })
      },
      //eslint-disable-next-line
      []
   )

   return (
      <div className="status-poster">
         <h1 className="status-poster-title">What's on your mind?</h1>
         <TextField
            id="filled-full-width"
            style={{
               width: '30rem',
               backgroundColor: 'white',
            }}
            placeholder="Let the world know!"
            fullWidth
            margin="normal"
            InputLabelProps={{
               shrink: true,
            }}
            variant="outlined"
            multiline={true}
            rows="3"
            onChange={handleText}
            value={text}
         />
         <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
         </Button>
      </div>
   )
}

export default StatusPoster
