import jwtDecode from 'jwt-decode';

const checkTokenExpiration = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const { exp } = jwtDecode(token); // Assurez-vous que votre token contient un champ `exp`
    const currentTime = Date.now() / 1000;

    if (exp < currentTime) {
      localStorage.removeItem('token'); // Supprimez le token expiré
      return false; // Token expiré
    }
    return true; // Token valide
  }
  return false; // Aucun token trouvé
};
