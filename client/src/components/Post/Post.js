import React from 'react'
import Avatar from '../Avatar/Avatar'
import "./Post.scss"
import { Link } from 'react-router-dom'
import {AiOutlineHeart,AiFillHeart,AiOutlineComment} from "react-icons/ai"
import { useDispatch } from 'react-redux'
import { likeAndDislike } from '../../redux/slices/PostsSlice'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import Tooltip from '@mui/material/Tooltip';

function Post({post}) {
  const dispatch=useDispatch();
  const likeOrDislikePost=(pid)=>{
    dispatch(likeAndDislike({
      postId:pid
    }));
  }
  return (
    <div className='Post'>
      <div className="heading">
        <div className='owner-info'>
        <Avatar src={post?.owner.avatar?.url} />
        <Link style={{textDecoration:"none"}} to={"/profile/"+post?.owner?._id} ><h4>{post?.owner.name}</h4></Link>
        </div>
        <div className='info-icon'>
            <MoreHorizOutlinedIcon/>
        </div>
      </div>
      <div className="content" onDoubleClick={()=>likeOrDislikePost(post?._id)}>
        <img src={post?.image.url} alt="" />
      </div>
      <div className="footer">
        <div className='middle'>
        <div className="like">
            {post?.isLiked && <AiFillHeart className='icon redc' onClick={()=>likeOrDislikePost(post?._id)}/>}
            {!post || !(post?.isLiked) && <AiOutlineHeart className='icon blackc' onClick={()=>likeOrDislikePost(post?._id)}/>}
            <AiOutlineComment className='icon blackc'/>
        </div>
        <div className='bookmark-icon'>
          <Tooltip title="Bookmark">
            <BookmarkBorderOutlinedIcon className='icon blackc'/>
          </Tooltip>
        </div>
        </div>
        <h4>{post?.likesCount} likes</h4>
        <p className="caption">{post?.caption}</p>
        <h6 className='time-ago'>{post?.timeAgo || "4 hrs ago"}</h6>
      </div>
    </div>
  )
}

export default Post
