import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import HomePage from './pages/Home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HomePage />
  </React.StrictMode>
);
