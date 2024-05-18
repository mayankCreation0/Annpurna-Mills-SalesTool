import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    auth: false,
    loading: false,
    analytics: {},
};

export const MySlice = createSlice({
    name: 'my-slice',
    initialState,
    reducers: {
        handleAuth: (state, action) => {
            state.auth = action.payload;
        },
        handleLoading: (state, action) => {
            state.loading = action.payload;
        },
        handleAnalytics: (state, action) => {
            state.analytics = action.payload;
            console.log("redirecting to analytics",state.analytics);
        }
    }
});

export const { handleAuth, handleLoading, handleAnalytics } = MySlice.actions;
export default MySlice.reducer;
