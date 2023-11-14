import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store.js';
import { createRoot } from 'react-dom/client';
import CreateRoom from './components/index/CreateRoom.jsx';
import './style.scss';
import './logopagestyle.scss';

const root = createRoot(document.getElementById('root'));
root.render(
    <CreateRoom />
);