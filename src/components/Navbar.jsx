import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Wallet, Award, User, Sparkles } from 'lucide-react';

export default function Navbar({ user }) {
  const navItems = [
    { path: '/', label: 'Dasbor', icon: LayoutDashboard },
    { path: '/projects', label: 'Proyek', icon: Users },
    { path: '/wallet', label: 'Dompet', icon: Wallet },
    { path: '/achievements', label: 'CV ATS', icon: Award },
    { path: '/profile', label: 'Profil', icon: User },
  ];

  return (
    <>
      {/* Top Header Bar */}
      <header className="top-app-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '26px',
            height: '26px',
            borderRadius: '8px',
            background: 'var(--accent-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Sparkles size={14} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: '0.95rem', fontWeight: 800, background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}>
              Kating
            </h1>
          </div>
        </div>

        {user && (
          <NavLink to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              {user.displayName ? user.displayName.split(' ')[0] : 'Profil'}
            </span>
            <img
              src={user.photoURL}
              alt={user.displayName}
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1.5px solid var(--accent-indigo)'
              }}
            />
          </NavLink>
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
                <Icon size={16} />
              </div>
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </>
  );
}
