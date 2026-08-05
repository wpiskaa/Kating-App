import React, { useState } from 'react';
import ScheduleList from '../components/ScheduleList';
import CountdownWidget from '../components/CountdownWidget';
import { BookOpen, Clock, AlertCircle, CheckCircle2, TrendingUp, Sparkles, Calendar as CalendarIcon } from 'lucide-react';

export default function Dashboard({ user }) {
  // Preset dummy data for Smart Academic Dashboard (Modul 1)
  const [schedules] = useState([
    {
      id: 1,
      subject: "Pemrograman Berbasis Objek (PBO)",
      time: "08:00 - 10:30 WIB",
      room: "Lab Komputer 3 (Gedung F)",
      lecturer: "Dr. Ir. Bambang S., M.T.",
      sks: 3,
      status: "Completed"
    },
    {
      id: 2,
      subject: "Pengembangan Aplikasi Bergerak (PAB)",
      time: "10:45 - 13:15 WIB",
      room: "Ruang Teori R.402",
      lecturer: "Ahmad Wijaya, M.Kom.",
      sks: 3,
      status: "Ongoing"
    },
    {
      id: 3,
      subject: "Keamanan Jaringan & Siber",
      time: "14:00 - 16:30 WIB",
      room: "Ruang R.301",
      lecturer: "Siti Rahma, S.T., M.Eng.",
      sks: 2,
      status: "Upcoming"
    }
  ]);

  // Tasks with deadlines (some <24h for urgent countdown sorting)
  const [tasks] = useState([
    {
      id: 101,
      title: "Laporan Riset PAB - Multi-Spectral Sensing",
      subject: "Pengembangan Aplikasi Bergerak",
      code: "PAB2026",
      category: "Kelompok",
      deadline: new Date(Date.now() + 14 * 3600 * 1000).toISOString() // 14 hours from now (<24h)
    },
    {
      id: 102,
      title: "Tugas Mandiri 3 - Diagram UML & Firestore Rules",
      subject: "Pemrograman Berbasis Objek",
      code: "PBO2026",
      category: "Individu",
      deadline: new Date(Date.now() + 48 * 3600 * 1000).toISOString() // 48 hours from now
    },
    {
      id: 103,
      title: "Analisis Vektor Serangan MitM Jaringan",
      subject: "Keamanan Jaringan",
      code: "KJN2026",
      category: "Kelompok",
      deadline: new Date(Date.now() + 96 * 3600 * 1000).toISOString() // 4 days from now
    }
  ]);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Smart Academic Dashboard</h1>
          <p className="page-subtitle">
            Selamat datang kembali, <strong>{user?.displayName || 'Hafiz Kurniawan'}</strong>! Berikut ringkasan akademis Anda hari ini.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: 'var(--bg-secondary)', padding: '0.625rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <CalendarIcon size={18} color="#818cf8" />
          <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Rabu, 5 Agustus 2026</span>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid-container" style={{ marginBottom: '2rem' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ background: 'rgba(99, 102, 241, 0.15)', padding: '1rem', borderRadius: 'var(--radius-md)', color: '#818cf8' }}>
            <TrendingUp size={28} />
          </div>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>IPK Kumulatif (Target)</span>
            <h3 style={{ fontSize: '1.65rem', fontWeight: 800 }}>3.88 / 4.00</h3>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.15)', padding: '1rem', borderRadius: 'var(--radius-md)', color: '#fbbf24' }}>
            <Clock size={28} />
          </div>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Tugas Batas Kritis (&lt; 24 Jam)</span>
            <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#f87171' }}>1 Tugas</h3>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '1rem', borderRadius: 'var(--radius-md)', color: '#34d399' }}>
            <BookOpen size={28} />
          </div>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total SKS Semester Ini</span>
            <h3 style={{ fontSize: '1.65rem', fontWeight: 800 }}>22 SKS</h3>
          </div>
        </div>
      </div>

      {/* Main Grid: Schedule vs Countdown */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
        {/* Real-time Schedule Card */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <BookOpen size={22} color="#818cf8" />
              Jadwal Kuliah Hari Ini (Real-Time)
            </h3>
            <span className="badge badge-info">3 Matkul Hari Ini</span>
          </div>
          <ScheduleList schedules={schedules} />
        </div>

        {/* Dynamic Countdown Widget */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <Clock size={22} color="#06b6d4" />
              Countdown Tugas (Batas Tenggat Terdekat)
            </h3>
            <span className="badge badge-danger">Live Ticker</span>
          </div>
          <CountdownWidget tasks={tasks} />
        </div>
      </div>
    </div>
  );
}
