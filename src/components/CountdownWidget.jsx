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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {sortedTasks.map((task) => {
        const timeObj = calculateTimeRemaining(task.deadline);
        const isUrgent = !timeObj.expired && timeObj.hoursLeft < 24;

        return (
          <div key={task.id} className="list-item" style={{ borderLeft: isUrgent ? '3px solid #f43f5e' : '1px solid var(--border)' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span className="h4">{task.title}</span>
                <span className={`badge ${task.category === 'Kelompok' ? 'badge-cyan' : 'badge-yellow'}`}>{task.category}</span>
              </div>
              <span className="dim">{task.subject} • {formatTaskDateDay(task.deadline)}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {isUrgent ? <AlertCircle size={12} color="#f43f5e" /> : <Clock size={12} color="#22d3ee" />}
              <span className="mono" style={{ fontSize: '11px', fontWeight: 700, color: isUrgent ? '#fb7185' : '#22d3ee' }}>
                {timeObj.text}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
