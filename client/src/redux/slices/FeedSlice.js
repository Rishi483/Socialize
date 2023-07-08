import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
import { setLoading } from "./appConfigSlice";
import { likeAndDislike } from "./PostsSlice";

export const getFeedData=createAsyncThunk('user/getFeedData',async(_,thunkAPI)=>{
    try {
        thunkAPI.dispatch(setLoading(true));
        const response=await axiosClient.post('user/getFeedData');
        console.log("feed response", response);
        return response.data.result;
    } 
    catch (e) {
        return Promise.reject(e);
    }
    finally{
        thunkAPI.dispatch(setLoading(false));
    }
});

export const followAndUnfollowUser=createAsyncThunk("user/followAndUnfollow",async(body,thunkAPI)=>{
    try {
        thunkAPI.dispatch(setLoading(true));
        const res=await axiosClient.post('user/follow',body);
        return res.data.result;
    } 
    catch (e) {
        return Promise.reject(e);
    }
    finally{
        thunkAPI.dispatch(setLoading(false));
    }
})


const FeedSlice=createSlice({
    name:"feedSlice",
    initialState:{
        FeedData:{}
    },
    extraReducers:(builder)=>{
        builder.addCase(getFeedData.fulfilled,(state,action)=>{
            state.FeedData=action.payload;
        })
        .addCase(likeAndDislike.fulfilled,(state,action)=>{
            const temp=action.payload;
            const post=temp.post;
            const index=state.FeedData.fposts?.findIndex(item => item._id==post._id);
            if(index!=undefined && index!=-1){
                state.FeedData.fposts[index]=post;
            }
        })
        .addCase(followAndUnfollowUser.fulfilled,(state,action)=>{
            const user=action.payload.userToFollow;
            const index=state.FeedData.followings?.findIndex(item=>item._id==user._id);
            if(index!=undefined && index!=-1){
                state.FeedData.followings.splice(index,1);
                state.FeedData.suggestions.push(user);
            }
            else{
                const ind=state.FeedData.suggestions?.findIndex(item=>item._id==user._id);
                state.FeedData.suggestions.splice(ind,1);
                state.FeedData.followings.push(user);
            }
        })
    }
})

export default FeedSlice.reducer;
