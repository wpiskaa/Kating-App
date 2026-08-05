import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';

export default function TaskModal({ isOpen, onClose, onAddTask, availableCourses = [] }) {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState(availableCourses[0]?.subject || 'Pemrograman Objek');
  const [category, setCategory] = useState('Mandiri');
  
  // Date & Time Deadline fields
  const [deadlineDate, setDeadlineDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [deadlineTime, setDeadlineTime] = useState('23:59');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    const fullDeadlineStr = `${deadlineDate}T${deadlineTime}:00`;
    const deadlineObj = new Date(fullDeadlineStr);

    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const formattedDay = days[deadlineObj.getDay()];
    const formattedDateStr = `${formattedDay}, ${deadlineObj.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })} ${deadlineTime}`;

    onAddTask({
      id: Date.now(),
      title,
      subject: subject || 'Mata Kuliah',
      category,
      deadline: deadlineObj.toISOString(),
      formattedDeadline: formattedDateStr
    });

    setTitle('');
    onClose();
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="drag-handle" />
        <div className="section-row">
          <span className="h3">Tambah Tugas / Proyek</span>
          <button onClick={onClose} className="icon-btn"><X size={16} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="field-label">Judul Tugas / Proyek</label>
            <input type="text" className="field-input" placeholder="Laporan Riset PAB" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="field">
            <label className="field-label">Mata Kuliah Semester Ini</label>
            <select className="field-select" value={subject} onChange={(e) => setSubject(e.target.value)}>
              {availableCourses.length > 0 ? (
                availableCourses.map((c, idx) => (
                  <option key={idx} value={c.subject}>{c.subject} ({c.sks} SKS)</option>
                ))
              ) : (
                <>
                  <option value="Pemrograman Objek">Pemrograman Objek (3 SKS)</option>
                  <option value="Aplikasi Bergerak">Aplikasi Bergerak (3 SKS)</option>
                  <option value="Keamanan Jaringan">Keamanan Jaringan (2 SKS)</option>
                </>
              )}
            </select>
          </div>

          <div className="field">
            <label className="field-label">Tipe Tugas</label>
            <select className="field-select" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="Mandiri">Mandiri (Personal)</option>
              <option value="Kelompok">Kelompok (Team Project)</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '8px' }}>
            <div className="field">
              <label className="field-label">Tanggal Tenggat</label>
              <input
                type="date"
                className="field-input"
                value={deadlineDate}
                onChange={(e) => setDeadlineDate(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label className="field-label">Jam Tenggat</label>
              <input
                type="time"
                className="field-input"
                value={deadlineTime}
                onChange={(e) => setDeadlineTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '6px', marginTop: '14px' }}>
            <button type="button" className="btn-ghost" onClick={onClose}>Batal</button>
            <button type="submit" className="btn">Simpan Tugas</button>
          </div>
        </form>
      </div>
    </div>
  );
}
