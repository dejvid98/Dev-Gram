import React, { useState } from 'react'
import Navbar from '../Layout/LoggedInNavbar'
import './Profile.scss'
import firebase from '../../firebase'
import { Button } from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import SaveIcon from '@material-ui/icons/Save'
import Bio from '../MicroComponents/Bio'
import TextField from '@material-ui/core/TextField'

const Profile = () => {
    const currentUser = firebase.auth().currentUser
    const { email, displayName, photoURL } = currentUser
    const fullName = displayName.split(' ')
    const firstName = fullName[0]
    const lastName = fullName[1]
    const [firstNameState, setFirstNameState] = useState(firstName)
    const [lastNameState, setLastNameState] = useState(lastName)
    const [emailState, setEmailState] = useState(email)

    console.log(email)
    return (
        <div className="profile-parent">
            <div className="profile-navbar">
                <Navbar />
            </div>
            <div className="profile-settigs">
                <h1
                    style={{
                        fontSize: '40px',
                        color: '#131313',
                        marginBottom: '2rem',
                    }}
                    className="profile-title"
                >
                    Profile settings
                </h1>

                <div className="photo-container">
                    <p className="avatar">Avatar</p>
                    <div className="profile-photo">
                        <img src={photoURL} alt="profile" />
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<CloudUploadIcon />}
                        style={{
                            width: '15rem',
                            marginLeft: '3rem',
                            marginTop: '2rem',
                            borderRadius: '2rem',
                        }}
                    >
                        Upload avatar
                    </Button>
                 
                </div>

                <div className="bio">
                    <h2 className="avatar">Bio</h2>
                    <Bio />
                </div>

                <div className="personal-info">
                    <h2 className="avatar">Personal info</h2>
                    <TextField
                        id="outlined-basic"
                        label="First Name"
                        variant="outlined"
                        value={firstNameState}
                        style={{ marginTop: '3rem' }}
                    />

                    <TextField
                        id="outlined-basic"
                        label="Last Name"
                        variant="outlined"
                        value={lastNameState}
                        style={{ marginTop: '3rem' }}
                    />

                    <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        value={emailState}
                        style={{ marginTop: '3rem' }}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon />}
                        style={{
                            width: '12rem',
                            marginLeft: '10rem',
                            marginTop: '2rem',
                            borderRadius: '2rem',
                        }}
                    >
                        Save Changes
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Profile
