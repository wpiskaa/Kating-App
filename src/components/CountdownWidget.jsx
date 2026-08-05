import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';

export default function CountdownWidget({ tasks }) {
  const [sortedTasks, setSortedTasks] = useState([]);
  const [now, setNow] = useState(Date.now());

  // Update timer every second
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Sort tasks dynamically by closest deadline timestamp
  useEffect(() => {
    if (!tasks) return;
    const sorted = [...tasks].sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
    setSortedTasks(sorted);
  }, [tasks]);

  const calculateTimeRemaining = (deadlineStr) => {
    const target = new Date(deadlineStr).getTime();
    const diff = target - now;

    if (diff <= 0) {
      return { expired: true, text: "Waktu Habis!", hoursLeft: 0 };
    }

    const totalSeconds = Math.floor(diff / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (n) => String(n).padStart(2, '0');
    return {
      expired: false,
      text: `${pad(hours)}j ${pad(minutes)}m ${pad(seconds)}d`,
      hoursLeft: hours,
      diff
    };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {sortedTasks.map((task) => {
        const timeObj = calculateTimeRemaining(task.deadline);
        const isUrgent = !timeObj.expired && timeObj.hoursLeft < 24;

        return (
          <div
            key={task.id}
            style={{
              padding: '1.1rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: isUrgent ? 'rgba(239, 68, 68, 0.08)' : 'var(--bg-card)',
              border: isUrgent ? '1px solid var(--danger)' : '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{task.title}</h4>
                <span className={`badge ${task.category === 'Kelompok' ? 'badge-info' : 'badge-warning'}`}>
                  {task.category}
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {task.subject} • Matkul {task.code}
              </p>
            </div>

            {/* Countdown Badge */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.625rem',
              backgroundColor: isUrgent ? 'rgba(239, 68, 68, 0.2)' : 'var(--bg-secondary)',
              padding: '0.5rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              border: isUrgent ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid var(--border-color)'
            }}>
              {isUrgent ? (
                <AlertTriangle size={18} color="#ef4444" className="pulse-icon" />
              ) : (
                <Clock size={18} color="#06b6d4" />
              )}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <span style={{
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  fontFamily: 'monospace',
                  color: isUrgent ? '#f87171' : '#38bdf8'
                }}>
                  {timeObj.text}
                </span>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                  {isUrgent ? 'Batas Kritis < 24 Jam' : 'Sisa Batas Tenggat'}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
