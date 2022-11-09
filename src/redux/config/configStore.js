import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../modules/posts";
import commentsReducer from "../modules/comments";


const store =configureStore({
    reducer:{
        posts:postsReducer,
        comments:commentsReducer,
    }
})

export default store;
