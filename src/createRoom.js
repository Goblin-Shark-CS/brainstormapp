import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store.js';
import { createRoot } from 'react-dom/client';
import CreateRoom from './components/index/CreateRoom.jsx';
import './style.scss';
import './logopagestyle.scss';


// Roboto font for Material UI
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';

const root = createRoot(document.getElementById('root'));
root.render(
    <CreateRoom />
);