import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './LandingPage.scss'
import Navbar from '../Layout/Navbar'
import { AppContext } from '../../Context'
import { Button } from '@material-ui/core'

const LangdingPage = props => {
    const { isLoggedInContext } = useContext(AppContext)
    //eslint-disable-next-line
    const [isLoggedIn, setIsLoggedIn] = isLoggedInContext

    return (
        <div className="parent-div">
            <Navbar />
            {isLoggedIn ? null : (
                <div className="join-buttons">
                    <Link to="/register" style={{ textDecoration: 'none' }}>
                        <Button
                            className="join-button"
                            variant="contained"
                            style={{
                                backgroundColor: '#1DE9B6',
                                height: '4rem',
                                borderRadius: '2rem',
                                fontSize: '2rem',
                                textAlign: 'center',
                                color: 'white',
                                width: '13rem',
                            }}
                        >
                            JOIN US
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default LangdingPage
