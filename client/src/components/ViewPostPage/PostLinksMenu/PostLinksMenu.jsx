import React from 'react';
import { Link } from 'react-router-dom';

const PostLinksMenu = ({ id, heading }) => {  
  return (
    <>
      <li>
        <Link to={`/civic/${id}`}>{heading}</Link>
      </li>
    </>
  );
};

export default PostLinksMenu;
