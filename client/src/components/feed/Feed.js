import React, { useEffect } from 'react'
import "./Feed.scss";
import Post from '../Post/Post';
import Follower from '../follower/Follower';
import { useDispatch, useSelector } from 'react-redux';
import { getFeedData } from '../../redux/slices/FeedSlice';

function Feed() {
  const dispatch=useDispatch();
  const feedData=useSelector(state=>state.feedDataReducer.FeedData);
  useEffect(()=>{
    dispatch(getFeedData());
  },[dispatch])
  return (
    <div className='feed'>
      <div className="container">
        <div className="left-part">
          {feedData?.fposts?.map(item=><Post key={item._id} post={item}/>)}
        </div>
        <div className="right-part">
          <div className="following card">
            <h3 className='title'>You are following</h3>
             <div className="list">
              {feedData?.followings?.map(item=><Follower key={item._id} prop={item}/>)}
             </div>
          </div>
          <div className="suggestions card">
            <h3 className='title'>Suggested for You </h3>
              <div className="list">
                {feedData?.suggestions?.map(item=><Follower key={item._id} prop={item}/>)}
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feed
