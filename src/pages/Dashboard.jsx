import React, { useState } from 'react';
import ScheduleList from '../components/ScheduleList';
import CountdownWidget from '../components/CountdownWidget';
import ScheduleModal from '../components/ScheduleModal';
import TaskModal from '../components/TaskModal';
import { BookOpen, Clock, TrendingUp, Sparkles, Flame, Plus, ChevronUp, ChevronDown, Trash2 } from 'lucide-react';

export default function Dashboard({ user }) {
  // Collapsible section states (Hide/Show feature)
  const [hideStats, setHideStats] = useState(false);
  const [hideCountdown, setHideCountdown] = useState(false);
  const [hideSchedule, setHideSchedule] = useState(false);

  // Modals state
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  // Schedules state (CRUD)
  const [schedules, setSchedules] = useState([
    { id: 1, subject: "PBO", time: "08:00 - 10:30", room: "Lab 3", lecturer: "Dr. Bambang", sks: 3, status: "Completed" },
    { id: 2, subject: "PAB", time: "10:45 - 13:15", room: "R.402", lecturer: "Ahmad Wijaya", sks: 3, status: "Ongoing" },
    { id: 3, subject: "Keamanan Jaringan", time: "14:00 - 16:30", room: "R.301", lecturer: "Siti Rahma", sks: 2, status: "Upcoming" }
  ]);

  // Tasks state (CRUD)
  const [tasks, setTasks] = useState([
    { id: 101, title: "Riset PAB Multi-Spectral", subject: "PAB", code: "PAB2026", category: "Kelompok", deadline: new Date(Date.now() + 14 * 3600 * 1000).toISOString() },
    { id: 102, title: "Tugas Mandiri Diagram UML", subject: "PBO", code: "PBO2026", category: "Individu", deadline: new Date(Date.now() + 48 * 3600 * 1000).toISOString() }
  ]);

  const handleAddSchedule = (newSch) => {
    setSchedules([...schedules, newSch]);
  };

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleDeleteSchedule = (id) => {
    setSchedules(schedules.filter(s => s.id !== id));
  };

  return (
    <>
      {/* Greeting Banner */}
      <div className="card-hero" style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)', border: '1px solid rgba(99,102,241,0.3)', padding: '12px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span className="label" style={{ color: '#818cf8' }}>Akademik Dasbor</span>
            <h2 className="h2" style={{ fontSize: '15px', marginTop: '2px' }}>Hai, {user?.displayName?.split(' ')[0] || 'Hafiz'} 👋</h2>
            <span className="muted">{user?.prodi || 'Teknologi Informasi'} • Sem {user?.semester || 6}</span>
          </div>

          <div style={{ display: 'flex', gap: '4px' }}>
            <button onClick={() => setIsTaskModalOpen(true)} className="badge badge-cyan" style={{ cursor: 'pointer' }}>+ Tugas</button>
            <button onClick={() => setIsScheduleModalOpen(true)} className="badge badge-blue" style={{ cursor: 'pointer' }}>+ Jadwal</button>
          </div>
        </div>
      </div>

      {/* Hideable Stats Row */}
      {!hideStats && (
        <div className="row">
          <div className="stat-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <TrendingUp size={14} color="#34d399" />
              <div>
                <span className="label">Target IPK</span>
                <span className="h3 mono" style={{ display: 'block', color: '#34d399' }}>3.88</span>
              </div>
            </div>
            <button onClick={() => setHideStats(true)} className="icon-btn" title="Sembunyikan"><ChevronUp size={12} /></button>
          </div>

          <div className="stat-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Flame size={14} color="#fb7185" />
              <div>
                <span className="label">Urgent</span>
                <span className="h3 mono" style={{ display: 'block', color: '#fb7185' }}>1 Task</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {hideStats && (
        <button onClick={() => setHideStats(false)} className="btn-ghost" style={{ padding: '4px', fontSize: '9.5px' }}>
          Show Ringkasan Stats <ChevronDown size={11} />
        </button>
      )}

      {/* Countdown Section with Hide/Show */}
      <div className="card">
        <div className="section-row">
          <span className="h3" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Clock size={14} color="#22d3ee" /> Countdown Tenggat
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button onClick={() => setIsTaskModalOpen(true)} className="badge badge-cyan" style={{ cursor: 'pointer' }}>+ Tambah</button>
            <button onClick={() => setHideCountdown(!hideCountdown)} className="icon-btn">
              {hideCountdown ? <ChevronDown size={13} /> : <ChevronUp size={13} />}
            </button>
          </div>
        </div>

        {!hideCountdown && <CountdownWidget tasks={tasks} />}
      </div>

      {/* Schedule Section with Hide/Show & Delete */}
      <div className="card">
        <div className="section-row">
          <span className="h3" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <BookOpen size={14} color="#818cf8" /> Jadwal Perkuliahan
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button onClick={() => setIsScheduleModalOpen(true)} className="badge badge-blue" style={{ cursor: 'pointer' }}>+ Tambah</button>
            <button onClick={() => setHideSchedule(!hideSchedule)} className="icon-btn">
              {hideSchedule ? <ChevronDown size={13} /> : <ChevronUp size={13} />}
            </button>
          </div>
        </div>

        {!hideSchedule && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <ScheduleList schedules={schedules} />
          </div>
        )}
      </div>

      {/* Modals */}
      <ScheduleModal isOpen={isScheduleModalOpen} onClose={() => setIsScheduleModalOpen(false)} onAddSchedule={handleAddSchedule} />
      <TaskModal isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} onAddTask={handleAddTask} />
    </>
  );
}
