import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import firebase from '../../firebase'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import isEmail from 'validator/lib/isEmail'
import equals from 'validator/lib/equals'
import isEmpty from 'validator/lib/isEmpty'

import ErrorMsg from '../MicroComponents/Error'
import LoggedInNavbar from '../Layout/LoggedInNavbar'
import LoggedOutNavbar from '../Layout/LoggedOutNavbar'
import Checkbox from '../MicroComponents/Checkbox'
import GoogleButton from '../MicroComponents/GoogleButton'
import { AppContext } from '../../Context'

const Register = props => {
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [nameError, setNameError] = useState(0)
    const [emailError, setEmailError] = useState(0)
    const [emailError2, setEmailError2] = useState(0)
    const [passwordError, setPasswordError] = useState(0)
    const [passwordError2, setPasswordError2] = useState(0)

    const { isLoggedInContext } = useContext(AppContext)
    //eslint-disable-next-line
    const [isLoggedIn, setIsLoggedIn] = isLoggedInContext

    const handleEmail = e => {
        setEmail(e.target.value)
    }

    const handleFirstName = e => {
        setFirstName(e.target.value)
    }

    const handleLastName = e => {
        setLastName(e.target.value)
    }

    const handlePassword = e => {
        setPassword(e.target.value)
    }

    const handleConfirmPassword = e => {
        setConfirmPassword(e.target.value)
    }

    // Signs up users using firebase
    // Checks if user already exists
    const signUp = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch(function(error) {
                console.log(error)
                setEmailError2(1)
                setTimeout(() => {
                    setEmailError2(0)
                }, 3000)
            })
    }

    // Does input validation
    const handleRegistration = () => {
        if (isEmpty(firstName) || isEmpty(lastName)) {
            setNameError(1)
            setTimeout(() => {
                setNameError(0)
            }, 3000)
        } else if (!isEmail(email)) {
            setEmailError(1)
            setTimeout(() => {
                setEmailError(0)
            }, 3000)
        } else if (!equals(password, confirmPassword)) {
            setPasswordError(1)
            setTimeout(() => {
                setPasswordError(0)
            }, 3000)
        } else if (password.length <= 5) {
            setPasswordError2(1)
            setTimeout(() => {
                setPasswordError2(0)
            }, 3000)
        } else {
            signUp()
        }
    }

    return (
        <div>
            <div className="register-div">
                {isLoggedIn ? <LoggedInNavbar /> : <LoggedOutNavbar />}
                <div className="errors-register">
                    {emailError === 1 ? (
                        <ErrorMsg errorText="Please enter valid email" />
                    ) : null}
                    {nameError === 1 ? (
                        <ErrorMsg errorText="Please enter valid name" />
                    ) : null}
                    {passwordError === 1 ? (
                        <ErrorMsg errorText="Your password are not matching" />
                    ) : null}
                    {passwordError2 === 1 ? (
                        <ErrorMsg errorText="Your password must be at least 6 characters long" />
                    ) : null}
                    {emailError2 === 1 ? (
                        <ErrorMsg errorText="Email already exists" />
                    ) : null}
                </div>
                <div className="register-form">
                    <div className="name-fields">
                        <TextField
                            id="outlined-basic"
                            label="First Name"
                            variant="outlined"
                            style={{ marginRight: '10px' }}
                            value={firstName}
                            onChange={handleFirstName}
                        />

                        <TextField
                            id="outlined-basic"
                            label="Last Name"
                            variant="outlined"
                            value={lastName}
                            onChange={handleLastName}
                        />
                    </div>

                    <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        style={{ marginTop: '25px' }}
                        value={email}
                        onChange={handleEmail}
                    />

                    <div className="name-fields" style={{ marginTop: '25px' }}>
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            variant="outlined"
                            type="password"
                            autoComplete="current-password"
                            style={{ marginRight: '10px' }}
                            value={password}
                            onChange={handlePassword}
                        />

                        <TextField
                            id="outlined-password-input"
                            label="Confirm Password"
                            variant="outlined"
                            type="password"
                            autoComplete="current-password"
                            value={confirmPassword}
                            onChange={handleConfirmPassword}
                        />
                    </div>

                    <Checkbox />
                    <Button
                        variant="contained"
                        color="primary"
                        style={{
                            backgroundColor: '#0074D9',
                            marginTop: '25px',
                            boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.25)',
                        }}
                        onClick={handleRegistration}
                    >
                        Sign Up with email
                    </Button>
                    <GoogleButton name="Sign Up with Google" />

                    <Button style={{ marginTop: '25px ' }}>
                        <Link to="/login" style={{ textDecoration: 'none' }}>
                            Already Registered?
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Register