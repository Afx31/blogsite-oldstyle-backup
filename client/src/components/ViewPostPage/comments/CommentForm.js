import React, { useState } from 'react';
import './Comments.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../../actions/post';

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    addComment(postId, { text });
    setText('');
  };

  return (
    <div className='post-form'>
      <h3>Leave a Comment</h3>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          {/* 
            HARDCODED TEXTAREA SIZE, FIX!
          */}
          <textarea
            className='comment-textarea'
            name='text'
            cols='100'
            rows='5'
            placeholder='Enter your comment here...'
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>        
        <input type='submit' className='btn btn-success my-1' value='Submit' />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);