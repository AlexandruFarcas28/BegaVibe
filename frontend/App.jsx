// src/App.jsx
import React, { useState } from 'react';
import AuthScreen from './components/AuthScreen';
import OrganizerSignupPage from './pages/OrganizerSignupPage';
import UserEventsPage from './pages/UserEventsPage';
import OrganizerDashboard from './pages/OrganizerDashboard';

function App() {
  // null | 'user' | 'organizer' | 'organizer-signup'
  const [role, setRole] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [pendingOrganizerEmail, setPendingOrganizerEmail] = useState('');
  const [authToken, setAuthToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // ================== HANDLERE GENERALE ==================
  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLogoutToAuth = () => {
    // Înapoi la ecranul de login / register
    setRole(null);
    setPendingOrganizerEmail('');
    setAuthToken(null);
    setCurrentUser(null);
  };

  // ================== LOGIN / SIGNUP ==================
  const handleUserLogin = (token, user) => {
    setAuthToken(token || null);
    setCurrentUser(user || null);
    setRole('user');
  };

  const handleOrganizerLogin = (token, user) => {
    // Organizator deja existent → direct în dashboard
    setAuthToken(token || null);
    setCurrentUser(user || null);
    setRole('organizer');
  };

  const handleOrganizerSignup = (email, password) => {
    // Aici poți salva email-ul dacă vrei să-l afișezi pe pagina de organizer-signup
    setPendingOrganizerEmail(email);
    setRole('organizer-signup');
  };

  // ================== RENDER PE ROL ==================

  // Utilizator normal → pagina cu evenimente
  if (role === 'user') {
    return (
      <UserEventsPage
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onLogout={handleLogoutToAuth} // butonul „Înapoi la login”
        authToken={authToken}
        currentUser={currentUser}
      />
    );
  }

  // Organizator în proces de completare (signup page)
  if (role === 'organizer-signup') {
    return (
      <OrganizerSignupPage
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onLogout={handleLogoutToAuth} // ⬅ asta trebuie ca să meargă „Înapoi”
        email={pendingOrganizerEmail}
        authToken={authToken}
        currentUser={currentUser}
      />
    );
  }

  // Organizator logat complet → dashboard
  if (role === 'organizer') {
    return (
      <OrganizerDashboard
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onLogout={handleLogoutToAuth}
        authToken={authToken}
        currentUser={currentUser}
      />
    );
  }

  // Ecranul de autentificare (când role === null)
  return (
    <AuthScreen
      theme={theme}
      onToggleTheme={handleToggleTheme}
      onAuthSuccess={handleUserLogin}       // user normal
      onOrganizerLogin={handleOrganizerLogin}   // login ca organizator
      onOrganizerSignup={handleOrganizerSignup} // „Devino organizator”
    />
  );
}

export default App;
