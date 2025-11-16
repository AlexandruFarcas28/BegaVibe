// src/pages/UserEventsPage.jsx
import React from 'react';
import MainScreen from '../components/MainScreen';

// Pagina pentru utilizatorii simpli care afiseaza lista de evenimente + harta
function UserEventsPage({ theme, onToggleTheme, onLogout, authToken, currentUser }) {
  // ref + state pentru pozitionarea butonului de "inapoi la login" sub CTA din header
  const backBtnRef = React.useRef(null);
  const [backBtnStyle, setBackBtnStyle] = React.useState({ top: 64, right: 80 });

  React.useEffect(() => {
    function updatePosition() {
      const cta = document.querySelector('.header-cta');
      const btn = backBtnRef.current;
      if (cta && btn) {
        const rect = cta.getBoundingClientRect();
        const btnRect = btn.getBoundingClientRect();
        const left = rect.left + rect.width / 2 - btnRect.width / 2;
        const top = rect.bottom + 8; // mic gap sub CTA
        setBackBtnStyle({ left: Math.round(left), top: Math.round(top), zIndex: 1100 });
      } else {
        // fallback in coltul dreapta-sus daca CTA nu e gasit
        setBackBtnStyle({ top: 64, right: 80, zIndex: 1100 });
      }
    }

    const t = setTimeout(updatePosition, 50);
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, []);

  return (
    <>
      {/* Buton plutitor de "inapoi la login" */}
      <button
        ref={backBtnRef}
        style={{
          position: 'fixed',
          padding: '6px 10px',
          borderRadius: 999,
          border: '1px solid rgba(148,163,184,0.6)',
          background: '#0f172a',
          color: '#e5e7eb',
          cursor: 'pointer',
          ...(backBtnStyle.left !== undefined
            ? { left: backBtnStyle.left }
            : { right: backBtnStyle.right }),
          top: backBtnStyle.top,
          zIndex: backBtnStyle.zIndex || 1100,
        }}
        onClick={onLogout}
      >
        ← Inapoi la login
      </button>

      <MainScreen
        theme={theme}
        onToggleTheme={onToggleTheme}
        authToken={authToken}
        currentUser={currentUser}
      />
    </>
  );
}

export default UserEventsPage;

