import React, { useContext, useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import LandingPage from './components/LandingPage/LangdingPage'
import Register from './components/LandingPage/Register'
import Login from './components/LandingPage/LogIn'
import Profile from './components/Profile/Profile'
import HomePage from './components/HomePage/HomePage'
import LikedPosts from './components/LikedPosts'
import { AppContext } from './Context'

function App() {
    const { isLoggedInContext } = useContext(AppContext)
    const [isLoggedIn, setIsLoggedIn] = isLoggedInContext

    // Checks in session storage if user is logged in
    const getSessionUser = async () => {
        const userData = await sessionStorage.getItem('isLoggedIn')
        setIsLoggedIn(userData)
    }

    useEffect(
        () => {
            getSessionUser()
        },
        // eslint-disable-next-line
        []
    )

    return (
        <Switch>
            <Route exact={true} path="/" component={LandingPage} />
            <Route exact={true} path="/home" component={HomePage} />
            <Route exact={true} path="/likedposts" component={LikedPosts} />

            <Route exact={true} path="/register">
                {isLoggedIn ? <Redirect exact to="/" /> : <Register />}
            </Route>
            <Route exact={true} path="/login">
                {isLoggedIn ? <Redirect exact to="/" /> : <Login />}
            </Route>
            <Route exact={true} path="/profile">
                {isLoggedIn ? <Profile /> : <Redirect exact to="/" />}
            </Route>
        </Switch>
    )
}

export default App
