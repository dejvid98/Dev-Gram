import React, { useState, useEffect } from 'react'
import { db } from '../../../../firebase'
import Status from './Status'

const StatusList = () => {
    const [postsState, setPostsState] = useState([])

    // Listens for updates from posts database
    useEffect(() => {
        const posts = db.collection('posts')
        posts.onSnapshot(function(querySnapshot) {
            const postsCollection = []
            querySnapshot.forEach(function(doc) {
                postsCollection.push({ id: doc.id, data: doc.data() })
            })
            setPostsState(postsCollection)
        })
    }, [])

    return (
        <div className="status-list">
            {postsState.map(post => {
                console.log(postsState)
                return (
                    <Status
                        firstName={post.data.firstName}
                        lastName={post.data.lastName}
                        photoURL={post.data.photoURL}
                        text={post.data.text}
                        timestamp={post.data.timestamp}
                        key={post.id}
                    />
                )
            })}
        </div>
    )
}

export default StatusList
