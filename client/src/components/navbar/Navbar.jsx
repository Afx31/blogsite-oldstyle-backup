import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { getLinksFirstPostId } from '../../actions/post';

const Navbar = ({ auth: { isAuthenticated, user, loading }, logout }) => {
  const [civicLink, setCivicLink] = useState('');
  const [wagoLink, setWagoLink] = useState('');

  useEffect(() => {
    async function fetchData() {
      setCivicLink(await getLinksFirstPostId('civic'));
      setWagoLink(await getLinksFirstPostId('wago'));
    }
    fetchData();
  }, []);

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
    </ul>
  );

  return (
    <>
      <div className='cover-img-container'></div>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
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
              <Link to={`/viewpost/ef9/${civicLink}`} className='nav-link'>
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
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);