import React from 'react';
import "./Avatar.scss";
import userImage from "../../Assets/user.png"

function Avatar({src}) {
  return (
    <div className='avatar'>
      <img src={src?src:userImage} alt="avatar" />
    </div>
  )
}

export default Avatar
