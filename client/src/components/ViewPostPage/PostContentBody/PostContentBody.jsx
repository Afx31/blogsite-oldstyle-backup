import React, { useEffect } from 'react';
import './PostContentBody.css';
import Moment from 'react-moment';
import Spinner from '../../layout/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPostById } from '../../../actions/post';

const PostContentBody = ({
  getPostById,
  id,
  post: { singlePost, loading },
}) => {
  useEffect(() => {
    getPostById(id);
  }, [getPostById, id]);

  const renderText = (content) => {
    return (
      <>
        <p>{content}</p>
      </>
    );
  };

  const renderImage = (content) => {
    return (
      <>
        <img className='pcb-img' src={content} alt='post body content' />
      </>
    );
  };

  return loading || singlePost === null ? (
    <Spinner />
  ) : (
    <>
      <h1 className='pcb-heading'>{singlePost.heading}</h1>
      <p className='pcb-date'>
        Posted on{' '}
        <Moment format='DD MMMM, YYYY' className='pcb-date-format'>
          {singlePost.date}
        </Moment>
      </p>

      {singlePost.post.map((curr) => {
        switch (curr.postType) {
          case 'text':
            return renderText(curr.content);
          case 'image':
            return renderImage(curr.content);
          default:
            console.log('Single Post loading error');
        }
      })}
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
