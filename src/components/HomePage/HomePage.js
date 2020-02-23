import React from 'react'
import Navbar from '../Layout/Navbar'
import MainContainer from './MainContainer/Main'
import Interface from './InterfaceContainer/Interface'
import SideContainer from './SideContainer/Side'
import './HomePage.scss'

const HomePage = () => {
    return (
        <div>
            <Navbar />
            <div className="container-wrapper">
                <Interface id="interface-container" />
                <MainContainer id="main-container" />
                <SideContainer id="side-container" />
            </div>
        </div>
    )
}

export default HomePage
