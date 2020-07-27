import React from 'react';

const PostsPage = () => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-4 pane-left'>
          <form className='form-inline my-2 my-lg-0 search-container'>
            <input
              className='form-control mr-sm-2'
              type='search'
              placeholder='Search...'
              aria-label='Search'
            />
            <button className='btn btn-danger my-2 my-sm-0' type='submit'>
              Search
            </button>
          </form>
          <div className='dropdown-divider' />
          <h5>RECENT POSTS</h5>
          <div className='thread-post-links'>
            <ul>
              <li>Link 1</li>
              <li>Link 2</li>
              <li>Link 3</li>
              <li>Link 4</li>
              <li>Link 5</li>
              <li>Link 6</li>
              <li>Link 7</li>
              <li>Link 8</li>
              <li>Link 9</li>
              <li>Link 10</li>
            </ul>
          </div>
        </div>
        <div className='col-8 pane-right'>
          <h1>Wakefield 1st August 2020, is it time to get a 1.09?</h1>
          <img src={require("../../img/image1.jpg")} className="img-fluid cover-img" alt="Responsive" />  
          <p>
          top publishing packages and
            web page e
            like).
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostsPage;