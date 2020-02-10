import React, { useContext, useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import LandingPage from './components/LandingPage/LangdingPage'
import Register from './components/LandingPage/Register'
import Login from './components/LandingPage/LogIn'
import { AppContext } from './Context'

function App() {
    const { isLoggedInContext } = useContext(AppContext)
    //eslint-disable-next-line
    const [isLoggedIn, setIsLoggedIn] = isLoggedInContext

    const getSessionUser = async () => {
        const userData = await sessionStorage.getItem('isLoggedIn')
        setIsLoggedIn(userData)
    }

    useEffect(() => {
        getSessionUser();
    }, [])

    return (
        <Switch>
            <Route exact={true} path="/" component={LandingPage} />
            <Route exact={true} path="/register">
                {isLoggedIn ? <Redirect exact to="/" /> : <Register />}
            </Route>
            <Route exact={true} path="/login">
                {isLoggedIn ? <Redirect exact to="/" /> : <Login />}
            </Route>
        </Switch>
    )
}

export default App
