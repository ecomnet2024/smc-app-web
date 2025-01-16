// UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';


import { jwtDecode } from "jwt-decode";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token"); 
    console.log("Token", token)
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("Contenu du token :", decodedToken);
        setUser(decodedToken); // Stocke les informations de l'utilisateur décodées
      } catch (error) {
        console.error("Erreur lors du décodage du token", error);
      }
    }
  }, []);

    // Fonction pour mettre à jour l'utilisateur après login
  const updateUser = (token) => {
      try {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken); // Met à jour les données utilisateur
        localStorage.setItem('token', token); // Optionnel : met à jour le token
      } catch (error) {
        console.error("Erreur lors de la mise à jour de l'utilisateur", error);
      }
    };

  return (
    <UserContext.Provider value={{user, updateUser}}>
      {children}
    </UserContext.Provider>
  );
};
