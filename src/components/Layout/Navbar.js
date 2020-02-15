import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import NavBarButton from '../MicroComponents/NavBarButton'
import './Navbar.scss'
import { AppContext } from '../../Context'
import firebase from '../../firebase'
import NavLogoImg from '../../Assets/LandingPage/NavLogo.svg'

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
                <div className="nav-logo-img">
                    <Link to="/">
                        <img
                            className="nav-logo-img"
                            src={NavLogoImg}
                            alt="logo"
                        />
                    </Link>
                </div>

                <NavBarButton name="Home" link="/home" />
                <NavBarButton name="About Us" link="/aboutus" />
                <NavBarButton name="Contact Us" link="/help" />
                {isLoggedIn ? (
                    <>
                        <NavBarButton name="Profile" link="/profile" />
                        <NavBarButton name="Log Out" link="/" logOut={logOut} />
                    </>
                ) : (
                    <NavBarButton name="Login" link="/login" />
                )}
            </div>
        </div>
    )
}

export default Navbar
