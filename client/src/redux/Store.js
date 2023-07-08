import {configureStore} from "@reduxjs/toolkit"
import appConfigReducer from "./slices/appConfigSlice"
import postsReducer from "./slices/PostsSlice"
import feedDataReducer from "./slices/FeedSlice"
export default configureStore({
    reducer:{
        appConfigReducer,
        postsReducer,
        feedDataReducer
    }
})