import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function ScheduleModal({ isOpen, onClose, onAddSchedule }) {
  const [subject, setSubject] = useState('');
  const [time, setTime] = useState('');
  const [room, setRoom] = useState('');
  const [lecturer, setLecturer] = useState('');
  const [sks, setSks] = useState(3);
  const [status, setStatus] = useState('Upcoming');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject || !time) return;

    onAddSchedule({
      id: Date.now(),
      subject,
      time,
      room: room || 'R. Teori',
      lecturer: lecturer || 'Dosen pengampu',
      sks: parseInt(sks),
      status
    });

    setSubject('');
    setTime('');
    setRoom('');
    setLecturer('');
    onClose();
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="drag-handle" />
        <div className="section-row">
          <span className="h3">Tambah Jadwal Kuliah</span>
          <button onClick={onClose} className="icon-btn"><X size={16} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="field-label">Mata Kuliah</label>
            <input type="text" className="field-input" placeholder="Contoh: Pemrograman Mobile" value={subject} onChange={(e) => setSubject(e.target.value)} required />
          </div>

          <div className="field">
            <label className="field-label">Jam / Waktu Perkuliahan</label>
            <input type="text" className="field-input" placeholder="Contoh: 08:00 - 10:30" value={time} onChange={(e) => setTime(e.target.value)} required />
          </div>

          <div className="field">
            <label className="field-label">Ruang Kelas / Lab</label>
            <input type="text" className="field-input" placeholder="Lab Komputer 3" value={room} onChange={(e) => setRoom(e.target.value)} />
          </div>

          <div className="field">
            <label className="field-label">Dosen Pengampu</label>
            <input type="text" className="field-input" placeholder="Ahmad Wijaya, M.Kom." value={lecturer} onChange={(e) => setLecturer(e.target.value)} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div className="field">
              <label className="field-label">Jumlah SKS</label>
              <input type="number" className="field-input" value={sks} onChange={(e) => setSks(e.target.value)} />
            </div>

            <div className="field">
              <label className="field-label">Status Kelas</label>
              <select className="field-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Upcoming">Upcoming</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '6px', marginTop: '14px' }}>
            <button type="button" className="btn-ghost" onClick={onClose}>Batal</button>
            <button type="submit" className="btn">Simpan Jadwal</button>
          </div>
        </form>
      </div>
    </div>
  );
}
