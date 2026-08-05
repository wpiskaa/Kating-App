import React from 'react';
import { Calendar, Clock, MapPin, User, CheckCircle2, PlayCircle } from 'lucide-react';

export default function ScheduleList({ schedules }) {
  if (!schedules || schedules.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
        Tidak ada jadwal perkuliahan hari ini.
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {schedules.map((item) => {
        const isLive = item.status === 'Ongoing';
        const isDone = item.status === 'Completed';

        return (
          <div
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1.1rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: isLive ? 'rgba(99, 102, 241, 0.12)' : 'var(--bg-card)',
              border: isLive ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
              transition: 'var(--transition-normal)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{
                background: isLive ? 'var(--accent-gradient)' : 'var(--bg-secondary)',
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {isDone ? <CheckCircle2 size={24} color="#10b981" /> : isLive ? <PlayCircle size={24} color="white" /> : <Calendar size={24} color="#9ca3af" />}
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{item.subject}</h4>
                  <span className={`badge ${isDone ? 'badge-success' : isLive ? 'badge-info' : 'badge-warning'}`}>
                    {item.status}
                  </span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Clock size={14} color="#818cf8" />
                    {item.time}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <MapPin size={14} color="#38bdf8" />
                    {item.room}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <User size={14} color="#fbbf24" />
                    {item.lecturer}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                {item.sks} SKS
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
