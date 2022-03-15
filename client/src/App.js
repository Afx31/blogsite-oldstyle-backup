import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './components/HomePage/HomePage';
import Footer from './components/Footer/Footer';
import Routes from './components/Routing/Routes';
import ScrollTopArrow from './components/Layout/ScrollTopArrow';
import { LOGOUT } from './actions/types';
import {ThemeContext} from './contexts/ThemeContext';

// Redux:  Provider connects React & Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

const App = () => {
  const [darkMode] = useContext(ThemeContext);

  useEffect(() => {
    // check for token in LS
    if (localStorage.token)
      setAuthToken(localStorage.token);
    
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token)
        store.dispatch({ type: LOGOUT });
    });
  }, []);
  
  return (
    <Provider store={store}>
      <div className={`App ${darkMode ? 'darkmode' : 'lightmode'}`}>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route component={Routes} />
          </Switch>
        </Router>
        <ScrollTopArrow />
        <Footer />
      </div>
    </Provider>
  )
};

export default App;