import React from 'react';
import LandingPage from './components/landing-page/LangdingPage';
import { Route, Switch } from "react-router-dom";
import Register from './components/landing-page/Register';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact={true} path="/" component={LandingPage}/>
        <Route exact={true} path="/register" component={Register} />
      </Switch>
    </div>
  );
}

export default App;
