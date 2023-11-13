import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './mainSlice.js';
import webSocketMiddleware from './middleware/webSocketMiddleware';

export const store = configureStore({
    reducer: {
        main: mainReducer,
    }
});