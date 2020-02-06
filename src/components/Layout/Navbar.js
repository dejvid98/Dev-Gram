import React from 'react'
import NavBarButton from "../micro-components/NavBarButton";
import './Navbar.css';


const Navbar = (props) => {
    return (
      <div className="navbar">
        <div className="logo"/>
        <NavBarButton name="Home" link="/" />
        <NavBarButton name="About Us" link="/aboutus" />
        <NavBarButton name="Contact Us" link="/help" />
      </div>
    );
}

export default Navbar
