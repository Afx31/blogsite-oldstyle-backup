import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <>
    <div className='cover-img-container'>
      <img src={require("../../img/cover.jpg")} className="img-fluid cover-img" alt="Responsive image" />  
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
      <div className='collapse navbar-collapse' id='navbarNav'>
        <ul className='navbar-nav'>
          <li className='nav-item active'>
            <Link to='/' className='nav-link'>
              Home <span className='sr-only'>(current)</span>
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/civic' className='nav-link'>
              Civic
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/wago'
              className='nav-link disabled'
              tabIndex= '-1'
              aria-disabled='true'
            >
              Wago
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/frogo'
              className='nav-link disabled'             
              tabindex='-1'
              aria-disabled='true'
            >
              Frogo
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/about' className='nav-link'>
              About Me
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/contact' className='nav-link'>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
    </>
  );
};

export default Navbar;
