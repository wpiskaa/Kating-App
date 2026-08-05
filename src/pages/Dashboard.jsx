import React, { useState } from 'react';
import ScheduleList from '../components/ScheduleList';
import CountdownWidget from '../components/CountdownWidget';
import { BookOpen, Clock, TrendingUp, Sparkles, Award } from 'lucide-react';

export default function Dashboard({ user }) {
  const [schedules] = useState([
    { id: 1, subject: "PBO", time: "08:00 - 10:30", room: "Lab 3", lecturer: "Dr. Bambang", sks: 3, status: "Completed" },
    { id: 2, subject: "PAB", time: "10:45 - 13:15", room: "R.402", lecturer: "Ahmad Wijaya", sks: 3, status: "Ongoing" },
    { id: 3, subject: "Keamanan Jaringan", time: "14:00 - 16:30", room: "R.301", lecturer: "Siti Rahma", sks: 2, status: "Upcoming" }
  ]);

  const [tasks] = useState([
    { id: 101, title: "Riset PAB Multi-Spectral", subject: "PAB", code: "PAB2026", category: "Kelompok", deadline: new Date(Date.now() + 14 * 3600 * 1000).toISOString() },
    { id: 102, title: "Tugas Mandiri Diagram UML", subject: "PBO", code: "PBO2026", category: "Individu", deadline: new Date(Date.now() + 48 * 3600 * 1000).toISOString() }
  ]);

  return (
    <>
      {/* Profile Mini Banner */}
      <div className="card-hero" style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #111827 100%)', border: '1px solid rgba(99,102,241,0.25)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span className="label" style={{ color: '#818cf8' }}>Academic Dasbor</span>
            <h2 className="h2" style={{ marginTop: '2px' }}>Hai, {user?.displayName?.split(' ')[0] || 'Hafiz'} 👋</h2>
            <span className="muted">{user?.prodi || 'Teknologi Informasi'} • Sem {user?.semester || 6}</span>
          </div>
          <div className="icon-box" style={{ background: 'rgba(99,102,241,0.15)' }}>
            <Sparkles size={18} color="#818cf8" />
          </div>
        </div>
      </div>

      {/* 2 Stat Cards */}
      <div className="row">
        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <TrendingUp size={14} color="#34d399" />
            <span className="label">IPK Target</span>
          </div>
          <span className="h2 mono" style={{ display: 'block', marginTop: '4px' }}>3.88</span>
        </div>

        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Clock size={14} color="#fb7185" />
            <span className="label">Tenggat &lt;24j</span>
          </div>
          <span className="h2 mono" style={{ color: '#fb7185', display: 'block', marginTop: '4px' }}>1 Task</span>
        </div>
      </div>

      {/* Countdown Section */}
      <div className="card">
        <div className="section-row">
          <span className="h3" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Clock size={15} color="#22d3ee" /> Countdown Deadline
          </span>
          <span className="badge badge-red">Live</span>
        </div>
        <CountdownWidget tasks={tasks} />
      </div>

      {/* Schedule Section */}
      <div className="card">
        <div className="section-row">
          <span className="h3" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <BookOpen size={15} color="#818cf8" /> Jadwal Hari Ini
          </span>
          <span className="badge badge-blue">3 Matkul</span>
        </div>
        <ScheduleList schedules={schedules} />
      </div>
    </>
  );
}
