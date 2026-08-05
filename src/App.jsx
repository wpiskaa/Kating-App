import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProjectWorkspace from './pages/ProjectWorkspace';
import WalletTracker from './pages/WalletTracker';
import AchievementVault from './pages/AchievementVault';
import { getCurrentSessionUser, subscribeAuthChange, DEMO_USER } from './services/authService';

export default function App() {
  const [user, setUser] = useState(() => getCurrentSessionUser() || DEMO_USER);
  const [viewMode, setViewMode] = useState('mobile'); // 'mobile' | 'tablet' | 'fluid'

  useEffect(() => {
    const unsubscribe = subscribeAuthChange((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <Router>
      <div className="app-viewport-wrapper">
        <div className={`mobile-app-shell ${viewMode}-mode`} style={{ marginTop: '30px' }}>
          <Navbar user={user} onLogout={handleLogout} viewMode={viewMode} setViewMode={setViewMode} />
          
          <div className="app-page-content">
            <Routes>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/projects" element={<ProjectWorkspace currentUser={user} />} />
              <Route path="/wallet" element={<WalletTracker />} />
              <Route path="/achievements" element={<AchievementVault currentUser={user} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}
