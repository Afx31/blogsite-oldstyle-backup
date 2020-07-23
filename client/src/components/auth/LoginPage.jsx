import React, { useState } from 'react';
import './AuthPage.css';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../actions/auth';

const LoginPage = (props) => {
  const [redirectPage, setRedirectPage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  // Deconstruction state for ease of access
  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result === 'success') {
      setRedirectPage('/');
    }
  };

  return (
    <div className = 'register-container text-center'>
      <form className='form-signin' onSubmit={(e) => onSubmit(e)}>
        <img
          className='mb-4'
          src = {require('./bootstrap-solid.svg')}
          alt=''
          width='72'
          height='72'
        />
        <h1 className='h3 mb-3 font-weight-normal'>Please sign in</h1>
        <div className='form-group'>
          <input
            type='email'
            name='email'
            placeholder='Email address'
            className='form-control'
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            name='password'
            placeholder='Password'
            className='form-control'
            value={password}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='checkbox mb-3'>
          <label>
            <input type='checkbox' value='remember-me' /> Remember me
          </label>
        </div>
        <button type='submit' className='btn btn-lg btn-primary btn-block' value='Login' >
          Login
        </button>        
        <p className=''>
          Don't have an account? <Link to='/register'>Sign up</Link>
        </p>
        <p className='mt-5 mb-3 text-muted'>&copy; put something here</p>
      </form>
      {redirectPage && <Redirect push to={redirectPage}/>}
    </div>
  )
};

export default LoginPage;
