import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Wallet, Award, LogOut, Rocket, UserCheck } from 'lucide-react';
import { logoutUser } from '../services/authService';

export default function Navbar({ user, onLogout }) {
  const handleLogoutClick = async () => {
    await logoutUser();
    onLogout();
  };

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/projects', label: 'Proyek Kelompok', icon: Users },
    { path: '/wallet', label: 'Dompet Digital', icon: Wallet },
    { path: '/achievements', label: 'Brankas & CV ATS', icon: Award },
  ];

  return (
    <header style={{
      backgroundColor: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border-color)',
      padding: '0.85rem 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'var(--accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Rocket size={20} color="white" />
            </div>
            <span style={{ fontSize: '1.35rem', fontWeight: 800, background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Kating
            </span>
          </NavLink>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', gap: '0.5rem' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: isActive ? 'white' : 'var(--text-muted)',
                    backgroundColor: isActive ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                    border: isActive ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid transparent',
                    transition: 'var(--transition-normal)'
                  })}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Profile & Logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          {user && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <img
                src={user.photoURL}
                alt={user.displayName}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid var(--accent-primary)'
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>{user.displayName}</span>
                  <UserCheck size={14} color="#10b981" />
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {user.prodi} • Sem {user.semester}
                </span>
              </div>
            </div>
          )}

          <button
            onClick={handleLogoutClick}
            className="btn-secondary"
            style={{ padding: '0.5rem 0.85rem', fontSize: '0.85rem' }}
            title="Keluar"
          >
            <LogOut size={16} color="#ef4444" />
            <span>Keluar</span>
          </button>
        </div>
      </div>
    </header>
  );
}
