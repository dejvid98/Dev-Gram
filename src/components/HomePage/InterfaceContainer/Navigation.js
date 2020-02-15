import React from 'react'
import { Link } from 'react-router-dom'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'
import MessageRoundedIcon from '@material-ui/icons/MessageRounded'
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded'
import EventAvailableRoundedIcon from '@material-ui/icons/EventAvailableRounded'
import SettingsApplicationsRoundedIcon from '@material-ui/icons/SettingsApplicationsRounded'
import PhotoSizeSelectActualRoundedIcon from '@material-ui/icons/PhotoSizeSelectActualRounded'
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded'
import HelpOutlineRoundedIcon from '@material-ui/icons/HelpOutlineRounded'

const Navigation = () => {
    return (
        <div className="interface-navigation">
            <Link to="/home" style={{ textDecoration: 'none' }}>
                <div className="interface-navigation-item">
                    <HomeRoundedIcon fontSize="inherit" color="action" />
                    <p>News feed</p>
                </div>
            </Link>

            <Link to="/message" style={{ textDecoration: 'none' }}>
                <div className="interface-navigation-item-second">
                    <MessageRoundedIcon fontSize="inherit" color="action" />
                    <p>Messages</p>
                </div>
            </Link>

            <Link to="/photos" style={{ textDecoration: 'none' }}>
                <div className="interface-navigation-item">
                    <PhotoSizeSelectActualRoundedIcon
                        fontSize="inherit"
                        color="action"
                    />
                    <p>Photos</p>
                </div>
            </Link>

            <Link to="/friends" style={{ textDecoration: 'none' }}>
                <div className="interface-navigation-item-second">
                    <PeopleAltRoundedIcon fontSize="inherit" color="action" />
                    <p>Friends</p>
                </div>
            </Link>

            <Link to="/profile" style={{ textDecoration: 'none' }}>
                <div className="interface-navigation-item">
                    <AccountBoxRoundedIcon fontSize="inherit" color="action" />
                    <p>Profile</p>
                </div>
            </Link>

            <Link to="/events" style={{ textDecoration: 'none' }}>
                <div className="interface-navigation-item-second">
                    <EventAvailableRoundedIcon
                        fontSize="inherit"
                        color="action"
                    />
                    <p>Events</p>
                </div>
            </Link>

            <Link to="/settings" style={{ textDecoration: 'none' }}>
                <div className="interface-navigation-item">
                    <SettingsApplicationsRoundedIcon
                        fontSize="inherit"
                        color="action"
                    />
                    <p>Settings</p>
                </div>
            </Link>

            <Link to="/help" style={{ textDecoration: 'none' }}>
                <div className="interface-navigation-item-second">
                    <HelpOutlineRoundedIcon fontSize="inherit" color="action" />
                    <p>Help</p>
                </div>
            </Link>
        </div>
    )
}

export default Navigation
