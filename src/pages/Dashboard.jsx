import React, { useState, useEffect } from 'react';
import ScheduleList from '../components/ScheduleList';
import CountdownWidget from '../components/CountdownWidget';
import { BookOpen, Clock, TrendingUp, Sparkles, Flame, CheckCircle2, Zap } from 'lucide-react';

export default function Dashboard({ user }) {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
    <div className="anim-fade">
      {/* Animated Greeting Banner */}
      <div className="card-hero" style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)', border: '1px solid rgba(99,102,241,0.3)', padding: '14px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
              <span className="live-dot" />
              <span className="label" style={{ color: '#818cf8' }}>Akademik Real-Time</span>
            </div>
            <h2 className="h2" style={{ fontSize: '16px' }}>Halo, {user?.displayName?.split(' ')[0] || 'Hafiz'} ✨</h2>
            <span className="muted">{user?.prodi || 'Teknologi Informasi'} • Semester {user?.semester || 6}</span>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span className="mono h3" style={{ color: '#22d3ee', display: 'block' }}>{currentTime}</span>
            <span className="dim" style={{ fontSize: '9px' }}>Waktu Indonesia</span>
          </div>
        </div>
      </div>

      {/* 2 Animated Stat Widgets */}
      <div className="row">
        <div className="stat-card" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="icon-box-sm" style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399' }}>
            <TrendingUp size={14} />
          </div>
          <div>
            <span className="label">IPK Target</span>
            <span className="h2 mono" style={{ display: 'block', color: '#34d399', fontSize: '15px' }}>3.88</span>
          </div>
        </div>

        <div className="stat-card" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="icon-box-sm" style={{ background: 'rgba(244,63,94,0.15)', color: '#fb7185' }}>
            <Flame size={14} />
          </div>
          <div>
            <span className="label">Urgent &lt;24j</span>
            <span className="h2 mono" style={{ display: 'block', color: '#fb7185', fontSize: '15px' }}>1 Task</span>
          </div>
        </div>
      </div>

      {/* Live Countdown Section */}
      <div className="card">
        <div className="section-row">
          <span className="h3" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Zap size={14} color="#22d3ee" /> Countdown Tenggat
          </span>
          <span className="badge badge-red" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span className="live-dot-urgent" /> Live Ticker
          </span>
        </div>
        <CountdownWidget tasks={tasks} />
      </div>

      {/* Schedule Section */}
      <div className="card">
        <div className="section-row">
          <span className="h3" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <BookOpen size={14} color="#818cf8" /> Jadwal Perkuliahan
          </span>
          <span className="badge badge-blue">3 Matkul Hari Ini</span>
        </div>
        <ScheduleList schedules={schedules} />
      </div>
    </div>
  );
}
