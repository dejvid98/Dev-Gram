import React, { useState, useContext, useEffect } from 'react'

import { AppContext } from '../../../Context'
import firebase from '../../../firebase'

const UserProfile = () => {
   const { isMiniContext } = useContext(AppContext)
   const [photo, setPhoto] = useState(
      'https://pngimage.net/wp-content/uploads/2018/06/no-avatar-png-8.png'
   )
   const [name, setName] = useState('Anonymous')
   //eslint-disable-next-line
   const [isMini, setIsMini] = isMiniContext

   useEffect(() => {
      firebase.auth().onAuthStateChanged(function(user) {
         if (user) {
            const currentUser = firebase.auth().currentUser
            const { displayName, photoURL } = currentUser
            setPhoto(photoURL)
            setName(displayName)
         } else {
         }
      })
   }, [])

   return (
      <div className="user-profile">
         <div className="profile-photo-interface">
            <img src={photo} id="avatarPhoto" alt="profile" />
         </div>
         <p className="user-name-interface">{name}</p>
      </div>
   )
}

export default UserProfile
