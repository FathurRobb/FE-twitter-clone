import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    likes: [],
    isLoading: false,
    error: null,
};

export const getLikes = createAsyncThunk(
    'getLikes',
    async (payload, thunkApi) => {
        try {
            const { data } = await axios.get(process.env.REACT_API_URL + 'likes');
            const likes = data.filter(like => like.userId === payload);
            return thunkApi.fulfillWithValue(likes);
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
);

// export const getCountLikes = createAsyncThunk(
//     'getCountLikes',
//     async (payload, thunkApi) => {
//         try {
//             const { data } = await axios.get(process.env.REACT_API_URL + 'likes');
//             const countLikes = data.filter(like => like.postId === payload);
//             return thunkApi.fulfillWithValue(countLikes);
//         } catch (error) {
//             return thunkApi.rejectWithValue(error);
//         }
//     }
// );

export const createLikes = createAsyncThunk(
    'createLikes',
    async (payload, thunkApi) => {
        try {
            await axios.post(process.env.REACT_APP_API_URL+'likes/', payload)
            const { data } = await axios.get(process.env.REACT_API_URL + 'likes');
            const likes = data.filter(like => like.userId === payload);
            return thunkApi.fulfillWithValue(likes);
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
);

export const cancelLikes = createAsyncThunk(
    'cancelLikes',
    async (payload, thunkApi) => {
        try {
            await axios.delete(process.env.REACT_APP_API_URL+'likes/', payload.likeId)
            const { data } = await axios.get(process.env.REACT_API_URL + 'likes');
            const likes = data.filter(like => like.userId === payload);
            return thunkApi.fulfillWithValue(likes);
        } catch (error) {
            return thunkApi.rejectWithValue(error);
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
            .addCase(getLikes.reject, (state, action) => {
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
            .addCase(createLikes.reject, (state, action) => {
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
            .addCase(cancelLikes.reject, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }, 
});

export const {} = likes.actions;
export default likes.reducer;