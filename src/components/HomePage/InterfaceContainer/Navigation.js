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

const Navigation = props => {
    const { isMiniContext } = useContext(AppContext)
    //eslint-disable-next-line
    const [isMini, setIsMini] = isMiniContext

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
                <div>
                    <div
                        className="interface-navigation-item"
                        style={{
                            color: 'white',
                            backgroundColor: '#00adb5',
                        }}
                        onClick={() => handleNavigation('newsFeed')}
                    >
                        <HomeRoundedIcon fontSize="inherit" />
                        {isMini ? null : <p>News feed</p>}
                    </div>
                </div>
            ) : (
                <>
                    <div
                        className="interface-navigation-item"
                        style={{ color: 'white' }}
                        onClick={() => handleNavigation('newsFeed')}
                    >
                        <HomeRoundedIcon fontSize="inherit" />
                        {isMini ? null : <p>News feed</p>}
                    </div>
                </>
            )}
            {interfaceNavigation === 'messages' ? (
                <div
                    className="interface-navigation-item"
                    style={{ color: 'white', backgroundColor: '#00adb5' }}
                    onClick={() => handleNavigation('messages')}
                >
                    <MessageRoundedIcon fontSize="inherit" />
                    {isMini ? null : <p>Messages</p>}
                </div>
            ) : (
                <div
                    className="interface-navigation-item"
                    style={{ color: 'white' }}
                    onClick={() => handleNavigation('messages')}
                >
                    <MessageRoundedIcon fontSize="inherit" />
                    {isMini ? null : <p>Messages</p>}
                </div>
            )}

            <div
                className="interface-navigation-item"
                style={{ color: 'white' }}
            >
                <PhotoSizeSelectActualRoundedIcon fontSize="inherit" />
                {isMini ? null : <p>Photos</p>}
            </div>
            <div
                className="interface-navigation-item"
                style={{ color: 'white' }}
            >
                <PeopleAltRoundedIcon fontSize="inherit" />
                {isMini ? null : <p>Friends</p>}
            </div>

            <div
                className="interface-navigation-item"
                style={{ color: 'white' }}
            >
                <AccountBoxRoundedIcon fontSize="inherit" />
                {isMini ? null : <p>Profile</p>}
            </div>

            <div
                className="interface-navigation-item"
                style={{ color: 'white' }}
            >
                <EventAvailableRoundedIcon fontSize="inherit" />
                {isMini ? null : <p>Events</p>}
            </div>

            <div
                className="interface-navigation-item"
                style={{ color: 'white' }}
            >
                <SettingsApplicationsRoundedIcon fontSize="inherit" />
                {isMini ? null : <p>Settings</p>}
            </div>

            <div
                className="interface-navigation-item"
                style={{ color: 'white' }}
            >
                <HelpOutlineRoundedIcon fontSize="inherit" />
                {isMini ? null : <p>Help</p>}
            </div>
        </div>
    )
}

export default Navigation
