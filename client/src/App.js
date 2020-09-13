import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './components/homepage/HomePage';
import Footer from './components/Footer/Footer';
import Routes from './components/routing/Routes';
import ScrollTopArrow from './components/layout/ScrollTopArrow';

// Redux
//   Provider connects React & Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
};

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route component={Routes} />
        </Switch>
      </Router>
      <ScrollTopArrow />
      <Footer />
    </Provider>
  );
}

export default App;