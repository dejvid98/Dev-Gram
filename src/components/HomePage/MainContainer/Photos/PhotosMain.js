import React, { useContext } from 'react'
import './Photos.scss'
import LoggedOut from './LoggedOutPhotos'
import LoggedIn from './LoggedInPhotos'
import { AppContext } from '../../../../Context'

const PhotosMain = () => {
   const { isLoggedInContext } = useContext(AppContext)
   //eslint-disable-next-line
   const [isLoggedIn, setIsLoggedIn] = isLoggedInContext
   return (
      <div className="photos-main-wrapper">
         <p className="photos-title">Photos</p>
         {isLoggedIn ? <LoggedIn /> : <LoggedOut />}
      </div>
   )
}

export default PhotosMain
