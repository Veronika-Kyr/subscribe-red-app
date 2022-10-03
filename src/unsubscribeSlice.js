import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const fetchUnsubscribe = createAsyncThunk(
    "unsubscribe/fetch",
    async (apiUrl) => {
        const response = await fetch(apiUrl, {}
        );
        return response.json();
    }
);

const unsubscribeSlice = createSlice({
    name: 'unsubscribing',
    initialState: { data: [], fetchStatus: '', isSubscribed: true },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUnsubscribe.fulfilled, (state, action) => {
            state.data = action.payload
            state.fetchStatus = 'success'
            state.isSubscribed = false
        })
            .addCase(fetchUnsubscribe.pending, (state) => {
                state.fetchStatus = 'loading'
            })
            .addCase(fetchUnsubscribe.rejected, (state) => {
                state.fetchStatus = 'error'
            })
    },
})

export default unsubscribeSlice;

