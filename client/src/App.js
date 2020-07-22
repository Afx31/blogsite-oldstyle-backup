import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import HomePage from './components/homepage/HomePage';
import RegisterPage from './components/auth/RegisterPage.jsx';
import LoginPage from './components/auth/LoginPage.jsx';

// Redux
// import { Provider } from 'react-redux';
// import store from './store';
// import { loadUser } from './actions/auth';
// import setAuthToken from './utils/setAuthToken';

function App() {
  return (
    // <Provider store={store}>
      <Router>
        {/* <Navbar /> */}
        <Switch>
          {/* <Route exact path='/' component={HomePage} /> */}
          <Route exact path='/' component={RegisterPage} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/homepage' component={HomePage} />
        </Switch>
      </Router>
    // </Provider>
  );
}

export default App;