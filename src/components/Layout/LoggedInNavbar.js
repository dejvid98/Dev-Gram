import React, { useContext } from 'react'
import NavBarButton from '../MicroComponents/NavBarButton'
import './Navbar.scss'
import { AppContext } from '../../Context'
import firebase from '../../firebase'
import NavLogo from '../MicroComponents/NavLogo'

const Navbar = props => {
    const auth = firebase.auth()
    const { isLoggedInContext } = useContext(AppContext)
    //eslint-disable-next-line
    const [isLoggedIn, setIsLoggedIn] = isLoggedInContext

    const stateToSessionStorage = state => {
        sessionStorage.setItem('isLoggedIn', state)
    }

    const logOut = () => {
        stateToSessionStorage(false)
        setIsLoggedIn(false)
        auth.signOut()
    }

    return (
        <div className="nav-wrapper">
            <div className="logged-in-navbar" style={{ height: '1rem' }}>
                <NavLogo/>
                <NavBarButton name="Home" link="/" />
                <NavBarButton name="About Us" link="/aboutus" />
                <NavBarButton name="Contact Us" link="/help" />
                <NavBarButton name="Profile" link="/profile" />
                <NavBarButton name="Log Out" link="/" logOut={logOut} />
            </div>
        </div>
    )
}

export default Navbar
