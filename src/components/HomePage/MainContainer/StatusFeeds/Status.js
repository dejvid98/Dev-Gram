import React, { useState, useEffect } from 'react'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble'
import ShareIcon from '@material-ui/icons/Share'
import Button from '@material-ui/core/Button'
import PostLikesDialog from '../../../MicroComponents/PostLikesDialog'
import firebase, { db } from '../../../../firebase'

const Status = props => {
    const currentUser = firebase.auth().currentUser
    const [postState, setPostState] = useState([])
    const posts = db.collection('postLikes')
    const uid = props.uid

    // Gets realtime updates from database for posts
    useEffect(
        () => {
            let postArr = []
            posts.where('postID', '==', props.uid).onSnapshot(querySnapshot => {
                querySnapshot.forEach(doc => {
                    postArr.push({ data: doc.data() })
                })
                setPostState(postArr)
                postArr = []
            })
        },
        //eslint-disable-next-line
        []
    )

    // Checks if user already liked the post,
    // If not, then it preforms a like and adds it to database
    const handleLike = async () => {
        const didLike = postState.find(
            e =>
                e.data.whoLiked === currentUser.displayName &&
                e.data.postID === uid
        )

        if (!didLike) {
            await db.collection('postLikes').add({
                postID: uid,
                whoLiked: currentUser.displayName,
                photoURL: currentUser.photoURL,
            })
            await db
                .collection('posts')
                .doc(props.uid)
                .update({
                    numberOfLikes: firebase.firestore.FieldValue.increment(1),
                })
        }
    }

    return (
        <div className="post">
            <div className="post-heading">
                <div className="post-avatar">
                    <img src={props.photoURL} alt="" />
                </div>

                <div className="post-user">
                    <p className="username">
                        {props.firstName} {props.lastName}
                    </p>
                    <p className="timestamp">{props.timestamp}</p>
                </div>
            </div>

            <div className="post-text">
                <p>{props.text}</p>
            </div>

            <div>
                {postState.length > 0 ? (
                    <PostLikesDialog posts={postState} />
                ) : null}
            </div>

            <hr style={{ borderTop: '3px solid rgba(155, 155, 155, 0.4)' }} />

            <div className="post-buttons">
                <span>
                    <Button
                        startIcon={<ThumbUpAltIcon />}
                        size="large"
                        fullWidth={true}
                        onClick={handleLike}
                    >
                        Like
                    </Button>
                </span>

                <span>
                    <Button
                        startIcon={<ChatBubbleIcon />}
                        size="large"
                        fullWidth={true}
                    >
                        Comment
                    </Button>
                </span>

                <span>
                    <Button
                        startIcon={<ShareIcon />}
                        size="large"
                        fullWidth={true}
                    >
                        Share
                    </Button>
                </span>
            </div>
        </div>
    )
}

export default Status
