import React, { useState } from 'react';
import ScheduleList from '../components/ScheduleList';
import CountdownWidget from '../components/CountdownWidget';
import { BookOpen, Clock, TrendingUp, Sparkles, Flame, Megaphone, Zap } from 'lucide-react';

export default function Dashboard({ user }) {
  // Pure Read-Only Overview Data (Zero Input Forms on Dashboard)
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
      {/* Greeting Banner */}
      <div className="card-hero" style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)', border: '1px solid rgba(99,102,241,0.3)', padding: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span className="label" style={{ color: '#818cf8' }}>Akademik Dasbor</span>
            <h2 className="h2" style={{ fontSize: '15px', marginTop: '2px' }}>Hai, {user?.displayName?.split(' ')[0] || 'Hafiz'} 👋</h2>
            <span className="muted">{user?.prodi || 'Teknologi Informasi'} • Sem {user?.semester || 6}</span>
          </div>

          <div className="icon-box-sm" style={{ background: 'rgba(99,102,241,0.2)' }}>
            <Sparkles size={16} color="#818cf8" />
          </div>
        </div>
      </div>

      {/* Announcement Card Banner */}
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.1) 0%, var(--bg-card) 100%)', border: '1px solid rgba(34,211,238,0.25)', padding: '10px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="icon-box-sm" style={{ background: 'rgba(34,211,238,0.15)', color: '#22d3ee' }}>
            <Megaphone size={14} />
          </div>
          <div>
            <span className="h4" style={{ color: '#22d3ee' }}>Pengumuman Akademik:</span>
            <span className="dim" style={{ display: 'block' }}>KRS Semester 7 dibuka 10 Agustus 2026.</span>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="row">
        <div className="stat-card" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="icon-box-sm" style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399' }}>
            <TrendingUp size={14} />
          </div>
          <div>
            <span className="label">Target IPK</span>
            <span className="h3 mono" style={{ display: 'block', color: '#34d399' }}>3.88</span>
          </div>
        </div>

        <div className="stat-card" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="icon-box-sm" style={{ background: 'rgba(244,63,94,0.15)', color: '#fb7185' }}>
            <Flame size={14} />
          </div>
          <div>
            <span className="label">Deadline &lt;24j</span>
            <span className="h3 mono" style={{ display: 'block', color: '#fb7185' }}>1 Task</span>
          </div>
        </div>
      </div>

      {/* Countdown Section */}
      <div className="card">
        <div className="section-row">
          <span className="h3" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Zap size={14} color="#22d3ee" /> Countdown Deadline
          </span>
          <span className="badge badge-red">Live Ticker</span>
        </div>
        <CountdownWidget tasks={tasks} />
      </div>

      {/* Schedule Section */}
      <div className="card">
        <div className="section-row">
          <span className="h3" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <BookOpen size={14} color="#818cf8" /> Jadwal Perkuliahan Hari Ini
          </span>
          <span className="badge badge-blue">3 Matkul</span>
        </div>
        <ScheduleList schedules={schedules} />
      </div>
    </>
  );
}
