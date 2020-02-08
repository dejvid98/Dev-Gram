import React from 'react'
import './LandingPage.css'
import RegisterButton from '../micro-components/RegisterButton'
import LoginButton from '../micro-components/LoginButton'
import Navbar from '../Layout/Navbar'

const LangdingPage = props => {
    return (
        <div className="parent-div">
            <Navbar />
            <div className="join-buttons">
                <RegisterButton />
                <LoginButton />
            </div>
        </div>
    )
}

export default LangdingPage
