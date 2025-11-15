// src/pages/UserEventsPage.jsx
import React from 'react';
import MainScreen from '../components/MainScreen'; // dacă deja ai MainScreen

// Dacă deja ai definit MainScreen cu toată logica de evenimente și hartă,
// poți să-l refolosești pur și simplu:
function UserEventsPage({ theme, onToggleTheme, onLogout }) {
  return (
    <>
      {/* Poți adăuga un mic header cu logout */}
      <button
        style={{
          position: 'fixed',
          top: 12,
          left: 12,
          zIndex: 1000,
          padding: '6px 10px',
          borderRadius: 999,
          border: '1px solid rgba(148,163,184,0.6)',
          background: '#0f172a',
          color: '#e5e7eb',
          cursor: 'pointer',
        }}
        onClick={onLogout}
      >
        ⬅ Înapoi la login
      </button>

      <MainScreen theme={theme} onToggleTheme={onToggleTheme} />
    </>
  );
}

export default UserEventsPage;
