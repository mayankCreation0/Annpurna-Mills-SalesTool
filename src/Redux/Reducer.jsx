import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    auth: false,
};

export const MySlice = createSlice({
    name: 'my-slice',
    initialState,
    reducers: {
        handleAuth: (state, action) => {
            state.auth = action.payload; // Update auth state with action payload
        },
    }
});

export const { handleAuth } = MySlice.actions;
export default MySlice.reducer;
