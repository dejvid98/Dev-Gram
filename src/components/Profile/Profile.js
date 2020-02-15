import React from 'react'
import Navbar from '../Layout/Navbar'
import './Profile.scss'
import Avatar from './Avatar'
import PersonalInfo from './PersonalInfo'

const Profile = () => {
    return (
        <div className="profile-parent">
            <Navbar />
            <div className="profile-settigs">
                <h1 className="profile-title">Profile settings</h1>
                <Avatar />
                <PersonalInfo />
            </div>
        </div>
    )
}

export default Profile
