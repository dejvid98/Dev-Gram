import React from 'react'

import NavBarButton from '../MicroComponents/NavBarButton'
import './Navbar.scss'
import NavLogo from '../MicroComponents/NavLogo'

const Navbar = props => {
    return (
        <div className="nav-wrapper">
            <div className="logged-out-navbar" style={{ height: '1rem' }}>
                <NavLogo/>
                <NavBarButton name="Home" link="/" />
                <NavBarButton name="About Us" link="/aboutus" />
                <NavBarButton name="Contact Us" link="/help" />
            </div>
        </div>
    )
}

export default Navbar
