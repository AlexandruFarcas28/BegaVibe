import React, { useState, useEffect, useRef } from 'react';

// ====================== MOCK DATA ======================
const MOCK_EVENTS = [
  {
    id: '1',
    title: 'Concert Rock în Timișoara',
    date: '2025-11-20',
    locationName: 'Sala Capitol, Timișoara',
    imageUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=300&fit=crop',
    category: 'Muzică',
    price: 'Gratuit',
    minAge: null,
  },
  {
    id: '2',
    title: 'Festival de teatru',
    date: '2025-11-22',
    locationName: 'Teatrul Național Timișoara',
    imageUrl: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&h=300&fit=crop',
    category: 'Teatru',
    price: '50 RON',
    minAge: 12,
  },
  {
    id: '3',
    title: 'Târg de Crăciun',
    date: '2025-12-01',
    locationName: 'Piața Victoriei, Timișoara',
    imageUrl: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=400&h=300&fit=crop',
    category: 'Festival',
    price: 'Gratuit',
    minAge: null,
  },
  {
    id: '4',
    title: 'Jazz Night (18+)',
    date: '2025-11-25',
    locationName: "D'arc Club, Timișoara",
    imageUrl: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400&h=300&fit=crop',
    category: 'Muzică',
    price: '40 RON',
    minAge: 18,
  },
  {
    id: '5',
    title: 'Expoziție de Artă Modernă',
    date: '2025-11-28',
    locationName: 'Muzeul de Artă Timișoara',
    imageUrl: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=400&h=300&fit=crop',
    category: 'Artă',
    price: '20 RON',
    minAge: null,
  },
  {
    id: '6',
    title: 'Stand-up Comedy Night (16+)',
    date: '2025-11-30',
    locationName: 'Comedy Club TM',
    imageUrl: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=400&h=300&fit=crop',
    category: 'Entertainment',
    price: '60 RON',
    minAge: 16,
  },
  {
    id: '7',
    title: 'Workshop Fotografie',
    date: '2025-12-03',
    locationName: 'Studio Photo Art, Timișoara',
    imageUrl: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=300&fit=crop',
    category: 'Workshop',
    price: '100 RON',
    minAge: 14,
  },
  {
    id: '8',
    title: 'Concurs de dans',
    date: '2025-12-05',
    locationName: 'Sala Polivalentă, Timișoara',
    imageUrl: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=400&h=300&fit=crop',
    category: 'Sport',
    price: 'Gratuit',
    minAge: null,
  },
];

const CATEGORIES = ['Toate', 'Muzică', 'Teatru', 'Festival', 'Artă', 'Entertainment', 'Workshop', 'Sport'];

