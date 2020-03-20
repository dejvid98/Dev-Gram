import React, { useContext } from 'react'
import './Friends.scss'
import { AppContext } from '../../../../Context'
import LoggedInFriends from './LoggedInFriends'
import LoggedOutFriends from './LoggedOutFriends'

const Friends = () => {
   const { isLoggedInContext } = useContext(AppContext)
   //eslint-disable-next-line
   const [isLoggedIn, setIsLoggedIn] = isLoggedInContext
   return (
      <div className="photos-main-wrapper">
         <p className="photos-title">Friends List</p>
         {isLoggedIn ? <LoggedInFriends /> : <LoggedOutFriends />}
      </div>
   )
}

export default Friends
