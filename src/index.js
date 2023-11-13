import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store.js';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './style.scss';


// Roboto font for Material UI
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';

const root = createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);