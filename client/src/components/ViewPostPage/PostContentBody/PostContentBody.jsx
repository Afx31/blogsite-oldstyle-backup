import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPostById } from '../../../actions/post';

const PostContentBody = ({ getPostById, id, post: { singlePost, loading } }) => {
  useEffect(() => {
    getPostById(id);
  }, [getPostById]);

  return loading || singlePost === null ? (
    <h1>loading</h1>
  ) : (
    <>
      <h1>{singlePost.heading}</h1>

      {singlePost.post.map(ree => (
        <>
          <p>{ree.postType}</p>
          <p>{ree.content}</p>
          <p>-----------------------</p>
        </>
      ))}
    </>
  );
};

PostContentBody.propTypes = {
  getPostById: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPostById })(PostContentBody);