// ====================== AUTH SCREEN ======================
function AuthScreen({ onAuthSuccess, theme, onToggleTheme }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      alert('Completați toate câmpurile.');
      return;
    }
    onAuthSuccess();
  };

  const handleRegister = () => {
    if (!email.trim() || !password.trim() || !confirmPass.trim()) {
      alert('Completați toate câmpurile.');
      return;
    }
    if (password !== confirmPass) {
      alert('Parolele nu se potrivesc!');
      return;
    }
    alert('Cont creat cu succes!');
    onAuthSuccess();
  };

  return (
    <div className={`auth-page ${theme}`}>
      <div className="auth-glow auth-glow-1" />
      <div className="auth-glow auth-glow-2" />
      <div className="auth-container">
        <button className="global-theme-toggle" onClick={onToggleTheme}>
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>

        <div className="auth-left">
          <div className="auth-branding">
            <h1 className="brand-title">BegaVibe</h1>
            <p className="brand-subtitle">Toate vibrațiile Timișoarei într-un singur loc.</p>
          </div>
          <div className="auth-illustration">
            <div className="floating-card card-1">🎭</div>
            <div className="floating-card card-2">🎵</div>
            <div className="floating-card card-3">🎨</div>
            <div className="floating-badge">
              <span className="badge-pill">LIVE</span>
              <span className="badge-text">Evenimente actualizate zilnic</span>
            </div>
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
                  <button onClick={() => setMode('register')} className="switch-link">
                    Înregistrează-te
                  </button>
                </p>
              ) : (
                <p>
                  Ai deja cont?{' '}
                  <button onClick={() => setMode('login')} className="switch-link">
                    Autentifică-te
                  </button>
                </p>
              )}
            </div>
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
          background: radial-gradient(circle at top, #a855f7 0, #0f172a 45%, #020617 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          position: relative;
          overflow: hidden;
        }

        .auth-page.light {
          background: radial-gradient(circle at top, #e0f2fe 0, #e5e7eb 45%, #f9fafb 100%);
        }

        .auth-glow {
          position: absolute;
          filter: blur(80px);
          opacity: 0.45;
          z-index: 0;
        }

        .auth-glow-1 {
          width: 260px;
          height: 260px;
          border-radius: 999px;
          background: #6366f1;
          top: -40px;
          left: -40px;
        }

        .auth-glow-2 {
          width: 300px;
          height: 300px;
          border-radius: 999px;
          background: #ec4899;
          bottom: -60px;
          right: -20px;
        }

        .auth-container {
          width: 100%;
          max-width: 1100px;
          background: rgba(15, 23, 42, 0.92);
          border-radius: 24px;
          border: 1px solid rgba(148, 163, 184, 0.35);
          backdrop-filter: blur(22px);
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
          min-height: 520px;
          position: relative;
          z-index: 1;
          box-shadow:
            0 30px 80px rgba(15, 23, 42, 0.9),
            0 0 0 1px rgba(148, 163, 184, 0.2);
        }

        .auth-page.light .auth-container {
          background: rgba(255, 255, 255, 0.95);
          border-color: #e5e7eb;
          box-shadow:
            0 24px 60px rgba(15, 23, 42, 0.15),
            0 0 0 1px rgba(148, 163, 184, 0.2);
        }

        .global-theme-toggle {
          position: absolute;
          top: 14px;
          right: 14px;
          z-index: 5;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(148, 163, 184, 0.8);
          background: rgba(15, 23, 42, 0.9);
          color: #e5e7eb;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
        }

        .auth-page.light .global-theme-toggle {
          background: #f9fafb;
          color: #111827;
        }

        .auth-left {
          padding: 40px 32px;
          position: relative;
          border-right: 1px solid rgba(148, 163, 184, 0.3);
          overflow: hidden;
        }

        .auth-branding {
          position: relative;
          z-index: 2;
        }

        .brand-title {
          font-size: 36px;
          font-weight: 900;
          color: #e5e7eb;
          margin-bottom: 10px;
          letter-spacing: -1px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .auth-page.light .brand-title {
          color: #111827;
        }

        .brand-title::after {
          content: '';
          width: 40px;
          height: 4px;
          border-radius: 999px;
          background: linear-gradient(to right, #a855f7, #6366f1, #22c55e);
        }

        .brand-subtitle {
          font-size: 15px;
          color: #cbd5f5;
          line-height: 1.6;
          max-width: 320px;
        }

        .auth-page.light .brand-subtitle {
          color: #4b5563;
        }

        .auth-illustration {
          margin-top: 50px;
          position: relative;
          height: 200px;
        }

        .floating-card {
          position: absolute;
          width: 78px;
          height: 78px;
          background: radial-gradient(circle at top left, rgba(248, 250, 252, 0.9), rgba(148, 163, 184, 0.2));
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
          animation: float 3s ease-in-out infinite;
          box-shadow:
            0 18px 40px rgba(15, 23, 42, 0.7),
            0 0 0 1px rgba(148, 163, 184, 0.3);
        }

        .card-1 { top: 0; left: 12%; animation-delay: 0s; }
        .card-2 { top: 50px; right: 15%; animation-delay: 0.8s; }
        .card-3 { bottom: -8px; left: 42%; animation-delay: 1.5s; }

        .floating-badge {
          position: absolute;
          bottom: 10px;
          right: 8%;
          padding: 9px 12px;
          border-radius: 999px;
          background: rgba(15, 23, 42, 0.9);
          border: 1px solid rgba(148, 163, 184, 0.5);
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #e5e7eb;
        }

        .badge-pill {
          padding: 3px 8px;
          border-radius: 999px;
          background: linear-gradient(to right, #22c55e, #16a34a);
          font-weight: 700;
          color: #020617;
        }

        .badge-text {
          color: #cbd5f5;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
        }

        .auth-right {
          padding: 32px 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .glass-card {
          background: radial-gradient(circle at top left, rgba(30, 64, 175, 0.7), rgba(15, 23, 42, 0.95));
          border-radius: 20px;
          padding: 26px 22px 22px;
          width: 100%;
          max-width: 420px;
          border: 1px solid rgba(148, 163, 184, 0.6);
          box-shadow:
            0 18px 40px rgba(15, 23, 42, 0.9),
            0 0 0 1px rgba(148, 163, 184, 0.4);
        }

        .auth-page.light .glass-card {
          background: #ffffff;
          border-color: #e5e7eb;
          box-shadow:
            0 18px 40px rgba(15, 23, 42, 0.12),
            0 0 0 1px rgba(148, 163, 184, 0.25);
        }

        .form-title {
          font-size: 24px;
          font-weight: 800;
          color: #f9fafb;
          margin-bottom: 6px;
        }

        .auth-page.light .form-title {
          color: #111827;
        }

        .form-subtitle {
          font-size: 13px;
          color: #9ca3af;
          margin-bottom: 20px;
        }

        .auth-page.light .form-subtitle {
          color: #6b7280;
        }

        .input-group {
          margin-bottom: 14px;
        }

        .input-label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: #cbd5f5;
          margin-bottom: 6px;
        }

        .auth-page.light .input-label {
          color: #4b5563;
        }

        .input-field {
          width: 100%;
          padding: 12px 12px;
          border-radius: 12px;
          border: 1px solid rgba(148, 163, 184, 0.6);
          background: rgba(15, 23, 42, 0.8);
          color: #e5e7eb;
          font-size: 14px;
          outline: none;
          transition: all 0.25s;
        }

        .auth-page.light .input-field {
          background: #f9fafb;
          color: #111827;
        }

        .input-field::placeholder {
          color: #64748b;
        }

        .input-field:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 1px #6366f1;
          background: rgba(15, 23, 42, 0.9);
        }

        .auth-page.light .input-field:focus {
          background: #ffffff;
        }

        .submit-button {
          width: 100%;
          padding: 12px;
          margin-top: 4px;
          border-radius: 999px;
          border: none;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          background-image: linear-gradient(135deg, #6366f1, #a855f7, #ec4899);
          color: #f9fafb;
          box-shadow:
            0 12px 30px rgba(99, 102, 241, 0.45),
            0 0 0 1px rgba(129, 140, 248, 0.6);
          transition: transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease;
        }

        .submit-button:hover {
          transform: translateY(-1px);
          filter: brightness(1.05);
        }

        .form-switch {
          text-align: center;
          margin-top: 14px;
          font-size: 12px;
          color: #9ca3af;
        }

        .auth-page.light .form-switch {
          color: #6b7280;
        }

        .switch-link {
          background: none;
          border: none;
          color: #a5b4fc;
          font-weight: 600;
          cursor: pointer;
          padding: 0;
        }

        .switch-link:hover {
          text-decoration: underline;
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
            padding: 24px 18px;
          }

          .glass-card {
            max-width: 420px;
            margin: 0 auto;
          }
        }

        @media (max-width: 480px) {
          .auth-page {
            padding: 10px;
          }

          .glass-card {
            padding: 22px 18px 18px;
          }

          .form-title {
            font-size: 22px;
          }
        }
      `}</style>
    </div>
  );
}

// ====================== MAIN SCREEN ======================
function MainScreen({ theme, onToggleTheme }) {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Toate');
  const [searchQuery, setSearchQuery] = useState('');
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [ticketCount, setTicketCount] = useState(1);

  // organizatori
  const [showOrganizerForm, setShowOrganizerForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    locationName: '',
    imageUrl: '',
    category: 'Muzică',
    price: '',
    minAge: '',
  });

  // verificare identitate
  const [showAgeModal, setShowAgeModal] = useState(false);
  const [dob, setDob] = useState('');
  const [idSeries, setIdSeries] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [ageError, setAgeError] = useState('');

  const infoCardRef = useRef(null);
  const mapPanelRef = useRef(null);

  useEffect(() => {
    // aici doar încărcăm evenimentele, fără top/left random
    setEvents(MOCK_EVENTS);
  }, []);

  useEffect(() => {
    if (selectedEvent && infoCardRef.current) {
      const isMobile = window.innerWidth <= 768;
      infoCardRef.current.scrollIntoView({
        behavior: 'smooth',
        block: isMobile ? 'start' : 'nearest',
      });
    }
  }, [selectedEvent]);

  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      selectedCategory === 'Toate' || event.category === selectedCategory;
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.locationName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category) => {
    const colors = {
      Muzică: '#f97373',
      Teatru: '#a855f7',
      Festival: '#f59e0b',
      Artă: '#22c9e8',
      Entertainment: '#ec4899',
      Workshop: '#22c55e',
      Sport: '#3b82f6',
    };
    return colors[category] || '#6366f1';
  };

  const handleShowOnMap = (event) => {
    setSelectedEvent(event);
    if (mapPanelRef.current) {
      mapPanelRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'end',
      });
    }
  };

  const handleGetDirections = (event) => {
    if (!event) return;
    const destination = encodeURIComponent(event.locationName);
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    window.open(url, '_blank');
  };

  const handleOpenTickets = (event) => {
    setSelectedEvent(event);
    setTicketCount(1);

    if (event.minAge) {
      setDob('');
      setIdSeries('');
      setIdNumber('');
      setAgeError('');
      setShowAgeModal(true);
    } else {
      setTicketModalOpen(true);
    }
  };

  const handleConfirmAge = () => {
    if (!dob || !idSeries.trim() || !idNumber.trim()) {
      setAgeError('Te rugăm să completezi toate câmpurile.');
      return;
    }

    const birthDate = new Date(dob);
    if (isNaN(birthDate.getTime())) {
      setAgeError('Data nașterii este invalidă.');
      return;
    }

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    const minAge = selectedEvent?.minAge || 0;
    if (age < minAge) {
      setAgeError(`Acest eveniment este disponibil doar pentru persoane de ${minAge}+ ani.`);
      return;
    }

    setAgeError('');
    setShowAgeModal(false);
    setTicketModalOpen(true);
  };

  const handleOrganizerInputChange = (field, value) => {
    setNewEvent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEvent.title.trim() || !newEvent.date.trim() || !newEvent.locationName.trim()) {
      alert('Completează cel puțin numele, data și locația evenimentului.');
      return;
    }

    const minAge = newEvent.minAge ? parseInt(newEvent.minAge, 10) : null;

    const created = {
      id: String(Date.now()),
      title: newEvent.title.trim(),
      date: newEvent.date.trim(),
      locationName: newEvent.locationName.trim(),
      imageUrl:
        newEvent.imageUrl.trim() ||
        'https://images.unsplash.com/photo-1515165562835-c4c9e0737eaa?w=400&h=300&fit=crop',
      category: newEvent.category || 'Muzică',
      price: newEvent.price.trim() || 'Gratuit',
      minAge: Number.isNaN(minAge) ? null : minAge,
    };

    setEvents((prev) => [...prev, created]);
    setShowOrganizerForm(false);
    setNewEvent({
      title: '',
      date: '',
      locationName: '',
      imageUrl: '',
      category: 'Muzică',
      price: '',
      minAge: '',
    });
    alert('Evenimentul a fost adăugat pe hartă și în listă!');
  };

  const handleConfirmTickets = () => {
    setTicketModalOpen(false);
    alert('Biletele au fost rezervate! Vei primi detaliile pe email.');
  };

  const computeTotalPrice = () => {
    if (!selectedEvent) return 0;
    if (selectedEvent.price.toLowerCase().includes('gratuit')) return 0;
    const numeric = parseInt(selectedEvent.price);
    if (isNaN(numeric)) return 0;
    return numeric * ticketCount;
  };

  // ==== aici construim link-ul pentru Google Maps embed ====
  const getMapSrc = () => {
    if (selectedEvent) {
      const query = encodeURIComponent(selectedEvent.locationName);
      return `https://www.google.com/maps?q=${query}&z=16&output=embed`;
    }
    const cityQuery = encodeURIComponent('Timișoara, România');
    return `https://www.google.com/maps?q=${cityQuery}&z=13&output=embed`;
  };

  return (
    <div className={`app ${theme}`}>
      <header className="header">
        <div className="header-content">
          <div className="header-top">
            <div>
              <h1 className="app-title">BegaVibe</h1>
              <p className="app-tagline">Agenda ta inteligentă de evenimente.</p>
            </div>
            <div className="header-actions">
              <button className="theme-toggle" onClick={onToggleTheme}>
                {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
              </button>
              <div className="location-badge">
                <span className="location-dot" />
                <span className="location-text">Timișoara</span>
              </div>
              <button
                className="header-cta"
                onClick={() => {
                  if (mapPanelRef.current) {
                    mapPanelRef.current.scrollIntoView({
                      behavior: 'smooth',
                      block: 'nearest',
                      inline: 'end',
                    });
                  }
                }}
              >
                Vezi harta orașului
              </button>
            </div>
          </div>
          <p className="header-subtitle">
            Găsește concerte, festivaluri, expoziții și experiențe cool. Filtrează, explorează și
            cumpără bilete în câteva secunde. Pentru evenimente 16+ / 18+ se face verificare de
            identitate cu buletinul.
          </p>
        </div>
      </header>

      <div className="main-layout">
        <section className="events-panel">
          <div className="panel-inner">
            {/* SECȚIUNE ORGANIZATORI */}
            <div className="organizer-section">
              <div className="organizer-text">
                <strong>Ești organizator?</strong>
                <span>Adaugă-ți evenimentul pe hartă și în lista BegaVibe.</span>
              </div>
              <button
                className="organizer-toggle-btn"
                onClick={() => setShowOrganizerForm((prev) => !prev)}
              >
                {showOrganizerForm ? 'Închide panoul organizator' : 'Deschide panoul organizator'}
              </button>
            </div>

            {showOrganizerForm && (
              <form className="organizer-form" onSubmit={handleAddEvent}>
                <div className="organizer-grid">
                  <div className="org-field">
                    <label>Nume eveniment</label>
                    <input
                      type="text"
                      value={newEvent.title}
                      onChange={(e) => handleOrganizerInputChange('title', e.target.value)}
                      placeholder="Ex: Concert indie în aer liber"
                    />
                  </div>
                  <div className="org-field">
                    <label>Data</label>
                    <input
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => handleOrganizerInputChange('date', e.target.value)}
                    />
                  </div>
                  <div className="org-field">
                    <label>Locație</label>
                    <input
                      type="text"
                      value={newEvent.locationName}
                      onChange={(e) =>
                        handleOrganizerInputChange('locationName', e.target.value)
                      }
                      placeholder="Ex: Piața Libertății, Timișoara"
                    />
                  </div>
                  <div className="org-field">
                    <label>Categorie</label>
                    <select
                      value={newEvent.category}
                      onChange={(e) => handleOrganizerInputChange('category', e.target.value)}
                    >
                      {CATEGORIES.filter((c) => c !== 'Toate').map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="org-field">
                    <label>Preț (ex: 40 RON sau Gratuit)</label>
                    <input
                      type="text"
                      value={newEvent.price}
                      onChange={(e) => handleOrganizerInputChange('price', e.target.value)}
                      placeholder="Ex: 40 RON"
                    />
                  </div>
                  <div className="org-field">
                    <label>Vârstă minimă (opțional)</label>
                    <input
                      type="number"
                      min="0"
                      value={newEvent.minAge}
                      onChange={(e) => handleOrganizerInputChange('minAge', e.target.value)}
                      placeholder="Ex: 18"
                    />
                  </div>
                  <div className="org-field full">
                    <label>Imagine (URL – opțional)</label>
                    <input
                      type="text"
                      value={newEvent.imageUrl}
                      onChange={(e) => handleOrganizerInputChange('imageUrl', e.target.value)}
                      placeholder="Link către o fotografie reprezentativă"
                    />
                  </div>
                </div>
                <button className="organizer-submit" type="submit">
                  Salvează evenimentul
                </button>
              </form>
            )}

            {/* SEARCH + FILTRE */}
            <div className="search-section">
              <div className="search-bar">
                <input
                  type="text"
                  className="search-input"
                  placeholder="🔍 Caută după nume, locație, categorie..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="filters-section">
                <div className="filters-scroll">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      className={`filter-chip ${
                        selectedCategory === category ? 'active' : ''
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              <div className="results-info">
                <p>{filteredEvents.length} evenimente găsite</p>
              </div>
            </div>

            {/* LISTĂ EVENIMENTE */}
            <div className="events-grid">
              {filteredEvents.map((event) => (
                <article key={event.id} className="event-card">
                  <div className="event-image-wrapper">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="event-image"
                    />
                    <div
                      className="event-category-badge"
                      style={{ backgroundColor: getCategoryColor(event.category) }}
                    >
                      {event.category}
                    </div>
                    {event.minAge && (
                      <div className="age-badge-card">
                        {event.minAge}+
                      </div>
                    )}
                    <div className="event-gradient-overlay" />
                  </div>

                  <div className="event-content">
                    <h3 className="event-title">{event.title}</h3>

                    <div className="event-info-row">
                      <span className="event-icon">📅</span>
                      <span className="event-text">{event.date}</span>
                    </div>

                    <div className="event-info-row">
                      <span className="event-icon">📍</span>
                      <span className="event-text">{event.locationName}</span>
                    </div>

                    {event.minAge && (
                      <div className="event-info-row">
                        <span className="event-icon">🪪</span>
                        <span className="event-text">
                          Verificare identitate pentru {event.minAge}+
                        </span>
                      </div>
                    )}

                    <div className="event-footer">
                      <div className="price-block">
                        <span className="event-price">{event.price}</span>
                        <span className="event-price-label">
                          {event.price.toLowerCase().includes('gratuit')
                            ? 'Intrare liberă'
                            : 'bilet / persoană'}
                        </span>
                      </div>
                      <div className="card-actions">
                        <button
                          className="outline-btn"
                          onClick={() => handleShowOnMap(event)}
                        >
                          Vezi pe hartă
                        </button>
                        <button
                          className="primary-mini-btn"
                          onClick={() => handleOpenTickets(event)}
                        >
                          Cumpără
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PANOU HARTĂ */}
        <section className="map-panel" ref={mapPanelRef}>
          <div className="panel-inner map-panel-inner">
            <div className="map-header">
              <h2 className="map-title">Hartă evenimente</h2>
              <p className="map-subtitle">
                Apasă pe „Vezi pe hartă” la un eveniment, iar harta se va centra pe locația lui.
                Poți face zoom și să miști harta liber.
              </p>
            </div>

            <div className="map-container">
              <div className="map-view">
                <iframe
                  title="Harta eveniment"
                  src={getMapSrc()}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {selectedEvent ? (
                <aside className="map-info-card" ref={infoCardRef}>
                  <div className="info-header">
                    <span
                      className="info-category"
                      style={{
                        backgroundColor: getCategoryColor(selectedEvent.category),
                      }}
                    >
                      {selectedEvent.category}
                    </span>
                    {selectedEvent.minAge && (
                      <span className="info-age-pill">{selectedEvent.minAge}+</span>
                    )}
                  </div>
                  <h3 className="info-title">{selectedEvent.title}</h3>
                  <div className="info-row">
                    <span className="info-icon">📍</span>
                    <span>{selectedEvent.locationName}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-icon">📅</span>
                    <span>{selectedEvent.date}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-icon">💰</span>
                    <span>{selectedEvent.price}</span>
                  </div>
                  {selectedEvent.minAge && (
                    <div className="info-row">
                      <span className="info-icon">🪪</span>
                      <span>
                        Acces permis doar persoanelor de {selectedEvent.minAge}+ ani. Verificare la
                        intrare pe baza buletinului.
                      </span>
                    </div>
                  )}

                  <div className="info-actions">
                    <button
                      className="get-directions-btn"
                      onClick={() => handleGetDirections(selectedEvent)}
                    >
                      Obține direcții
                    </button>
                    <button
                      className="secondary-btn"
                      onClick={() => handleOpenTickets(selectedEvent)}
                    >
                      Cumpără bilete
                    </button>
                  </div>
                </aside>
              ) : (
                <aside className="map-empty-state">
                  <span className="empty-icon">🗺️</span>
                  <p>Selectează „Vezi pe hartă” la un eveniment pentru a-l vedea pe hartă.</p>
                </aside>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* MODAL VERIFICARE IDENTITATE */}
      {showAgeModal && selectedEvent && (
        <div className="ticket-modal-backdrop" onClick={() => setShowAgeModal(false)}>
          <div
            className="ticket-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="ticket-modal-header">
              <h3>Verificare identitate</h3>
              <button
                className="modal-close-btn"
                onClick={() => setShowAgeModal(false)}
              >
                ×
              </button>
            </div>
            <p className="ticket-event-name">{selectedEvent.title}</p>
            <p className="ticket-event-meta">
              Acest eveniment este pentru {selectedEvent.minAge}+ ani. Introdu datele din buletin.
            </p>

            <div className="ticket-row">
              <label>Data nașterii</label>
              <input
                type="date"
                className="age-input"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
            <div className="ticket-row">
              <label>Seria buletinului</label>
              <input
                type="text"
                className="age-input"
                value={idSeries}
                onChange={(e) => setIdSeries(e.target.value)}
                placeholder="Ex: TM"
              />
            </div>
            <div className="ticket-row">
              <label>Numărul buletinului</label>
              <input
                type="text"
                className="age-input"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                placeholder="Ex: 123456"
              />
            </div>

            {ageError && <p className="age-error">{ageError}</p>}

            <button
              className="ticket-confirm-btn"
              onClick={handleConfirmAge}
            >
              Confirmă identitatea
            </button>
          </div>
        </div>
      )}

      {/* MODAL BILETE */}
      {ticketModalOpen && selectedEvent && (
        <div className="ticket-modal-backdrop" onClick={() => setTicketModalOpen(false)}>
          <div
            className="ticket-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="ticket-modal-header">
              <h3>Cumpără bilete</h3>
              <button
                className="modal-close-btn"
                onClick={() => setTicketModalOpen(false)}
              >
                ×
              </button>
            </div>
            <p className="ticket-event-name">{selectedEvent.title}</p>
            <p className="ticket-event-meta">
              📅 {selectedEvent.date} · 📍 {selectedEvent.locationName}
            </p>

            <div className="ticket-row">
              <label>Număr bilete</label>
              <div className="ticket-counter">
                <button
                  onClick={() =>
                    setTicketCount((prev) => (prev > 1 ? prev - 1 : 1))
                  }
                >
                  -
                </button>
                <span>{ticketCount}</span>
                <button
                  onClick={() =>
                    setTicketCount((prev) => (prev < 10 ? prev + 1 : 10))
                  }
                >
                  +
                </button>
              </div>
            </div>

            <div className="ticket-row">
              <label>Preț</label>
              {selectedEvent.price.toLowerCase().includes('gratuit') ? (
                <span className="ticket-free">Eveniment gratuit</span>
              ) : (
                <span className="ticket-price-line">
                  {selectedEvent.price} x {ticketCount} ={' '}
                  <strong>{computeTotalPrice()} RON</strong>
                </span>
              )}
            </div>

            <button
              className="ticket-confirm-btn"
              onClick={handleConfirmTickets}
            >
              Confirmă comanda
            </button>
          </div>
        </div>
      )}

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        .app {
          min-height: 100vh;
          width: 100%;
          overflow-x: hidden;
          background: radial-gradient(circle at top left, #020617 0%, #020617 30%, #020617 100%);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: #e5e7eb;
        }

        .app.light {
          background: #f3f4f6;
          color: #111827;
        }

        .header {
          background: radial-gradient(circle at top, rgba(56, 189, 248, 0.18), transparent 60%),
            linear-gradient(135deg, #111827 0%, #020617 60%, #020617 100%);
          padding: 24px 16px 18px;
          border-bottom: 1px solid rgba(148, 163, 184, 0.35);
        }

        .app.light .header {
          background: linear-gradient(135deg, #e5e7eb 0%, #f9fafb 100%);
          border-bottom-color: #e5e7eb;
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          margin-bottom: 8px;
        }

        .app-title {
          font-size: 28px;
          font-weight: 900;
          letter-spacing: -0.6px;
          color: #f9fafb;
        }

        .app.light .app-title {
          color: #111827;
        }

        .app-tagline {
          font-size: 13px;
          color: #9ca3af;
          margin-top: 4px;
        }

        .app.light .app-tagline {
          color: #4b5563;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .theme-toggle {
          padding: 7px 12px;
          border-radius: 999px;
          border: 1px solid rgba(148, 163, 184, 0.8);
          background: rgba(15, 23, 42, 0.9);
          color: #e5e7eb;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
        }

        .app.light .theme-toggle {
          background: #f9fafb;
          color: #111827;
        }

        .location-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 11px;
          border-radius: 999px;
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(148, 163, 184, 0.4);
        }

        .app.light .location-badge {
          background: #ffffff;
          border-color: #e5e7eb;
        }

        .location-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #22c55e;
          box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.35);
        }

        .location-text {
          font-size: 12px;
          font-weight: 600;
          color: #e5e7eb;
        }

        .app.light .location-text {
          color: #111827;
        }

        .header-cta {
          padding: 9px 14px;
          border-radius: 999px;
          border: 1px solid rgba(56, 189, 248, 0.8);
          background: radial-gradient(circle at top left, rgba(56, 189, 248, 0.25), rgba(15, 23, 42, 0.95));
          color: #e0f2fe;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 10px 25px rgba(15, 23, 42, 0.6);
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .app.light .header-cta {
          background: #0ea5e9;
          color: #f0f9ff;
        }

        .header-subtitle {
          font-size: 13px;
          color: #9ca3af;
          margin-top: 4px;
          max-width: 540px;
        }

        .app.light .header-subtitle {
          color: #6b7280;
        }

        /* LAYOUT PRINCIPAL */
        .main-layout {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding: 18px 16px 26px;
          gap: 16px;
          -webkit-overflow-scrolling: touch;
        }

        .events-panel,
        .map-panel {
          flex: 0 0 100%;
          scroll-snap-align: start;
        }

        .panel-inner {
          background: radial-gradient(circle at top left, rgba(15, 23, 42, 0.96), rgba(15, 23, 42, 0.98));
          border-radius: 18px;
          padding: 18px 14px 20px;
          border: 1px solid rgba(148, 163, 184, 0.4);
          box-shadow: 0 16px 30px rgba(15, 23, 42, 0.9);
        }

        .app.light .panel-inner {
          background: #ffffff;
          border-color: #e5e7eb;
          box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
        }

        .map-panel-inner {
          background: radial-gradient(circle at top right, rgba(30, 64, 175, 0.35), rgba(15, 23, 42, 0.98));
        }

        .app.light .map-panel-inner {
          background: #ffffff;
        }

        /* ORGANIZATORI */
        .organizer-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
          padding: 10px 10px;
          border-radius: 12px;
          background: rgba(15, 23, 42, 0.8);
          border: 1px dashed rgba(148, 163, 184, 0.7);
        }

        .app.light .organizer-section {
          background: #f9fafb;
          border-color: #e5e7eb;
        }

        .organizer-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
          font-size: 11px;
        }

        .organizer-text strong {
          font-size: 12px;
        }

        .organizer-toggle-btn {
          padding: 7px 10px;
          border-radius: 999px;
          border: none;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          color: #f9fafb;
          white-space: nowrap;
        }

        .organizer-form {
          margin-bottom: 14px;
          padding: 10px 10px 12px;
          border-radius: 12px;
          background: rgba(15, 23, 42, 0.85);
          border: 1px solid rgba(148, 163, 184, 0.7);
        }

        .app.light .organizer-form {
          background: #f9fafb;
          border-color: #e5e7eb;
        }

        .organizer-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-bottom: 8px;
        }

        .org-field {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .org-field.full {
          grid-column: 1 / -1;
        }

        .org-field label {
          font-size: 11px;
          color: #cbd5f5;
        }

        .app.light .org-field label {
          color: #4b5563;
        }

        .org-field input,
        .org-field select {
          padding: 7px 9px;
          border-radius: 8px;
          border: 1px solid rgba(148, 163, 184, 0.8);
          background: rgba(15, 23, 42, 0.9);
          color: #e5e7eb;
          font-size: 12px;
          outline: none;
        }

        .app.light .org-field input,
        .app.light .org-field select {
          background: #ffffff;
          color: #111827;
          border-color: #d1d5db;
        }

        .organizer-submit {
          width: 100%;
          padding: 8px;
          border-radius: 999px;
          border: none;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: #022c22;
          font-size: 12px;
          font-weight: 800;
          cursor: pointer;
        }

        /* SEARCH + FILTRE */
        .search-section {
          margin-bottom: 14px;
        }

        .search-bar {
          margin-bottom: 10px;
        }

        .search-input {
          width: 100%;
          padding: 12px 14px;
          border-radius: 12px;
          border: 1px solid rgba(148, 163, 184, 0.7);
          background: rgba(15, 23, 42, 0.9);
          color: #e5e7eb;
          font-size: 13px;
          outline: none;
          transition: all 0.25s;
        }

        .app.light .search-input {
          background: #ffffff;
          color: #111827;
          border-color: #d1d5db;
        }

        .search-input::placeholder {
          color: #64748b;
        }

        .filters-section {
          margin-bottom: 8px;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .filters-scroll {
          display: flex;
          gap: 8px;
          padding-bottom: 4px;
        }

        .filter-chip {
          padding: 7px 14px;
          border-radius: 999px;
          border: 1px solid rgba(148, 163, 184, 0.7);
          background: rgba(15, 23, 42, 0.9);
          font-size: 12px;
          font-weight: 600;
          color: #9ca3af;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.2s;
        }

        .app.light .filter-chip {
          background: #ffffff;
          color: #4b5563;
          border-color: #d1d5db;
        }

        .filter-chip.active {
          background: linear-gradient(135deg, #6366f1, #a855f7);
          border-color: transparent;
          color: #f9fafb;
        }

        .results-info {
          font-size: 11px;
          color: #6b7280;
        }

        /* EVENIMENTE GRID */
        .events-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
          margin-top: 10px;
        }

        .event-card {
          background: radial-gradient(circle at top left, rgba(30, 64, 175, 0.25), rgba(15, 23, 42, 0.98));
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(148, 163, 184, 0.4);
          box-shadow: 0 12px 24px rgba(15, 23, 42, 0.9);
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }

        .app.light .event-card {
          background: #ffffff;
          border-color: #e5e7eb;
          box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
        }

        .event-card:hover {
          transform: translateY(-2px);
        }

        .event-image-wrapper {
          position: relative;
          height: 170px;
          overflow: hidden;
        }

        .event-image {
          width: 100%;
          height: 100%;
          max-width: 100%;
          object-fit: cover;
          transform: scale(1.02);
          transition: transform 0.3s ease;
          display: block;
        }

        .event-card:hover .event-image {
          transform: scale(1.08);
        }

        .event-gradient-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, transparent 50%);
        }

        .app.light .event-gradient-overlay {
          background: linear-gradient(to top, rgba(15, 23, 42, 0.4) 0%, transparent 50%);
        }

        .event-category-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          padding: 5px 10px;
          border-radius: 999px;
          color: #f9fafb;
          font-size: 10px;
          font-weight: 700;
          backdrop-filter: blur(14px);
          border: 1px solid rgba(248, 250, 252, 0.5);
        }

        .age-badge-card {
          position: absolute;
          left: 10px;
          top: 10px;
          padding: 4px 9px;
          border-radius: 999px;
          background: rgba(15, 23, 42, 0.85);
          color: #f9fafb;
          font-size: 10px;
          font-weight: 700;
        }

        .event-content {
          padding: 12px 12px 12px;
        }

        .event-title {
          font-size: 15px;
          font-weight: 700;
          margin-bottom: 6px;
        }

        .event-info-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
          font-size: 12px;
          color: #9ca3af;
        }

        .app.light .event-info-row {
          color: #6b7280;
        }

        .event-footer {
          margin-top: 8px;
          padding-top: 8px;
          border-top: 1px dashed rgba(75, 85, 99, 0.8);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
        }

        .app.light .event-footer {
          border-top-color: #e5e7eb;
        }

        .price-block {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .event-price {
          font-size: 15px;
          font-weight: 800;
          color: #a5b4fc;
        }

        .event-price-label {
          font-size: 10px;
          color: #6b7280;
        }

        .card-actions {
          display: flex;
          gap: 6px;
        }

        .outline-btn {
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(148, 163, 184, 0.7);
          background: transparent;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
        }

        .app.light .outline-btn {
          background: #ffffff;
          border-color: #d1d5db;
        }

        .primary-mini-btn {
          padding: 6px 12px;
          border-radius: 999px;
          border: none;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          color: #f9fafb;
          white-space: nowrap;
        }

        /* HARTĂ */
        .map-header {
          margin-bottom: 10px;
        }

        .map-title {
          font-size: 17px;
          font-weight: 800;
        }

        .map-subtitle {
          font-size: 11px;
          color: #9ca3af;
          margin-top: 4px;
        }

        .app.light .map-subtitle {
          color: #6b7280;
        }

        .map-container {
          margin-top: 12px;
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 14px;
        }

        .map-view {
          background: #000;
          border-radius: 16px;
          height: 340px;
          position: relative;
          box-shadow: 0 0 0 1px rgba(30, 64, 175, 0.5);
          overflow: hidden;
        }

        .map-view iframe {
          width: 100%;
          height: 100%;
          border: 0;
          display: block;
        }

        .app.light .map-view {
          box-shadow: 0 0 0 1px rgba(148, 163, 184, 0.6);
        }

        .map-info-card,
        .map-empty-state {
          background: rgba(15, 23, 42, 0.97);
          border-radius: 16px;
          padding: 14px 12px;
          border: 1px solid rgba(148, 163, 184, 0.6);
          box-shadow: 0 14px 30px rgba(15, 23, 42, 0.9);
        }

        .app.light .map-info-card,
        .app.light .map-empty-state {
          background: #f9fafb;
          border-color: #e5e7eb;
          box-shadow: 0 12px 28px rgba(15, 23, 42, 0.1);
        }

        .info-header {
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .info-category {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 999px;
          color: #f9fafb;
          font-size: 10px;
          font-weight: 700;
          border: 1px solid rgba(248, 250, 252, 0.7);
        }

        .info-age-pill {
          padding: 4px 10px;
          border-radius: 999px;
          background: rgba(15, 23, 42, 0.9);
          color: #f9fafb;
          font-size: 10px;
          font-weight: 700;
        }

        .app.light .info-age-pill {
          background: #111827;
          color: #f9fafb;
        }

        .info-title {
          font-size: 15px;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .info-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 5px;
          font-size: 12px;
          color: #9ca3af;
        }

        .app.light .info-row {
          color: #6b7280;
        }

        .info-actions {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-top: 10px;
        }

        .get-directions-btn {
          width: 100%;
          padding: 9px;
          border-radius: 999px;
          border: none;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: #022c22;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
        }

        .secondary-btn {
          width: 100%;
          padding: 8px;
          border-radius: 999px;
          border: 1px solid rgba(129, 140, 248, 0.9);
          background: transparent;
          color: #c7d2fe;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        .app.light .secondary-btn {
          background: #ffffff;
          color: #4f46e5;
          border-color: #a5b4fc;
        }

        .map-empty-state {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          color: #9ca3af;
          font-size: 12px;
        }

        .empty-icon {
          font-size: 32px;
          margin-bottom: 6px;
        }

        /* MODAL BILETE + AGE */
        .ticket-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 50;
        }

        .ticket-modal {
          width: 100%;
          max-width: 360px;
          background: radial-gradient(circle at top left, rgba(30, 64, 175, 0.5), rgba(15, 23, 42, 0.98));
          border-radius: 16px;
          padding: 16px 14px 16px;
          border: 1px solid rgba(148, 163, 184, 0.8);
          box-shadow: 0 24px 50px rgba(15, 23, 42, 0.95);
        }

        .ticket-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }

        .ticket-modal-header h3 {
          font-size: 16px;
          font-weight: 800;
        }

        .modal-close-btn {
          width: 26px;
          height: 26px;
          border-radius: 999px;
          border: 1px solid rgba(148, 163, 184, 0.9);
          background: rgba(15, 23, 42, 0.95);
          color: #e5e7eb;
          font-size: 16px;
          cursor: pointer;
        }

        .ticket-event-name {
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 2px;
        }

        .ticket-event-meta {
          font-size: 11px;
          color: #9ca3af;
          margin-bottom: 10px;
        }

        .ticket-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          margin-bottom: 8px;
          gap: 6px;
        }

        .ticket-row label {
          color: #cbd5f5;
        }

        .age-input {
          flex: 1;
          padding: 6px 8px;
          border-radius: 8px;
          border: 1px solid rgba(148, 163, 184, 0.9);
          background: rgba(15, 23, 42, 0.9);
          color: #e5e7eb;
          font-size: 12px;
        }

        .age-error {
          font-size: 11px;
          color: #f97373;
          margin-bottom: 6px;
        }

        .ticket-counter {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border-radius: 999px;
          border: 1px solid rgba(148, 163, 184, 0.85);
          padding: 3px 9px;
        }

        .ticket-counter button {
          width: 22px;
          height: 22px;
          border-radius: 999px;
          border: none;
          background: rgba(15, 23, 42, 0.9);
          color: #e5e7eb;
          font-size: 15px;
          cursor: pointer;
        }

        .ticket-counter span {
          min-width: 22px;
          text-align: center;
        }

        .ticket-free {
          color: #4ade80;
          font-weight: 600;
        }

        .ticket-price-line {
          color: #e5e7eb;
        }

        .ticket-confirm-btn {
          width: 100%;
          margin-top: 4px;
          padding: 9px;
          border-radius: 999px;
          border: none;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          color: #f9fafb;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
        }

        /* RESPONSIVE DESKTOP */
        @media (min-width: 900px) {
          .main-layout {
            display: grid;
            grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
            overflow-x: visible;
            scroll-snap-type: none;
          }

          .events-panel,
          .map-panel {
            flex: initial;
            scroll-snap-align: none;
          }

          .panel-inner {
            height: 100%;
          }

          .events-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .map-container {
            grid-template-columns: 1.4fr 1fr;
          }
        }

        /* RESPONSIVE TABLET / SMALL */
        @media (max-width: 768px) {
          .header-top {
            flex-direction: column;
            align-items: flex-start;
          }

          .header-actions {
            width: 100%;
            justify-content: space-between;
          }

          .map-container {
            grid-template-columns: 1fr;
          }

          .map-view {
            height: 300px;
          }

          .panel-inner {
            padding: 16px 12px 18px;
          }
        }

        /* TELEFOANE FOARTE MICI (sub ~360px) */
        @media (max-width: 360px) {
          .app-title {
            font-size: 24px;
          }

          .header {
            padding: 18px 10px 12px;
          }

          .main-layout {
            padding: 14px 10px 20px;
          }

          .event-title {
            font-size: 14px;
          }

          .map-view {
            height: 260px;
          }
        }
      `}</style>
    </div>
  );
}

// ====================== APP ROOT ======================
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [theme, setTheme] = useState('dark');

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
      {!isAuthenticated ? (
        <AuthScreen
          onAuthSuccess={handleLoginSuccess}
          theme={theme}
          onToggleTheme={handleToggleTheme}
        />
      ) : (
        <MainScreen
          theme={theme}
          onToggleTheme={handleToggleTheme}
        />
      )}
    </>
  );
}

export default App;
