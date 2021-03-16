import React, { useState, useEffect } from 'react';
import './ViewPostPage.css';
import PostLinksMenu from './PostLinksMenu/PostLinksMenu';
import PostContentBody from './PostContentBody/PostContentBody';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { getPostsByCar } from '../../actions/post';
import post from '../../reducers/post';

const ViewPostPage = ({ getPostsByCar, post: { posts, loading }, match }) => {
  const [currentPost, setCurrentPost] = useState("");

  useEffect(() => {
    getPostsByCar(match.params.car);
  }, [getPostsByCar, match.params.car]);

  const handleSelectChange = (e) => {
    //<Redirect to={`/viewpost/${match.params.car}/${e.target.value}`} />
    setCurrentPost(e.target.value);
  };

  return loading || posts === null ? (
    <Spinner />
  ) : (
    <>
      <div className='vpp-container'>
        <div className='row'>
          <div className='col-3 pane-left'>
            <form className='form-inline my-2 my-lg-0'>
              <h1>{match.params.car}</h1>
            </form>
            <hr className='dropdown-divider'/>
            <h5>RECENT POSTS</h5>
            <div className='thread-post-links'>
              <ul>
                {posts.map((post) => (
                  <PostLinksMenu
                    key={post._id}
                    id={post._id}
                    heading={post.heading}
                    car={match.params.car}
                  />
                ))}
              </ul>
            </div>
          </div>
          <div className='mobile-pane-left'>
            <form className='form-inline my-2 my-lg-0'>
              <h1>{match.params.car}</h1>
            </form>
            <hr className='dropdown-divider'/>
            <h5>RECENT POSTS</h5>
            <div className='thread-post-links'>
              {currentPost && (
                <Redirect to={`/viewpost/${match.params.car}/${currentPost}`} />
              )}
              <select selected="test" onChange={(e) => handleSelectChange(e)}>
                {posts.map((post) => {
                  if (posts[0]._id === post._id) {
                    return (
                      <option selected value={post._id}>{post.heading}</option>
                    );
                  }
                  return <option value={post._id}>{post.heading}</option>;
                })}
              </select>
            </div>
          </div>
          <div className='col-9 pane-right'>
            <PostContentBody id={match.params.id} />
          </div>
        </div>
      </div>
    </>
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
