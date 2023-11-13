import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store.js';
import { createRoot } from 'react-dom/client';
import Login from './components/login/Login.jsx';
import './style.scss';

createRoot(document.getElementById('root')).render( <Login />);