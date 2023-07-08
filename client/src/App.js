import Login from "./pages/login/Login";
import { Route,Routes } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Home from "./pages/Home/Home";
import RequireUser from "./components/RequireUser";
import NotRequireUser from "./components/NotRequireUser"
import Feed from "./components/feed/Feed";
import Profile from "./components/profile/Profile";
import Updateprofile from "./components/profileUpdate/Updateprofile";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import LoadingBar from 'react-top-loading-bar'
import { ToastContainer, toast } from 'react-toastify';
function App() {
  const isLoading=useSelector(state=>state.appConfigReducer.isLoading);
  const loadingRef=useRef(null);

  useEffect(()=>{
    if(isLoading){
      loadingRef.current?.continuousStart();
    }
    else{
      loadingRef.current?.complete();
    }
  },[isLoading]);

  return (
    <div className="App">
      <LoadingBar height={4} color='#FF4633' ref={loadingRef} />
      <ToastContainer position='top-center' autoClose={2000}/>
      <Routes>
        <Route element={<RequireUser/>}>
          <Route element={<Home/>}>
            <Route path="/" element={<Feed/>}/>
            <Route path="/profile/:userId" element={<Profile/>}/>
            <Route path="/updateProfile" element={<Updateprofile/>}/>
          </Route>
        </Route>
        <Route element={<NotRequireUser/>}>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
