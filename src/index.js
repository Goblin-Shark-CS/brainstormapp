import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store.js';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './style.scss';

const root = createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);