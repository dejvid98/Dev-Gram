import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { ContextProvider } from './Context'
import LandingPage from './components/LandingPage/LangdingPage'
import Register from './components/LandingPage/Register'
import Login from './components/LandingPage/LogIn'


function App() {
    return (
        <ContextProvider>
            <Switch>
                <Route exact={true} path="/" component={LandingPage} />
                <Route exact={true} path="/register" component={Register} />
                <Route exact={true} path="/login" component={Login} />
            </Switch>
        </ContextProvider>
    )
}

export default App
