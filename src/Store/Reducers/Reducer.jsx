// mySlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    auth: false,
    loading: false,
    analytics: {},
    toast: { show: false, message: '', type: '' },
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
        },
        showToast: (state, action) => {
            state.toast = {
                show: true,
                message: action.payload.message,
                type: action.payload.type,
                theme: action.payload.theme || 'light', 
            };
        },
        hideToast: (state) => {
            state.toast = { show: false, message: '', type: '' };
        },
    }
});

export const { handleAuth, handleLoading, handleAnalytics, showToast, hideToast } = MySlice.actions;
export default MySlice.reducer;
