import { configureStore } from '@reduxjs/toolkit';
// import { combineReducers } from '@reduxjs/toolkit';
// import { section } from "./reducers";
import sectionSlice from './sectSlice';
import usersSlice from './userSlice';
import subscribeSlice from './subscribeSlice';
import unsubscribeSlice from './unsubscribeSlice';


// const reducers = { section };
// const rootReducer = combineReducers(reducers);
const store = configureStore({
    reducer: {
        section: sectionSlice.reducer,
        users: usersSlice.reducer,
        subscribing: subscribeSlice.reducer,
        unsubscribing: unsubscribeSlice.reducer
    }
});
export default store;