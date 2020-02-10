import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import firebase from '../../firebase'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import isEmail from 'validator/lib/isEmail'

import ErrorMsg from '../MicroComponents/Error'
import LoggedInNavbar from '../Layout/LoggedInNavbar'
import LoggedOutNavbar from '../Layout/LoggedOutNavbar'
import GoogleButton from '../MicroComponents/GoogleButton'
import { AppContext } from '../../Context'

const Register = props => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState(0)
    const [emailError2, setEmailError2] = useState(0)
    const [passwordError2, setPasswordError2] = useState(0)


    const { isLoggedInContext } = useContext(AppContext)
    const [isLoggedIn, setIsLoggedIn] = isLoggedInContext

    // Saves state of logged in user to local storage
    const stateToSessionStorage = state => {
        sessionStorage.setItem('isLoggedIn', state)
    }

    const handleEmail = e => {
        setEmail(e.target.value)
    }

    const handlePassword = e => {
        setPassword(e.target.value)
    }

    // Signs in user with email and password using firebase
    // Checks if users exists first
    const signIn = async () => {
        try {
            const response = await firebase
                .auth()
                .setPersistence(firebase.auth.Auth.Persistence.SESSION)
                .then(function() {
                    return firebase
                        .auth()
                        .signInWithEmailAndPassword(email, password)
                })
            console.log(firebase.auth().currentUser)
            if (response.code === undefined) {
                setIsLoggedIn(true)
                stateToSessionStorage(true)
                console.log(response.code)
            }
        } catch (error) {
            console.log(error)
            setEmailError2(1)
            setTimeout(() => {
                setEmailError2(0)
            }, 3000)
        }
    }

    // Does validation on inputs
    const handleLogin = () => {
        if (!isEmail(email)) {
            setEmailError(1)
            setTimeout(() => {
                setEmailError(0)
            }, 3000)
        } else if (password.length <= 5) {
            setPasswordError2(1)
            setTimeout(() => {
                setPasswordError2(0)
            }, 3000)
        } else {
            signIn()
        }
    }

    return (
        <div>
            <div className="register-div">
                {isLoggedIn ? <LoggedInNavbar /> : <LoggedOutNavbar />}
                {/*  Renders errors according to input */}
                <div className="errors-login">
                    {emailError === 1 ? (
                        <ErrorMsg errorText="Please enter valid email" />
                    ) : null}
                    {passwordError2 === 1 ? (
                        <ErrorMsg errorText="Your password must be at least 6 characters long" />
                    ) : null}
                    {emailError2 === 1 ? (
                        <ErrorMsg errorText="Your username or password is incorrect." />
                    ) : null}
                </div>

                <div className="login-form">
                    <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        style={{ marginBottom: '25px', width: '25rem' }}
                        value={email}
                        onChange={handleEmail}
                    />
                    <TextField
                        id="outlined-password-input"
                        label="Password"
                        variant="outlined"
                        type="password"
                        autoComplete="current-password"
                        style={{ marginRight: '25px', width: '25rem' }}
                        value={password}
                        onChange={handlePassword}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        style={{
                            backgroundColor: '#0074D9',
                            marginTop: '25px',
                            boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.25)',
                        }}
                        onClick={handleLogin}
                    >
                        Sign In with email
                    </Button>
                    <GoogleButton name="Sign In with Google" />
                    <Button to="/register" style={{ marginTop: '25px ' }}>
                        <Link to="/register" style={{ textDecoration: 'none' }}>
                            Create an account
                        </Link>
                    </Button>
                    <button onClick={() =>console.log(firebase.auth().currentUser)}>click me</button>
                </div>
            </div>
        </div>
    )
}

export default Register
