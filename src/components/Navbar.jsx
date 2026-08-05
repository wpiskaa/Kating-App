import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Wallet, Award, LogOut, Sparkles } from 'lucide-react';
import { logoutUser } from '../services/authService';

export default function Navbar({ user, onLogout }) {
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
      {/* Sleek Top Header Bar */}
      <header className="top-app-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '8px',
            background: 'var(--accent-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Sparkles size={16} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.05rem', fontWeight: 800, background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}>
              Kating
            </h1>
            <span style={{ fontSize: '0.625rem', color: 'var(--text-tertiary)' }}>Asisten Mahasiswa</span>
          </div>
        </div>

        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <img
              src={user.photoURL}
              alt={user.displayName}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1px solid var(--accent-indigo)'
              }}
            />
            <button
              onClick={handleLogoutClick}
              style={{ background: 'none', color: 'var(--text-tertiary)', border: 'none', cursor: 'pointer', padding: '0.2rem' }}
              title="Keluar"
            >
              <LogOut size={15} />
            </button>
          </div>
        )}
      </header>

      {/* Floating Bottom Nav Dock */}
      <nav className="bottom-app-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-tab ${isActive ? 'active' : ''}`}
            >
              <div className="nav-tab-icon">
                <Icon size={18} />
              </div>
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </>
  );
}
