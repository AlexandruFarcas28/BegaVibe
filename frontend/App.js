import React, { useState, useEffect, useRef } from 'react';

// Datele MOCK_EVENTS și CATEGORIES rămân neschimbate
const MOCK_EVENTS = [
  {
    id: '1',
    title: 'Concert Rock în Timișoara',
    date: '2025-11-20',
    locationName: 'Sala Capitol',
    imageUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=300&fit=crop',
    category: 'Muzică',
    price: 'Gratuit',
  },
  {
    id: '2',
    title: 'Festival de teatru',
    date: '2025-11-22',
    locationName: 'Teatrul Național Timișoara',
    imageUrl: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&h=300&fit=crop',
    category: 'Teatru',
    price: '50 RON',
  },
  {
    id: '3',
    title: 'Târg de Crăciun',
    date: '2025-12-01',
    locationName: 'Piața Victoriei',
    imageUrl: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=400&h=300&fit=crop',
    category: 'Festival',
    price: 'Gratuit',
  },
  {
    id: '4',
    title: 'Jazz Night',
    date: '2025-11-25',
    locationName: 'D\'arc Club',
    imageUrl: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400&h=300&fit=crop',
    category: 'Muzică',
    price: '40 RON',
  },
  {
    id: '5',
    title: 'Expoziție de Artă Modernă',
    date: '2025-11-28',
    locationName: 'Muzeul de Artă',
    imageUrl: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=400&h=300&fit=crop',
    category: 'Artă',
    price: '20 RON',
  },
  {
    id: '6',
    title: 'Stand-up Comedy Night',
    date: '2025-11-30',
    locationName: 'Comedy Club TM',
    imageUrl: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=400&h=300&fit=crop',
    category: 'Entertainment',
    price: '60 RON',
  },
  {
    id: '7',
    title: 'Workshop Fotografie',
    date: '2025-12-03',
    locationName: 'Studio Photo Art',
    imageUrl: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=300&fit=crop',
    category: 'Workshop',
    price: '100 RON',
  },
  {
    id: '8',
    title: 'Concurs de dans',
    date: '2025-12-05',
    locationName: 'Sala Polivalentă',
    imageUrl: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=400&h=300&fit=crop',
    category: 'Sport',
    price: 'Gratuit',
  },
];

const CATEGORIES = ['Toate', 'Muzică', 'Teatru', 'Festival', 'Artă', 'Entertainment', 'Workshop', 'Sport'];

