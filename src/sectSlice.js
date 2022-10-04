import { createSlice } from '@reduxjs/toolkit';


const sectionSlice = createSlice({
    name: 'usersection',
    initialState: {
        showSect: true,
    },
    reducers: {
        shouldShow(state) {
            state.showSect = !state.showSect
        },
    },
});

export default sectionSlice;
