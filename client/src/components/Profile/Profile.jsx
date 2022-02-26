import React, { useState, useEffect } from 'react';
import './Profile.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { editUser, deleteUser } from '../../actions/auth';

const Profile = ({ setAlert, editUser, deleteUser, auth: { loading, user } }) => {
  const [pwdChange, setPwdChange] = useState(false);
  const [btnText, setBtnText] = useState('Disabled');
  //const [userAvatar, setUserAvatar] = useState(user.avatar);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword1: '',
    newPassword2: ''
  });
  
  useEffect(() => {
    setFormData({
      name: loading || !user.name ? '' : user.name,
      email: loading || !user.email ? '' : user.email
    });
    //setUserAvatar(loading ? '../../img/coverImage.png' : user.avatar);
  }, [loading]);

  const {
    name,
    email,
    currentPassword,
    newPassword1,
    newPassword2
  } = formData;

  const handleCheckboxChange = (e) => {
    e.preventDefault();
    setPwdChange(!pwdChange);

    // Reset these fields so the pwd isn't updated if they enter a new one and then uncheck updating the pwd
    if (pwdChange) {
      formData.newPassword1 = '';
      formData.newPassword2 = '';
      setBtnText('Disabled');
    } else {
      setBtnText('Enabled');
    }
  };

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (newPassword1 !== newPassword2)
      setAlert('New passwords do not match', 'danger');
    else if (pwdChange === true)
      if (!newPassword1 || !newPassword2)
        setAlert('Please fill in empty fields', 'danger');
      else if (newPassword1.length <= 5 || newPassword2.length <= 5)
        setAlert('Please enter a new password with 6 or more characterssss', 'danger');
      else
        editUser(name, email, currentPassword, newPassword1);
    else
      editUser(name, email, currentPassword, newPassword1);
  };

  return (
    <div className='profile-container'>
      <div className='profile-inner-container'>
        <div className='avatar-img text-center'>
        {!loading && (
          <img className='profile-round-img' src={user.avatar} alt='' />
        )}
        </div>
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
              required
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
              required
            />
          </div>
          <div className='form-group'>
            <label>Current Password:</label>
            <input
              type='password'
              name='currentPassword'
              placeholder='Current Password..'
              value={currentPassword}
              className='form-control'
              onChange={(e) => handleInputChange(e)}
              required
            />
          </div>
          <div className='form-group mt-5 text-center'>
            <label>If you want to update your password fill out the form below, else leave it blank</label>
            <button
              type='button'
              name='checkPasswordChange'
              className='form-control btn-info btn-sm'
              onClick={(e) => handleCheckboxChange(e)}
            >
              Change Password - {btnText}
            </button>
          </div>
          <div className='form-group'>
            <label>New Password:</label>
            <input
              type='password'
              name='newPassword1'
              placeholder='New Password..'
              value={newPassword1}
              className='form-control'
              onChange={(e) => handleInputChange(e)}
              disabled={!pwdChange}
            />
          </div>
          <div className='form-group'>
            <label>Confirm New Password:</label>
            <input
              type='password'
              name='newPassword2'
              placeholder='Confirm New Password..'
              value={newPassword2}
              className='form-control'
              onChange={(e) => handleInputChange(e)}
              disabled={!pwdChange}
            />
          </div>
          <div className='form-group form-submit'>
            <input type='submit' className='btn btn-success my-1' />
          </div>
        </form>
        <div className='my-1 text-center'>
          <button className='btn btn-danger my-1' onClick={() => deleteUser()}>Delete Account</button>
        </div>
      </div>
    </div>
  )
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  editUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { setAlert, editUser, deleteUser })(Profile);