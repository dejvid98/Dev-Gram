import React, { useState, useEffect } from 'react'
import { db } from '../../../../firebase'
import Status from './Status'
import OrderBy from '../../../MicroComponents/OrderBy'

const StatusList = () => {
   const [postsState, setPostsState] = useState([])
   const [orderBy, setOrderBy] = useState('desc')
   const likedPosts = []

   const handleSort = e => {
      setOrderBy(e.target.value)
   }

   // Listens for updates from posts database
   // And lists all the posts in descending order
   useEffect(() => {
      const posts = db.collection('posts')
      let postsCollection = []
      const mjau = () => {
         switch (orderBy) {
            case 'desc':
               posts
                  .orderBy('timestamp', 'desc')
                  .onSnapshot(function(querySnapshot) {
                     querySnapshot.forEach(function(doc) {
                        postsCollection.push({
                           id: doc.id,
                           data: doc.data(),
                        })
                     })
                     setPostsState(postsCollection)
                     postsCollection = []
                  })
               break
            case 'asc':
               posts.orderBy('timestamp').onSnapshot(function(querySnapshot) {
                  querySnapshot.forEach(function(doc) {
                     postsCollection.push({
                        id: doc.id,
                        data: doc.data(),
                     })
                  })
                  setPostsState(postsCollection)
                  postsCollection = []
               })
               break
            case 'likes':
               posts
                  .orderBy('numberOfLikes', 'desc')
                  .onSnapshot(function(querySnapshot) {
                     querySnapshot.forEach(function(doc) {
                        postsCollection.push({
                           id: doc.id,
                           data: doc.data(),
                        })
                     })
                     setPostsState(postsCollection)
                     postsCollection = []
                  })
               break
            default:
         }
      }
   }, [orderBy])

   return (
      <div className="status-list">
         <div className="sort-div">
            <OrderBy handleSort={handleSort} />
         </div>
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
