// src/pages/OrganizerDashboard.jsx
import React, { useState } from 'react';

const MOCK_ORG_EVENTS = [
  { id: '1', title: 'Concert Rock în Timișoara', date: '2025-11-20', status: 'Publicat', location: 'Sala Capitol, Timișoara' },
  { id: '2', title: 'Stand-up Night', date: '2025-12-05', status: 'În draft', location: 'Comedy Club TM' },
];

function OrganizerDashboard({ theme, onToggleTheme, onLogout }) {
  const [events, setEvents] = useState(MOCK_ORG_EVENTS);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    location: '',
  });

  const handleChange = (field, value) => {
    setNewEvent((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEvent.title.trim() || !newEvent.date.trim() || !newEvent.location.trim()) {
      alert('Completează numele, data și locația.');
      return;
    }
    const created = {
      id: String(Date.now()),
      title: newEvent.title.trim(),
      date: newEvent.date.trim(),
      status: 'În draft',
      location: newEvent.location.trim(),
    };
    setEvents((prev) => [...prev, created]);
    setNewEvent({ title: '', date: '', location: '' });
    alert('Eveniment creat ca draft pentru organizator.');
  };

  return (
    <div className={`organizer-app ${theme}`}>
      <header className="org-header">
        <div className="org-header-left">
          <h1 className="org-title">BegaVibe · Organizator</h1>
          <p className="org-subtitle">
            Gestionează evenimentele tale în Timișoara: creează, editează, publică.
          </p>
        </div>
        <div className="org-header-right">
          <button className="org-theme-toggle" onClick={onToggleTheme}>
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
          <button className="org-logout" onClick={onLogout}>
            ⬅ Delogare
          </button>
        </div>
      </header>

      <main className="org-layout">
        <section className="org-panel org-panel-left">
          <h2>Evenimentele mele</h2>
          <p className="org-panel-subtitle">
            Vezi rapid statusul evenimentelor create.
          </p>
          <div className="org-events-list">
            {events.map((ev) => (
              <div key={ev.id} className="org-event-card">
                <div className="org-event-main">
                  <h3>{ev.title}</h3>
                  <p>📅 {ev.date}</p>
                  {ev.location && <p>📍 {ev.location}</p>}
                </div>
                <span
                  className={`org-status-badge ${
                    ev.status === 'Publicat' ? 'published' : 'draft'
                  }`}
                >
                  {ev.status}
                </span>
              </div>
            ))}
            {events.length === 0 && (
              <p className="org-empty">Nu ai încă niciun eveniment creat.</p>
            )}
          </div>
        </section>

        <section className="org-panel org-panel-right">
          <h2>Adaugă un nou eveniment</h2>
          <p className="org-panel-subtitle">
            Completează informațiile de bază, îl poți detalia mai târziu.
          </p>

          <form className="org-form" onSubmit={handleAddEvent}>
            <div className="org-field">
              <label>Titlu eveniment</label>
              <input
                type="text"
                value={newEvent.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Ex: Festival de jazz pe malul Begăi"
              />
            </div>
            <div className="org-field">
              <label>Data</label>
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) => handleChange('date', e.target.value)}
              />
            </div>
            <div className="org-field">
              <label>Locație</label>
              <input
                type="text"
                value={newEvent.location}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder="Ex: Piața Libertății, Timișoara"
              />
            </div>

            <button type="submit" className="org-submit">
              Salvează ca draft
            </button>
          </form>

          <div className="org-hint">
            💡 Mai târziu poți adăuga preț, categorie, imagine și reguli de acces (16+/18+).
          </div>
        </section>
      </main>

      <style>{`
        .organizer-app {
          min-height: 100vh;
          background: radial-gradient(circle at top left, #020617 0%, #020617 30%, #020617 100%);
          color: #e5e7eb;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        .organizer-app.light {
          background: #f3f4f6;
          color: #111827;
        }

        .org-header {
          padding: 18px 20px;
          border-bottom: 1px solid rgba(148, 163, 184, 0.4);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }

        .org-title {
          font-size: 22px;
          font-weight: 800;
        }

        .org-subtitle {
          font-size: 13px;
          color: #9ca3af;
          margin-top: 4px;
        }
        .organizer-app.light .org-subtitle {
          color: #6b7280;
        }

        .org-header-right {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .org-theme-toggle,
        .org-logout {
          padding: 7px 12px;
          border-radius: 999px;
          border: 1px solid rgba(148, 163, 184, 0.8);
          background: rgba(15, 23, 42, 0.9);
          color: #e5e7eb;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }
        .organizer-app.light .org-theme-toggle,
        .organizer-app.light .org-logout {
          background: #ffffff;
          color: #111827;
          border-color: #d1d5db;
        }

        /* ✅ FULL WIDTH LAYOUT */
        .org-layout {
          width: 100%;
          margin: 16px 0 24px;
          padding: 0 20px 24px;
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
          gap: 18px;
        }

        .org-panel {
          background: rgba(15, 23, 42, 0.95);
          border-radius: 18px;
          padding: 16px 14px 18px;
          border: 1px solid rgba(148, 163, 184, 0.4);
          box-shadow: 0 12px 28px rgba(15, 23, 42, 0.9);
        }
        .organizer-app.light .org-panel {
          background: #ffffff;
          border-color: #e5e7eb;
          box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
        }

        .org-panel h2 {
          font-size: 16px;
          font-weight: 800;
          margin-bottom: 4px;
        }

        .org-panel-subtitle {
          font-size: 12px;
          color: #9ca3af;
          margin-bottom: 12px;
        }
        .organizer-app.light .org-panel-subtitle {
          color: #6b7280;
        }

        .org-events-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .org-event-card {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 10px;
          padding: 10px 10px;
          border-radius: 12px;
          background: rgba(15, 23, 42, 0.9);
          border: 1px solid rgba(148, 163, 184, 0.5);
        }
        .organizer-app.light .org-event-card {
          background: #f9fafb;
          border-color: #e5e7eb;
        }

        .org-event-main h3 {
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .org-event-main p {
          font-size: 12px;
          color: #9ca3af;
        }
        .organizer-app.light .org-event-main p {
          color: #6b7280;
        }

        .org-status-badge {
          padding: 4px 9px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 700;
        }

        .org-status-badge.published {
          background: #22c55e;
          color: #052e16;
        }

        .org-status-badge.draft {
          background: #f97316;
          color: #451a03;
        }

        .org-empty {
          font-size: 12px;
          color: #9ca3af;
        }

        .org-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .org-field {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .org-field label {
          font-size: 12px;
          font-weight: 600;
          color: #cbd5f5;
        }
        .organizer-app.light .org-field label {
          color: #4b5563;
        }

        .org-field input {
          padding: 8px 10px;
          border-radius: 10px;
          border: 1px solid rgba(148, 163, 184, 0.7);
          background: rgba(15, 23, 42, 0.9);
          color: #e5e7eb;
          font-size: 13px;
          outline: none;
        }
        .organizer-app.light .org-field input {
          background: #ffffff;
          color: #111827;
          border-color: #d1d5db;
        }

        .org-submit {
          margin-top: 6px;
          padding: 9px;
          border-radius: 999px;
          border: none;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          color: #f9fafb;
          box-shadow: 0 10px 20px rgba(79, 70, 229, 0.45);
        }

        .org-hint {
          margin-top: 10px;
          font-size: 12px;
          color: #9ca3af;
        }
        .organizer-app.light .org-hint {
          color: #6b7280;
        }

        @media (max-width: 900px) {
          .org-layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default OrganizerDashboard;