// Componenta AuthScreen rămâne neschimbată (este deja excelentă)
function AuthScreen({ onAuthSuccess }) {
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
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-left">
          <div className="auth-branding">
            <h1 className="brand-title">BegaVibe</h1>
            <p className="brand-subtitle">Descoperă evenimentele din Timișoara</p>
          </div>
          <div className="auth-illustration">
            <div className="floating-card card-1">🎭</div>
            <div className="floating-card card-2">🎵</div>
            <div className="floating-card card-3">🎨</div>
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-form">
            <h2 className="form-title">
              {mode === 'login' ? 'Bine ai revenit!' : 'Creează cont'}
            </h2>
            <p className="form-subtitle">
              {mode === 'login' 
                ? 'Conectează-te pentru a continua' 
                : 'Alătură-te comunității noastre'}
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
        .auth-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .auth-container {
          width: 100%;
          max-width: 1100px;
          background: white;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 600px;
        }

        .auth-left {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 60px 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .auth-branding {
          position: relative;
          z-index: 2;
        }

        .brand-title {
          font-size: 48px;
          font-weight: 900;
          color: white;
          margin-bottom: 16px;
          letter-spacing: -1px;
        }

        .brand-subtitle {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.6;
        }

        .auth-illustration {
          margin-top: 60px;
          position: relative;
          height: 200px;
        }

        .floating-card {
          position: absolute;
          width: 80px;
          height: 80px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
          animation: float 3s ease-in-out infinite;
        }

        .card-1 {
          top: 0;
          left: 20%;
          animation-delay: 0s;
        }

        .card-2 {
          top: 60px;
          right: 20%;
          animation-delay: 1s;
        }

        .card-3 {
          bottom: 0;
          left: 40%;
          animation-delay: 2s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .auth-right {
          padding: 60px 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .auth-form {
          width: 100%;
          max-width: 400px;
        }

        .form-title {
          font-size: 32px;
          font-weight: 800;
          color: #1a202c;
          margin-bottom: 8px;
        }

        .form-subtitle {
          font-size: 15px;
          color: #718096;
          margin-bottom: 32px;
        }

        .input-group {
          margin-bottom: 20px;
        }

        .input-label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 8px;
        }

        .input-field {
          width: 100%;
          padding: 14px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 15px;
          transition: all 0.3s;
          outline: none;
        }

        .input-field:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .submit-button {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          margin-top: 8px;
        }

        .submit-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
        }

        .form-switch {
          text-align: center;
          margin-top: 24px;
          font-size: 14px;
          color: #718096;
        }

        .switch-link {
          background: none;
          border: none;
          color: #667eea;
          font-weight: 600;
          cursor: pointer;
          padding: 0;
        }

        .switch-link:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .auth-container {
            grid-template-columns: 1fr;
          }

          .auth-left {
            padding: 40px 24px;
            min-height: auto;
          }

          .brand-title {
            font-size: 36px;
          }

          .auth-illustration {
            display: none;
          }

          .auth-right {
            padding: 40px 24px;
          }

          .form-title {
            font-size: 28px;
          }
        }
      `}</style>
    </div>
  );
}

// *** MODIFICARE: Componenta MainScreen a fost actualizată masiv ***
function MainScreen() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentPage, setCurrentPage] = useState('list');
  const [selectedCategory, setSelectedCategory] = useState('Toate');
  const [searchQuery, setSearchQuery] = useState('');
  
  // *** MODIFICARE: Adăugăm un state pentru a gestiona tranziția
  // (Deși vom folosi o animație CSS mai simplă la final)
  // const [isPageChanging, setIsPageChanging] = useState(false);

  const infoCardRef = useRef(null);

  useEffect(() => {
    const eventsWithPositions = MOCK_EVENTS.map(event => ({
      ...event,
      top: Math.random() * 80 + 10,
      left: Math.random() * 80 + 10,
    }));
    setEvents(eventsWithPositions);
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


  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === 'Toate' || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.locationName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category) => {
    const colors = {
      'Muzică': '#f43f5e',
      'Teatru': '#8b5cf6',
      'Festival': '#f59e0b',
      'Artă': '#06b6d4',
      'Entertainment': '#ec4899',
      'Workshop': '#10b981',
      'Sport': '#3b82f6',
    };
    return colors[category] || '#6366f1';
  };
  
  // *** MODIFICARE: Funcție pentru a naviga la hartă
  // Am scos logica de tranziție cu state, folosim CSS pur
  const handleShowOnMap = (event) => {
    setSelectedEvent(event);
    setCurrentPage('map');
  };

  // *** MODIFICARE: Funcție pentru a reveni la listă
  const handleBackToList = () => {
    setCurrentPage('list');
    setSelectedEvent(null); // Deselectăm evenimentul la întoarcere
  }

  // *** NOU: Funcție pentru "Obține direcții"
  const handleGetDirections = (locationName) => {
    const destination = encodeURIComponent(`${locationName}, Timisoara`);
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    window.open(url, '_blank');
  };

  // *** NOU: Funcție pentru "Cumpără bilet"
  const handleBuyTicket = (eventTitle) => {
    alert(`Sistemul de bilete pentru "${eventTitle}" va fi disponibil în curând!`);
  };

  // *** NOU: SVG-ul pentru iconița de căutare
  const SearchIcon = () => (
    <svg
      className="search-icon-svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <div className="app">
      {currentPage === 'list' ? (
        // *** MODIFICARE: Clasă pentru animația de intrare
        <div className="list-page">
          <header className="header">
            <div className="header-content">
              <div className="header-top">
                <h1 className="app-title">BegaVibe</h1>
                <div className="location-badge">
                  <span className="location-icon">📍</span>
                  Timișoara
                </div>
              </div>
              <p className="header-subtitle">Descoperă cele mai tari evenimente din oraș</p>
            </div>
          </header>

          <div className="container">
            {/* *** MODIFICARE: Secțiune de căutare cu iconiță */}
            <div className="search-section">
              <SearchIcon />
              <input
                type="text"
                className="search-input"
                placeholder="Caută evenimente, locații..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="filters-section">
              <div className="filters-scroll">
                {CATEGORIES.map(category => (
                  <button
                    key={category}
                    className={`filter-chip ${selectedCategory === category ? 'active' : ''}`}
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

            <div className="events-grid">
              {filteredEvents.map((event) => (
                <div key={event.id} className="event-card">
                  <div className="event-image-wrapper">
                    <img src={event.imageUrl} alt={event.title} className="event-image" />
                    <div
                      className="event-category-badge"
                      style={{ backgroundColor: getCategoryColor(event.category) }}
                    >
                      {event.category}
                    </div>
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

                    {/* *** MODIFICARE: Footer-ul cardului cu 2 butoane */}
                    <div className="event-footer">
                      <span className="event-price">{event.price}</span>
                      <div className="event-actions">
                        <button 
                          className="buy-btn"
                          onClick={(e) => {
                            e.stopPropagation(); // Previne click-ul pe card
                            handleBuyTicket(event.title);
                          }}
                        >
                          Cumpără
                        </button>
                        <button 
                          className="view-map-btn" 
                          onClick={() => handleShowOnMap(event)}
                        >
                          Hartă
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // *** MODIFICARE: Clasă pentru animația de intrare
        <div className="map-page">
          <div className="map-header">
            {/* *** MODIFICARE: Butonul de înapoi folosește noua funcție */}
            <button className="back-btn" onClick={handleBackToList}>
              ← Înapoi
            </button>
            <h2 className="map-page-title">Hartă Evenimente</h2>
          </div>

          <div className="map-container">
            {/* *** MODIFICARE: .map-view are acum un fundal stilizat (prin CSS) */}
            <div className="map-view">
              {events.map((event, idx) => (
                <button
                  key={event.id}
                  className={`map-pin ${selectedEvent?.id === event.id ? 'selected' : ''}`}
                  style={{
                    left: `${event.left}%`,
                    top: `${event.top}%`,
                  }}
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="pin-pulse"></div>
                  <div className="pin-marker">{idx + 1}</div>
                </button>
              ))}
            </div>

            {selectedEvent ? (
              <div className="map-info-card" ref={infoCardRef}>
                <div className="info-header">
                  <span
                    className="info-category"
                    style={{ backgroundColor: getCategoryColor(selectedEvent.category) }}
                  >
                    {selectedEvent.category}
                  </span>
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
                
                {/* *** NOU: Acțiuni pe hartă (Direcții + Cumpără) */}
                <div className="map-info-card-actions">
                  <button 
                    className="get-directions-btn"
                    onClick={() => handleGetDirections(selectedEvent.locationName)}
                  >
                    Obține direcții
                  </button>
                  <button 
                    className="buy-btn-map"
                    onClick={() => handleBuyTicket(selectedEvent.title)}
                  >
                    Cumpără bilet
                  </button>
                </div>

              </div>
            ) : (
              <div className="map-empty-state">
                <span className="empty-icon">🗺️</span>
                <p>Selectează un marker pentru detalii</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* *** STILURI CSS ACTUALIZATE *** */}
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
          background: #f8fafc;
          /* Am actualizat font-family pentru un look mai modern */
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 
                       Roboto, Helvetica, Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* *** NOU: Animație de tip Fade pentru pagini *** */
        .list-page, .map-page {
          animation: pageFadeIn 0.4s cubic-bezier(0.215, 0.610, 0.355, 1);
        }

        @keyframes pageFadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 40px 20px;
          color: white;
          /* *** NOU: Umbră subtilă *** */
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .app-title {
          font-size: 32px;
          font-weight: 900;
          letter-spacing: -0.5px;
        }

        .location-badge {
          background: rgba(255, 255, 255, 0.2);
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .location-icon {
          font-size: 16px;
        }

        .header-subtitle {
          font-size: 16px;
          opacity: 0.95;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 32px 20px;
        }

        /* *** MODIFICARE: Stilizare secțiune căutare cu iconiță *** */
        .search-section {
          position: relative;
          margin-bottom: 24px;
        }

        .search-icon-svg {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          width: 20px;
          height: 20px;
          pointer-events: none; /* Să nu blocheze click-ul */
        }

        .search-input {
          width: 100%;
          padding: 16px 20px 16px 56px; /* Spațiu pentru iconiță */
          border: 2px solid #e2e8f0;
          border-radius: 16px;
          font-size: 16px;
          outline: none;
          transition: all 0.3s;
          font-weight: 500;
        }

        .search-input:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .filters-section {
          margin-bottom: 24px;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .filters-scroll {
          display: flex;
          gap: 12px;
          padding-bottom: 8px;
        }

        .filter-chip {
          padding: 10px 20px;
          border: 2px solid #e2e8f0;
          background: white;
          border-radius: 24px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          white-space: nowrap;
          color: #64748b;
        }

        .filter-chip:hover {
          border-color: #667eea;
          color: #667eea;
        }

        .filter-chip.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-color: transparent;
          color: white;
        }

        .results-info {
          margin-bottom: 24px;
          color: #64748b;
          font-size: 14px;
          font-weight: 500;
        }

        .events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
        }

        .event-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          /* *** MODIFICARE: Umbră mai fină *** */
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
          transition: all 0.3s;
        }

        .event-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
        }

        .event-image-wrapper {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .event-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s;
        }

        .event-card:hover .event-image {
          transform: scale(1.05);
        }

        .event-category-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          padding: 6px 14px;
          border-radius: 20px;
          color: white;
          font-size: 12px;
          font-weight: 700;
          backdrop-filter: blur(10px);
        }

        .event-content {
          padding: 20px;
        }

        .event-title {
          font-size: 18px;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 12px;
          line-height: 1.4;
        }

        .event-info-row {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
          gap: 8px;
          color: #64748b;
          font-size: 14px;
        }

        .event-icon {
          font-size: 14px;
        }

        .event-text {
          font-weight: 500;
        }

        /* *** MODIFICARE: Footer-ul cardului *** */
        .event-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #f1f5f9;
        }

        .event-price {
          font-size: 16px;
          font-weight: 700;
          color: #667eea;
        }

        /* *** NOU: Container pentru acțiunile de pe card *** */
        .event-actions {
          display: flex;
          gap: 8px;
        }
        
        /* *** NOU: Buton "Cumpără" (stil secundar) *** */
        .buy-btn {
          padding: 8px 16px;
          background: #eef2ff;
          color: #667eea;
          border: none;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .buy-btn:hover {
          background: #e0e7ff;
          transform: translateY(-2px);
        }
        
        /* *** MODIFICARE: Buton "Hartă" (stil primar) *** */
        .view-map-btn {
          padding: 8px 16px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .view-map-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(102, 126, 234, 0.3);
        }

        .map-page {
          min-height: 100vh;
          background: #f8fafc;
          padding: 20px;
        }

        .map-header {
          max-width: 1200px;
          margin: 0 auto 24px;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .back-btn {
          padding: 10px 20px;
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          color: #667eea;
          cursor: pointer;
          transition: all 0.3s;
        }

        .back-btn:hover {
          background: #667eea;
          color: white;
          border-color: #667eea;
        }

        .map-page-title {
          font-size: 28px;
          font-weight: 800;
          color: #1a202c;
        }

        .map-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
        }

        /* *** MODIFICARE: Fundal stilizat pentru hartă *** */
        .map-view {
          border-radius: 20px;
          height: 500px;
          position: relative;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          background-image: url('https://images.unsplash.com/photo-1594223134065-5d63f039570c?w=1200&q=80');
          background-size: cover;
          background-position: center;
        }

        /* *** NOU: Suprapunere întunecată pentru hartă *** */
        .map-view::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 20px;
          z-index: 1;
        }

        .map-pin {
          position: absolute;
          background: none;
          border: none;
          cursor: pointer;
          transform: translate(-50%, -50%);
          z-index: 10;
        }

        .pin-pulse {
          position: absolute;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(102, 126, 234, 0.3);
          animation: pulse 2s infinite;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(2.5);
            opacity: 0;
          }
        }

        .pin-marker {
          position: relative;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
          border: 3px solid white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          transition: all 0.3s;
        }

        .map-pin:hover .pin-marker,
        .map-pin.selected .pin-marker {
          transform: scale(1.2);
        }

        .map-info-card, .map-empty-state {
          background: white;
          border-radius: 20px;
          padding: 24px;
          /* *** MODIFICARE: Umbră mai puternică pentru a ieși în evidență *** */
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
          height: fit-content;
        }

        .info-header {
          margin-bottom: 12px;
        }

        .info-category {
          display: inline-block;
          padding: 6px 14px;
          border-radius: 20px;
          color: white;
          font-size: 12px;
          font-weight: 700;
        }

        .info-title {
          font-size: 22px;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 16px;
          line-height: 1.3;
        }

        .info-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
          color: #64748b;
          font-size: 15px;
          font-weight: 500;
        }

        .info-icon {
          font-size: 16px;
        }

        /* *** MODIFICARE: Butonul de direcții *** */
        .get-directions-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          /* margin-top eliminat, gestionat de containerul grid */
        }
        
        .get-directions-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(102, 126, 234, 0.3);
        }

        /* *** NOU: Buton de cumpărare pe hartă (stil secundar) *** */
        .buy-btn-map {
          width: 100%;
          padding: 16px;
          background: #f8fafc;
          color: #667eea;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
        }

        .buy-btn-map:hover {
          background: #eef2ff;
          border-color: #c7d2fe;
        }
        
        /* *** NOU: Container pentru acțiunile de pe cardul hărții *** */
        .map-info-card-actions {
          display: grid;
          grid-template-columns: 1fr; /* implicit pe mobil */
          gap: 12px;
          margin-top: 24px;
        }

        .map-empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: #94a3b8;
          height: 300px;
        }

        .empty-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }

        /* Media queries-ul pentru responsive */
        @media (max-width: 768px) {
          .app-title {
            font-size: 28px;
          }
          .header-top {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          .events-grid {
            grid-template-columns: 1fr;
          }
          
          .map-container {
            grid-template-columns: 1fr;
          }
          
          .map-view {
            height: 400px;
          }
          .map-page-title {
            font-size: 24px;
          }
          .map-header {
            flex-wrap: wrap;
          }
          
          /* Butoanele de pe cardul hărții rămân stivuite */
          .map-info-card-actions {
            grid-template-columns: 1fr;
          }
        }
        
        /* *** NOU: Reguli pentru desktop/tabletă pentru butoanele de pe hartă *** */
        @media (min-width: 769px) {
           .map-info-card-actions {
             /* 2 coloane pe ecrane mai mari */
             grid-template-columns: 1fr 1fr;
           }
        }
      `}</style>
    </div>
  );
}

// Componenta App rămâne neschimbată
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <>
      {!isAuthenticated ? (
        <AuthScreen onAuthSuccess={handleLoginSuccess} />
      ) : (
        <MainScreen />
      )}
    </>
  );
}

export default App;