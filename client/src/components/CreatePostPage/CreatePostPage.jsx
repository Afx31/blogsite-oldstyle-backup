import React, { useState } from 'react';
import './CreatePostPage.css';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const CreatePostPage = ({ addPost }) => {
  const [formData1, setFormData1] = useState({
    heading: '',
    car: '',
  });
  const [temp, setTemp] = useState({
    postType: '',
    content: '',
  });
  const [formData2, setFormData2] = useState([]);

  const handleFormData1Change = (e) => {
    e.preventDefault();
    setFormData1({
      ...formData1,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormData2Change = (e) => {
    e.preventDefault();
    setTemp({
      ...temp,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitContent = (e) => {
    e.preventDefault();
    setFormData2(formData2 => [...formData2, temp]);
  };

  const handleOverallSubmit = (e) => {
    e.preventDefault();
    addPost(formData1.heading, formData1.car, formData2);
  };

  return (
    <div className='cpp-container'>
      <div className='row'>
        <div className='col left-input my-auto'>
          <h1>Create a new post</h1>
          <form className='cpp-form-left'>
            <div className='form-group'>
              <label>Input type</label>
              <select
                name='postType'
                className='form-control'
                onChange={(e) => handleFormData2Change(e)}
                required
              >
                <option disabled>--Select--</option>
                <option value='text'>Text</option>
                <option value='image'>Image</option>
                <option value='link'>Link (YouTube)</option>
              </select>
            </div>
            <div className='form-group'>
              <label>Text area</label>
              <textarea
                name='content'
                className='form-control'
                rows='5'
                onChange={(e) => handleFormData2Change(e)}
                value={temp.content}
                required
              />
            </div>
            <button type='submit' className='btn btn-success' value='Submit' onClick={(e) => onSubmitContent(e)}>
              Submit Content
            </button>
          </form>

          <div className='dropdown-divider' />
          <button
            type='submit'
            className='btn btn-primary overallBtn'
            value='Overall Submit'
            onClick={(e) => handleOverallSubmit(e)}
          >
            Overall Submit
          </button>
        </div>



        <div className='col right-input'>
          <h1>Your Post</h1>
          <form className='cpp-form-left'>
            <div className='form-group'>
              <label>Heading</label>
              <input
                type='text'
                name='heading'
                className='form-control'
                placeholder='Enter a heading'
                value={formData1.heading}
                onChange={(e) => handleFormData1Change(e)}
                required
              />
            </div>
            <div className='form-group'>
              <label>Car</label>
              <select
                name='car'
                className='form-control'
                onChange={(e) => handleFormData1Change(e)}
                required
              >
                <option disabled>--Select--</option>
                <option value='civic'>Civic</option>
                <option value='wago'>Wago</option>
                <option value='frogo'>Frogo</option>
              </select>
            </div>
          </form>

          <div className='dropdown-divider' />

          <div>
            {formData2.map((data, index) => (
              <p key={index}>{data.postType} - {data.content}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { addPost })(CreatePostPage);