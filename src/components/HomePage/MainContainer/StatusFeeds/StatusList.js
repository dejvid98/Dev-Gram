import React, { useState, useEffect } from 'react'
import { db } from '../../../../firebase'
import Status from './Status'

const StatusList = () => {
    const [postsState, setPostsState] = useState([])
    const posts = db.collection('posts')

    useEffect(() => {
        posts.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                console.log(doc.id, ' => ', doc.data())
                const postsCollection = []
                postsCollection.push(doc.data())
                setPostsState(postsCollection)
            })
        })
    }, [])

    return (
        <div className="status-list">
            {postsState.map(post => {
                console.log(postsState)
                return <Status firstName={post.firstName} />
            })}
        </div>
    )
}

export default StatusList
