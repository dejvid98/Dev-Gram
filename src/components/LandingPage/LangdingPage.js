import React, { useContext } from 'react'

import './LandingPage.scss'
import RegisterButton from '../MicroComponents/RegisterButton'
import LoginButton from '../MicroComponents/LoginButton'
import LoggedInNavbar from '../Layout/LoggedInNavbar'
import LoggedOutNavbar from '../Layout/LoggedOutNavbar'
import { AppContext } from '../../Context'

const LangdingPage = props => {
    const { isLoggedInContext } = useContext(AppContext)
    //eslint-disable-next-line
    const [isLoggedIn, setIsLoggedIn] = isLoggedInContext

    return (
        <div className="parent-div">
            {isLoggedIn ? <LoggedInNavbar /> : <LoggedOutNavbar />}
            {isLoggedIn ? null : (
                <div className="join-buttons">
                    <RegisterButton />
                    <LoginButton />
                </div>
            )}
        </div>
    )
}

export default LangdingPage
