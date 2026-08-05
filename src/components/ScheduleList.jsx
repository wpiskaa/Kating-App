import React from 'react';
import { Clock, MapPin } from 'lucide-react';

export default function ScheduleList({ schedules }) {
  if (!schedules || schedules.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '1rem', color: 'var(--text-tertiary)', fontSize: '0.825rem' }}>
        Tidak ada jadwal perkuliahan hari ini.
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
      {schedules.map((item) => {
        const isDone = item.status === 'Completed';
        const isLive = item.status === 'Ongoing';

        return (
          <div
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.85rem 1rem',
              borderRadius: 'var(--radius-inner)',
              backgroundColor: isLive ? 'rgba(99, 102, 241, 0.08)' : 'rgba(255, 255, 255, 0.03)',
              border: isLive ? '1px solid var(--border-focus)' : '1px solid var(--border-subtle)'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 700 }}>{item.subject}</h4>
                <span className={`pill-badge ${isDone ? 'pill-success' : isLive ? 'pill-info' : 'pill-warning'}`}>
                  {item.status}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '0.85rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Clock size={12} color="#818cf8" /> {item.time}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <MapPin size={12} color="#06b6d4" /> {item.room}
                </span>
              </div>
            </div>

            <span style={{ fontSize: '0.725rem', fontWeight: 600, color: 'var(--text-tertiary)' }}>
              {item.sks} SKS
            </span>
          </div>
        );
      })}
    </div>
  );
}
