import React, { useState } from 'react';
import { loginWithGoogle, loginDemoMode } from '../services/authService';
import { LogIn, Sparkles, Rocket, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function Login({ onLoginSuccess }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Fallback demo user on login submit
      const demoUser = loginDemoMode();
      onLoginSuccess(demoUser);
    }, 600);
  };

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
      minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center',
      background: 'var(--bg-app)', padding: '24px 20px', maxWidth: '412px', margin: '0 auto'
    }}>
      {/* Mobile App Brand Header */}
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <div className="icon-box" style={{
          width: '64px', height: '64px', background: 'var(--g-indigo-cyan)', margin: '0 auto 12px',
          borderRadius: '20px', boxShadow: '0 10px 30px rgba(99,102,241,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Rocket size={32} color="white" />
        </div>

        <h1 className="h1 grad-text" style={{ fontSize: '24px', fontWeight: 800 }}>Kating App</h1>
        <p className="muted" style={{ fontSize: '12px', marginTop: '2px' }}>
          {isRegisterMode ? 'Buat Akun Asisten Akademik Baru' : 'Masuk ke Akun Asisten Akademik'}
        </p>
      </div>

      {/* Native Mobile Form */}
      <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
        <div className="field">
          <label className="field-label">Email Mahasiswa</label>
          <div style={{ position: 'relative' }}>
            <input
              type="email"
              className="field-input"
              placeholder="hafiz@student.umy.ac.id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ paddingLeft: '32px' }}
              required
            />
            <Mail size={14} color="var(--text-3)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
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
              style={{ paddingLeft: '32px', paddingRight: '32px' }}
              required
            />
            <Lock size={14} color="var(--text-3)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-3)', cursor: 'pointer' }}
            >
              {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>

        {!isRegisterMode && (
          <div style={{ textAlign: 'right', marginTop: '-4px' }}>
            <span className="dim" style={{ color: 'var(--cyan)', cursor: 'pointer' }}>Lupa Kata Sandi?</span>
          </div>
        )}

        <button type="submit" disabled={loading} className="btn" style={{ padding: '12px', fontSize: '13px', borderRadius: '14px', marginTop: '6px' }}>
          {loading ? 'Memproses...' : (isRegisterMode ? 'Daftar Akun Baru' : 'Masuk Aplikasi')} <ArrowRight size={15} />
        </button>
      </form>

      {/* Divider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '10px 0 18px' }}>
        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
        <span className="dim" style={{ fontSize: '10px', textTransform: 'uppercase' }}>atau masuk dengan</span>
        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
      </div>

      {/* Fast Mobile Login Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <button onClick={handleGoogleLogin} disabled={loading} className="btn-ghost" style={{ padding: '10px', borderRadius: '12px' }}>
          <LogIn size={15} color="#818cf8" /> Google Single Sign-On
        </button>

        <button onClick={handleDemoLogin} className="btn-ghost" style={{ padding: '10px', borderRadius: '12px', borderColor: 'rgba(34,211,238,0.3)' }}>
          <Sparkles size={14} color="#22d3ee" /> Mode Demo Instan (Hafiz)
        </button>
      </div>

      {/* Register Toggle Link */}
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <span className="muted">
          {isRegisterMode ? 'Sudah punya akun? ' : 'Belum punya akun? '}
          <strong
            onClick={() => setIsRegisterMode(!isRegisterMode)}
            style={{ color: 'var(--indigo)', cursor: 'pointer' }}
          >
            {isRegisterMode ? 'Masuk sekarang' : 'Daftar akun'}
          </strong>
        </span>
      </div>
    </div>
  );
}
