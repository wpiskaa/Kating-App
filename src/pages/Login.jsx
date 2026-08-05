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
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-app)', padding: '16px' }}>
      <div style={{ maxWidth: '360px', width: '100%', textAlign: 'center' }}>
        <div className="icon-box" style={{ width: '56px', height: '56px', background: 'var(--g-indigo-cyan)', margin: '0 auto 12px', borderRadius: '18px', boxShadow: '0 8px 24px rgba(99,102,241,0.4)' }}>
          <Rocket size={28} color="white" />
        </div>

        <h1 className="h1 grad-text" style={{ marginBottom: '2px' }}>Kating App</h1>
        <p className="muted" style={{ marginBottom: '20px' }}>Asisten Akademik & Personal</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '20px' }}>
          <div className="list-item" style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '10px' }}>
            <BookOpen size={16} color="#818cf8" />
            <span className="h4" style={{ marginTop: '4px' }}>Smart Dashboard</span>
          </div>
          <div className="list-item" style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '10px' }}>
            <ShieldCheck size={16} color="#22d3ee" />
            <span className="h4" style={{ marginTop: '4px' }}>Project Manager</span>
          </div>
          <div className="list-item" style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '10px' }}>
            <Wallet size={16} color="#fbbf24" />
            <span className="h4" style={{ marginTop: '4px' }}>Wallet Tracker</span>
          </div>
          <div className="list-item" style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '10px' }}>
            <Award size={16} color="#34d399" />
            <span className="h4" style={{ marginTop: '4px' }}>1-Click CV ATS</span>
          </div>
        </div>

        <button onClick={handleGoogleLogin} disabled={loading} className="btn" style={{ marginBottom: '8px' }}>
          <LogIn size={15} /> {loading ? 'Menghubungkan...' : 'Google Single Sign-On'}
        </button>

        <button onClick={handleDemoLogin} className="btn-ghost">
          <Sparkles size={14} color="#22d3ee" /> Mode Demo Instan
        </button>
      </div>
    </div>
  );
}
