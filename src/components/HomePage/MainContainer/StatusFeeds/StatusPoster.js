import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import firebase, { db } from '../../../../firebase'

const StatusPoster = () => {
    let currentUser
    let photoURL
    let displayName
    let fullName
    let firstName
    let lastName
    let [text, setText] = useState()

    const checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                currentUser = firebase.auth().currentUser
                photoURL = currentUser.photoURL
                displayName = currentUser.displayName
                fullName = displayName.split(' ')
                firstName = fullName[0]
                lastName = fullName[1]
            } else {
                currentUser = {}
            }
        })
    }

    if (!photoURL) {
        photoURL =
            'https://pngimage.net/wp-content/uploads/2018/06/no-avatar-png-8.png'
    }

    const handleText = e => {
        setText(e.target.value)
    }

    // Creates a new post in database
    const handleSubmit = () => {
        const timestamp = new Date().toLocaleString()

        db.collection('posts')
            .add({
                firstName,
                lastName,
                text,
                photoURL,
                timestamp,
                numberOfLikes: 0,
            })
            .then(function() {
                setText('')
            })
            .catch(function(error) {
                console.error('Error writing document: ', error)
            })

        setText('')
    }

    useEffect(
        () => {
            checkIfLoggedIn()
        },
        //eslint-disable-next-line
        []
    )

    return (
        <div className="status-poster">
            <h1 className="status-poster-title">What's on your mind?</h1>
            <TextField
                id="filled-full-width"
                style={{
                    width: '30rem',
                    backgroundColor: 'white',
                }}
                placeholder="Let the world know!"
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
                multiline={true}
                rows="3"
                onChange={handleText}
                value={text}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
            </Button>
        </div>
    )
}

export default StatusPoster
