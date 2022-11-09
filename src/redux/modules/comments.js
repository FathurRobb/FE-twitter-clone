import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    comments:[],
    isLoading: false,
    error: null,
}



export const __getComments = createAsyncThunk(
    'getComments',
    async (payload, thunkApi) => {
        try {
            const {data} = await axios.get('http://localhost:3001/comments')
            return thunkApi.fulfillWithValue(data)
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
)

const comments = createSlice({
    name: 'comments',
    initialState,
    reducers: {
    },
    extraReducers:{
        [__getComments.pending]:(state) =>{
            state.isLoading = true;
        },
        [__getComments.fulfilled]:(state, action) =>{
            state.isLoading = false;
            state.comments = action.payload;
            state.error = null;
        },
        [__getComments.rejected]:(state, action) =>{
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});


export default comments.reducer;