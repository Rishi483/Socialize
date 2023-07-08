import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
import { setLoading } from "./appConfigSlice";

export const getUserProfile=createAsyncThunk('user/getUserProfile',async(body,thunkAPI)=>{
    try {
        thunkAPI.dispatch(setLoading(true));
        const response=await axiosClient.post('user/getUserProfile',body);
        return response.data.result;
    } 
    catch (e) {
        return Promise.reject(e);
    }
    finally{
        thunkAPI.dispatch(setLoading(false));
    }
});

export const likeAndDislike=createAsyncThunk('post/likeAndUnlike',async(body,thunkAPI)=>{
    try {
        thunkAPI.dispatch(setLoading(true));
        const response=await axiosClient.post('posts/like',body);
        return response.data.result;
    } 
    catch (e) {
        return Promise.reject(e);
    }
    finally{
        thunkAPI.dispatch(setLoading(false));
    }
})

const postsSlice=createSlice({
    name:"postsSlice",
    initialState:{
        userProfile:{}
    },
    extraReducers:(builder)=>{
        builder.addCase(getUserProfile.fulfilled,(state,action)=>{
            state.userProfile=action.payload;
        })
        .addCase(likeAndDislike.fulfilled,(state,action)=>{
            try {
                const temp=action.payload;
                const post=temp.post;
                const index=state.userProfile?.posts?.findIndex(item => item._id==post._id);
                if(index!=undefined && index!=-1){
                    state.userProfile.posts[index]=post;
                }
            } catch (e) {
                console.log(e);
            }
        })
    }
})

export default postsSlice.reducer;
