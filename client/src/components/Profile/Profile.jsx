import React, { useState, useEffect } from 'react';
import './Profile.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editUser, deleteUser } from '../../actions/auth';

const Profile = ({ editUser, deleteUser, auth: { loading, user } }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar: '',
    password1: '',
    password2: ''
  });

  useEffect(() => {
    // setFormData({
    //   name: user.name,
    //   email: user.email,
    //   avatar: user.avatar,
    // });
  }, [loading]);

  const {
    name,
    email,
    avatar,
    password1,
    password2
  } = formData;

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
  };

  const handleDeleteAccount = (e) => {
    e.preventDefault();
  }

  return (
    <div className='profile-container'>
      <div className='profile-inner-container'>
        <h1>Profile: </h1>
        <form className='form' onSubmit={(e) => handleOnSubmit(e)}>
          <div className='form-group'>
          <label>Name:</label>
            <input
              type='text'
              name='name'
              placeholder='Name..'
              value={name}
              className='form-control'
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className='form-group'>
          <label>Email:</label>
           <input
              type='email'
              name='email'
              placeholder='Email..'
              value={email}
              className='form-control'
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className='form-group'>
          <label>Avatar:</label>
           <input
              type='text'
              name='avatar'
              placeholder='Avatar..'
              value={avatar}
              className='form-control'
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className='form-group'>
          <label>Password:</label>
           <input
              type='text'
              name='password1'
              placeholder='Password..'
              value={password1}
              className='form-control'
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className='form-group'>
          <label>Confirm Password:</label>
            <input
              type='text'
              name='password2'
              placeholder='Confirm Password..'
              value={password2}
              className='form-control'
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className='form-group form-submit'>
            <input type='submit' className='btn btn-success my-1' />
          </div>
        </form>
        <div className='my-1'>
        <button className='btn btn-danger my-1' onClick={() => deleteUser()}>Delete Account</button>
        </div>
        
      </div>
    </div>
  );
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  editUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { editUser, deleteUser })(Profile);
