import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul className='nav navbar-nav ml-auto'>
      <li className='navbar-item'>
        <Link to='/create-post' className='nav-link'>
          <button className='btn btn-sm btn-success' onClick={logout}>
            Create a Post
          </button>
        </Link>
      </li>
      <li className='navbar-item'>
        <Link to='/' className='nav-link'>
          <button className='btn btn-sm btn-primary' onClick={logout}>
            Logout
          </button>
        </Link>
      </li>
    </ul>
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
    </ul>
  );

  return (
    <>
      <div className='cover-img-container'>
        <img
          src={require('../../img/cover.jpg')}
          className='img-fluid cover-img'
          alt='Responsive'
        />
      </div>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        {/* <a className='navbar-brand' href='#'>
        Navbar
      </a> */}
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='navbar-collapse collapse' id='navbarNav'>
          <ul className='nav navbar-nav'>
            <li className='nav-item'>
              <Link to='/' className='nav-link'>
                Home <span className='sr-only'>(current)</span>
              </Link>
            </li>
          </ul>
          <ul className='nav navbar-nav navbar-center'>
            <li className='nav-item'>
              <Link to='/civic' className='nav-link'>
                Civic
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/wago'
                className='nav-link disabled'
                tabIndex='-1'
                aria-disabled='true'
              >
                Wago
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/frogo'
                className='nav-link disabled'
                tabindex='-1'
                aria-disabled='true'
              >
                Frogo
              </Link>
            </li>
          </ul>
          {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
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
