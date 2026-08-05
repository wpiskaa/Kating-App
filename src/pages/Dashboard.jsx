import React, { useState } from 'react';
import ScheduleList from '../components/ScheduleList';
import CountdownWidget from '../components/CountdownWidget';
import GPACalculatorModal from '../components/GPACalculatorModal';
import { BookOpen, Clock, TrendingUp, Sparkles, Flame, Zap, Compass, Calculator } from 'lucide-react';

export default function Dashboard({ user }) {
  const [gpa, setGpa] = useState('3.88');
  const [isGPAModalOpen, setIsGPAModalOpen] = useState(false);

  // General Read-Only Overview Data (Zero Input Forms on Dashboard)
  const [schedules] = useState([
    { id: 1, subject: "Pemrograman Objek", time: "08:00 - 10:30", room: "Lab Komputer", lecturer: "Dosen Pengampu", sks: 3, status: "Completed" },
    { id: 2, subject: "Aplikasi Bergerak", time: "10:45 - 13:15", room: "Ruang Teori", lecturer: "Ahmad Wijaya", sks: 3, status: "Ongoing" }
  ]);

  const [tasks] = useState([
    { id: 101, title: "Riset Multi-Spectral Sensing", subject: "Inovasi Perangkat", code: "PAB2026", category: "Kelompok", deadline: new Date(Date.now() + 14 * 3600 * 1000).toISOString() },
    { id: 102, title: "Tugas Mandiri Diagram UML", subject: "Pemrograman Objek", code: "PBO2026", category: "Mandiri", deadline: new Date(Date.now() + 48 * 3600 * 1000).toISOString() }
  ]);

  return (
    <>
      {/* Greeting Banner */}
      <div className="card-hero" style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)', border: '1px solid rgba(99,102,241,0.3)', padding: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span className="label" style={{ color: '#818cf8' }}>Asisten Mahasiswa</span>
            <h2 className="h2" style={{ fontSize: '15px', marginTop: '2px' }}>Hai, {user?.displayName?.split(' ')[0] || 'Hafiz'} ✨</h2>
            <span className="muted">{user?.prodi || 'Teknologi Informasi'} • Sem {user?.semester || 6}</span>
          </div>

          <div className="icon-box-sm" style={{ background: 'rgba(99,102,241,0.2)' }}>
            <Sparkles size={16} color="#818cf8" />
          </div>
        </div>
      </div>

      {/* General Student Tips / Opportunity Card (Universal Mahasiswa) */}
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.08) 0%, var(--bg-card) 100%)', padding: '10px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="icon-box-sm" style={{ background: 'rgba(34,211,238,0.15)', color: '#22d3ee' }}>
            <Compass size={14} />
          </div>
          <div>
            <span className="h4" style={{ color: '#22d3ee' }}>Peluang & Tips Mahasiswa:</span>
            <span className="dim" style={{ display: 'block' }}>Manfaatkan waktu luang untuk ikut kompetisi & magang.</span>
          </div>
        </div>
      </div>

      {/* Stats Row with Interactive GPA Target Calculator Trigger */}
      <div className="row">
        <div className="stat-card" onClick={() => setIsGPAModalOpen(true)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="icon-box-sm" style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399' }}>
              <TrendingUp size={14} />
            </div>
            <div>
              <span className="label">Target IPK</span>
              <span className="h3 mono" style={{ display: 'block', color: '#34d399' }}>{gpa}</span>
            </div>
          </div>
          <Calculator size={12} color="var(--text-3)" />
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
            <Zap size={14} color="#22d3ee" /> Countdown Tenggat
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
          <span className="badge badge-blue">2 Matkul</span>
        </div>
        <ScheduleList schedules={schedules} />
      </div>

      {/* GPA Calculator Modal */}
      <GPACalculatorModal
        isOpen={isGPAModalOpen}
        onClose={() => setIsGPAModalOpen(false)}
        currentGPA={gpa}
        onSaveGPA={(newGPA) => setGpa(newGPA)}
      />
    </>
  );
}
