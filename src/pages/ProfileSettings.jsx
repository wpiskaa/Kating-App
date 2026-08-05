import React, { useState } from 'react';
import { UserCheck, Shield, Moon, Sun, Bell, RefreshCw, LogOut, CheckCircle2, ChevronRight, Sliders, Edit2, X } from 'lucide-react';
import { logoutUser } from '../services/authService';

export default function ProfileSettings({ user, onLogout, theme, onToggleTheme }) {
  const [notifications, setNotifications] = useState(true);
  const [demoResetMsg, setDemoResetMsg] = useState('');
  
  // Profile editing state (CRUD for Profile)
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || 'Hafiz Kurniawan');
  const [prodi, setProdi] = useState(user?.prodi || 'Teknologi Informasi');
  const [semester, setSemester] = useState(user?.semester || 6);

  const handleResetData = () => {
    localStorage.clear();
    setDemoResetMsg('Data demo berhasil di-reset!');
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, displayName, prodi, semester: parseInt(semester) };
    localStorage.setItem('kating_user', JSON.stringify(updatedUser));
    setIsEditingProfile(false);
    window.location.reload();
  };

  return (
    <>
      {/* Profile Card */}
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(34,211,238,0.08) 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img
              src={user?.photoURL}
              alt={user?.displayName}
              style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--indigo)' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span className="h3">{displayName}</span>
                <UserCheck size={12} color="#10b981" />
              </div>
              <span className="dim">{prodi} • Sem {semester}</span>
            </div>
          </div>

          <button onClick={() => setIsEditingProfile(true)} className="icon-btn" title="Edit Profil">
            <Edit2 size={14} color="#22d3ee" />
          </button>
        </div>
      </div>

      {demoResetMsg && (
        <div className="badge badge-green" style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 10px' }}>
          <CheckCircle2 size={12} /> {demoResetMsg}
        </div>
      )}

      {/* Preferences Section */}
      <div className="card">
        <div className="section-row">
          <span className="h3" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Sliders size={14} color="#818cf8" /> Pengaturan
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {/* Theme Toggle Item */}
          <div className="list-item" style={{ justifyContent: 'space-between', cursor: 'pointer' }} onClick={onToggleTheme}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {theme === 'dark' ? <Moon size={14} color="#818cf8" /> : <Sun size={14} color="#fbbf24" />}
              <span className="h4">{theme === 'dark' ? 'Mode Malam (Dark Mode)' : 'Mode Siang (Light Mode)'}</span>
            </div>
            <span className="badge badge-blue">{theme === 'dark' ? 'Gelap' : 'Terang'}</span>
          </div>

          {/* Notifications Toggle Item */}
          <div className="list-item" style={{ justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => setNotifications(!notifications)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Bell size={14} color="#22d3ee" />
              <span className="h4">Notifikasi Deadline</span>
            </div>
            <span className={`badge ${notifications ? 'badge-green' : 'badge-red'}`}>
              {notifications ? 'Aktif' : 'Mati'}
            </span>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="card">
        <div className="section-row">
          <span className="h3" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Shield size={14} color="#fbbf24" /> Sesi & Data
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <button onClick={handleResetData} className="btn-ghost" style={{ justifyContent: 'space-between' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <RefreshCw size={13} color="#22d3ee" /> Reset LocalStorage Demo
            </span>
            <ChevronRight size={13} className="dim" />
          </button>

          <button onClick={async () => { await logoutUser(); onLogout(); }} className="btn-ghost" style={{ justifyContent: 'space-between', borderColor: 'rgba(244,63,94,0.3)', color: '#fb7185' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <LogOut size={13} color="#fb7185" /> Keluar Sesi Akun
            </span>
            <ChevronRight size={13} color="#fb7185" />
          </button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditingProfile && (
        <div className="overlay" onClick={() => setIsEditingProfile(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="drag-handle" />
            <div className="section-row">
              <span className="h3">Edit Profil Mahasiswa</span>
              <button onClick={() => setIsEditingProfile(false)} className="icon-btn"><X size={16} /></button>
            </div>

            <form onSubmit={handleSaveProfile}>
              <div className="field">
                <label className="field-label">Nama Lengkap</label>
                <input type="text" className="field-input" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required />
              </div>
              <div className="field">
                <label className="field-label">Program Studi</label>
                <input type="text" className="field-input" value={prodi} onChange={(e) => setProdi(e.target.value)} required />
              </div>
              <div className="field">
                <label className="field-label">Semester</label>
                <input type="number" className="field-input" value={semester} onChange={(e) => setSemester(e.target.value)} required />
              </div>

              <div style={{ display: 'flex', gap: '6px', marginTop: '14px' }}>
                <button type="button" className="btn-ghost" onClick={() => setIsEditingProfile(false)}>Batal</button>
                <button type="submit" className="btn">Simpan Perubahan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
