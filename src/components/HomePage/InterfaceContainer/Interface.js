import React from 'react'
import UserProfile from './UserProfile'
import Navigation from './Navigation'

const Interface = () => {
    return (
        <div id="interface-container">
            <UserProfile />
            <hr className="hr-interface" />
            <Navigation />
        </div>
    )
}

export default Interface
