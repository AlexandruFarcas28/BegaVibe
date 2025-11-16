// src/pages/UserEventsPage.jsx
import React from 'react';
import MainScreen from '../components/MainScreen'; // dacă deja ai MainScreen

function UserEventsPage({ theme, onToggleTheme, onLogout }) {
  // ref + state pentru poziționarea butonului plutitor sub CTA din header
  const backBtnRef = React.useRef(null);
  const [backBtnStyle, setBackBtnStyle] = React.useState({
    top: 64,
    right: 80,
    zIndex: 1100,
  });

  React.useEffect(() => {
    function updatePosition() {
      const cta = document.querySelector('.header-cta');
      const btn = backBtnRef.current;

      if (cta && btn) {
        const rect = cta.getBoundingClientRect();
        const btnRect = btn.getBoundingClientRect();

        const left = rect.left + rect.width / 2 - btnRect.width / 2;
        const top = rect.bottom + 8; // mic gap sub CTA

        setBackBtnStyle({
          left: Math.round(left),
          top: Math.round(top),
          zIndex: 1100,
        });
      } else {
        // fallback în colțul dreapta-sus
        setBackBtnStyle({
          top: 64,
          right: 80,
          zIndex: 1100,
        });
      }
    }

    // rulează puțin după mount ca să aibă layout
    const t = setTimeout(updatePosition, 50);

    // doar la resize, NU și la scroll
    window.addEventListener('resize', updatePosition);

    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', updatePosition);
    };
  }, []);

  return (
    <>
      <button
        ref={backBtnRef}
        style={{
          position: 'fixed', // <-- IMPORTANT: fixed, nu absolute
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
        ⬅ Înapoi la login
      </button>

      <MainScreen theme={theme} onToggleTheme={onToggleTheme} />
    </>
  );
}

export default UserEventsPage;
