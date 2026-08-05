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
      backgroundColor: '#030712',
      padding: '1.25rem'
    }}>
      <div style={{
        maxWidth: '400px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        {/* Brand App Icon */}
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '24px',
          background: 'var(--accent-gradient)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem',
          boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)'
        }}>
          <Rocket size={38} color="white" />
        </div>

        <h1 style={{ fontSize: '2rem', fontWeight: 800, background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.25rem' }}>
          Kating App
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2.5rem' }}>
          Asisten Akademik & Personal Mahasiswa
        </p>

        {/* Feature Pills */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', width: '100%', marginBottom: '2.5rem', textAlign: 'left' }}>
          <div style={{ backgroundColor: 'var(--bg-card)', padding: '0.75rem 1rem', borderRadius: '14px', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <BookOpen size={18} color="#818cf8" />
            <span style={{ fontSize: '0.825rem', color: 'var(--text-primary)', fontWeight: 600 }}>Jadwal & Countdown Deadline</span>
          </div>
          <div style={{ backgroundColor: 'var(--bg-card)', padding: '0.75rem 1rem', borderRadius: '14px', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ShieldCheck size={18} color="#06b6d4" />
            <span style={{ fontSize: '0.825rem', color: 'var(--text-primary)', fontWeight: 600 }}>Project Manager & Automated 0% Flagging</span>
          </div>
          <div style={{ backgroundColor: 'var(--bg-card)', padding: '0.75rem 1rem', borderRadius: '14px', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Wallet size={18} color="#f59e0b" />
            <span style={{ fontSize: '0.825rem', color: 'var(--text-primary)', fontWeight: 600 }}>Wallet Tracker & Batas Aman Belanja</span>
          </div>
          <div style={{ backgroundColor: 'var(--bg-card)', padding: '0.75rem 1rem', borderRadius: '14px', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Award size={18} color="#10b981" />
            <span style={{ fontSize: '0.825rem', color: 'var(--text-primary)', fontWeight: 600 }}>Brankas Prestasi & 1-Click ATS CV</span>
          </div>
        </div>

        {/* Action Buttons */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="btn-minimal"
          style={{ marginBottom: '0.75rem' }}
        >
          <LogIn size={18} />
          {loading ? 'Menghubungkan...' : 'Masuk via Google Auth'}
        </button>

        <button
          onClick={handleDemoLogin}
          className="btn-minimal-secondary"
        >
          <Sparkles size={16} color="#06b6d4" />
          Masuk Mode Demo (Hafiz Kurniawan)
        </button>
      </div>
    </div>
  );
}
