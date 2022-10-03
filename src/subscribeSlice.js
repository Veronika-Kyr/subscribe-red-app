import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const fetchSubscribe = createAsyncThunk(
    "subscribe/fetch",
    async (apiUrl) => {
        const response = await fetch(apiUrl, {}
        );
        return response.json();
    }
);

const subscribeSlice = createSlice({
    name: 'subscribing',
    initialState: { data: [], fetchStatus: '', isSubscribed: false },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSubscribe.fulfilled, (state, action) => {
            state.data = action.payload
            state.fetchStatus = 'success'
            state.isSubscribed = true
        })
            .addCase(fetchSubscribe.pending, (state) => {
                state.fetchStatus = 'loading'
            })
            .addCase(fetchSubscribe.rejected, (state) => {
                state.fetchStatus = 'error'
            })
    },
})

export default subscribeSlice;

