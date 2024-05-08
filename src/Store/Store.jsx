import { configureStore } from '@reduxjs/toolkit'
import MyReducer from '../Redux/Reducer'
 
export const store = configureStore({
    reducer : MyReducer,
})