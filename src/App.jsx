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

  // Central Schedules State (synced with active semester)
  const [schedules, setSchedules] = useState([
    { id: 1, day: "Rabu", semester: 6, subject: "Pemrograman Objek", time: "08:00 - 10:30", room: "Lab Komputer 3", lecturer: "Dr. Bambang", sks: 3, status: "Completed" },
    { id: 2, day: "Rabu", semester: 6, subject: "Aplikasi Bergerak", time: "10:45 - 13:15", room: "Ruang Teori 402", lecturer: "Ahmad Wijaya", sks: 3, status: "Ongoing" },
    { id: 3, day: "Kamis", semester: 6, subject: "Keamanan Jaringan", time: "14:00 - 16:30", room: "Ruang Teori 301", lecturer: "Siti Rahma", sks: 2, status: "Upcoming" }
  ]);

  // Central Tasks State
  const [tasks, setTasks] = useState([
    { id: 101, title: "Riset Multi-Spectral Sensing", subject: "Aplikasi Bergerak", code: "PAB2026", category: "Kelompok", deadline: new Date(Date.now() + 14 * 3600 * 1000).toISOString() },
    { id: 102, title: "Tugas Mandiri Diagram UML", subject: "Pemrograman Objek", code: "PBO2026", category: "Mandiri", deadline: new Date(Date.now() + 48 * 3600 * 1000).toISOString() }
  ]);

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

  const handleAddSchedule = (newSch) => {
    setSchedules(prev => [...prev, newSch]);
  };

  const handleAddTask = (newTask) => {
    setTasks(prev => [...prev, newTask]);
  };

  return (
    <Router>
      <div className="viewport">
        <div className="shell">
          <Navbar user={user} />
          
          <main className="page">
            <Routes>
              <Route path="/" element={<Dashboard user={user} schedules={schedules} tasks={tasks} />} />
              <Route path="/projects" element={<ProjectWorkspace currentUser={user} availableCourses={schedules} />} />
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
                    onAddSchedule={handleAddSchedule}
                    onAddTask={handleAddTask}
                    availableCourses={schedules}
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
