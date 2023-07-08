import React, { useState ,useRef} from 'react'
import "./Navbar.scss"
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useNavigate } from 'react-router-dom'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useDispatch, useSelector } from 'react-redux'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Tooltip from '@mui/material/Tooltip';
import { setLoading } from '../../redux/slices/appConfigSlice';
import { axiosClient } from '../../utils/axiosClient';
import { KEY_ACCESS_TOKEN, removeItem } from '../../utils/localStorageManager';

function Navbar() {
  const navigate=useNavigate();
  const myProfile=useSelector(state=>state.appConfigReducer.myProfile);
  const dispatch=useDispatch();

  async function handleLogoutClick(){
    try {
      dispatch(setLoading(true));
      await axiosClient.post('/auth/logout');
      removeItem(KEY_ACCESS_TOKEN);
      navigate('/login');
      dispatch(setLoading(false));
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className='navbar'>
      <div className='container'>
          <h2 className='banner hover-link' onClick={()=>navigate('/')}>Socialize</h2>
          <div className="middle-side">
              <Tooltip title="Search">
                <SearchOutlinedIcon/>
              </Tooltip>
              <Tooltip title="Chats">
                <ForumOutlinedIcon/>
              </Tooltip>
              <Tooltip title="Notifications">
                <NotificationsNoneOutlinedIcon/>
              </Tooltip>
            <div className="profile hover-link" onClick={()=>navigate(`/profile/${myProfile?._id}`)}>
              <Tooltip title="Profile">
                <PersonOutlineOutlinedIcon/>
              </Tooltip>
            </div>
          </div>
          <div className="right-side">
            <div className="logout hover-link" onClick={handleLogoutClick}>
              <Tooltip title="Logout">
                <LogoutOutlinedIcon/>
              </Tooltip>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Navbar
