import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const fetchUsers = createAsyncThunk(
    "users/fetch",
    async () => {
        const response = await fetch('http://localhost:3000/community');
        return response.json();
    }
);

const usersSlice = createSlice({
    name: 'users',
    initialState: { data: [], fetchStatus: '' },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.data = action.payload
            state.fetchStatus = 'success'
        })
            .addCase(fetchUsers.pending, (state) => {
                state.fetchStatus = 'loading'
            })
            .addCase(fetchUsers.rejected, (state) => {
                state.fetchStatus = 'error'
            })
    },
})


export default usersSlice;

