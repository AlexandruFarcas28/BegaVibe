// src/components/AuthScreen.jsx
import React, { useState } from 'react';

function AuthScreen({ onAuthSuccess, onOrganizerLogin, onOrganizerSignup, theme, onToggleTheme }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [isOrganizer, setIsOrganizer] = useState(false);

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      alert('Completați toate câmpurile.');
      return;
    }
    
    // Simulăm verificare dacă e cont de organizator
    const isOrganizerAccount = email.includes('organizator') || email.includes('org');
    
    if (isOrganizerAccount && onOrganizerLogin) {
      onOrganizerLogin();
    } else {
      onAuthSuccess();
    }
  };

  const handleRegister = () => {
    if (!email.trim() || !password.trim() || !confirmPass.trim()) {
      alert('Completați toate câmpurile obligatorii.');
      return;
    }
    if (password !== confirmPass) {
      alert('Parolele nu se potrivesc!');
      return;
    }
    if (isOrganizer) {
      // Redirecționează către pagina de completare date organizator
      if (onOrganizerSignup) {
        onOrganizerSignup(email, password);
      }
    } else {
      alert('Cont creat cu succes!');
      onAuthSuccess();
    }
  };

  return (
    <div className={`auth-page ${theme}`}>
      <div className="auth-container">
        <button className="global-theme-toggle" onClick={onToggleTheme}>
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>

        <div className="auth-left">
          <div className="auth-branding">
            <h1 className="brand-title">
              BegaVibe
              <span className="brand-accent"></span>
            </h1>
            <p className="brand-subtitle">
              Toate vibrațiile Timișoarei într-un singur loc.
            </p>
            <div className="brand-features">
              <div className="feature-item">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 2L2 7L12 12L22 7L12 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 17L12 22L22 17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 12L12 17L22 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="feature-text">
                  <strong>Evenimente live</strong>
                  <span>Actualizate zilnic</span>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <path
                      d="M12 6V12L16 14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="feature-text">
                  <strong>Bilete instant</strong>
                  <span>Rezervare rapidă</span>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <div className="feature-text">
                  <strong>Hartă interactivă</strong>
                  <span>Orientare ușoară</span>
                </div>
              </div>
            </div>
          </div>

          <div className="timisoara-skyline">
            <svg viewBox="0 0 400 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0 120V80H20V60H40V80H60V70H80V90H100V75H120V95H140V85H160V100H180V90H200V85H220V95H240V80H260V90H280V75H300V85H320V70H340V80H360V65H380V80H400V120H0Z"
                fill="url(#skyline-gradient)"
                opacity="0.15"
              />
              <path
                d="M50 60L55 50L60 60M170 85L175 75L180 85M310 70L315 60L320 70"
                stroke="url(#light-gradient)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="55" cy="50" r="2" fill="#fbbf24" />
              <circle cx="175" cy="75" r="2" fill="#fbbf24" />
              <circle cx="315" cy="60" r="2" fill="#fbbf24" />
              <defs>
                <linearGradient id="skyline-gradient" x1="0" y1="0" x2="400" y2="0">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="50%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
                <linearGradient id="light-gradient" x1="0" y1="0" x2="400" y2="0">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>
            </svg>
            <div className="river-flow"></div>
          </div>
        </div>

        <div className="auth-right">
          <div className="glass-card auth-form">
            <h2 className="form-title">
              {mode === 'login' ? 'Bine ai revenit!' : 'Creează-ți contul'}
            </h2>
            <p className="form-subtitle">
              {mode === 'login'
                ? 'Intră în vibe-ul orașului cu un singur cont.'
                : 'Află primul despre concerte, festivaluri și experiențe noi.'}
            </p>

            {mode === 'register' && (
              <div className="organizer-toggle">
                <button
                  type="button"
                  className={`toggle-option ${!isOrganizer ? 'active' : ''}`}
                  onClick={() => setIsOrganizer(false)}
                >
                  Participant
                </button>
                <button
                  type="button"
                  className={`toggle-option ${isOrganizer ? 'active' : ''}`}
                  onClick={() => setIsOrganizer(true)}
                >
                  Organizator
                </button>
              </div>
            )}

            <div className="form-scroll-container">
              <div className="input-group">
                <label className="input-label">Email</label>
                <input
                  type="email"
                  className="input-field"
                  placeholder="nume@exemplu.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label className="input-label">Parolă</label>
                <input
                  type="password"
                  className="input-field"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {mode === 'register' && (
                <div className="input-group">
                  <label className="input-label">Confirmă parola</label>
                  <input
                    type="password"
                    className="input-field"
                    placeholder="••••••••"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                  />
                </div>
              )}
            </div>

            <button
              className="submit-button"
              onClick={mode === 'login' ? handleLogin : handleRegister}
            >
              {mode === 'login' ? 'Continuă' : 'Creează cont'}
            </button>

            <div className="form-switch">
              {mode === 'login' ? (
                <p>
                  Nu ai cont?{' '}
                  <button
                    onClick={() => setMode('register')}
                    className="switch-link"
                  >
                    Înregistrează-te
                  </button>
                </p>
              ) : (
                <p>
                  Ai deja cont?{' '}
                  <button
                    onClick={() => setMode('login')}
                    className="switch-link"
                  >
                    Autentifică-te
                  </button>
                </p>
              )}
            </div>

            {mode === 'login' && (
              <div className="login-hint">
                <p>
                  💡 Sfat: Organizatorii pot folosi email-uri care conțin{' '}
                  <span className="hint-highlight">"organizator"</span> sau{' '}
                  <span className="hint-highlight">"org"</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: #020617;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .auth-page {
          min-height: 100vh;
          width: 100%;
          background: radial-gradient(ellipse at top, rgba(99, 102, 241, 0.15) 0%, #020617 50%, #020617 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
          position: relative;
          overflow: hidden;
        }

        .auth-page.light {
          background: radial-gradient(ellipse at top, #e0f2fe 0%, #f3f4f6 50%, #f9fafb 100%);
        }

        .auth-page::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -10%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.4), transparent 70%);
          filter: blur(100px);
          animation: pulse 8s ease-in-out infinite;
        }

        .auth-page::after {
          content: '';
          position: absolute;
          bottom: -30%;
          right: -10%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.3), transparent 70%);
          filter: blur(100px);
          animation: pulse 10s ease-in-out infinite reverse;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }

        .auth-container {
          width: 100%;
          max-width: 1200px;
          background: rgba(15, 23, 42, 0.7);
          border-radius: 32px;
          border: 1px solid rgba(148, 163, 184, 0.2);
          backdrop-filter: blur(40px);
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
          min-height: 600px;
          position: relative;
          z-index: 1;
          box-shadow:
            0 40px 100px rgba(0, 0, 0, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          overflow: hidden;
        }

        .auth-page.light .auth-container {
          background: rgba(255, 255, 255, 0.9);
          border-color: rgba(226, 232, 240, 0.8);
          box-shadow:
            0 24px 60px rgba(15, 23, 42, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 1);
        }

        .global-theme-toggle {
          position: absolute;
          top: 20px;
          right: 20px;
          z-index: 5;
          padding: 10px 16px;
          border-radius: 12px;
          border: 1px solid rgba(148, 163, 184, 0.3);
          background: rgba(15, 23, 42, 0.5);
          backdrop-filter: blur(10px);
          color: #e5e7eb;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .global-theme-toggle:hover {
          background: rgba(15, 23, 42, 0.7);
          border-color: rgba(148, 163, 184, 0.5);
        }

        .auth-page.light .global-theme-toggle {
          background: rgba(255, 255, 255, 0.8);
          color: #111827;
          border-color: #e5e7eb;
        }

        .auth-left {
          padding: 60px 50px;
          position: relative;
          border-right: 1px solid rgba(148, 163, 184, 0.15);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
        }

        .auth-left::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, transparent 50%);
          pointer-events: none;
        }

        .auth-branding {
          position: relative;
          z-index: 2;
        }

        .brand-title {
          font-size: 48px;
          font-weight: 900;
          color: #f9fafb;
          margin-bottom: 12px;
          letter-spacing: -2px;
          display: flex;
          align-items: center;
          gap: 12px;
          line-height: 1;
        }

        .auth-page.light .brand-title {
          color: #111827;
        }

        .brand-accent {
          width: 6px;
          height: 40px;
          border-radius: 10px;
          background: linear-gradient(180deg, #6366f1 0%, #a855f7 50%, #ec4899 100%);
          animation: glow 2s ease-in-out infinite;
        }

        @keyframes glow {
          0%, 100% { opacity: 1; box-shadow: 0 0 20px rgba(99, 102, 241, 0.5); }
          50% { opacity: 0.7; box-shadow: 0 0 30px rgba(168, 85, 247, 0.7); }
        }

        .brand-subtitle {
          font-size: 16px;
          color: #94a3b8;
          line-height: 1.6;
          max-width: 400px;
          margin-bottom: 40px;
        }

        .auth-page.light .brand-subtitle {
          color: #64748b;
        }

        .brand-features {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          border-radius: 16px;
          background: rgba(15, 23, 42, 0.4);
          border: 1px solid rgba(148, 163, 184, 0.1);
          transition: all 0.3s ease;
        }

        .feature-item:hover {
          background: rgba(15, 23, 42, 0.6);
          border-color: rgba(148, 163, 184, 0.2);
          transform: translateX(5px);
        }

        .auth-page.light .feature-item {
          background: rgba(255, 255, 255, 0.6);
          border-color: #e5e7eb;
        }

        .auth-page.light .feature-item:hover {
          background: rgba(255, 255, 255, 0.9);
        }

        .feature-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          flex-shrink: 0;
        }

        .feature-icon svg {
          width: 20px;
          height: 20px;
        }

        .feature-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .feature-text strong {
          font-size: 14px;
          font-weight: 600;
          color: #f9fafb;
        }

        .auth-page.light .feature-text strong {
          color: #111827;
        }

        .feature-text span {
          font-size: 12px;
          color: #94a3b8;
        }

        .auth-page.light .feature-text span {
          color: #64748b;
        }

        .timisoara-skyline {
          position: relative;
          margin-top: 40px;
        }

        .timisoara-skyline svg {
          width: 100%;
          height: auto;
          opacity: 0.6;
        }

        .river-flow {
          height: 3px;
          background: linear-gradient(90deg, transparent, #3b82f6, #6366f1, transparent);
          margin-top: 8px;
          border-radius: 10px;
          position: relative;
          overflow: hidden;
        }

        .river-flow::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
          animation: flow 3s linear infinite;
        }

        @keyframes flow {
          to { left: 100%; }
        }

        .auth-right {
          padding: 50px 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .glass-card {
          background: rgba(15, 23, 42, 0.6);
          border-radius: 24px;
          padding: 32px 28px;
          width: 100%;
          max-width: 450px;
          border: 1px solid rgba(148, 163, 184, 0.2);
          box-shadow:
            0 20px 50px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          display: flex;
          flex-direction: column;
        }

        .auth-page.light .glass-card {
          background: rgba(255, 255, 255, 0.8);
          border-color: #e5e7eb;
          box-shadow:
            0 20px 50px rgba(15, 23, 42, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 1);
        }

        .form-title {
          font-size: 28px;
          font-weight: 800;
          color: #f9fafb;
          margin-bottom: 8px;
          letter-spacing: -0.5px;
        }

        .auth-page.light .form-title {
          color: #111827;
        }

        .form-subtitle {
          font-size: 14px;
          color: #94a3b8;
          margin-bottom: 28px;
          line-height: 1.5;
        }

        .auth-page.light .form-subtitle {
          color: #64748b;
        }

        .organizer-toggle {
          display: flex;
          gap: 8px;
          padding: 6px;
          background: rgba(15, 23, 42, 0.6);
          border-radius: 12px;
          margin-bottom: 24px;
          border: 1px solid rgba(148, 163, 184, 0.2);
          flex-shrink: 0;
        }

        .auth-page.light .organizer-toggle {
          background: #f3f4f6;
          border-color: #e5e7eb;
        }

        .toggle-option {
          flex: 1;
          padding: 10px;
          border-radius: 8px;
          border: none;
          background: transparent;
          color: #94a3b8;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .toggle-option.active {
          background: linear-gradient(135deg, #6366f1, #a855f7);
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
        }

        .auth-page.light .toggle-option {
          color: #64748b;
        }

        .auth-page.light .toggle-option.active {
          color: #ffffff;
        }

        .form-scroll-container {
          margin-bottom: 16px;
        }

        .input-group {
          margin-bottom: 18px;
        }

        .input-label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #cbd5e1;
          margin-bottom: 8px;
        }

        .auth-page.light .input-label {
          color: #475569;
        }

        .input-field {
          width: 100%;
          padding: 14px 16px;
          border-radius: 12px;
          border: 1px solid rgba(148, 163, 184, 0.3);
          background: rgba(15, 23, 42, 0.6);
          color: #e5e7eb;
          font-size: 14px;
          outline: none;
          transition: all 0.3s;
        }

        .auth-page.light .input-field {
          background: #ffffff;
          color: #111827;
          border-color: #d1d5db;
        }

        .input-field::placeholder {
          color: #64748b;
        }

        .input-field:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
          background: rgba(15, 23, 42, 0.8);
        }

        .auth-page.light .input-field:focus {
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .submit-button {
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          border: none;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          background: linear-gradient(135deg, #6366f1, #a855f7, #ec4899);
          color: #ffffff;
          box-shadow:
            0 10px 25px rgba(99, 102, 241, 0.3),
            0 4px 12px rgba(168, 85, 247, 0.2);
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .submit-button:hover {
          transform: translateY(-2px);
          box-shadow:
            0 15px 35px rgba(99, 102, 241, 0.4),
            0 6px 16px rgba(168, 85, 247, 0.3);
        }

        .form-switch {
          text-align: center;
          margin-top: 20px;
          font-size: 13px;
          color: #94a3b8;
          flex-shrink: 0;
        }

        .auth-page.light .form-switch {
          color: #64748b;
        }

        .switch-link {
          background: none;
          border: none;
          padding: 0;
          margin: 0;
          cursor: pointer;
          color: #a5b4fc;
          font-weight: 600;
          text-decoration: none;
        }

        .switch-link:hover {
          text-decoration: underline;
        }

        .login-hint {
          margin-top: 10px;
          font-size: 12px;
          color: #9ca3af;
        }

        .auth-page.light .login-hint {
          color: #6b7280;
        }

        .hint-highlight {
          font-weight: 600;
          color: #a5b4fc;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .auth-container {
            grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
          }

          .auth-left {
            padding: 40px 32px;
          }

          .auth-right {
            padding: 40px 32px;
          }
        }

        @media (max-width: 900px) {
          .auth-container {
            grid-template-columns: 1fr;
            min-height: auto;
          }

          .auth-left {
            display: none;
          }

          .auth-right {
            padding: 32px 20px;
          }

          .glass-card {
            max-width: 420px;
            margin: 0 auto;
          }
        }

        @media (max-width: 480px) {
          .auth-page {
            padding: 18px 10px;
          }

          .glass-card {
            padding: 24px 18px 20px;
          }

          .form-title {
            font-size: 24px;
          }

          .brand-title {
            font-size: 40px;
          }
        }
      `}</style>
    </div>
  );
}

export default AuthScreen;