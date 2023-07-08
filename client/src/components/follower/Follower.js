import React, { useEffect,useState } from 'react'
import Avatar from '../Avatar/Avatar'
import "./Follower.scss"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { followAndUnfollowUser } from '../../redux/slices/FeedSlice';


function Follower({prop}) {
  const dispatch=useDispatch();
  const feedData=useSelector(state=>state.feedDataReducer.FeedData);
  const [isFollowing,setIsFollowing]=useState( );

  useEffect(()=>{
    if(feedData?.followings?.find(item=>item._id==prop?._id)){
      setIsFollowing(true);
    }
    else{
      setIsFollowing(false);
    }
  },[feedData])

  function handleClick(){
    dispatch(followAndUnfollowUser({
      userIdToFollow:prop._id
    }))
  }
  return (
    <div className='follower'>
      <div className="user-info">
        <Avatar src={prop?.avatar?.url}/>
        <Link to={"profile/"+prop._id} style={{textDecoration:"none"}} ><h4 className="name" style={{cursor:"pointer"}}>{prop?.name}</h4></Link>
      </div>
      <h5 className="hover-link follow-link" onClick={handleClick}>{isFollowing? "Unfolllow":"Follow"}</h5>
    </div>
  )
}

export default Follower
