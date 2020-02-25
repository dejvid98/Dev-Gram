import React, { useState, useEffect } from 'react'
import firebase from '../../firebase'
import UploadFilesButton from '../MicroComponents/UploadFileButton'

const Avatar = () => {
   const storage = firebase.storage()
   const storageRef = storage.ref()
   const currentUser = firebase.auth().currentUser
   const { email, photoURL } = currentUser
   const defaultPhoto =
      'https://pngimage.net/wp-content/uploads/2018/06/no-avatar-png-8.png'
   const [photoState, setPhotoState] = useState(defaultPhoto)

   // Retrives photo url from databases That current user has uploaded

   const getPhotoURL = async () => {
      storageRef
         .child('avatars/' + email)
         .getDownloadURL()
         .then(function(url) {
            const img = document.getElementById('avatarPhoto')
            img.src = url
            currentUser.updateProfile({
               photoURL: url,
            })
         })
         .catch(function(error) {
            console.log(error)
         })
   }

   // Uploads photo to firestore

   const uploadPhoto = async e => {
      const file = e.target.files[0]
      const storageRef = await firebase.storage().ref('avatars/' + email)
      await storageRef.put(file)
      getPhotoURL()
   }

   //Checks if photo is set, if not, it sets default picture

   const getPhoto = () => {
      if (photoURL !== null) {
         setPhotoState(photoURL)
      }
   }

   useEffect(
      () => {
         getPhoto()
      },
      // eslint-disable-next-line
      []
   )
   return (
      <div className="photo-container">
         <p className="avatar">Avatar</p>
         <div className="profile-photo">
            <img src={photoState} id="avatarPhoto" alt="profile" />
         </div>
         <UploadFilesButton onClick={uploadPhoto} />
      </div>
   )
}

export default Avatar
