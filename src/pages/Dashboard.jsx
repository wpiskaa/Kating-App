import React, { useState } from 'react';
import ScheduleList from '../components/ScheduleList';
import CountdownWidget from '../components/CountdownWidget';
import { BookOpen, Clock, TrendingUp, Calendar as CalendarIcon, Sparkles } from 'lucide-react';

export default function Dashboard({ user }) {
  const [schedules] = useState([
    { id: 1, subject: "Pemrograman Berbasis Objek (PBO)", time: "08:00 - 10:30 WIB", room: "Lab Komputer 3", lecturer: "Dr. Ir. Bambang S.", sks: 3, status: "Completed" },
    { id: 2, subject: "Pengembangan Aplikasi Bergerak (PAB)", time: "10:45 - 13:15 WIB", room: "Ruang R.402", lecturer: "Ahmad Wijaya, M.Kom.", sks: 3, status: "Ongoing" },
    { id: 3, subject: "Keamanan Jaringan & Siber", time: "14:00 - 16:30 WIB", room: "Ruang R.301", lecturer: "Siti Rahma, M.Eng.", sks: 2, status: "Upcoming" }
  ]);

  const [tasks] = useState([
    { id: 101, title: "Laporan Riset PAB - Multi-Spectral", subject: "PAB", code: "PAB2026", category: "Kelompok", deadline: new Date(Date.now() + 14 * 3600 * 1000).toISOString() },
    { id: 102, title: "Tugas Mandiri 3 - Diagram UML", subject: "PBO", code: "PBO2026", category: "Individu", deadline: new Date(Date.now() + 48 * 3600 * 1000).toISOString() },
    { id: 103, title: "Analisis Vektor Serangan MitM", subject: "KJN", code: "KJN2026", category: "Kelompok", deadline: new Date(Date.now() + 96 * 3600 * 1000).toISOString() }
  ]);

  return (
    <>
      {/* Mobile Greeting Card */}
      <div className="mobile-card" style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #111827 100%)',
        border: '1px solid rgba(99, 102, 241, 0.3)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#818cf8', fontWeight: 700, textTransform: 'uppercase' }}>
              Smart Academic Dashboard
            </span>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '0.2rem' }}>
              Halo, {user?.displayName ? user.displayName.split(' ')[0] : 'Hafiz'} 👋
            </h2>
            <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              {user?.prodi || 'Teknologi Informasi'} • Semester {user?.semester || 6}
            </p>
          </div>
          <div style={{ background: 'rgba(99, 102, 241, 0.2)', padding: '0.5rem', borderRadius: '10px' }}>
            <Sparkles size={20} color="#818cf8" />
          </div>
        </div>
      </div>

      {/* Metrics Mini Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <div className="mobile-card" style={{ padding: '0.85rem 1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingUp size={18} color="#34d399" />
            <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Target IPK</span>
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '0.25rem' }}>3.88</h3>
        </div>

        <div className="mobile-card" style={{ padding: '0.85rem 1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={18} color="#f87171" />
            <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Kritis (&lt;24j)</span>
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f87171', marginTop: '0.25rem' }}>1 Tugas</h3>
        </div>
      </div>

      {/* Countdown Widget Section */}
      <div className="mobile-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
          <h3 className="mobile-card-title">
            <Clock size={18} color="#06b6d4" />
            Countdown Tenggat Terdekat
          </h3>
          <span className="badge badge-danger">Live</span>
        </div>
        <CountdownWidget tasks={tasks} />
      </div>

      {/* Schedule Section */}
      <div className="mobile-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
          <h3 className="mobile-card-title">
            <BookOpen size={18} color="#818cf8" />
            Jadwal Kuliah Hari Ini
          </h3>
          <span className="badge badge-info">3 Matkul</span>
        </div>
        <ScheduleList schedules={schedules} />
      </div>
    </>
  );
}
