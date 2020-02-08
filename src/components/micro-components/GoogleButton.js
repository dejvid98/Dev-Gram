import React from 'react'
import firebase from '../../firebase'

const GoogleButton = props => {
    var provider = new firebase.auth.GoogleAuthProvider()
    const handleGoogle = () => {
        firebase
            .auth()
            .signInWithPopup(provider)
            .then(function(result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken
                // The signed-in user info.
                var user = result.user
                console.log(user)
                console.log(token)
                // ...
            })
            .catch(function(error) {
                console.log(error)
            })
    }
    return (
        <div className="g-sign-in-button" onClick={handleGoogle}>
            <div className="content-wrapper">
                <div className="logo-wrapper">
                    <img
                        src="https://developers.google.com/identity/images/g-logo.png"
                        alt=""
                    />
                </div>
                <span className="text-container">
                    <span>{props.name}</span>
                </span>
            </div>
        </div>
    )
}

export default GoogleButton
