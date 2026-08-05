import React, { useState } from 'react';
import { UserCheck, Shield, Moon, Bell, RefreshCw, LogOut, CheckCircle2, ChevronRight, Sliders, Lock, Zap } from 'lucide-react';
import { logoutUser } from '../services/authService';

export default function ProfileSettings({ user, onLogout }) {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [autoSync, setAutoSync] = useState(true);
  const [demoResetMsg, setDemoResetMsg] = useState('');

  const handleResetData = () => {
    localStorage.clear();
    setDemoResetMsg('Data demo berhasil di-reset ke kondisi awal!');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <>
      {/* Sleek Profile Header Card */}
      <div className="card-clean" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(6, 182, 212, 0.08) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.25)',
        padding: '0.85rem 1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ position: 'relative' }}>
            <img
              src={user?.photoURL}
              alt={user?.displayName}
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid var(--accent-indigo)'
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              border: '2px solid var(--bg-surface)'
            }} />
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 800 }}>{user?.displayName || 'Hafiz Kurniawan'}</h3>
              <UserCheck size={13} color="#10b981" />
            </div>
            <p style={{ fontSize: '0.675rem', color: 'var(--text-secondary)' }}>
              NIM: 20230140029 • {user?.prodi || 'Teknologi Informasi'}
            </p>
            <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.25rem' }}>
              <span className="pill-badge pill-info" style={{ fontSize: '0.6rem', padding: '0.1rem 0.4rem' }}>Semester 6</span>
              <span className="pill-badge pill-success" style={{ fontSize: '0.6rem', padding: '0.1rem 0.4rem' }}>Aktif</span>
            </div>
          </div>
        </div>
      </div>

      {demoResetMsg && (
        <div style={{
          backgroundColor: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid #10b981',
          borderRadius: 'var(--radius-inner)',
          padding: '0.5rem 0.75rem',
          color: '#34d399',
          fontSize: '0.7rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem'
        }}>
          <CheckCircle2 size={13} />
          <span>{demoResetMsg}</span>
        </div>
      )}

      {/* Preferences Group */}
      <div className="card-clean" style={{ padding: '0.75rem 0.85rem' }}>
        <div className="card-clean-title" style={{ marginBottom: '0.5rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem' }}>
            <Sliders size={14} color="#818cf8" /> Pengaturan Aplikasi
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {/* Item 1 */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.5rem 0.65rem',
            borderRadius: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.02)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Moon size={14} color="#818cf8" />
              <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Mode Gelap (OLED Dark)</span>
            </div>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              style={{ accentColor: 'var(--accent-indigo)', cursor: 'pointer' }}
            />
          </div>

          {/* Item 2 */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.5rem 0.65rem',
            borderRadius: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.02)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Bell size={14} color="#06b6d4" />
              <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Notifikasi Tenggat Tugas</span>
            </div>
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              style={{ accentColor: 'var(--accent-cyan)', cursor: 'pointer' }}
            />
          </div>

          {/* Item 3 */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.5rem 0.65rem',
            borderRadius: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.02)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Zap size={14} color="#10b981" />
              <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Sinkronisasi Otomatis Firebase</span>
            </div>
            <input
              type="checkbox"
              checked={autoSync}
              onChange={() => setAutoSync(!autoSync)}
              style={{ accentColor: 'var(--accent-emerald)', cursor: 'pointer' }}
            />
          </div>
        </div>
      </div>

      {/* System Actions */}
      <div className="card-clean" style={{ padding: '0.75rem 0.85rem' }}>
        <div className="card-clean-title" style={{ marginBottom: '0.5rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem' }}>
            <Shield size={14} color="#f59e0b" /> Keamanan & Sesi
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <button
            onClick={handleResetData}
            className="btn-minimal-secondary"
            style={{ fontSize: '0.75rem', padding: '0.55rem', justifyContent: 'space-between' }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <RefreshCw size={13} color="#06b6d4" /> Reset Data Demo LocalStorage
            </span>
            <ChevronRight size={13} color="var(--text-tertiary)" />
          </button>

          <button
            onClick={async () => { await logoutUser(); onLogout(); }}
            className="btn-minimal-secondary"
            style={{ fontSize: '0.75rem', padding: '0.55rem', justifyContent: 'space-between', borderColor: 'rgba(244, 63, 94, 0.25)', color: '#fb7185' }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <LogOut size={13} color="#fb7185" /> Keluar Sesi Akun
            </span>
            <ChevronRight size={13} color="#fb7185" />
          </button>
        </div>
      </div>
    </>
  );
}
