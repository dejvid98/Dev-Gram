import React from 'react'

const UserProfile = () => {
    let photoURL =
        'https://pngimage.net/wp-content/uploads/2018/06/no-avatar-png-8.png'

    return (
        <div className="user-profile">
            <div className="profile-photo-interface">
                <img src={photoURL} id="avatarPhoto" alt="profile" />
            </div>
            <p className="user-name-interface">David Sucur</p>
        </div>
    )
}

export default UserProfile
