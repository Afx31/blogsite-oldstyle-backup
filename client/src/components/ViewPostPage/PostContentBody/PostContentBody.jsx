import React, { useEffect } from 'react';
import './PostContentBody.css';
import Moment from 'react-moment';
import ReactPlayer from 'react-player/youtube';
import Spinner from '../../layout/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPostById } from '../../../actions/post';
import CommentForm from '../comments/CommentForm';
import CommentItem from '../comments/CommentItem';

const PostContentBody = ({ getPostById, id, post: { singlePost, loading } }) => {
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
        <img className='pcb-img img-fluid' src={content} alt='post body content' />
      </>
    );
  };

  const renderYouTube = (content) => {
    return (
      <>
        <div className='react-player-vid'>
          <ReactPlayer url={content} />
        </div>
      </>
    )
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

      <div className='pcb-content'>
        {singlePost.post.map((curr) => {
          switch (curr.postType) {
            case 'text':
              return renderText(curr.content);
            case 'image':
              return renderImage(curr.content);
            case 'youtube':
              return renderYouTube(curr.content);
            default:
              console.log('Single Post loading error');
          }
        })} 
      </div>
      
      <hr className='pcb-dropdown-divider' />
      <div className='comments'>
        {singlePost.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={id} />
        ))}
      </div>
      <CommentForm postId={id} />
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
