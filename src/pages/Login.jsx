import React, { useState } from 'react';
import { Eye, EyeOff, Sparkles, LogIn, ShieldCheck, ArrowRight } from 'lucide-react';
import { loginWithGoogle, loginDemoMode, DEMO_USER } from '../services/authService';

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      const user = {
        ...DEMO_USER,
        displayName: email.split('@')[0].toUpperCase(),
        email: email
      };
      localStorage.setItem('kating_user', JSON.stringify(user));
      setIsLoading(false);
      onLoginSuccess(user);
    }, 400);
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const res = await loginWithGoogle();
    setIsLoading(false);
    if (res.user) {
      onLoginSuccess(res.user);
    }
  };

  const handleDemoInstantAccess = () => {
    setIsLoading(true);
    setTimeout(() => {
      const demoUser = loginDemoMode();
      setIsLoading(false);
      onLoginSuccess(demoUser);
    }, 400);
  };

  return (
    <div style={{
      minHeight: '85vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '10px 4px'
    }}>
      {/* Brand Hero Splasher */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{
          width: '58px',
          height: '58px',
          borderRadius: '18px',
          background: 'var(--g-brand)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 12px',
          boxShadow: '0 8px 24px rgba(99,102,241,0.4)',
          color: 'white'
        }}>
          <Sparkles size={28} />
        </div>

        <h1 className="h1 grad-text" style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.02em' }}>
          Kating App
        </h1>
        <p className="muted" style={{ fontSize: '11.5px', marginTop: '4px', maxWidth: '280px', margin: '4px auto 0' }}>
          Asisten Akademik & Keuangan Mahasiswa Serba Bisa
        </p>
      </div>

      {/* Main Login Card */}
      <div className="card" style={{ padding: '20px 18px', background: 'var(--bg-card)', border: '1px solid var(--border-2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <span className="h3">Masuk ke Akun Kamu</span>
          <span className="badge badge-cyan" style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <ShieldCheck size={10} /> Mode Mahasiswa
          </span>
        </div>

        <form onSubmit={handleLoginSubmit}>
          <div className="field">
            <label className="field-label">Email Mahasiswa / Umum</label>
            <input
              type="email"
              className="field-input"
              placeholder="nama@student.umy.ac.id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label className="field-label">Kata Sandi</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                className="field-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="icon-btn"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)' }}
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '14px' }}>
            <button type="button" className="dim" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '10px' }}>
              Lupa Kata Sandi?
            </button>
          </div>

          <button type="submit" className="btn" disabled={isLoading} style={{ padding: '12px', fontSize: '12px' }}>
            {isLoading ? 'Memproses...' : <><LogIn size={15} /> Masuk Akun</>}
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '16px 0' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
          <span className="dim" style={{ fontSize: '9.5px', textTransform: 'uppercase' }}>Atau Akses Cepat</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
        </div>

        {/* Google Single Sign-On Button */}
        <button
          type="button"
          className="btn-ghost"
          onClick={handleGoogleLogin}
          style={{ padding: '10px', fontSize: '11px', marginBottom: '8px' }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" style={{ marginRight: '6px' }}>
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          Masuk dengan Akun Google
        </button>

        {/* 1-Tap Instant Demo Access Button */}
        <button
          type="button"
          className="btn-ghost"
          onClick={handleDemoInstantAccess}
          style={{
            padding: '11px',
            borderColor: 'rgba(34,211,238,0.4)',
            color: '#22d3ee',
            background: 'rgba(34,211,238,0.06)',
            fontSize: '11.5px',
            fontWeight: 700
          }}
        >
          <Sparkles size={14} color="#22d3ee" /> Masuk Langsung (Mode Demo Saja) <ArrowRight size={13} />
        </button>
      </div>

      <div style={{ textAlign: 'center', marginTop: '18px' }}>
        <span className="dim" style={{ fontSize: '9.5px' }}>
          Kating App • Hak Cipta © 2026 Tim Pengembang
        </span>
      </div>
    </div>
  );
}
