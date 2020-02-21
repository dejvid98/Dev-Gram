import React, { useState, useEffect } from 'react'
import { db } from '../firebase'

const LikedPosts = () => {
    const [postState, setPostState] = useState([])
    useEffect(() => {
        const posts = db.collection('postLikes')
        const postArr = []

        posts.onSnapshot(querySnapshot => {
            querySnapshot.forEach(doc => {
                postArr.push({ data: doc.data().whoLiked })
                console.log(doc.data())
            })
            setPostState(postArr)
        })
    }, [])
    return (
        <div>
            <h1>
                {postState.length > 0
                    ? postState.map(post => {
                          return <div>{post.data}</div>
                      })
                    : null}
            </h1>
        </div>
    )
}

export default LikedPosts
