import React, { useState, useEffect } from 'react'
import Navbar from '../Layout/LoggedInNavbar'
import './Profile.scss'
import firebase, { db } from '../../firebase'
import Bio from '../MicroComponents/Bio'
import TextField from '@material-ui/core/TextField'
import SaveChangesButton from '../MicroComponents/SaveChangesButton'
import UploadFilesButton from '../MicroComponents/UploadFileButton'

const Profile = () => {
    const currentUser = firebase.auth().currentUser
    const { email, displayName, photoURL } = currentUser
    const [firstNameState, setFirstNameState] = useState('')
    const [lastNameState, setLastNameState] = useState('')
    const [emailState, setEmailState] = useState(email)
    const [bio, setBio] = useState()
    const bioCollection = db.collection('bios').doc(email)
    const defaultPhoto =
        'https://pngimage.net/wp-content/uploads/2018/06/no-avatar-png-8.png'
    const [photoState, setPhotoState] = useState(defaultPhoto)

    // Checks if current user has display name
    const getName = () => {
        if (displayName !== null) {
            const fullName = displayName.split(' ')
            const firstName = fullName[0]
            const lastName = fullName[1]
            setFirstNameState(firstName)
            setLastNameState(lastName)
        }
    }

    // Retrives photo url from databases
    // That current user has uploaded
    const getPhotoURL = async () => {
        const storage = firebase.storage()
        const storageRef = storage.ref()

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

    // Gets bio from DB for current logged in user
    const bioDB = async () => {
        const dbData = await bioCollection.get()
        const bioData = await dbData.data()
        if (bioData !== undefined) {
            setBio(bioData.bio)
        } else {
            setBio('Tells us about yourself.')
        }
    }

    // Updates databases information about user
    const handleBio = () => {
        bioCollection.set({
            bio: bio,
        })

        const fullName = `${firstNameState} ${lastNameState}`
        currentUser.updateProfile({
            displayName: fullName,
        })
    }

    const handleBioChange = e => {
        setBio(e.target.value)
    }

    const handleFirstName = e => {
        setFirstNameState(e.target.value)
    }

    const handleLastName = e => {
        setLastNameState(e.target.value)
    }

    const handleEmail = e => {
        setEmailState(e.target.value)
    }

    useEffect(
        () => {
            bioDB()
            getName()
            getPhoto()
        },
        // eslint-disable-next-line
        []
    )
    return (
        <div className="profile-parent">
            <Navbar />
            <div className="profile-settigs">
                <h1 className="profile-title">Profile settings</h1>

                <div className="photo-container">
                    <p className="avatar">Avatar</p>
                    <div className="profile-photo">
                        <img src={photoState} id="avatarPhoto" alt="profile" />
                    </div>
                    <UploadFilesButton onClick={uploadPhoto} />
                </div>

                <div className="bio">
                    <h2 className="avatar">Bio</h2>
                    <Bio value={bio} handleBioChange={handleBioChange} />
                </div>

                <div className="personal-info">
                    <h2 className="avatar">Personal info</h2>
                    <TextField
                        id="outlined-basic"
                        label="First Name"
                        variant="outlined"
                        value={firstNameState}
                        style={{ marginTop: '3rem' }}
                        onChange={handleFirstName}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Last Name"
                        variant="outlined"
                        value={lastNameState}
                        style={{ marginTop: '3rem' }}
                        onChange={handleLastName}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        value={emailState}
                        style={{ marginTop: '3rem' }}
                        onChange={handleEmail}
                    />
                    <SaveChangesButton onClick={handleBio} />
                </div>
            </div>
        </div>
    )
}

export default Profile
