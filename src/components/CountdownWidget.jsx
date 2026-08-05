import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle } from 'lucide-react';

export default function CountdownWidget({ tasks }) {
  const [sortedTasks, setSortedTasks] = useState([]);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!tasks) return;
    const sorted = [...tasks].sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
    setSortedTasks(sorted);
  }, [tasks]);

  const calculateTimeRemaining = (deadlineStr) => {
    const target = new Date(deadlineStr).getTime();
    const diff = target - now;

    if (diff <= 0) return { expired: true, text: "Waktu Habis!", hoursLeft: 0 };

    const totalSeconds = Math.floor(diff / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (n) => String(n).padStart(2, '0');
    return {
      expired: false,
      text: `${pad(hours)}j ${pad(minutes)}m ${pad(seconds)}d`,
      hoursLeft: hours
    };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
      {sortedTasks.map((task) => {
        const timeObj = calculateTimeRemaining(task.deadline);
        const isUrgent = !timeObj.expired && timeObj.hoursLeft < 24;

        return (
          <div
            key={task.id}
            style={{
              padding: '0.85rem 1rem',
              borderRadius: 'var(--radius-inner)',
              backgroundColor: isUrgent ? 'rgba(244, 63, 94, 0.08)' : 'rgba(255, 255, 255, 0.03)',
              border: isUrgent ? '1px solid rgba(244, 63, 94, 0.3)' : '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.75rem'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.15rem' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700 }}>{task.title}</h4>
                <span className={`pill-badge ${task.category === 'Kelompok' ? 'pill-info' : 'pill-warning'}`}>
                  {task.category}
                </span>
              </div>
              <p style={{ fontSize: '0.725rem', color: 'var(--text-tertiary)' }}>{task.subject}</p>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              backgroundColor: isUrgent ? 'rgba(244, 63, 94, 0.15)' : 'rgba(255, 255, 255, 0.05)',
              padding: '0.35rem 0.65rem',
              borderRadius: 'var(--radius-pill)',
              border: isUrgent ? '1px solid rgba(244, 63, 94, 0.3)' : '1px solid var(--border-subtle)'
            }}>
              {isUrgent ? <AlertCircle size={13} color="#f43f5e" /> : <Clock size={13} color="#06b6d4" />}
              <span style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                fontFamily: 'JetBrains Mono, monospace',
                color: isUrgent ? '#fb7185' : '#38bdf8'
              }}>
                {timeObj.text}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
