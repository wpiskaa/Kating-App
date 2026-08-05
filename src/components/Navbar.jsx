import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, Wallet, Award, User, Sparkles } from 'lucide-react';

export default function Navbar({ user }) {
  const navItems = [
    { path: '/', label: 'Dasbor', icon: LayoutDashboard },
    { path: '/projects', label: 'Proyek', icon: FolderKanban },
    { path: '/wallet', label: 'Dompet', icon: Wallet },
    { path: '/achievements', label: 'CV ATS', icon: Award },
    { path: '/profile', label: 'Profil', icon: User },
  ];

  return (
    <>
      <header className="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div className="icon-box-sm" style={{ background: 'var(--g-indigo-cyan)' }}>
            <Sparkles size={14} color="white" />
          </div>
          <span className="h3 grad-text">Kating</span>
        </div>

        {user && (
          <NavLink to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}>
            <span className="dim" style={{ fontWeight: 600 }}>{user.displayName?.split(' ')[0]}</span>
            <img
              src={user.photoURL}
              alt={user.displayName}
              style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--indigo)' }}
            />
          </NavLink>
        )}
      </header>

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
    </>
  );
}
