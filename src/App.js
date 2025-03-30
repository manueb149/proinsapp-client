import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login/Login';
// import Dashboard from './containers/Dashboard';
import AlertState from './contexts/alerts/alertState';
import AuthState from './contexts/auth/authState';
import tokenAuth from './config/token';
// import PrivateRoute from './components/utils/PrivateRoute';


function App() {

  // Revisar si tenemos un token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      tokenAuth(token);
    }
  }, [])

  return (
    <AlertState>
      <AuthState>
        <Router>
          <Switch>
            <Route exact path='*' component={Login} />
            {/* <PrivateRoute exact path='/dashboard' component={Dashboard} /> */}
          </Switch>
        </Router>
      </AuthState>
    </AlertState>

  );
}

export default App;
