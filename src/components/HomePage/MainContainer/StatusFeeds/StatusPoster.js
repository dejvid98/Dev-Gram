import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import firebase, { db } from '../../../../firebase'

const StatusPoster = () => {
    const currentUser = firebase.auth().currentUser
    let { photoURL, displayName } = currentUser
    const fullName = displayName.split(' ')
    const firstName = fullName[0]
    const lastName = fullName[1]
    const [text, setText] = useState()

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
            })
            .then(function() {
                console.log('Document successfully written!')
                setText('')
            })
            .catch(function(error) {
                console.error('Error writing document: ', error)
            })

        setText('')
    }

    return (
        <div className="status-poster">
            <h1 className="status-poster-title">What's on your mind?</h1>
            <TextField
                id="filled-full-width"
                style={{ marginLeft: '2rem', width: '30rem' }}
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
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
            </Button>
        </div>
    )
}

export default StatusPoster
