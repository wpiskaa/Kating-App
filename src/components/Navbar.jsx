import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, Wallet, Award, User, Sparkles, Bell, X, AlertTriangle, Megaphone, MessageSquare } from 'lucide-react';

export default function Navbar({ user }) {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);

  const navItems = [
    { path: '/', label: 'Dasbor', icon: LayoutDashboard },
    { path: '/projects', label: 'Proyek', icon: FolderKanban },
    { path: '/wallet', label: 'Dompet', icon: Wallet },
    { path: '/achievements', label: 'CV ATS', icon: Award },
    { path: '/chat', label: 'Chat', icon: MessageSquare },
    { path: '/profile', label: 'Profil', icon: User },
  ];

  const notificationsList = [
    { id: 1, type: 'alert', title: 'Tenggat Kritis < 24 Jam', text: 'Riset PAB Multi-Spectral belum diselesaikan!', time: '10m lalu' },
    { id: 2, type: 'announcement', title: 'Info Kompetisi Mahasiswa', text: 'Pendaftaran Hackathon Mahasiswa Nasional 2026 dibuka.', time: '1j lalu' }
  ];

  return (
    <>
      {/* Header */}
      <header className="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div className="icon-box-sm" style={{ background: 'var(--g-indigo-cyan)' }}>
            <Sparkles size={14} color="white" />
          </div>
          <span className="h3 grad-text">Kating</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Chat Message Icon */}
          <NavLink to="/chat" className="icon-btn" title="Chat & Teman Mutual">
            <MessageSquare size={16} color="#22d3ee" />
          </NavLink>

          {/* Notification Bell */}
          <button
            onClick={() => { setIsNotifOpen(true); setUnreadCount(0); }}
            className="icon-btn"
            style={{ position: 'relative' }}
            title="Notifikasi & Informasi"
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute', top: -2, right: -2, background: 'var(--rose)', color: 'white',
                fontSize: '8px', fontWeight: 800, borderRadius: '50%', width: '13px', height: '13px',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {unreadCount}
              </span>
            )}
          </button>

          {user && (
            <NavLink to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}>
              <img
                src={user.photoURL}
                alt={user.displayName}
                style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--indigo)' }}
              />
            </NavLink>
          )}
        </div>
      </header>

      {/* Bottom Nav */}
      <nav className="bottom-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <div className="nav-dot">
                <Icon size={16} />
              </div>
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Notification Drawer Modal */}
      {isNotifOpen && (
        <div className="overlay" onClick={() => setIsNotifOpen(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="drag-handle" />
            <div className="section-row">
              <span className="h3" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Bell size={14} color="#22d3ee" /> Notifikasi Informasi
              </span>
              <button onClick={() => setIsNotifOpen(false)} className="icon-btn"><X size={16} /></button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', margin: '8px 0' }}>
              {notificationsList.map(n => (
                <div key={n.id} className="list-item" style={{ borderLeft: n.type === 'alert' ? '3px solid var(--rose)' : '3px solid var(--cyan)' }}>
                  <div className="icon-box-sm" style={{ background: n.type === 'alert' ? 'rgba(244,63,94,0.15)' : 'rgba(34,211,238,0.15)', color: n.type === 'alert' ? '#fb7185' : '#22d3ee' }}>
                    {n.type === 'alert' ? <AlertTriangle size={13} /> : <Megaphone size={13} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="h4">{n.title}</span>
                      <span className="dim">{n.time}</span>
                    </div>
                    <span className="muted" style={{ fontSize: '10px' }}>{n.text}</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="btn" onClick={() => setIsNotifOpen(false)}>Tutup</button>
          </div>
        </div>
      )}
    </>
  );
}
