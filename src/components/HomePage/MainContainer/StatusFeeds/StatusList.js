import React, { useState, useEffect } from 'react'
import { db } from '../../../../firebase'
import Status from './Status'

const StatusList = () => {
    const [postsState, setPostsState] = useState([])
    const likedPosts = []

    // Listens for updates from posts database
    // And lists all the posts in descending order
    useEffect(() => {
        const posts = db.collection('posts')
        let postsCollection = []
        posts.orderBy('timestamp', 'desc').onSnapshot(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                postsCollection.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })
            setPostsState(postsCollection)
            postsCollection = []
        })
    }, [])

    return (
        <div className="status-list">
            {postsState.map(post => {
                return (
                    <Status
                        firstName={post.data.firstName}
                        lastName={post.data.lastName}
                        photoURL={post.data.photoURL}
                        text={post.data.text}
                        timestamp={post.data.timestamp}
                        key={post.id}
                        uid={post.id}
                        likes={likedPosts}
                    />
                )
            })}
        </div>
    )
}

export default StatusList
