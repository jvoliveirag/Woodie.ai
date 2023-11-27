import { Auth0Provider } from '@auth0/auth0-react';
//import 'dotenv/config';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  
  <Auth0Provider
    domain="dev-z5ep3yq8wmmwut7h.us.auth0.com"
    clientId="dM36PH86KsBldlE8kw0REo38IzUJERLG"
    authorizationParams={{
      redirect_uri: 'http://localhost:5173/home'
    }}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </Auth0Provider>,
  
)
