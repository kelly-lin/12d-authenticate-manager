import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import LoginPage from './components/login-page.component';

ReactDOM.render(
  <React.StrictMode>
    <LoginPage />
    {/* <App /> */}
  </React.StrictMode>,
  document.getElementById('root')
);