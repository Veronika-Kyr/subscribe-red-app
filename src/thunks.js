// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     entities: [],
//     loading: false,
// }


// export const fetchUsers = createAsyncThunk(
//     "users/fetch",
//     async () => {
//         const response = await fetch(
//             `http://localhost:3000/community`
//         );
//         const data = await response.json();
//         return data;
//     }
// );

// const usersSlice = createSlice({
//     name: 'users',
//     initialState,
//     reducers: {


//     },
//     extraReducers: (builder) => {
//         builder.addCase(fetchUsers.fulfilled, (state, action) => {



//             state.entities.push(action.payload)
//         })
//     },
// })


// export const postReducer = usersSlice.reducer

