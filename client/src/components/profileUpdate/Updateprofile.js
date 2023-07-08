import React, { useEffect, useState } from 'react'
import "./UpdateProfile.scss"
import { useDispatch, useSelector } from 'react-redux';
import userImgg from "../../Assets/user.png"
import { updateMyProfile } from '../../redux/slices/appConfigSlice';

function Updateprofile() {
  const myProfile=useSelector(state=>state.appConfigReducer.myProfile);
  const [name,setName]=useState("");
  const [bio,setBio]=useState("");
  const [userImg,setImg]=useState(userImgg);
  const dispatch=useDispatch();

  function handleImageChange(e){
    const file=e.target.files[0];
    if(!file) return;
    const fileReader=new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload=()=>{
      if(fileReader.readyState===fileReader.DONE){
        setImg(fileReader.result);
      }
    }
  }

  function handleSubmit(e){
    e.preventDefault();
    dispatch(updateMyProfile({
      name,
      bio,
      userImg
    }));
  }
  useEffect(()=>{
      setName(myProfile?.name || "");
      setBio(myProfile?.bio || "");
      setImg(myProfile?.avatar?.url || userImgg);
  },[myProfile])
  return (
    <div className="UpdateProfile">
      <div className="container">
        <div className="left-part">
          <div className="input-user-image">
            <label htmlFor="inputImg" className='labelImg'>
              <img src={userImg} alt={name} />
            </label>
            <input className='inputImg' id='inputImg' type="file" accept='image/*' onChange={handleImageChange}/>
          </div>
        </div>
        <div className="right-part">
          <form onSubmit={handleSubmit}>
            <input type="text" value={name} placeholder='Your Name' onChange={(e)=>setName(e.target.value)}/>
            <input type="text" value={bio} placeholder='Your Bio' onChange={(e)=>setBio(e.target.value)}/>

            <input type="submit" className='btn-primary' onClick={handleSubmit}  />
          </form>
          <button className="deleteAccount btn-primary">Delete Account</button>
        </div>
      </div>
    </div>
  )
}

export default Updateprofile
