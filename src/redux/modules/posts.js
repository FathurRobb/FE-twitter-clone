import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    posts:[],
    isLoading: false,
    error: null,
    post:{
        post:'',
        id:'',
    },
}

export const __getPosts = createAsyncThunk(
    'getPosts',
    async (payload, thunkApi) => {
        try {
            const { data } = await axios.get('https://salty-beyond-47708.herokuapp.com/posts')
            return thunkApi.fulfillWithValue(data)
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
)

const posts = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        getPostById: (state, action) => {
            state.post = state.posts.find((post)=>{
                return post.id === action.payload
            })
          },
    },
    extraReducers:{
        [__getPosts.pending]:(state) =>{
            state.isLoading = true;
        },
        [__getPosts.fulfilled]:(state, action) =>{
            state.isLoading = false;
            state.posts = action.payload;
            state.error = null;
        },
        [__getPosts.rejected]:(state, action) =>{
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const {getPostById} = posts.actions;
export default posts.reducer;