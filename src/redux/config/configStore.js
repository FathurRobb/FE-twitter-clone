import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../modules/posts";
import commentsReducer from "../modules/comments";


const store =configureStore({
    reducer:{
        posts:postsReducer,
        comments:commentsReducer,
    },
    devTools: process.env.NODE_ENV === 'development'
})

export default store;
