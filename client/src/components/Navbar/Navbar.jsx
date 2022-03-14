import React, { useState, useEffect, useContext } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { getLinksFirstPostId } from '../../actions/post';
import { ThemeContext } from '../../contexts/ThemeContext';

const Navbar = ({ auth: { isAuthenticated, user, loading }, logout }) => {
  const [civicLink, setCivicLink] = useState('');
  const [wagoLink, setWagoLink] = useState('');
  const [darkMode, setDarkMode] = useContext(ThemeContext);

  useEffect(() => {
    async function fetchData() {
      setCivicLink(await getLinksFirstPostId('civic'));
      setWagoLink(await getLinksFirstPostId('wago'));
    }
    fetchData();
  }, []);

  const darkModeBtn = (
    <div className={`themeBtn-container ${darkMode ? 'themeBtn-darkmode' : ''} ${darkMode ? 'themeBtn-active' : ''}`} onClick={() => setDarkMode(!darkMode)}>
      <div className='themeBtn-button'>
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' className='feather feather-moon themeBtn-icon'>
          <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'></path>
        </svg>
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' className='feather feather-sun themeBtn-icon'>
          <circle cx='12' cy='12' r='5'></circle><line x1='12' y1='1' x2='12' y2='3'></line><line x1='12' y1='21' x2='12' y2='23'></line><line x1='4.22' y1='4.22' x2='5.64' y2='5.64'></line><line x1='18.36' y1='18.36' x2='19.78' y2='19.78'></line><line x1='1' y1='12' x2='3' y2='12'></line><line x1='21' y1='12' x2='23' y2='12'></line><line x1='4.22' y1='19.78' x2='5.64' y2='18.36'></line><line x1='18.36' y1='5.64' x2='19.78' y2='4.22'></line>
        </svg>
      </div>
    </div>
  );

  const guestLinks = (
    <ul className='nav navbar-nav ml-auto'>
      <li className='navbar-item'>
        <Link to='/login' className='nav-link'>
          <button className='btn btn-sm btn-success'>Log in</button>
        </Link>
      </li>
      <li className='navbar-item'>
        <Link to='/register' className='nav-link'>
          <button className='btn btn-sm btn-primary'>Sign up</button>
        </Link>
      </li>
      <li className='navbar-item'>
        <div className='nav-link nav-link-padding'>
          {darkModeBtn}
        </div>
      </li>
    </ul>
  );

  const userLinks = (
    <ul className='nav navbar-nav ml-auto'>
      <li className='navbar-item'>
        <Link to='/profile' className='nav-link'>
          <button className='btn btn-sm btn-success'>Profile</button>
        </Link>
      </li>
      <li className='navbar-item'>
        <Link to='/' className='nav-link'>
          <button className='btn btn-sm btn-primary' onClick={logout}>Logout</button>
        </Link>
      </li>
      <li className='navbar-item'>
        <div className='nav-link'>
          {darkModeBtn}
        </div>
      </li>
    </ul>
  );

  const adminLinks = (
    <ul className='nav navbar-nav ml-auto'>
      <li className='navbar-item'>
        <Link to='/create-post' className='nav-link'>
          <button className='btn btn-sm btn-success'>Create a Post</button>
        </Link>
      </li>
      <li className='navbar-item'>
        <Link to='/' className='nav-link'>
          <button className='btn btn-sm btn-primary' onClick={logout}>Logout</button>
        </Link>
      </li>
      <li className='navbar-item'>
        <div className='nav-link'>
          {darkModeBtn}
        </div>
      </li>
    </ul>
  );

  return (
    <>
      <div className='cover-img-container'></div>
      <nav className='navbar navbar-expand-lg navbar-dark'>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarCollapse'
          aria-controls='navbarCollapse'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='navbar-collapse collapse' id='navbarCollapse'>
          <ul className='nav navbar-nav'>
            <li className='nav-item'>
              <Link to='/' className='nav-link'>
                <i className='fas fa-home fa-2x'></i>
              </Link>
            </li>
          </ul>
          <ul className='nav navbar-nav navbar-center'>
            <li>
              <Link to={`/viewpost/civic/${civicLink}`} className='nav-link'>
                Civic
              </Link>
            </li>
            <li>
              <Link to={`/viewpost/wago/${wagoLink}`} className='nav-link'>
                Wago
              </Link>
            </li>
            <li>
              <Link to={`/viewpost/frogo/${civicLink}`} className='nav-link'>
                Frogo
              </Link>
            </li>
            <li>
              <Link to={`/viewpost/EF9/${civicLink}`} className='nav-link'>
                EF9
              </Link>
            </li>
          </ul>
          {/* {!loading && <>{isAuthenticated ? userLinks : guestLinks}</>} */}
          {!loading && (
            <>
              {' '}
              {isAuthenticated && user.userType === 'admin' ? adminLinks
                : isAuthenticated && user.userType === 'user' ? userLinks
                : guestLinks}{' '}
            </>
          )}
        </div>
      </nav>
    </>
  )
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);