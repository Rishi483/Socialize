import React, { useEffect, useState } from 'react'
import "./Profile.scss"
import Post from '../Post/Post'
import { useNavigate, useParams } from 'react-router-dom'
import CreatePost from '../createPost/CreatePost'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from '../../redux/slices/PostsSlice'
import imgg from "../../Assets/user.png"
import { followAndUnfollowUser } from '../../redux/slices/FeedSlice'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { setLoading } from '../../redux/slices/appConfigSlice'
import { KEY_ACCESS_TOKEN, removeItem } from '../../utils/localStorageManager';
import { axiosClient } from '../../utils/axiosClient';

function Profile() {
  const navigate=useNavigate();
  const params=useParams();
  const dispatch=useDispatch();
  const userProfile=useSelector(state=>state.postsReducer.userProfile);
  const myProfile=useSelector(state=>state.appConfigReducer.myProfile);
  const [isMyProfile,setIsMyProfile]=useState(false);
  const [isFollowing,setIsFollowing]=useState(false);
  const feedData=useSelector(state=>state.feedDataReducer.FeedData);
  
  useEffect(()=>{
    if(feedData?.followings?.find(item=>item._id==params.userId)){
      setIsFollowing(true);
    }
    else{
      setIsFollowing(false);
    }
  },[feedData])
  useEffect(()=>{
    dispatch(getUserProfile({
      userId:params.userId
    }))
    setIsMyProfile(myProfile?._id===params.userId);
  },[params.userId,myProfile])

  function handleClick(){
    dispatch(followAndUnfollowUser({
      userIdToFollow:params.userId
    }))
  }
  async function deleteUser(){
    try {
      dispatch(setLoading(true));
      await axiosClient.delete('/user');
      removeItem(KEY_ACCESS_TOKEN);
      navigate('/login');
      dispatch(setLoading(false));
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className='Profile'>
      <div className="container">
        <div className="left-part">
         {isMyProfile && <CreatePost/>}
         {userProfile?.posts?.map(item=><Post key={item._id} post={item}/>)}
        </div>
        <div className="right-part">
          <div className="profile-card">
            <img className='user-img' src={userProfile?.avatar?.url || imgg} alt="" />
            <h3 style={{fontWeight:600}} className='user-name'>{userProfile?.name}</h3>
            <p>{userProfile?.bio}</p>
            <div className="follower-info">
              <h4>{`${userProfile?.followers?.length} Followers`} </h4>
              <h4>{`${userProfile?.followings?.length} Following`} </h4>
            </div>
            {isMyProfile && 
              <button className='update-profile btn-secondary' onClick={()=>navigate('/updateProfile')}>Update Profile</button>
            }
            {
              isMyProfile && 
                <Popup
                  trigger={<button className='update-profile btn-primary-red'>Delete Profile</button>}
                  modal
                  nested
                >
                  {close => (
                    <div className="modal">
                      <h3 className="header"> Are you sure you want to delete your account?</h3>
                      <div className="actions">
                        <button className="btn-secondary" onClick={deleteUser} >
                          Yes
                        </button>
                        <button
                          className="btn-secondary"
                          onClick={() => {
                            close();
                          }}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  )}
                </Popup>
            }
            {(!isMyProfile && isFollowing) && 
              <button className='follow btn-secondary' onClick={handleClick}>Following</button>
            }
            {
              (!isMyProfile && !isFollowing) &&
              <button className='follow btn-primary' onClick={handleClick}>Follow</button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
