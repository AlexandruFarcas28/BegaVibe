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

  // ================== HANDLERE GENERALE ==================
  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLogoutToAuth = () => {
    // Înapoi la ecranul de login / register
    setRole(null);
    setPendingOrganizerEmail('');
  };

  // ================== LOGIN / SIGNUP ==================
  const handleUserLogin = () => {
    setRole('user');
  };

  const handleOrganizerLogin = () => {
    // Organizator deja existent → direct în dashboard
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
