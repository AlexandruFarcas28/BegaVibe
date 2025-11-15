// src/App.jsx
import React, { useState } from 'react';
import AuthScreen from './components/AuthScreen';
import OrganizerSignupPage from './pages/OrganizerSignupPage';
import UserEventsPage from './pages/UserEventsPage';
import OrganizerDashboard from './pages/OrganizerDashboard';

function App() {
  const [role, setRole] = useState(null); // null | 'user' | 'organizer' | 'organizer-signup'
  const [theme, setTheme] = useState('dark');
  const [pendingOrganizerEmail, setPendingOrganizerEmail] = useState('');

  const handleUserLogin = () => {
    setRole('user');
  };

  const handleOrganizerLogin = () => {
    setRole('organizer');
  };

  const handleOrganizerSignup = (email, password) => {
    setPendingOrganizerEmail(email);
    setRole('organizer-signup');
  };

  const handleOrganizerSignupComplete = () => {
    setRole('organizer');
    setPendingOrganizerEmail('');
  };

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Dacă organizatorul e în proces de completare date
  if (role === 'organizer-signup') {
    return (
      <OrganizerSignupPage
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onComplete={handleOrganizerSignupComplete}
        email={pendingOrganizerEmail}
      />
    );
  }

  // Dacă nu ești logat încă → ecran auth
  if (!role) {
    return (
      <AuthScreen
        onAuthSuccess={handleUserLogin}
        onOrganizerLogin={handleOrganizerLogin}
        onOrganizerSignup={handleOrganizerSignup}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />
    );
  }

  // Dacă ești user normal → pagina cu evenimente
  if (role === 'user') {
    return (
      <UserEventsPage
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onLogout={() => setRole(null)}
      />
    );
  }

  // Dacă ești organizator → dashboard organizator
  return (
    <OrganizerDashboard
      theme={theme}
      onToggleTheme={handleToggleTheme}
      onLogout={() => setRole(null)}
    />
  );
}

export default App;