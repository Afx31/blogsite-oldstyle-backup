import React from 'react';
import './AuthPage.css';
//import { Link, Redirect, useHistory } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const ResetPwdConfirmaPage = () => {
  var history = useHistory();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    history.push('/login')
  }
 
  return (
    <form className='form-signin' onSubmit={(e) => handleOnSubmit(e)}>
      <h1 className='h3 mb-3 font-weight-normal text-center'>Your password will be reset</h1>
      <p className='text-center'>Don't worry, it happens to the best of us.</p>
      <p className='text-center'>"""Type some form of message here explaining what will happen"""</p>
      <button type='submit' className='btn btn-lg btn-primary btn-block ' value='Submit' >
        Take me back to login page
      </button>
    </form>
  );
}

export default ResetPwdConfirmaPage;