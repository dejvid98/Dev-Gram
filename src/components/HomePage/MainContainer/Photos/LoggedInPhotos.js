import React, { useState, useEffect } from 'react'
import UploadButton from '../../../MicroComponents/UploadFileButton'
import firebase from '../../../../firebase'
import PictureModal from '../../../MicroComponents/PictureModal'
import Alert from '../../../MicroComponents/Alert'
import ReactLoading from 'react-loading'

const LoggedInPhotos = () => {
   const currentUser = firebase.auth().currentUser
   const [photos, setPhotos] = useState([])
   const [isUploaded, setIsUploaded] = useState(false)
   const [isLoading, setIsLoading] = useState(true)
   const { email } = currentUser

   // Uploads photo to firestore
   const uploadPhoto = async e => {
      const file = e.target.files[0]
      const storageRef = await firebase
         .storage()
         .ref(`photos/${email}/${Math.random() * 200}`)
      await storageRef.put(file)
      await setIsUploaded(true)
      await setTimeout(() => setIsUploaded(false), 4000)
      await getPhotos()
   }

   const getPhotos = async () => {
      const storage = firebase.storage()
      const storageRef = storage.ref()
      const listRef = storageRef.child(`photos/${email}`)
      setPhotos([])
      try {
         await listRef.listAll().then(function(res) {
            res.items.forEach(async function(itemRef) {
               const metaData = await itemRef.getMetadata()
               const createdAt = metaData.timeCreated
               itemRef.getDownloadURL().then(function(url) {
                  setPhotos(photos => [
                     ...photos,
                     { url: url, createdAt: createdAt },
                  ])
               })
            })
         })
      } catch (error) {
         console.log(error)
      }
      await setIsLoading(false)
   }

   useEffect(
      () => {
         getPhotos()
      },
      //eslint-disable-next-line
      []
   )

   return (
      <div
         style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
         }}
      >
         {isUploaded ? (
            <Alert severity="success" message="Photo successfully uploaded!" />
         ) : null}
         <UploadButton
            style={{ margin: '3rem' }}
            title="Upload"
            color="secondary"
            onClick={uploadPhoto}
            radius="10rem"
         />
         <div className="photos-list">
            {isLoading ? (
               <div className="loader">
                  <ReactLoading
                     type={'spin'}
                     color={'#ff7373'}
                     height={200}
                     width={200}
                  />
               </div>
            ) : null}

            {photos.map((photo, index) => {
               return (
                  <PictureModal
                     url={photo.url}
                     createdAt={photo.createdAt}
                     key={index}
                  />
               )
            })}
         </div>
         {photos.length < 1 ? (
            <div
               style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
               }}
            >
               <p
                  style={{
                     fontSize: 30,
                     color: 'gray',
                     marginTop: '10rem',
                     letterSpacing: '2px',
                  }}
               >
                  You don't have any photos
               </p>
               <p
                  style={{
                     fontSize: 20,
                     color: 'gray',
                     marginTop: '1rem',
                     letterSpacing: '1px',
                  }}
               >
                  Hit the upload button!
               </p>
            </div>
         ) : null}
      </div>
   )
}

export default LoggedInPhotos
