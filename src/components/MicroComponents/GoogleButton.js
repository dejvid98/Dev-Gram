import React, { useContext } from 'react'
import firebase, { db } from '../../firebase'
import { AppContext } from '../../Context'

const GoogleButton = props => {
   const provider = new firebase.auth.GoogleAuthProvider()
   const { isLoggedInContext } = useContext(AppContext)
   //eslint-disable-next-line
   const [isLoggedIn, setIsLoggedIn] = isLoggedInContext

   const handleGoogle = () => {
      firebase
         .auth()
         .signInWithPopup(provider)
         .then(function(result) {
            const name = result.user.displayName.split(' ')
            const firstName = name[0]
            const lastName = name[1]
            setIsLoggedIn(true)
            db.collection('users')
               .doc(result.user.email)
               .set({
                  email: result.user.email,
                  firstName,
                  lastName,
                  photoURL: result.user.photoURL,
               })
         })
         .catch(function(error) {
            console.log(error)
         })
   }

   return (
      <div className="g-sign-in-button" onClick={handleGoogle}>
         <div className="content-wrapper">
            <div className="logo-wrapper"></div>
            <span className="text-container">
               <span>{props.name}</span>
            </span>
         </div>
      </div>
   )
}

export default GoogleButton
