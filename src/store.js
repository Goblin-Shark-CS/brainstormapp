import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './mainSlice.js';
import webSocketMiddleware from './middleware/webSocketMiddleware';

const WS_URL = 'ws://localhost:443/';

export const store = configureStore({
    reducer: {
        main: mainReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(webSocketMiddleware(WS_URL))
});