import React, { useContext } from 'react'

import NavBarButton from '../MicroComponents/NavBarButton'
import './Navbar.scss'
import { AppContext } from '../../Context'
import firebase from '../../firebase'

const Navbar = props => {
    const auth = firebase.auth()
    const { isLoggedInContext } = useContext(AppContext)
    //eslint-disable-next-line
    const [isLoggedIn, setIsLoggedIn] = isLoggedInContext

    const stateToSessionStorage = state => {
        sessionStorage.setItem('isLoggedIn', state)
    }

    const logOut =async  () => {
        stateToSessionStorage(false)
        setIsLoggedIn(false)
        auth.signOut()
    }

    return (
        <div className="logged-in-navbar" style={{ height: '1rem' }}>
            <NavBarButton name="Home" link="/" />
            <NavBarButton name="About Us" link="/aboutus" />
            <NavBarButton name="Contact Us" link="/help" />
            <NavBarButton name="Profile" link="/profile" />
            <NavBarButton name="Log Out" link="/" logOut={logOut} />
        </div>
    )
}

export default Navbar
