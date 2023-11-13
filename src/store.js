import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './mainSlice.js';
import webSocketMiddleware from './middleware/webSocketMiddleware';

// Note: Not tested with complex paths
let ws_url = new URL(window.location.href)
ws_url.protocol = "ws:";
ws_url.port = 443;




export const store = configureStore({
    reducer: { main: mainReducer, },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(webSocketMiddleware(ws_url.toString())),
});