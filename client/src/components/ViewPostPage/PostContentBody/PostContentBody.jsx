import React, { useEffect } from 'react';
import './PostContentBody.css';
import Moment from 'react-moment';
import ReactPlayer from 'react-player/youtube';
import Spinner from '../../Layout/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPostById } from '../../../actions/post';
import CommentForm from '../Comments/CommentForm';
import CommentItem from '../Comments/CommentItem';

const PostContentBody = ({ getPostById, id, post: { singlePost, loading } }) => {
  useEffect(() => {
    getPostById(id);
  }, [getPostById, id]);

  const renderText = (key, content) => {
    return ( <React.Fragment key={key}> <p>{content}</p> </React.Fragment> );
  };

  const renderImage = (key, content) => {
    return ( <React.Fragment key={key}> <img className='pcb-img img-fluid' src={content} alt='post body content' /> </React.Fragment> );
  };

  const renderYouTube = (key, content) => {
    return (
      <>
        <div className='react-player-vid'>
          <ReactPlayer key={key} url={content} />
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
        {// eslint-disable-next-line
        singlePost.post.map(post => {
          switch (post.postType) {
            case 'text':
              return renderText(post._id, post.content);
            case 'image':
              return renderImage(post._id, post.content);
            case 'youtube':
              return renderYouTube(post._id, post.content);
            default:
              console.log('Single Post loading error');
          }
        })}
      </div>
      
      <hr className='pcb-dropdown-divider' />
      <div className='comments'>
        {singlePost.comments.map(comment => (
          <CommentItem key={comment._id} comment={comment} postId={id} />
        ))}
      </div>
      <CommentForm postId={id} />
    </>
  )
};

PostContentBody.propTypes = {
  getPostById: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPostById })(PostContentBody);