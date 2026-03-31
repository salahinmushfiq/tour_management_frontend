//src/main.jsx 
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import {FacebookSDKLoader,GoogleSDKLoader} from './components';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleSDKLoader />
    <FacebookSDKLoader />
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
