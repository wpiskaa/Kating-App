import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Moon, Sun, Bell, Activity, Shield, RefreshCw, LogOut, ChevronRight, ChevronDown, ChevronUp, Sliders, Clock } from 'lucide-react';
import { logoutUser } from '../services/authService';
import ConfirmModal from '../components/ConfirmModal';

export default function AppSettings({ theme, onToggleTheme, activityLogs = [], onLogout, onActionNotice, onLogAction }) {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);

  // Section Toggles
  const [hideActivityLog, setHideActivityLog] = useState(true);

  // Deletion Confirmation States
  const [isConfirmResetOpen, setIsConfirmResetOpen] = useState(false);
  const [isConfirmLogoutOpen, setIsConfirmLogoutOpen] = useState(false);

  const confirmResetData = () => {
    localStorage.clear();
    if (onActionNotice) onActionNotice('Data demo berhasil di-reset!');
    if (onLogAction) onLogAction('Reset LocalStorage', 'Memuat ulang data aplikasi bawaan');
    setIsConfirmResetOpen(false);
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  const confirmLogout = async () => {
    await logoutUser();
    if (onActionNotice) onActionNotice('Sesi akun telah keluar');
    if (onLogAction) onLogAction('Keluar Akun', 'Pengguna merilis sesi login');
    onLogout();
    navigate('/login');
  };

  return (
    <>
      {/* Header Back Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <button onClick={() => navigate('/profile')} className="icon-btn" style={{ padding: '6px' }}>
          <ArrowLeft size={18} />
        </button>
        <span className="h2">Pengaturan Sistem Aplikasi</span>
      </div>

      {/* Theme & Display Preferences */}
      <div className="card">
        <div className="section-row">
          <span className="h3" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sliders size={15} color="#818cf8" /> Tampilan & Tema
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div className="list-item" style={{ justifyContent: 'space-between', cursor: 'pointer' }} onClick={onToggleTheme}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {theme === 'dark' ? <Moon size={15} color="#818cf8" /> : <Sun size={15} color="#fbbf24" />}
              <span className="h4">{theme === 'dark' ? 'Mode Malam (Dark)' : 'Mode Siang (Light)'}</span>
            </div>
            <span className="badge badge-blue">{theme === 'dark' ? 'Gelap' : 'Terang'}</span>
          </div>

          <div className="list-item" style={{ justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => {
            setNotifications(!notifications);
            if (onActionNotice) onActionNotice(`Notifikasi deadline ${!notifications ? 'Diaktifkan' : 'Dimatikan'}`);
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Bell size={15} color="#22d3ee" />
              <span className="h4">Notifikasi Pengingat Deadline</span>
            </div>
            <span className={`badge ${notifications ? 'badge-green' : 'badge-red'}`}>
              {notifications ? 'Aktif' : 'Mati'}
            </span>
          </div>
        </div>
      </div>

      {/* Activity Log Section */}
      <div className="card">
        <div className="section-row">
          <span className="h3" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Activity size={15} color="#34d399" /> Log Aktivitas Aplikasi
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="badge badge-green">{activityLogs.length} Log</span>
            <button onClick={() => setHideActivityLog(!hideActivityLog)} className="icon-btn">
              {hideActivityLog ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
            </button>
          </div>
        </div>

        {!hideActivityLog && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', maxHeight: '200px', overflowY: 'auto', marginTop: '6px' }}>
            {activityLogs.length > 0 ? (
              activityLogs.map((log) => (
                <div key={log.id} className="list-item" style={{ padding: '6px 10px' }}>
                  <Clock size={12} color="#818cf8" style={{ flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <span className="h4" style={{ fontSize: '10px' }}>{log.action}</span>
                    <span className="dim" style={{ display: 'block', fontSize: '8.5px' }}>{log.detail}</span>
                  </div>
                  <span className="dim" style={{ fontSize: '8.5px' }}>{log.time}</span>
                </div>
              ))
            ) : (
              <div className="dim" style={{ textAlign: 'center', padding: '10px' }}>Belum ada riwayat aktivitas.</div>
            )}
          </div>
        )}
      </div>

      {/* System Sesi & Data Zone */}
      <div className="card">
        <div className="section-row">
          <span className="h3" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Shield size={15} color="#fbbf24" /> Manajemen Sesi & Data
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <button onClick={() => setIsConfirmResetOpen(true)} className="btn-ghost" style={{ justifyContent: 'space-between' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <RefreshCw size={14} color="#22d3ee" /> Reset LocalStorage Demo
            </span>
            <ChevronRight size={14} className="dim" />
          </button>

          <button onClick={() => setIsConfirmLogoutOpen(true)} className="btn-ghost" style={{ justifyContent: 'space-between', borderColor: 'rgba(244,63,94,0.3)', color: '#fb7185' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <LogOut size={14} color="#fb7185" /> Keluar Sesi Akun
            </span>
            <ChevronRight size={14} color="#fb7185" />
          </button>
        </div>
      </div>

      {/* Confirmation Modals */}
      <ConfirmModal
        isOpen={isConfirmResetOpen}
        title="Reset Seluruh Data Aplikasi"
        message="Apakah kamu yakin ingin mereset seluruh data aplikasi ke pengaturan awal bawaan?"
        onConfirm={confirmResetData}
        onCancel={() => setIsConfirmResetOpen(false)}
      />

      <ConfirmModal
        isOpen={isConfirmLogoutOpen}
        title="Konfirmasi Keluar Akun"
        message="Apakah kamu yakin ingin merilis sesi login akun saat ini?"
        onConfirm={confirmLogout}
        onCancel={() => setIsConfirmLogoutOpen(false)}
      />
    </>
  );
}
