import React from 'react';
import { Link } from 'react-router-dom';

const PostLinksMenuMobile = ({ id, heading, car }) => {
  return (
    <>
      <option>
        <Link to={`/viewpost/${car}/${id}`}>{heading}</Link>
      </option>
    </>
  )
};

export default PostLinksMenuMobile;