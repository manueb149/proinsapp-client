import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './containers/Dashboard';


function App() {
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route exact path='/' component={Login} /> 
          <Route exact path='/dashboard' component={Dashboard} />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
