import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css"
import App from './App.js';
import { MarkerProvider } from './components/MapPage/MarkerContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
     <MarkerProvider>
    <App />
    </MarkerProvider>
);

