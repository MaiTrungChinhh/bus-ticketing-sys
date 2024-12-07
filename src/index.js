import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { Environment } from './Environment/environment';
import { store } from './redux/store';
import reportWebVitals from './reportWebVitals';
import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
const clientId = Environment.GG_CLIENT_ID || 'YOUR_DEFAULT_CLIENT_ID';
console.log('REACT_APP_GG_CLIENT_ID:', process.env.REACT_APP_GG_CLIENT_ID);

root.render(
  
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={clientId}>
      <App />
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
