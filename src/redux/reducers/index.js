import { combineReducers } from "redux";
import posts from "./posts";
import likes from "./likes";
import comments from "./comments";

export default combineReducers({
    posts,
    likes,
    comments,
});