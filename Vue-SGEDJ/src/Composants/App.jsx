import { useState } from 'react'
import './App.css'

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifier que les champs ne sont pas vides
    if (!email || !password) {
      setErrorMessage('Tous les champs sont requis.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      // Simuler une requête d'authentification vers une API
      const response = await fetch('https://api.exemple.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Si la réponse n'est pas OK, afficher un message d'erreur
      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Identifiants incorrects');
        setIsLoading(false);
        return;
      }

      // Si la connexion est réussie, récupérer le token d'authentification
      const data = await response.json();
      sessionStorage.setItem('authToken', data.token);  // Stockage du token dans sessionStorage

      // Rediriger vers le dashboard ou une autre page
      window.location.href = '/dashboard';  // À adapter selon ton application

    } catch (error) {
      // Gérer les erreurs en cas de problème de réseau ou autre
      console.error('Erreur lors de la connexion:', error);
      setErrorMessage('Une erreur est survenue, veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="left-side">
        <h2>Système de Gestion Électronique des Documents Judiciaires</h2>
        <p>
          Notre SGEDJ vous permet de gérer facilement et de manière sécurisée
          tous vos documents judiciaires. Connectez-vous pour accéder à vos
          dossiers et suivre l'avancement de vos affaires.
        </p>
      </div>
      <div className="right-side">
        <form onSubmit={handleSubmit} className="login-form">
          <h3>Connexion</h3>

          {/* Affichage du message d'erreur si nécessaire */}
          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <div className="input-group">
            <label htmlFor="email">Login</label>
            <input
              type="email"
              id="email"
              placeholder="Entrez votre login"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? 'Chargement...' : 'Se connecter'}
          </button>

          <div className="forgot-password">
            <a href="#">Mot de passe oublié ?</a>
          </div>
        </form>
      </div>
    </div>
  );
};


export default App
