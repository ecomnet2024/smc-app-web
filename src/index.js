import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import client from './lib/apolloClient';
import { ApolloProvider } from '@apollo/client';


import Login from './pages/login';
import PrivateRoute from './components/PrivateRoute';

import { UserProvider } from './context/authContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
  <UserProvider>
    <React.StrictMode>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes>
            {/* Route publique pour la page de connexion */}
            <Route path="/login" element={<Login />} />
            
            {/* Route privée pour protéger l'application */}
            <Route path="*" element={<PrivateRoute element={<App />} />} />
        </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </React.StrictMode>
  </UserProvider>
);

