import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    auth: false,
    loading: false,
};

export const MySlice = createSlice({
    name: 'my-slice',
    initialState,
    reducers: {
        handleAuth: (state, action) => {
            state.auth = action.payload; 
        },
        handleLoading: (state, action)  => {
            state.loading = action.payload;
        }
    }
});

export const { handleAuth,handleLoading} = MySlice.actions;
export default MySlice.reducer;
