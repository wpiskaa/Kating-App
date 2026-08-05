import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function CountdownWidget({ tasks = [] }) {
  const [activeStatusTab, setActiveStatusTab] = useState('Aktif'); // 'Aktif' | 'Selesai' | 'Expired'
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const calculateTimeRemaining = (deadlineStr) => {
    const target = new Date(deadlineStr).getTime();
    const diff = target - now;

    if (diff <= 0) return { expired: true, text: "Habis!", hoursLeft: 0 };

    const totalSeconds = Math.floor(diff / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (n) => String(n).padStart(2, '0');
    return {
      expired: false,
      text: `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`,
      hoursLeft: hours
    };
  };

  const formatTaskDateDay = (deadlineStr) => {
    const d = new Date(deadlineStr);
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const dayName = days[d.getDay()];
    const dateStr = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
    const timeStr = d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    return `${dayName}, ${dateStr} (${timeStr})`;
  };

  // Categorize Tasks into Aktif, Selesai, and Lewat Tenggat (Expired)
  const activeTasks = tasks.filter(t => !t.completed && new Date(t.deadline).getTime() > now);
  const completedTasks = tasks.filter(t => t.completed);
  const expiredTasks = tasks.filter(t => !t.completed && new Date(t.deadline).getTime() <= now);

  const displayedList = activeStatusTab === 'Aktif' ? activeTasks
    : activeStatusTab === 'Selesai' ? completedTasks
    : expiredTasks;

  return (
    <div>
      {/* Separated Status Tabs: Aktif | Selesai | Lewat Tenggat */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
        <button
          onClick={() => setActiveStatusTab('Aktif')}
          className={`badge ${activeStatusTab === 'Aktif' ? 'badge-blue' : ''}`}
          style={{ cursor: 'pointer', background: activeStatusTab === 'Aktif' ? '' : 'rgba(255,255,255,0.03)', color: activeStatusTab === 'Aktif' ? '' : 'var(--text-3)' }}
        >
          Aktif ({activeTasks.length})
        </button>

        <button
          onClick={() => setActiveStatusTab('Selesai')}
          className={`badge ${activeStatusTab === 'Selesai' ? 'badge-green' : ''}`}
          style={{ cursor: 'pointer', background: activeStatusTab === 'Selesai' ? '' : 'rgba(255,255,255,0.03)', color: activeStatusTab === 'Selesai' ? '' : 'var(--text-3)' }}
        >
          Selesai ({completedTasks.length})
        </button>

        <button
          onClick={() => setActiveStatusTab('Expired')}
          className={`badge ${activeStatusTab === 'Expired' ? 'badge-red' : ''}`}
          style={{ cursor: 'pointer', background: activeStatusTab === 'Expired' ? '' : 'rgba(255,255,255,0.03)', color: activeStatusTab === 'Expired' ? '' : 'var(--text-3)' }}
        >
          Lewat Tenggat ({expiredTasks.length})
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {displayedList.length > 0 ? (
          displayedList.map((task) => {
            const timeObj = calculateTimeRemaining(task.deadline);
            const isUrgent = !timeObj.expired && timeObj.hoursLeft < 24;

            return (
              <div
                key={task.id}
                className="list-item"
                style={{
                  borderLeft: task.completed ? '3px solid #10b981' : isUrgent ? '3px solid #f43f5e' : timeObj.expired ? '3px solid var(--text-3)' : '1px solid var(--border)',
                  opacity: task.completed || timeObj.expired ? 0.75 : 1
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span className="h4" style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</span>
                    <span className={`badge ${task.category === 'Kelompok' ? 'badge-cyan' : 'badge-yellow'}`}>{task.category}</span>
                  </div>
                  <span className="dim">{task.subject} • {formatTaskDateDay(task.deadline)}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {task.completed ? (
                    <span className="badge badge-green" style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                      <CheckCircle2 size={10} /> Selesai
                    </span>
                  ) : timeObj.expired ? (
                    <span className="badge badge-red" style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                      <AlertTriangle size={10} /> Expired
                    </span>
                  ) : (
                    <>
                      {isUrgent ? <AlertCircle size={12} color="#f43f5e" /> : <Clock size={12} color="#22d3ee" />}
                      <span className="mono" style={{ fontSize: '11px', fontWeight: 700, color: isUrgent ? '#fb7185' : '#22d3ee' }}>
                        {timeObj.text}
                      </span>
                    </>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="dim" style={{ textAlign: 'center', padding: '12px' }}>
            Tidak ada tugas dalam kategori {activeStatusTab.toLowerCase()}.
          </div>
        )}
      </div>
    </div>
  );
}
