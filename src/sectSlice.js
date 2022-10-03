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
        shouldHide(state) {
            state.showSect = false
        },
    },
});

export default sectionSlice;
