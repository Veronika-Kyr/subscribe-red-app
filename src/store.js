import { configureStore } from '@reduxjs/toolkit';
import sectionSlice from './sectSlice';
import usersSlice from './userSlice';
import subscribeSlice from './subscribeSlice';
import idUserSlice from './idUserSlice';


const store = configureStore({
    reducer: {
        section: sectionSlice.reducer,
        users: usersSlice.reducer,
        subscribing: subscribeSlice.reducer,
        user: idUserSlice.reducer,
    }
});
export default store;
