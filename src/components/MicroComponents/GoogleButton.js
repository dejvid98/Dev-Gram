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
                setIsLoggedIn(true);
            })
            .catch(function(error) {
                console.log(error)
            })
    }

    return (
        <div className="g-sign-in-button" onClick={handleGoogle}>
            <div className="content-wrapper">
                <div className="logo-wrapper">
                </div>
                <span className="text-container">
                    <span>{props.name}</span>
                </span>
            </div>
        </div>
    )
}

export default GoogleButton
