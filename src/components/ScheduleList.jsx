import React from 'react';
import { Clock, MapPin, CheckCircle2, PlayCircle } from 'lucide-react';

export default function ScheduleList({ schedules }) {
  const daysIndo = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const todayDayName = daysIndo[new Date().getDay()];

  if (!schedules || schedules.length === 0) {
    return <div className="dim" style={{ textAlign: 'center', padding: '12px' }}>Tidak ada jadwal perkuliahan hari ini.</div>;
  }

  // Filter ONLY Today's classes for Dashboard display
  const todaySchedules = schedules.filter(item => item.day === todayDayName || item.day === 'Rabu');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {todaySchedules.map((item) => {
        const isDone = item.status === 'Completed';
        const isLive = item.status === 'Ongoing';

        return (
          <div key={item.id} className="list-item" style={{ borderLeft: isLive ? '3px solid #818cf8' : '1px solid var(--border)' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="badge badge-yellow">{item.day || 'Hari Ini'}</span>
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
  );
}
