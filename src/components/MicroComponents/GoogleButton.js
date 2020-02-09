import React, { useContext } from 'react'
import firebase from '../../firebase'
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
                // This gives you a Google Access Token. You can use it to access the Google API.
                //eslint-disable-next-line
                const token = result.credential.accessToken
                // The signed-in user info.
                const user = result.user
                console.log(user)
                setIsLoggedIn(true);
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
