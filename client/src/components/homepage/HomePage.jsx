import React, { useState, useEffect } from 'react';
import './HomePage.css';
import { getPostBio } from '../../actions/post';
import CardDisplay from './CardDisplay/CardDisplay';

const HomePage = () => {
  const [post, setPost] = useState([]);

  // Old logic with error
  // useEffect(async () => {
  //   setPost(await getPostBio());
  // }, []);

  // New logic with error
  useEffect(() => {
    async function fetchData() {
      setPost(await getPostBio());
    };
    fetchData();
  }, []);

  return (
    <div className='home-container'>
      <div className='home-inner-container'>
        <h1>Latest Posts</h1>
        <div className='home-card-container'>
          {post.map((post) => (
            <CardDisplay
              id={post._id}
              car={post.car}
              thumbnail={post.thumbnail}
              heading={post.heading}
              description={post.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
