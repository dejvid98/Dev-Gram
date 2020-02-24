import React, { useContext, useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import LandingPage from './components/LandingPage/LangdingPage'
import Register from './components/LandingPage/Register'
import Login from './components/LandingPage/LogIn'
import Profile from './components/Profile/Profile'
import HomePage from './components/HomePage/HomePage'
import { AppContext } from './Context'
import firebase from './firebase'

function App() {
    const { isLoggedInContext } = useContext(AppContext)
    const [isLoggedIn, setIsLoggedIn] = isLoggedInContext

    const checkIfLoggedIn = async () => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                setIsLoggedIn(true)
            } else {
                setIsLoggedIn(false)
            }
        })
    }

    useEffect(
        () => {
            checkIfLoggedIn()
        },
        // eslint-disable-next-line
        [isLoggedIn]
    )

    return (
        <Switch>
            <Route exact={true} path="/" component={LandingPage} />
            <Route exact={true} path="/home" component={() => <HomePage />} />

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
