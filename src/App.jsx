import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProjectWorkspace from './pages/ProjectWorkspace';
import WalletTracker from './pages/WalletTracker';
import AchievementVault from './pages/AchievementVault';
import ChatWorkspace from './pages/ChatWorkspace';
import ProfileSettings from './pages/ProfileSettings';
import { getCurrentSessionUser, subscribeAuthChange, DEMO_USER } from './services/authService';

const DEFAULT_SEMESTER_DATASETS = {
  6: {
    schedules: [
      { id: 601, day: "Rabu", semester: 6, subject: "Pemrograman Objek", time: "08:00 - 10:30", room: "Lab Komputer 3", lecturer: "Dr. Bambang", sks: 3, status: "Completed" },
      { id: 602, day: "Rabu", semester: 6, subject: "Aplikasi Bergerak", time: "10:45 - 13:15", room: "Ruang Teori 402", lecturer: "Ahmad Wijaya", sks: 3, status: "Ongoing" },
      { id: 603, day: "Kamis", semester: 6, subject: "Keamanan Jaringan", time: "14:00 - 16:30", room: "Ruang Teori 301", lecturer: "Siti Rahma", sks: 2, status: "Upcoming" }
    ],
    tasks: [
      { id: 6101, title: "Riset Multi-Spectral Sensing", subject: "Aplikasi Bergerak", code: "PAB2026", category: "Kelompok", deadline: new Date(Date.now() + 14 * 3600 * 1000).toISOString(), completed: false },
      { id: 6102, title: "Tugas Mandiri Diagram UML", subject: "Pemrograman Objek", code: "PBO2026", category: "Mandiri", deadline: new Date(Date.now() + 48 * 3600 * 1000).toISOString(), completed: false },
      { id: 6103, title: "Praktikum Enkripsi AES", subject: "Keamanan Jaringan", code: "KJ2026", category: "Mandiri", deadline: new Date(Date.now() - 3600 * 1000).toISOString(), completed: false }
    ]
  }
};

export default function App() {
  const [user, setUser] = useState(() => getCurrentSessionUser() || DEMO_USER);
  const [theme, setTheme] = useState(() => localStorage.getItem('kating_theme') || 'dark');
  const [toast, setToast] = useState(null);

  const activeSemester = user?.semester || 6;

  // Activity Logs System
  const [activityLogs, setActivityLogs] = useState(() => {
    const saved = localStorage.getItem('kating_activity_logs');
    return saved ? JSON.parse(saved) : [
      { id: 1, action: 'Memulai Sesi Demo', detail: 'Sistem Kating App berhasil diinisialisasi', time: '10m lalu' }
    ];
  });

  const logActivity = (actionText, detailText) => {
    const newLog = {
      id: Date.now(),
      action: actionText,
      detail: detailText,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    const updatedLogs = [newLog, ...activityLogs];
    setActivityLogs(updatedLogs);
    localStorage.setItem('kating_activity_logs', JSON.stringify(updatedLogs));
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

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
    showToast(`Mode tampilan diubah ke ${theme === 'dark' ? 'Light' : 'Dark'} Mode`);
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
    showToast(`Selamat datang kembali, ${loggedInUser.displayName}!`);
    logActivity('Login Berhasil', `Masuk ke akun ${loggedInUser.displayName}`);
  };

  const handleLogout = () => {
    setUser(null);
  };

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
    showToast(`Jadwal ${newSch.subject} (${newSch.day}) berhasil ditambahkan!`);
    logActivity('Tambah Jadwal Kuliah', `${newSch.subject} pada hari ${newSch.day}`);
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
    showToast(`Tugas ${newTask.title} (${newTask.category}) berhasil disimpan!`);
    logActivity('Tambah Tugas', `${newTask.title} [${newTask.category}]`);
  };

  return (
    <Router>
      <div className="viewport">
        <div className="shell">
          <Navbar user={user} />
          <Toast toast={toast} onClose={() => setToast(null)} />
          
          <main className="page">
            <Routes>
              <Route path="/" element={<Dashboard user={user} schedules={activeSchedules} tasks={activeTasks} />} />
              <Route path="/projects" element={<ProjectWorkspace currentUser={user} availableCourses={activeSchedules} semesterTasks={activeTasks} onActionNotice={showToast} onLogAction={logActivity} />} />
              <Route path="/wallet" element={<WalletTracker onActionNotice={showToast} onLogAction={logActivity} />} />
              <Route path="/achievements" element={<AchievementVault currentUser={user} onActionNotice={showToast} onLogAction={logActivity} />} />
              <Route path="/chat" element={<ChatWorkspace currentUser={user} onActionNotice={showToast} onLogAction={logActivity} />} />
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
                    activityLogs={activityLogs}
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
