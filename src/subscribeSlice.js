import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const fetchSubscribe = createAsyncThunk(
    "subscribe/fetch",
    async function ({ api: apiUrl, email: mail }) {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mail ? mail : {})
        }
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
            if (!action.payload.error) {
                state.data = action.payload
                state.fetchStatus = 'success'
                state.isSubscribed = !state.isSubscribed
            }
            else {
                state.data = action.payload
                state.fetchStatus = ''
                state.isSubscribed = false
            }
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

