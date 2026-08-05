import React, { useState } from 'react';
import ScheduleList from '../components/ScheduleList';
import CountdownWidget from '../components/CountdownWidget';
import { BookOpen, Clock, TrendingUp, Sparkles } from 'lucide-react';

export default function Dashboard({ user }) {
  const [schedules] = useState([
    { id: 1, subject: "PBO", time: "08:00 - 10:30", room: "Lab 3", lecturer: "Dr. Bambang", sks: 3, status: "Completed" },
    { id: 2, subject: "PAB", time: "10:45 - 13:15", room: "R.402", lecturer: "Ahmad Wijaya", sks: 3, status: "Ongoing" },
    { id: 3, subject: "Keamanan Jaringan", time: "14:00 - 16:30", room: "R.301", lecturer: "Siti Rahma", sks: 2, status: "Upcoming" }
  ]);

  const [tasks] = useState([
    { id: 101, title: "Laporan Riset PAB Multi-Spectral", subject: "PAB", code: "PAB2026", category: "Kelompok", deadline: new Date(Date.now() + 14 * 3600 * 1000).toISOString() },
    { id: 102, title: "Tugas Mandiri Diagram UML", subject: "PBO", code: "PBO2026", category: "Individu", deadline: new Date(Date.now() + 48 * 3600 * 1000).toISOString() }
  ]);

  return (
    <>
      {/* Clean User Banner */}
      <div className="card-clean" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(17, 24, 39, 0.95) 100%)',
        border: '1px solid var(--border-focus)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.675rem', color: '#818cf8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Academic Dashboard
            </span>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, marginTop: '0.1rem' }}>
              Hai, {user?.displayName ? user.displayName.split(' ')[0] : 'Hafiz'} 👋
            </h2>
            <p style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
              {user?.prodi || 'Teknologi Informasi'} • Sem {user?.semester || 6}
            </p>
          </div>
          <div style={{ background: 'rgba(99, 102, 241, 0.15)', padding: '0.5rem', borderRadius: '12px' }}>
            <Sparkles size={18} color="#818cf8" />
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.625rem' }}>
        <div className="card-clean" style={{ padding: '0.75rem 0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <TrendingUp size={14} color="#34d399" />
            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Target IPK</span>
          </div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginTop: '0.15rem' }}>3.88</h3>
        </div>

        <div className="card-clean" style={{ padding: '0.75rem 0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Clock size={14} color="#fb7185" />
            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Deadline &lt;24j</span>
          </div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fb7185', marginTop: '0.15rem' }}>1 Tugas</h3>
        </div>
      </div>

      {/* Countdown Widget Section */}
      <div className="card-clean">
        <div className="card-clean-title">
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Clock size={16} color="#06b6d4" /> Countdown Deadline
          </span>
          <span className="pill-badge pill-danger">Live</span>
        </div>
        <CountdownWidget tasks={tasks} />
      </div>

      {/* Schedule Section */}
      <div className="card-clean">
        <div className="card-clean-title">
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <BookOpen size={16} color="#818cf8" /> Jadwal Hari Ini
          </span>
          <span className="pill-badge pill-info">3 Matkul</span>
        </div>
        <ScheduleList schedules={schedules} />
      </div>
    </>
  );
}
