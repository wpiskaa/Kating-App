import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, FolderKanban, Wallet, MessageSquare, User, Bell, CheckCircle2, QrCode } from 'lucide-react';
import QRCodeModal from './QRCodeModal';

export default function Navbar({ user }) {
  const [isNotifDrawerOpen, setIsNotifDrawerOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  const notifications = [
    { id: 1, title: 'Pengingat Deadline Tugas', time: '10m lalu', desc: 'Tugas PAB2026 sisa <18 jam!' },
    { id: 2, title: 'Permintaan Teman Mutual', time: '1j lalu', desc: 'Ilham mengirim permintaan berteman' }
  ];

  return (
    <>
      {/* Top Mobile App Header */}
      <header className="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="nav-dot" style={{ background: 'var(--g-brand)', color: 'white', width: '26px', height: '26px' }}>
            <span style={{ fontWeight: 800, fontSize: '12px' }}>K</span>
          </div>
          <span className="h3 grad-text" style={{ fontSize: '15px' }}>Kating App</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button onClick={() => setIsQRModalOpen(true)} className="icon-btn" title="QR Code Profil Mahasiswa">
            <QrCode size={17} color="#22d3ee" />
          </button>

          <button onClick={() => setIsNotifDrawerOpen(true)} className="icon-btn" style={{ position: 'relative' }} title="Notifikasi Pengumuman">
            <Bell size={17} color="#818cf8" />
            <span style={{
              position: 'absolute', top: 2, right: 2, width: '6px', height: '6px',
              borderRadius: '50%', background: '#f43f5e'
            }} />
          </button>
        </div>
      </header>

      {/* Bottom 5-Item Native Mobile Navigation Bar */}
      <nav className="bottom-nav">
        <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <div className="nav-dot"><Home size={18} /></div>
          <span>Dasbor</span>
        </NavLink>

        <NavLink to="/projects" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <div className="nav-dot"><FolderKanban size={18} /></div>
          <span>Proyek</span>
        </NavLink>

        <NavLink to="/wallet" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <div className="nav-dot"><Wallet size={18} /></div>
          <span>Dompet</span>
        </NavLink>

        <NavLink to="/chat" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <div className="nav-dot"><MessageSquare size={18} /></div>
          <span>Chat</span>
        </NavLink>

        <NavLink to="/profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <div className="nav-dot"><User size={18} /></div>
          <span>Profil</span>
        </NavLink>
      </nav>

      {/* Notifications Drawer */}
      {isNotifDrawerOpen && (
        <div className="overlay" onClick={() => setIsNotifDrawerOpen(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="drag-handle" />
            <div className="section-row">
              <span className="h3">Notifikasi Sistem & Pengumuman</span>
              <button onClick={() => setIsNotifDrawerOpen(false)} className="icon-btn">✕</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', margin: '8px 0' }}>
              {notifications.map((item) => (
                <div key={item.id} className="list-item">
                  <div className="icon-box-sm" style={{ background: 'rgba(99,102,241,0.15)', color: '#818cf8' }}>
                    <CheckCircle2 size={14} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <span className="h4">{item.title}</span>
                    <span className="dim" style={{ display: 'block' }}>{item.desc}</span>
                  </div>
                  <span className="dim">{item.time}</span>
                </div>
              ))}
            </div>

            <button className="btn-ghost" onClick={() => setIsNotifDrawerOpen(false)}>Tutup</button>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      <QRCodeModal isOpen={isQRModalOpen} onClose={() => setIsQRModalOpen(false)} user={user} />
    </>
  );
}
