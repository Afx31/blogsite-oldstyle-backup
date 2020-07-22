import React, { useState } from 'react';
import './AuthPage.css';
import { Link, Redirect } from 'react-router-dom';
import { register } from '../../actions/auth';

const RegisterPage = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmpassword: '',
  });

  // destructered state for ease of access
  const { name, email, password, confirmpassword } = formData;

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = e => {
    e.preventDefault();

    if (password !== confirmpassword) {
      // setAlert('Passwords do not match', 'danger');
      console.log('Passwords dont match!');
    } else {
      register({ name, email, password });
      console.log('User has been registered');
      return <Redirect to='/homepage' />
    };
  };

  // if (isAuthenticated) {
  //   return <Redirect to='/homepage' />
  // }

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
        <h1 className='h3 mb-3 font-weight-normal'>Create Your Account</h1>
        <div className='form-group'>
          <input
            type='text'
            name='name'
            placeholder='Name'
            className='form-control'
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            name='email'
            placeholder='Email address'
            className='form-control'
            value={email}
            onChange={(e) => onChange(e)}
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
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            name='confirmpassword'
            placeholder='Confirm Password'
            className='form-control'
            value={confirmpassword}
            onChange={(e) => onChange(e)}
          />
        </div>
        <button type='submit' className='btn btn-lg btn-primary btn-block' value='Register'>
          Register
        </button>
        <p className=''>
          Already have an account? <Link to='/login'>Sign In</Link>
        </p>
        <p className='mt-5 mb-3 text-muted'>&copy; put something here</p>
      </form>
    </div>
  );
};

export default RegisterPage;
