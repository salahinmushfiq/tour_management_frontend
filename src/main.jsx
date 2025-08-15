import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import FacebookSDKLoader from './components/FacebookSDKLoader';
import GoogleSDKLoader from './components/GoogleSDKLoader';
import { BrowserRouter as Router } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleSDKLoader />
    <FacebookSDKLoader />
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
