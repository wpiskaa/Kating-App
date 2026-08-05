import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProjectWorkspace from './pages/ProjectWorkspace';
import WalletTracker from './pages/WalletTracker';
import AchievementVault from './pages/AchievementVault';
import ChatWorkspace from './pages/ChatWorkspace';
import ProfileSettings from './pages/ProfileSettings';
import { getCurrentSessionUser, subscribeAuthChange, DEMO_USER } from './services/authService';

export default function App() {
  const [user, setUser] = useState(() => getCurrentSessionUser() || DEMO_USER);
  const [theme, setTheme] = useState(() => localStorage.getItem('kating_theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('kating_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

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
      <div className="viewport">
        <div className="shell">
          <Navbar user={user} />
          
          <main className="page">
            <Routes>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/projects" element={<ProjectWorkspace currentUser={user} />} />
              <Route path="/wallet" element={<WalletTracker />} />
              <Route path="/achievements" element={<AchievementVault currentUser={user} />} />
              <Route path="/chat" element={<ChatWorkspace currentUser={user} />} />
              <Route
                path="/profile"
                element={
                  <ProfileSettings
                    user={user}
                    onLogout={handleLogout}
                    theme={theme}
                    onToggleTheme={toggleTheme}
                    onAddSchedule={(sch) => console.log('Add Schedule:', sch)}
                    onAddTask={(task) => console.log('Add Task:', task)}
                  />
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
