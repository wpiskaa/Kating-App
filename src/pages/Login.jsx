import React, { useState } from 'react';
import { Eye, EyeOff, Sparkles, LogIn, ShieldCheck, ArrowRight, UserPlus, Mail, Lock, BookOpen, KeyRound, CheckCircle2, X } from 'lucide-react';
import { loginWithGoogle, loginDemoMode, DEMO_USER } from '../services/authService';

export default function Login({ onLoginSuccess }) {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccessMsg, setForgotSuccessMsg] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const userObj = {
        ...DEMO_USER,
        displayName: displayName || email.split('@')[0].toUpperCase(),
        email: email,
        prodi: 'Belum diisi',
        semester: 1
      };
      localStorage.setItem('kating_user', JSON.stringify(userObj));
      setIsLoading(false);
      onLoginSuccess(userObj);
    }, 450);
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
    }, 350);
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setForgotSuccessMsg(`Instruksi reset kata sandi telah dikirim ke ${forgotEmail}`);
    setTimeout(() => {
      setIsForgotModalOpen(false);
      setForgotSuccessMsg('');
      setForgotEmail('');
    }, 2000);
  };

  return (
    <div style={{
      minHeight: '88vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '12px 4px'
    }}>
      {/* Brand Hero Splasher */}
      <div style={{ textAlign: 'center', marginBottom: '22px' }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '20px',
          background: 'var(--g-brand)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 12px',
          boxShadow: '0 10px 30px rgba(99,102,241,0.45)',
          color: 'white'
        }}>
          <Sparkles size={32} />
        </div>

        <h1 className="h1 grad-text" style={{ fontSize: '26px', fontWeight: 800, letterSpacing: '-0.02em' }}>
          Kating App
        </h1>
        <p className="muted" style={{ fontSize: '12.5px', marginTop: '4px', maxWidth: '280px', margin: '4px auto 0', lineHeight: 1.4 }}>
          Teman Setia Perjalanan Perkuliahanmu
        </p>
      </div>

      {/* Main Glassmorphic Auth Card */}
      <div className="card" style={{ padding: '22px 20px', background: 'var(--bg-card)', border: '1px solid var(--border-2)', boxShadow: '0 16px 40px rgba(0,0,0,0.4)' }}>
        
        {/* Auth Mode Segmented Control: Masuk vs Daftar */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '18px', background: 'var(--bg-card-2)', padding: '4px', borderRadius: '14px', border: '1px solid var(--border)' }}>
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className={`btn-ghost ${authMode === 'login' ? 'badge-blue' : ''}`}
            style={{
              padding: '8px',
              fontSize: '11.5px',
              border: authMode === 'login' ? '1px solid var(--indigo)' : 'none',
              background: authMode === 'login' ? 'rgba(99,102,241,0.2)' : 'transparent',
              color: authMode === 'login' ? 'white' : 'var(--text-3)'
            }}
          >
            <LogIn size={14} /> Masuk Akun
          </button>

          <button
            type="button"
            onClick={() => setAuthMode('register')}
            className={`btn-ghost ${authMode === 'register' ? 'badge-cyan' : ''}`}
            style={{
              padding: '8px',
              fontSize: '11.5px',
              border: authMode === 'register' ? '1px solid var(--cyan)' : 'none',
              background: authMode === 'register' ? 'rgba(34,211,238,0.2)' : 'transparent',
              color: authMode === 'register' ? 'white' : 'var(--text-3)'
            }}
          >
            <UserPlus size={14} /> Buat Akun Baru
          </button>
        </div>

        {/* AUTH FORM */}
        <form onSubmit={handleLoginSubmit}>
          {authMode === 'register' && (
            <div className="field">
              <label className="field-label">Nama Lengkap</label>
              <input
                type="text"
                className="field-input"
                placeholder="Hafiz Kurniawan"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="field">
            <label className="field-label">Email Mahasiswa / Umum</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                className="field-input"
                placeholder="nama@student.umy.ac.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Mail size={14} color="var(--text-3)" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
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

          {authMode === 'login' && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '14px' }}>
              <button
                type="button"
                onClick={() => setIsForgotModalOpen(true)}
                className="dim"
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '10.5px', color: '#22d3ee' }}
              >
                Lupa Kata Sandi?
              </button>
            </div>
          )}

          <button type="submit" className="btn" disabled={isLoading} style={{ padding: '12px', fontSize: '12px', marginTop: '6px' }}>
            {isLoading ? 'Memproses...' : authMode === 'login' ? <><LogIn size={15} /> Masuk Sesi Akun</> : <><UserPlus size={15} /> Daftar & Mulai Akses</>}
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '18px 0 14px' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
          <span className="dim" style={{ fontSize: '9.5px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Atau Akses Cepat</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
        </div>

        {/* Google Single Sign-On Button */}
        <button
          type="button"
          className="btn-ghost"
          onClick={handleGoogleLogin}
          style={{ padding: '11px', fontSize: '11.5px', marginBottom: '8px' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" style={{ marginRight: '8px' }}>
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
            background: 'rgba(34,211,238,0.08)',
            fontSize: '11.5px',
            fontWeight: 700
          }}
        >
          <Sparkles size={14} color="#22d3ee" /> Masuk Langsung (Mode Demo Saja) <ArrowRight size={13} />
        </button>
      </div>

      {/* Footer Features Badge */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '20px' }}>
        <span className="badge badge-blue" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <ShieldCheck size={11} /> Enkripsi Sesi
        </span>
        <span className="badge badge-cyan" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <BookOpen size={11} /> V1.0 Mobile Student
        </span>
      </div>

      {/* Forgot Password Modal */}
      {isForgotModalOpen && (
        <div className="overlay" onClick={() => setIsForgotModalOpen(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="drag-handle" />
            <div className="section-row">
              <span className="h3" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <KeyRound size={16} color="#22d3ee" /> Lupa Kata Sandi
              </span>
              <button onClick={() => setIsForgotModalOpen(false)} className="icon-btn"><X size={16} /></button>
            </div>

            {forgotSuccessMsg ? (
              <div className="badge badge-green" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px', width: '100%', margin: '10px 0' }}>
                <CheckCircle2 size={14} /> {forgotSuccessMsg}
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit}>
                <p className="dim" style={{ marginBottom: '12px' }}>
                  Masukkan email akun mahasiswa kamu untuk menerima link instruksi reset kata sandi baru.
                </p>

                <div className="field">
                  <label className="field-label">Email Mahasiswa</label>
                  <input
                    type="email"
                    className="field-input"
                    placeholder="nama@student.umy.ac.id"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: 'flex', gap: '6px', marginTop: '14px' }}>
                  <button type="button" className="btn-ghost" onClick={() => setIsForgotModalOpen(false)}>Batal</button>
                  <button type="submit" className="btn">Kirim Link Reset</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
