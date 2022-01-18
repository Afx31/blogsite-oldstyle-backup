import React, { useState } from 'react';
import './AuthPage.css';
import { useHistory } from 'react-router-dom';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types'
// import { login } from '../../actions/auth';

const secretQuestionList = [
  `What is your mother's name?`,
  `What was your first pet?`,
  `What was your childhood nickname?`,
  `In what city were you born?`,
  `What was the model of your first car?`
];

const ResetPwdPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    question: '',
    answer: ''
  });
  const { email, answer } = formData;
  var history = useHistory();

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    history.push('/resetpwdconfirm');

    // --- ToDo ---
    // It will email the support email with the below email address + secret question/answer
    // Probably call a separate method here, where the method will do the email sending
  };

  return (
    <form className='form-container' onSubmit={(e) => handleOnSubmit(e)}>
      <div className='form-signin'>
        <h1 className='h3 mb-3 font-weight-normal text-center'>Reset Password</h1>
        <p className='text-center'>Don't worry, it happens to the best of us.</p>
        <p className='text-center'>"""Type some form of message here explaining what will happen"""</p>
        <div className='form-group'>
          <label>Email Address:</label>
          <input
            type='email'
            name='email'
            placeholder='e.g. email@gmail.com'
            className='form-control'
            value={email}
            onChange={(e) => handleInputChange(e)}
            required
          />        
        </div>
        <div className='form-group'>
          <label>Secret Question:</label>
          <select className='form-control' name='question' onChange={(e) => handleInputChange(e)}>
            {secretQuestionList.map((post) => {
              return ( <option value={post}>{post}</option> )
            })}
          </select>
        </div>
        <div className='form-group'>
          <label>Secret Question Answer:</label>
          <input
            type='text'
            name='answer'
            placeholder='Your secret question answer..'
            className='form-control'
            value={answer}
            onChange={(e) => handleInputChange(e)}
            required
          />
        </div>
        <button type='submit' className='btn btn-lg btn-primary btn-block ' value='Submit' >
          Submit Password Reset Request
        </button>
      </div>
    </form>
  );
}

export default ResetPwdPage;