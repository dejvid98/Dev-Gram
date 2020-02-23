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
                <div
                    className="interface-navigation-item"
                    style={{ color: 'white' }}
                >
                    <HomeRoundedIcon fontSize="inherit" />
                    <p>News feed</p>
                </div>
            </Link>

            <Link to="/message" style={{ textDecoration: 'none' }}>
                <div
                    className="interface-navigation-item-second"
                    style={{ color: 'white' }}
                >
                    <MessageRoundedIcon fontSize="inherit" />
                    <p>Messages</p>
                </div>
            </Link>

            <Link to="/photos" style={{ textDecoration: 'none' }}>
                <div
                    className="interface-navigation-item"
                    style={{ color: 'white' }}
                >
                    <PhotoSizeSelectActualRoundedIcon fontSize="inherit" />
                    <p>Photos</p>
                </div>
            </Link>

            <Link to="/friends" style={{ textDecoration: 'none' }}>
                <div
                    className="interface-navigation-item-second"
                    style={{ color: 'white' }}
                >
                    <PeopleAltRoundedIcon fontSize="inherit" />
                    <p>Friends</p>
                </div>
            </Link>

            <Link to="/profile" style={{ textDecoration: 'none' }}>
                <div
                    className="interface-navigation-item"
                    style={{ color: 'white' }}
                >
                    <AccountBoxRoundedIcon fontSize="inherit" />
                    <p>Profile</p>
                </div>
            </Link>

            <Link to="/events" style={{ textDecoration: 'none' }}>
                <div
                    className="interface-navigation-item-second"
                    style={{ color: 'white' }}
                >
                    <EventAvailableRoundedIcon fontSize="inherit" />
                    <p>Events</p>
                </div>
            </Link>

            <Link to="/settings" style={{ textDecoration: 'none' }}>
                <div
                    className="interface-navigation-item"
                    style={{ color: 'white' }}
                >
                    <SettingsApplicationsRoundedIcon fontSize="inherit" />
                    <p>Settings</p>
                </div>
            </Link>

            <Link to="/help" style={{ textDecoration: 'none' }}>
                <div
                    className="interface-navigation-item-second"
                    style={{ color: 'white' }}
                >
                    <HelpOutlineRoundedIcon fontSize="inherit" />
                    <p>Help</p>
                </div>
            </Link>
        </div>
    )
}

export default Navigation
