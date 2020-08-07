import React, { useState, useEffect } from 'react';
import './ViewPostPage.css';
import PostLinksMenu from './PostLinksMenu/PostLinksMenu';
import PostContentBody from './PostContentBody/PostContentBody';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPostsByCar } from '../../actions/post';

const ViewPostPage = ({ getPostsByCar, post: { posts, loading }, match }) => {
  const value = 'civic';

  useEffect(() => {
    getPostsByCar(value);
  }, [getPostsByCar]);

  return (
    <div className='vpp-container'>
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
              {posts.map((post) => (
                <PostLinksMenu
                  key={post._id}
                  id={post._id}
                  heading={post.heading}
                />
              ))}
            </ul>
          </div>
        </div>
        <div className='col-8 pane-right'>
          <PostContentBody id={match.params.id} />
        </div>
      </div>
    </div>
  );
};

ViewPostPage.propTypes = {
  getPostsByCar: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPostsByCar })(ViewPostPage);
