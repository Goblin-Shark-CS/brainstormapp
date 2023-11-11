import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './mainSlice.js';

export const store = configureStore({
    reducer: {
        main: mainReducer,
    },
});