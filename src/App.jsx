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

// Default mock datasets for different semesters
const DEFAULT_SEMESTER_DATASETS = {
  6: {
    schedules: [
      { id: 601, day: "Rabu", semester: 6, subject: "Pemrograman Objek", time: "08:00 - 10:30", room: "Lab Komputer 3", lecturer: "Dr. Bambang", sks: 3, status: "Completed" },
      { id: 602, day: "Rabu", semester: 6, subject: "Aplikasi Bergerak", time: "10:45 - 13:15", room: "Ruang Teori 402", lecturer: "Ahmad Wijaya", sks: 3, status: "Ongoing" },
      { id: 603, day: "Kamis", semester: 6, subject: "Keamanan Jaringan", time: "14:00 - 16:30", room: "Ruang Teori 301", lecturer: "Siti Rahma", sks: 2, status: "Upcoming" }
    ],
    tasks: [
      { id: 6101, title: "Riset Multi-Spectral Sensing", subject: "Aplikasi Bergerak", code: "PAB2026", category: "Kelompok", deadline: new Date(Date.now() + 14 * 3600 * 1000).toISOString() },
      { id: 6102, title: "Tugas Mandiri Diagram UML", subject: "Pemrograman Objek", code: "PBO2026", category: "Mandiri", deadline: new Date(Date.now() + 48 * 3600 * 1000).toISOString() }
    ]
  },
  3: {
    schedules: [
      { id: 301, day: "Senin", semester: 3, subject: "Ilmu Budaya Dasar (IBD)", time: "08:00 - 09:40", room: "R.201", lecturer: "Drs. H. Mulyadi", sks: 2, status: "Upcoming" },
      { id: 302, day: "Rabu", semester: 3, subject: "Struktur Data & Algoritma", time: "10:00 - 12:30", room: "Lab 2", lecturer: "Rina Astuti, M.Cs.", sks: 3, status: "Upcoming" }
    ],
    tasks: [
      { id: 3101, title: "Makalah Esai IBD Kebudayaan", subject: "Ilmu Budaya Dasar (IBD)", code: "IBD2025", category: "Mandiri", deadline: new Date(Date.now() + 72 * 3600 * 1000).toISOString() }
    ]
  }
};

export default function App() {
  const [user, setUser] = useState(() => getCurrentSessionUser() || DEMO_USER);
  const [theme, setTheme] = useState(() => localStorage.getItem('kating_theme') || 'dark');

  const activeSemester = user?.semester || 6;

  // Semester Isolated Datasets Engine
  const [allSemesterSchedules, setAllSemesterSchedules] = useState(() => {
    const saved = localStorage.getItem('kating_semester_schedules');
    return saved ? JSON.parse(saved) : DEFAULT_SEMESTER_DATASETS;
  });

  const [allSemesterTasks, setAllSemesterTasks] = useState(() => {
    const saved = localStorage.getItem('kating_semester_tasks');
    return saved ? JSON.parse(saved) : DEFAULT_SEMESTER_DATASETS;
  });

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

  // Get current active semester schedules & tasks
  const activeSchedules = allSemesterSchedules[activeSemester]?.schedules || [];
  const activeTasks = allSemesterTasks[activeSemester]?.tasks || [];

  const handleAddSchedule = (newSch) => {
    const sem = activeSemester;
    const currentSemObj = allSemesterSchedules[sem] || { schedules: [] };
    const updatedSchedules = [...currentSemObj.schedules, { ...newSch, semester: sem }];
    
    const updatedAll = {
      ...allSemesterSchedules,
      [sem]: { ...currentSemObj, schedules: updatedSchedules }
    };

    setAllSemesterSchedules(updatedAll);
    localStorage.setItem('kating_semester_schedules', JSON.stringify(updatedAll));
  };

  const handleAddTask = (newTask) => {
    const sem = activeSemester;
    const currentSemObj = allSemesterTasks[sem] || { tasks: [] };
    const updatedTasks = [...currentSemObj.tasks, { ...newTask, semester: sem }];

    const updatedAll = {
      ...allSemesterTasks,
      [sem]: { ...currentSemObj, tasks: updatedTasks }
    };

    setAllSemesterTasks(updatedAll);
    localStorage.setItem('kating_semester_tasks', JSON.stringify(updatedAll));
  };

  return (
    <Router>
      <div className="viewport">
        <div className="shell">
          <Navbar user={user} />
          
          <main className="page">
            <Routes>
              <Route path="/" element={<Dashboard user={user} schedules={activeSchedules} tasks={activeTasks} />} />
              <Route path="/projects" element={<ProjectWorkspace currentUser={user} availableCourses={activeSchedules} semesterTasks={activeTasks} />} />
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
                    availableCourses={activeSchedules}
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
