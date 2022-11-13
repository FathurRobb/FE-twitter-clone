import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    posts: [],
    isLoading: false,
    error: null,
    post: {},
}

export const getPosts = createAsyncThunk(
    'getPosts',
    async (payload, thunkApi) => {
        try {
            const { data } = await axios.get(process.env.REACT_APP_API_URL + 'posts')
            return thunkApi.fulfillWithValue(data)
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
)

export const getPostsByID = createAsyncThunk(
    'getPostByID',
    async (payload, thunkApi) => {
        try {
            const { data } = await axios.get(process.env.REACT_APP_API_URL + 'posts')
            const filter = data.find(item => item.id === payload)
            return thunkApi.fulfillWithValue(filter)
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)

export const getPostsByUserID = createAsyncThunk(
    'getPostsByUserID',
    async (payload, thunkApi) => {
        try {
            const { data } = await axios.get(process.env.REACT_APP_API_URL + 'posts')
            const filter = data.filter(item => item.userId === +payload)
            return thunkApi.fulfillWithValue(filter)
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)

export const createPost = createAsyncThunk(
    'createPost',
    async (payload, thunkApi) => {
        try {
            await axios.post(process.env.REACT_APP_API_URL+'posts/', payload)
            const { data } = await axios.get(process.env.REACT_APP_API_URL + 'posts')
            return thunkApi.fulfillWithValue(data)
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)

export const deletePost = createAsyncThunk(
    'deletePost',
    async (payload, thunkApi) => {
        try {
            return await axios.delete(process.env.REACT_APP_API_URL+'posts/'+ payload)
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)

const posts = createSlice({
    name: 'posts',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPosts.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.posts = action.payload;
                state.error = null;
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(getPostsByID.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getPostsByID.fulfilled, (state, action) => {
                state.isLoading = false;
                state.post = action.payload;
                state.error = null;
            })
            .addCase(getPostsByID.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(getPostsByUserID.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getPostsByUserID.fulfilled, (state, action) => {
                state.isLoading = false;
                state.posts = action.payload;
                state.error = null;
            })
            .addCase(getPostsByUserID.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(createPost.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.posts = action.payload;
                state.error = null;
            })
            .addCase(createPost.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    },
});

export const { getPostById } = posts.actions;
export default posts.reducer;