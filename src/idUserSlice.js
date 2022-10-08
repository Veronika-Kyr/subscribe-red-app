import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const fetchIdUser = createAsyncThunk(
    "user/fetch",
    async (id) => {
        const response = await fetch(`http://localhost:3000/community/${id}`);
        return response.json();
    }
);

const idUserSlice = createSlice({
    name: 'user',
    initialState: { onIDdata: [], fetchStatus: '' },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchIdUser.fulfilled, (state, action) => {
            state.onIDdata = action.payload
            state.fetchStatus = 'success'
        })
            .addCase(fetchIdUser.pending, (state) => {
                state.fetchStatus = 'loading'
            })
            .addCase(fetchIdUser.rejected, (state) => {
                state.fetchStatus = 'error'
            })
    },
})


export default idUserSlice;

