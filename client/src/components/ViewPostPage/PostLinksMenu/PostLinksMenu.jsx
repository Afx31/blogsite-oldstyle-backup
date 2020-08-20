import React from 'react';
import { Link } from 'react-router-dom';

const PostLinksMenu = ({ id, heading, car }) => {  
  return (
    <>
      <li>
        <Link to={`/viewpost/${car}/${id}`}>{heading}</Link>
      </li>
    </>
  );
};

export default PostLinksMenu;
