function getTokenExpiration(token) {
  if (!token) return null;

  try {
      // Décoder la partie payload du token
      const payloadBase64 = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payloadBase64));

      // Extraire l'heure d'expiration
      const expirationTime = decodedPayload.exp; // en secondes UNIX

      // Convertir en date lisible
      const expirationDate = new Date(expirationTime * 1000);
      return expirationDate;
  } catch (error) {
      console.error("Erreur lors du décodage du token:", error);
      return null;
  }
}

// Exemple d'utilisation
// const token = "votre_jwt_token_ici";
// const expirationDate = getTokenExpiration(token);
// console.log("Date d'expiration:", expirationDate);

export function isTokenExpired(token) {
  const expirationDate = getTokenExpiration(token);
  if (!expirationDate) return true; // Si impossible d'extraire l'expiration

  const now = new Date();
  return expirationDate < now; // Vérifie si la date actuelle dépasse la date d'expiration
}



//  export const checkTokenExpiration = () => {
//     const expirationTime = localStorage.getItem('expirationTime');
//     if (expirationTime && Date.now() > expirationTime) {
//       localStorage.removeItem('token');
//       localStorage.removeItem('expirationTime');
//       return true;
//     }
//     return false;
//   };
  