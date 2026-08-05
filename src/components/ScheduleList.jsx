import React, { useState } from 'react';
import { Clock, MapPin } from 'lucide-react';

export default function ScheduleList({ schedules }) {
  const [dayFilter, setDayFilter] = useState('Hari Ini');

  const daysIndo = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const todayDayName = daysIndo[new Date().getDay()];

  if (!schedules || schedules.length === 0) {
    return <div className="dim" style={{ textAlign: 'center', padding: '12px' }}>Tidak ada jadwal perkuliahan.</div>;
  }

  const filteredSchedules = schedules.filter(item => {
    if (dayFilter === 'Hari Ini') {
      return item.day === todayDayName || item.day === 'Rabu'; // Default demo match for today
    }
    return true;
  });

  return (
    <div>
      {/* Day Filter Switcher */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
        <button
          onClick={() => setDayFilter('Hari Ini')}
          className={`badge ${dayFilter === 'Hari Ini' ? 'badge-blue' : ''}`}
          style={{ cursor: 'pointer', background: dayFilter === 'Hari Ini' ? '' : 'rgba(255,255,255,0.03)', color: dayFilter === 'Hari Ini' ? '' : 'var(--text-3)' }}
        >
          Hari Ini ({todayDayName})
        </button>
        <button
          onClick={() => setDayFilter('Semua Hari')}
          className={`badge ${dayFilter === 'Semua Hari' ? 'badge-cyan' : ''}`}
          style={{ cursor: 'pointer', background: dayFilter === 'Semua Hari' ? '' : 'rgba(255,255,255,0.03)', color: dayFilter === 'Semua Hari' ? '' : 'var(--text-3)' }}
        >
          Semua Hari ({schedules.length})
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {filteredSchedules.map((item) => {
          const isDone = item.status === 'Completed';
          const isLive = item.status === 'Ongoing';

          return (
            <div key={item.id} className="list-item" style={{ borderLeft: isLive ? '3px solid #818cf8' : '1px solid var(--border)' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span className="badge badge-yellow">{item.day || 'Rabu'}</span>
                  <span className="h4">{item.subject}</span>
                  <span className={`badge ${isDone ? 'badge-green' : isLive ? 'badge-blue' : 'badge-yellow'}`}>
                    {item.status}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '10px', fontSize: '10px', color: 'var(--text-2)', marginTop: '2px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Clock size={10} color="#818cf8" /> {item.time}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><MapPin size={10} color="#22d3ee" /> {item.room}</span>
                </div>
              </div>

              <span className="dim" style={{ fontWeight: 600 }}>{item.sks} SKS</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
