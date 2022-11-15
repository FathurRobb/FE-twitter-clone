import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    likes: [],
    isLoading: false,
    error: null,
};

let url;
process.env.NODE_ENV == 'development' ? 
    url = process.env.REACT_APP_DEV_API_URL
    :
    url = process.env.REACT_APP_API_URL

export const getLikes = createAsyncThunk(
    'getLikes',
    async (payload, thunkApi) => {
        try {
            const { data } = await axios.get(url + 'likes');
            const likes = data.filter(like => like.userId === payload);
            return thunkApi.fulfillWithValue(likes);
        } catch (error) {
            return thunkApi.rejectedWithValue(error);
        }
    }
);

// export const getCountLikes = createAsyncThunk(
//     'getCountLikes',
//     async (payload, thunkApi) => {
//         try {
//             const { data } = await axios.get(url + 'likes');
//             const countLikes = data.filter(like => like.postId === payload);
//             return thunkApi.fulfillWithValue(countLikes);
//         } catch (error) {
//             return thunkApi.rejectedWithValue(error);
//         }
//     }
// );

export const createLikes = createAsyncThunk(
    'createLikes',
    async (payload, thunkApi) => {
        try {
            await axios.post(url+'likes/', payload)
            const { data } = await axios.get(url + 'likes');
            const likes = data.filter(like => like.userId === payload);
            return thunkApi.fulfillWithValue(likes);
        } catch (error) {
            return thunkApi.rejectedWithValue(error);
        }
    }
);

export const cancelLikes = createAsyncThunk(
    'cancelLikes',
    async (payload, thunkApi) => {
        try {
            await axios.delete(url+'likes/', payload)
            const { data } = await axios.get(url + 'likes');
            const likes = data.filter(like => like.userId === payload);
            return thunkApi.fulfillWithValue(likes);
        } catch (error) {
            return thunkApi.rejectedWithValue(error);
        }
    }
);

const likes = createSlice({
    name: 'likes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getLikes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getLikes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.likes = action.payload;
                state.error = null
            })
            .addCase(getLikes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                console.log("ada error",action.payload)
            })
            .addCase(createLikes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createLikes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.likes = action.payload;
                state.error = null
            })
            .addCase(createLikes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(cancelLikes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(cancelLikes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.likes = action.payload;
                state.error = null
            })
            .addCase(cancelLikes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }, 
});

export default likes.reducer;