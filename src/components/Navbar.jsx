import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Wallet, Award, LogOut, Rocket, Smartphone, Tablet, Monitor } from 'lucide-react';
import { logoutUser } from '../services/authService';

export default function Navbar({ user, onLogout, viewMode, setViewMode }) {
  const handleLogoutClick = async () => {
    await logoutUser();
    onLogout();
  };

  const navItems = [
    { path: '/', label: 'Dasbor', icon: LayoutDashboard },
    { path: '/projects', label: 'Proyek', icon: Users },
    { path: '/wallet', label: 'Dompet', icon: Wallet },
    { path: '/achievements', label: 'CV ATS', icon: Award },
  ];

  return (
    <>
      {/* Device Viewport Mode Switcher Bar (for testing HP / iPad / Fullscreen) */}
      <div className="viewport-tester-bar">
        <span style={{ fontWeight: 700, color: '#38bdf8' }}>📱 Mode Pengujian Tampilan:</span>
        <button
          className={`device-btn ${viewMode === 'mobile' ? 'active' : ''}`}
          onClick={() => setViewMode('mobile')}
        >
          <Smartphone size={12} style={{ display: 'inline', marginRight: '4px' }} />
          Smartphone (390px)
        </button>
        <button
          className={`device-btn ${viewMode === 'tablet' ? 'active' : ''}`}
          onClick={() => setViewMode('tablet')}
        >
          <Tablet size={12} style={{ display: 'inline', marginRight: '4px' }} />
          iPad / Tablet (768px)
        </button>
        <button
          className={`device-btn ${viewMode === 'fluid' ? 'active' : ''}`}
          onClick={() => setViewMode('fluid')}
        >
          <Monitor size={12} style={{ display: 'inline', marginRight: '4px' }} />
          Layar Penuh
        </button>
      </div>

      {/* Top Mobile Header */}
      <header className="top-app-header" style={{ top: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'var(--accent-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Rocket size={18} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.15rem', fontWeight: 800, background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}>
              Kating
            </h1>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Asisten Mahasiswa</span>
          </div>
        </div>

        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <img
              src={user.photoURL}
              alt={user.displayName}
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1.5px solid var(--accent-primary)'
              }}
            />
            <button
              onClick={handleLogoutClick}
              style={{ background: 'none', color: '#ef4444', padding: '0.2rem' }}
              title="Keluar"
            >
              <LogOut size={16} />
            </button>
          </div>
        )}
      </header>

      {/* Bottom Navigation Bar */}
      <nav className="bottom-app-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
            >
              <div className="nav-icon-wrapper">
                <Icon size={20} />
              </div>
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </>
  );
}
