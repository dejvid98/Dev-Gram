import React from 'react'

import NavBarButton from '../MicroComponents/NavBarButton'
import './Navbar.scss'

const Navbar = props => {


    return (
        <div className="logged-out-navbar" style={{ height: '1rem' }}>
            <NavBarButton name="Home" link="/" />
            <NavBarButton name="About Us" link="/aboutus" />
            <NavBarButton name="Contact Us" link="/help" />
        </div>
    )
}

export default Navbar
