import React, { useState } from 'react';
import { loginWithGoogle, loginDemoMode } from '../services/authService';
import { LogIn, Sparkles, BookOpen, ShieldCheck, Wallet, Award, Rocket } from 'lucide-react';

export default function Login({ onLoginSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    const res = await loginWithGoogle();
    setLoading(false);
    if (res.user) {
      onLoginSuccess(res.user);
    }
  };

  const handleDemoLogin = () => {
    const user = loginDemoMode();
    onLoginSuccess(user);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at top right, #1e1b4b 0%, #0b0f19 60%)',
      padding: '1.5rem'
    }}>
      <div style={{
        maxWidth: '1000px',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '2.5rem',
        alignItems: 'center'
      }}>
        {/* Left Side: Brand Showcase */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'var(--accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Rocket size={26} color="white" />
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Kating App
            </h1>
          </div>
          
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: '#f3f4f6' }}>
            Asisten Akademik & Personal Mahasiswa
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '2rem', lineHeight: '1.6' }}>
            Kelola jadwal perkuliahan, kolaborasi tugas kelompok drama-free, manajemen anggaran sisa hari, dan ekspor CV ATS 1-click dalam satu platform terpadu.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ background: 'rgba(99, 102, 241, 0.15)', padding: '0.5rem', borderRadius: '8px', color: '#818cf8' }}>
                <BookOpen size={20} />
              </div>
              <span style={{ fontSize: '0.95rem', color: '#d1d5db' }}>Smart Academic Dashboard & Deadline Countdown</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ background: 'rgba(6, 182, 212, 0.15)', padding: '0.5rem', borderRadius: '8px', color: '#22d3ee' }}>
                <ShieldCheck size={20} />
              </div>
              <span style={{ fontSize: '0.95rem', color: '#d1d5db' }}>Drama-Free Project Manager & Automated 0% Flagging</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ background: 'rgba(245, 158, 11, 0.15)', padding: '0.5rem', borderRadius: '8px', color: '#fbbf24' }}>
                <Wallet size={20} />
              </div>
              <span style={{ fontSize: '0.95rem', color: '#d1d5db' }}>Personal Wallet Tracker & Batas Aman Belanja Harian</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '0.5rem', borderRadius: '8px', color: '#34d399' }}>
                <Award size={20} />
              </div>
              <span style={{ fontSize: '0.95rem', color: '#d1d5db' }}>Brankas Prestasi & 1-Click Client-Side ATS Resume Engine</span>
            </div>
          </div>
        </div>

        {/* Right Side: Login Card */}
        <div className="card" style={{ padding: '2.5rem', textAlign: 'center' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'rgba(99, 102, 241, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto'
          }}>
            <Sparkles size={32} color="#818cf8" />
          </div>

          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Selamat Datang!
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
            Masuk dengan akun Single Sign-On Google Anda atau coba Mode Demo instan.
          </p>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="btn-primary"
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '0.85rem',
              fontSize: '1rem',
              marginBottom: '1rem'
            }}
          >
            <LogIn size={20} />
            {loading ? 'Menghubungkan...' : 'Masuk via Google Auth'}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', margin: '1.25rem 0', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
            <span style={{ padding: '0 0.75rem' }}>ATAU</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
          </div>

          <button
            onClick={handleDemoLogin}
            className="btn-secondary"
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '0.85rem',
              fontSize: '0.95rem'
            }}
          >
            <Sparkles size={18} color="#06b6d4" />
            Masuk Mode Demo (Hafiz Kurniawan)
          </button>

          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1.75rem' }}>
            Keamanan dijamin dengan Firebase Authentication & Security Rules.
          </p>
        </div>
      </div>
    </div>
  );
}
