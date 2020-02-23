import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'
import MessageRoundedIcon from '@material-ui/icons/MessageRounded'
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded'
import EventAvailableRoundedIcon from '@material-ui/icons/EventAvailableRounded'
import SettingsApplicationsRoundedIcon from '@material-ui/icons/SettingsApplicationsRounded'
import PhotoSizeSelectActualRoundedIcon from '@material-ui/icons/PhotoSizeSelectActualRounded'
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded'
import HelpOutlineRoundedIcon from '@material-ui/icons/HelpOutlineRounded'
import { AppContext } from '../../../Context'

const Navigation = props => {
    const { isMiniContext } = useContext(AppContext)
    //eslint-disable-next-line
    const [isMini, setIsMini] = isMiniContext

    return (
        <div className="interface-navigation">
            {props.markedElement === 'newsFeed' ? (
                <div>
                    <Link to="/home" style={{ textDecoration: 'none' }}>
                        <div
                            className="interface-navigation-item"
                            style={{
                                color: 'white',
                                backgroundColor: '#00adb5',
                            }}
                        >
                            <HomeRoundedIcon fontSize="inherit" />
                            {isMini ? null : <p>News feed</p>}
                        </div>
                    </Link>
                </div>
            ) : (
                <>
                    <Link
                        to="/home"
                        style={{
                            textDecoration: 'none',
                        }}
                    >
                        <div
                            className="interface-navigation-item"
                            style={{ color: 'white' }}
                        >
                            <HomeRoundedIcon fontSize="inherit" />
                            {isMini ? null : <p>News feed</p>}
                        </div>
                    </Link>
                </>
            )}

            <Link to="/message" style={{ textDecoration: 'none' }}>
                <div
                    className="interface-navigation-item"
                    style={{ color: 'white' }}
                >
                    <MessageRoundedIcon fontSize="inherit" />
                    {isMini ? null : <p>Messages</p>}
                </div>
            </Link>

            <Link to="/photos" style={{ textDecoration: 'none' }}>
                <div
                    className="interface-navigation-item"
                    style={{ color: 'white' }}
                >
                    <PhotoSizeSelectActualRoundedIcon fontSize="inherit" />
                    {isMini ? null : <p>Photos</p>}
                </div>
            </Link>

            <Link to="/friends" style={{ textDecoration: 'none' }}>
                <div
                    className="interface-navigation-item"
                    style={{ color: 'white' }}
                >
                    <PeopleAltRoundedIcon fontSize="inherit" />
                    {isMini ? null : <p>Friends</p>}
                </div>
            </Link>

            <Link to="/profile" style={{ textDecoration: 'none' }}>
                <div
                    className="interface-navigation-item"
                    style={{ color: 'white' }}
                >
                    <AccountBoxRoundedIcon fontSize="inherit" />
                    {isMini ? null : <p>Profile</p>}
                </div>
            </Link>

            <Link to="/events" style={{ textDecoration: 'none' }}>
                <div
                    className="interface-navigation-item"
                    style={{ color: 'white' }}
                >
                    <EventAvailableRoundedIcon fontSize="inherit" />
                    {isMini ? null : <p>Events</p>}
                </div>
            </Link>

            <Link to="/settings" style={{ textDecoration: 'none' }}>
                <div
                    className="interface-navigation-item"
                    style={{ color: 'white' }}
                >
                    <SettingsApplicationsRoundedIcon fontSize="inherit" />
                    {isMini ? null : <p>Settings</p>}
                </div>
            </Link>

            <Link to="/help" style={{ textDecoration: 'none' }}>
                <div
                    className="interface-navigation-item"
                    style={{ color: 'white' }}
                >
                    <HelpOutlineRoundedIcon fontSize="inherit" />
                    {isMini ? null : <p>Help</p>}
                </div>
            </Link>
        </div>
    )
}

export default Navigation
