import React, { useState } from 'react';
import { X, QrCode, UserCheck, Camera, CheckCircle2 } from 'lucide-react';

export default function QRCodeModal({ isOpen, onClose, user, onAddFriend }) {
  const [activeTab, setActiveTab] = useState('myCode'); // 'myCode' | 'scanCode'
  const [friendCodeInput, setFriendCodeInput] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleAddFriendByCode = (e) => {
    e.preventDefault();
    if (!friendCodeInput) return;

    onAddFriend(friendCodeInput);
    setSuccessMsg(`Berhasil terhubung secara mutual dengan ID: ${friendCodeInput}!`);
    setFriendCodeInput('');

    setTimeout(() => {
      setSuccessMsg('');
      onClose();
    }, 1200);
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="drag-handle" />
        <div className="section-row">
          <span className="h3" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <QrCode size={15} color="#818cf8" /> Mutual QR Code Pertemanan
          </span>
          <button onClick={onClose} className="icon-btn"><X size={16} /></button>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '12px' }}>
          <button
            onClick={() => setActiveTab('myCode')}
            className={`btn-ghost ${activeTab === 'myCode' ? 'badge-blue' : ''}`}
            style={{ padding: '6px', fontSize: '11px' }}
          >
            Kode QR Saya
          </button>

          <button
            onClick={() => setActiveTab('scanCode')}
            className={`btn-ghost ${activeTab === 'scanCode' ? 'badge-cyan' : ''}`}
            style={{ padding: '6px', fontSize: '11px' }}
          >
            Scan / Input Kode
          </button>
        </div>

        {successMsg && (
          <div className="badge badge-green" style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px', marginBottom: '10px' }}>
            <CheckCircle2 size={12} /> {successMsg}
          </div>
        )}

        {activeTab === 'myCode' && (
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <div style={{
              background: 'white', padding: '16px', borderRadius: '16px', display: 'inline-block',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)', marginBottom: '10px'
            }}>
              {/* Generated Stylized QR Code SVG for Student */}
              <svg width="140" height="140" viewBox="0 0 100 100" fill="none">
                <rect width="100" height="100" fill="white" />
                <rect x="10" y="10" width="25" height="25" fill="#0f172a" />
                <rect x="15" y="15" width="15" height="15" fill="white" />
                <rect x="18" y="18" width="9" height="9" fill="#6366f1" />

                <rect x="65" y="10" width="25" height="25" fill="#0f172a" />
                <rect x="70" y="15" width="15" height="15" fill="white" />
                <rect x="73" y="18" width="9" height="9" fill="#6366f1" />

                <rect x="10" y="65" width="25" height="25" fill="#0f172a" />
                <rect x="15" y="70" width="15" height="15" fill="white" />
                <rect x="18" y="73" width="9" height="9" fill="#6366f1" />

                {/* Random Pattern Dots */}
                <rect x="42" y="12" width="8" height="8" fill="#0f172a" />
                <rect x="52" y="24" width="8" height="8" fill="#6366f1" />
                <rect x="42" y="42" width="16" height="16" fill="#0f172a" />
                <rect x="65" y="42" width="8" height="8" fill="#22d3ee" />
                <rect x="75" y="65" width="15" height="15" fill="#0f172a" />
              </svg>
            </div>

            <p className="h4" style={{ marginBottom: '2px' }}>{user?.displayName || 'Hafiz Kurniawan'}</p>
            <span className="mono dim">ID Mutual: KAT-{user?.uid ? user.uid.substring(0, 8).toUpperCase() : 'HFZ2026'}</span>
          </div>
        )}

        {activeTab === 'scanCode' && (
          <form onSubmit={handleAddFriendByCode}>
            <div style={{ textAlign: 'center', border: '1.5px dashed var(--border-2)', padding: '16px', borderRadius: '12px', marginBottom: '12px' }}>
              <Camera size={24} color="#22d3ee" style={{ marginBottom: '4px' }} />
              <span className="dim" style={{ display: 'block' }}>Kamera Scanner QR Code Aktif</span>
            </div>

            <div className="field">
              <label className="field-label">Atau Masukkan Kode / ID Mutual Teman</label>
              <input
                type="text"
                className="field-input mono"
                placeholder="Contoh: KAT-ILHAM2026"
                value={friendCodeInput}
                onChange={(e) => setFriendCodeInput(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '6px', marginTop: '12px' }}>
              <button type="button" className="btn-ghost" onClick={onClose}>Batal</button>
              <button type="submit" className="btn">Tambah Teman Mutual</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
