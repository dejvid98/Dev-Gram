import React, { useState, useEffect } from 'react'
import './Profile.scss'
import firebase, { db } from '../../firebase'
import Bio from '../MicroComponents/Bio'
import TextField from '@material-ui/core/TextField'
import SaveChangesButton from '../MicroComponents/SaveChangesButton'

const PersonalInfo = () => {
    const currentUser = firebase.auth().currentUser
    const { email, displayName } = currentUser
    const [firstNameState, setFirstNameState] = useState('')
    const [lastNameState, setLastNameState] = useState('')
    const [emailState, setEmailState] = useState(email)
    const [bio, setBio] = useState()
    const bioCollection = db.collection('bios').doc(email)

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
        },
        // eslint-disable-next-line
        []
    )

    return (
        <div>
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
    )
}

export default PersonalInfo
