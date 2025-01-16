import React from 'react';
import { Navigate } from 'react-router-dom';



// Route privée qui redirige vers la page de connexion si l'utilisateur n'est pas authentifié
const PrivateRoute = ({ element }) => {

  const isAuthenticated = !!localStorage.getItem('token');

  return isAuthenticated ? element : <Navigate to="/login" />;
  
};

export default PrivateRoute;
