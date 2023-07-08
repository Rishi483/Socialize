import React, { useState} from 'react'
import "./CreatePost.scss"
import Avatar from '../Avatar/Avatar'
import { useDispatch, useSelector } from 'react-redux'
import {BsCardImage} from "react-icons/bs"
import { axiosClient } from '../../utils/axiosClient'
import { setLoading } from '../../redux/slices/appConfigSlice'
import { getUserProfile } from '../../redux/slices/PostsSlice'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

function CreatePost() {
    const myProfile=useSelector(state=>state.appConfigReducer.myProfile);
    const [caption,setCaption]=useState('');
    const [postImg,setPostImg]=useState();
    const dispatch=useDispatch();
    const params=useParams();

    function handleImageChange(e){
        const file=e.target.files[0];
        if(!file) return;
        const fileReader=new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload=()=>{
            if(fileReader.readyState===fileReader.DONE){
                setPostImg(fileReader.result);
            }
        }
    }

    async function handlePostSubmit(e){
        try {
            if(!caption || !postImg){
                toast.error("Both image and caption are required for post");
                return;
            }
            dispatch(setLoading(true));
            const result=await axiosClient.post('/posts',{
                caption,
                postImg
            });
            toast.success("Post Created Successfully");
            dispatch(getUserProfile({
                userId:params.userId
            })); 
        } 
        catch (e) {
            console.log(e);
        }
        finally{
            dispatch(setLoading(false));
            setCaption('');
            setPostImg();
        }
    }
    
  return (
    <div className='CreatePost'>
     <ToastContainer position='top-center' autoClose={2000}/>
        <div className="left-part-createpost">
            <Avatar className="user-avatar" src={myProfile?.avatar?.url}/>
        </div>
        <div className="right-part-createpost">
            <input type="text" value={caption} className='captionInput' placeholder="What's on Your mind?" onChange={(e)=>setCaption(e.target.value)}/>
            {postImg && (
                <div className="img-container">
                    <img src={postImg} alt="" className="post-img" />
                </div>
            )}
            <div className="bottom-part">
                <div className="input-post-img">
                    <label htmlFor="inputImg" className='labelImg'>
                        <BsCardImage/>
                    </label>
                    <input className='inputImg' id='inputImg' type="file" accept='image/*' onChange={handleImageChange}/>
                </div>
                <button className='post-btn btn-primary' onClick={handlePostSubmit}>Post</button>
            </div>
        </div>
    </div>
  )
}

export default CreatePost
