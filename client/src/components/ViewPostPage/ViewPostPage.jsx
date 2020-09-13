import React, { useEffect } from 'react';
import './ViewPostPage.css';
import PostLinksMenu from './PostLinksMenu/PostLinksMenu';
import PostContentBody from './PostContentBody/PostContentBody';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { getPostsByCar } from '../../actions/post';

const ViewPostPage = ({ getPostsByCar, post: { posts, loading }, match }) => {
  useEffect(() => {
    getPostsByCar(match.params.car);
  }, [getPostsByCar, match.params.car]);

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
