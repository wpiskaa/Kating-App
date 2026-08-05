import React, { useState } from 'react';
import ScheduleList from '../components/ScheduleList';
import CountdownWidget from '../components/CountdownWidget';
import GPACalculatorModal from '../components/GPACalculatorModal';
import { BookOpen, Clock, TrendingUp, Sparkles, Flame, Zap, Compass, Calculator, ChevronUp, ChevronDown } from 'lucide-react';

export default function Dashboard({ user, schedules = [], tasks = [] }) {
  const [gpa, setGpa] = useState('3.88');
  const [isGPAModalOpen, setIsGPAModalOpen] = useState(false);

  // Collapsible section toggles (Hide/Show)
  const [hideStats, setHideStats] = useState(false);
  const [hideDeadline, setHideDeadline] = useState(false);
  const [hideTodaySchedule, setHideTodaySchedule] = useState(false);

  return (
    <>
      <div className="dashboard-grid">
        {/* LEFT COLUMN (Hero, Stats, Deadline) */}
        <div className="dashboard-col">
          {/* Sleek Profile Banner */}
          <div className="card-hero" style={{ background: 'var(--g-card-hero)', border: '1px solid rgba(99,102,241,0.25)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span className="label" style={{ color: '#818cf8' }}>Asisten Mahasiswa</span>
                <h2 className="h2" style={{ marginTop: '2px' }}>Hai, {user?.displayName?.split(' ')[0] || 'Hafiz'} ✨</h2>
                <span className="muted">{user?.prodi || 'Teknologi Informasi'} • Semester {user?.semester || 6}</span>
              </div>

              <div className="icon-box-sm" style={{ background: 'rgba(99,102,241,0.2)' }}>
                <Sparkles size={18} color="#818cf8" />
              </div>
            </div>
          </div>

          {/* Hideable Stats Row */}
          {!hideStats && (
            <div className="row">
              <div className="stat-card" onClick={() => setIsGPAModalOpen(true)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div className="icon-box-sm" style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399' }}>
                    <TrendingUp size={16} />
                  </div>
                  <div>
                    <span className="label">Target IPK</span>
                    <span className="h3 mono" style={{ display: 'block', color: '#34d399' }}>{gpa}</span>
                  </div>
                </div>
                <Calculator size={14} color="var(--text-3)" />
              </div>

              <div className="stat-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div className="icon-box-sm" style={{ background: 'rgba(244,63,94,0.15)', color: '#fb7185' }}>
                    <Flame size={16} />
                  </div>
                  <div>
                    <span className="label">Deadline &lt;24j</span>
                    <span className="h3 mono" style={{ display: 'block', color: '#fb7185' }}>{tasks.length} Task</span>
                  </div>
                </div>
                <button onClick={() => setHideStats(true)} className="icon-btn" title="Sembunyikan"><ChevronUp size={14} /></button>
              </div>
            </div>
          )}

          {hideStats && (
            <button onClick={() => setHideStats(false)} className="btn-ghost" style={{ padding: '6px', fontSize: '11px' }}>
              Tampilkan Target IPK & Stats <ChevronDown size={13} />
            </button>
          )}

          {/* Deadline Tugas Section */}
          <div className="card">
            <div className="section-row">
              <span className="h3" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Zap size={16} color="#22d3ee" /> Deadline Tugas
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="badge badge-red">Live Ticker</span>
                <button onClick={() => setHideDeadline(!hideDeadline)} className="icon-btn" title="Sembunyikan / Tampilkan">
                  {hideDeadline ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                </button>
              </div>
            </div>

            {!hideDeadline && <CountdownWidget tasks={tasks} />}
          </div>
        </div>

        {/* RIGHT COLUMN (Schedule & Tips) */}
        <div className="dashboard-col">
          {/* Jadwal Kuliah Hari Ini Section */}
          <div className="card">
            <div className="section-row">
              <span className="h3" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <BookOpen size={16} color="#818cf8" /> Jadwal Kuliah Hari Ini
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="badge badge-blue">Today</span>
                <button onClick={() => setHideTodaySchedule(!hideTodaySchedule)} className="icon-btn" title="Sembunyikan / Tampilkan">
                  {hideTodaySchedule ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                </button>
              </div>
            </div>

            {!hideTodaySchedule && <ScheduleList schedules={schedules} />}
          </div>

          {/* Universal Student Tips Card */}
          <div className="card" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.08) 0%, var(--bg-card) 100%)', border: '1px solid rgba(34,211,238,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="icon-box-sm" style={{ background: 'rgba(34,211,238,0.15)', color: '#22d3ee' }}>
                <Compass size={18} />
              </div>
              <div>
                <span className="h4" style={{ color: '#22d3ee' }}>Peluang & Tips Mahasiswa:</span>
                <span className="dim" style={{ display: 'block', marginTop: '2px' }}>Manfaatkan waktu luang untuk ikut kompetisi & magang.</span>
              </div>
            </div>
          </div>
        </div>
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
