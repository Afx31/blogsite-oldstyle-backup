import React, { useState } from 'react';
import './Comments.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../../actions/post';

const CommentForm = ({ auth: { isAuthenticated, loading }, postId, addComment }) => {
  const [text, setText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    addComment(postId, { text });
    setText('');
  };

  const authForm = (
    <>
      <textarea
        className='comment-textarea'
        name='text'
        rows='5'
        placeholder='Enter your comment here...'
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <input type='submit' className='btn btn-success my-1' value='Submit' />
    </>
  );

  const guestForm = (
    <>
      <h5>Please make an account to leave a comment</h5>
      <textarea
        className='comment-textarea'
        name='text'
        rows='5'
        placeholder='Enter your comment here...'
        disabled
      />
      <input type='submit' className='btn btn-success my-1' disabled />
    </>
  );

  return (
    <div className='post-form'>
      <h3>Leave a Comment</h3>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          {!loading && <>{ isAuthenticated ? authForm : guestForm }</>}
        </div>
      </form>
    </div>
  )
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addComment })(CommentForm);