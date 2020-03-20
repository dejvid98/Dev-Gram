import React, { useContext } from 'react'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'
import MessageRoundedIcon from '@material-ui/icons/MessageRounded'
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded'
import EventAvailableRoundedIcon from '@material-ui/icons/EventAvailableRounded'
import SettingsApplicationsRoundedIcon from '@material-ui/icons/SettingsApplicationsRounded'
import PhotoSizeSelectActualRoundedIcon from '@material-ui/icons/PhotoSizeSelectActualRounded'
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded'
import HelpOutlineRoundedIcon from '@material-ui/icons/HelpOutlineRounded'
import { AppContext } from '../../../Context'
import { Link } from 'react-router-dom'

const Navigation = props => {
   const { interFaceNavigationContext } = useContext(AppContext)

   const [
      interfaceNavigation,
      setInterfaceNavigation,
   ] = interFaceNavigationContext

   const handleNavigation = target => {
      setInterfaceNavigation(target)
   }

   return (
      <div className="interface-navigation">
         {interfaceNavigation === 'newsFeed' ? (
            <div
               className="interface-navigation-item"
               style={{
                  color: 'white',
                  backgroundColor: '#e84545',
                  cursor: 'pointer',
               }}
               onClick={() => handleNavigation('newsFeed')}
            >
               <HomeRoundedIcon fontSize="inherit" />
               <p className="nav-text">News feed</p>
            </div>
         ) : (
            <>
               <div
                  className="interface-navigation-item"
                  style={{ color: 'white', cursor: 'pointer' }}
                  onClick={() => handleNavigation('newsFeed')}
               >
                  <HomeRoundedIcon fontSize="inherit" />
                  <p className="nav-text">News feed</p>
               </div>
            </>
         )}
         {interfaceNavigation === 'messages' ? (
            <div
               className="interface-navigation-item"
               style={{
                  color: 'white',
                  backgroundColor: '#e84545',
                  cursor: 'pointer',
               }}
               onClick={() => handleNavigation('messages')}
            >
               <MessageRoundedIcon fontSize="inherit" />
               <p className="nav-text">Messages</p>
            </div>
         ) : (
            <div
               className="interface-navigation-item"
               style={{ color: 'white', cursor: 'pointer' }}
               onClick={() => handleNavigation('messages')}
            >
               <MessageRoundedIcon fontSize="inherit" />
               <p className="nav-text">Messages</p>
            </div>
         )}
         {interfaceNavigation === 'photos' ? (
            <div
               className="interface-navigation-item"
               style={{
                  color: 'white',
                  backgroundColor: '#e84545',
                  cursor: 'pointer',
               }}
               onClick={() => handleNavigation('photos')}
            >
               <PhotoSizeSelectActualRoundedIcon fontSize="inherit" />
               <p className="nav-text">Photos</p>
            </div>
         ) : (
            <div
               className="interface-navigation-item"
               style={{ color: 'white', cursor: 'pointer' }}
               onClick={() => handleNavigation('photos')}
            >
               <PhotoSizeSelectActualRoundedIcon fontSize="inherit" />
               <p className="nav-text">Photos</p>
            </div>
         )}

         {interfaceNavigation === 'friends' ? (
            <div
               className="interface-navigation-item"
               style={{
                  color: 'white',
                  backgroundColor: '#e84545',
                  cursor: 'pointer',
               }}
               onClick={() => handleNavigation('friends')}
            >
               <PeopleAltRoundedIcon fontSize="inherit" />
               <p className="nav-text">Friends</p>
            </div>
         ) : (
            <div
               className="interface-navigation-item"
               style={{ color: 'white', cursor: 'pointer' }}
               onClick={() => handleNavigation('friends')}
            >
               <PeopleAltRoundedIcon fontSize="inherit" />
               <p className="nav-text">Friends</p>
            </div>
         )}

         {interfaceNavigation === 'profile' ? (
            <Link to="/profile" style={{ textDecoration: 'none' }}>
               <div
                  className="interface-navigation-item"
                  style={{
                     color: 'white',
                     backgroundColor: '#e84545',
                     cursor: 'pointer',
                  }}
               >
                  <AccountBoxRoundedIcon fontSize="inherit" />
                  <p className="nav-text">Profile</p>
               </div>
            </Link>
         ) : (
            <Link to="/profile" style={{ textDecoration: 'none' }}>
               <div
                  className="interface-navigation-item"
                  style={{ color: 'white', cursor: 'pointer' }}
               >
                  <AccountBoxRoundedIcon fontSize="inherit" />
                  <p className="nav-text">Profile</p>
               </div>
            </Link>
         )}

         <div className="interface-navigation-item" style={{ color: 'white' }}>
            <EventAvailableRoundedIcon fontSize="inherit" />
            <p className="nav-text">Events</p>
         </div>

         <div className="interface-navigation-item" style={{ color: 'white' }}>
            <SettingsApplicationsRoundedIcon fontSize="inherit" />
            <p className="nav-text">Settings</p>
         </div>

         <div className="interface-navigation-item" style={{ color: 'white' }}>
            <HelpOutlineRoundedIcon fontSize="inherit" />
            <p className="nav-text">Help</p>
         </div>
      </div>
   )
}

export default Navigation
