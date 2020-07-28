import React, { useState } from 'react';
import './CreatePostPage.css';

const tempArr = {
  postType: 'ree1',
  content: 'ree2'
};

const CreatePostPage = () => {
  const [heading, setHeading] = useState('');
  const [formData, setFormData] = useState([
    // {
    //   postType: '',
    //   content: '',
    // }
  ]);

  // Deconstruct state for ease of access
  const { postType, content } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHeading = async (e) => {
    e.preventDefault();
    setFormData(formData => [...formData, tempArr]);
    console.log(formData);
  };

  const onSubmitContent = async (e) => {
    e.preventDefault();
  };

  return (
    <div className='cpp-container'>
      <div className='row'>



        <div className='col left-input my-auto'>
          <button onClick={onSubmitHeading} type='submit' className='btn btn-danger' value='Submit Heading'>
            Submit Heading
          </button>
          





          <h1>Create a new post</h1>
          <form className='cpp-form-left' onSubmit={(e) => onSubmitHeading(e)}>
            <div className='form-group'>
              <label>Heading</label>
              <input
                type='text'
                name='heading'
                className='form-control'
                placeholder='Enter a heading'
                value={heading}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className='form-group'>
              <label>Car</label>
              <select
                name='carType'
                className='form-control'
                onChange={(e) => onChange(e)}
                required
              >
                <option disabled>--Select--</option>
                <option>Civic</option>
                <option>Wago</option>
                <option>Frogo</option>
              </select>
            </div>
            <button type='submit' className='btn btn-success' value='Submit Heading'>
              Submit Heading
            </button>
          </form>
          
          <div className='dropdown-divider' />

          <form className='cpp-form-left' onSubmit={(e) => onSubmitContent(e)}>
            <div className='form-group'>
              <label>Input type</label>
              <select
                name='postType'
                className='form-control'
                onChange={(e) => onChange(e)}
                required
              >
                <option disabled>--Select--</option>
                <option>Text</option>
                <option>Image</option>
                <option>Link (YouTube)</option>
              </select>
            </div>
            <div className='form-group'>
              <label>Text area</label>
              <textarea
                name='content'
                className='form-control'
                rows='5'
                onChange={(e) => onChange(e)}
                value={content}
                required
              />
            </div>
            <button type='submit' className='btn btn-success' value='Submit'>
              Submit Content
            </button>
          </form>

          <div className='dropdown-divider' />
          <button type='submit' className='btn btn-primary overallBtn' value='Overall Submit'>
            Overall Submit
          </button>
        </div>
        <div className='col right-input'>
          <h1>Your Post</h1>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
