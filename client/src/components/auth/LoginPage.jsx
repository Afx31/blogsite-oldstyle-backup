import React from 'react';
import './AuthPage.css';
import { Link, Redirect } from 'react-router-dom';

const LoginPage = () => {

  return (
    <div className = 'register-container text-center'>
      <form className='form-signin'>
        <img
          className='mb-4'
          src = {require('./bootstrap-solid.svg')}
          alt=''
          width='72'
          height='72'
        />
        <h1 className='h3 mb-3 font-weight-normal'>Please sign in</h1>
        <label for='inputEmail' className='sr-only'>
          Email address
        </label>
        <input
          type='email'
          id='inputEmail'
          className='form-control'
          placeholder='Email address'
          required
          autofocus
        />
        <label for='inputPassword' className='sr-only'>
          Password
        </label>
        <input
          type='password'
          id='inputPassword'
          className='form-control'
          placeholder='Password'
          required
        />
        <div className='checkbox mb-3'>
          <label>
            <input type='checkbox' value='remember-me' /> Remember me
          </label>
        </div>
        <button className='btn btn-lg btn-primary btn-block' type='submit'>
          Sign in
        </button>        
        <p className=''>
          Don't have an account? <Link to='/register'>Sign up</Link>
        </p>
        <p className='mt-5 mb-3 text-muted'>&copy; put something here</p>
      </form>
    </div>
  )
};

export default LoginPage;
