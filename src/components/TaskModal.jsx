import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function TaskModal({ isOpen, onClose, onAddTask }) {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Mandiri');
  const [hoursDeadline, setHoursDeadline] = useState(24);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    const deadlineTimestamp = new Date(Date.now() + parseFloat(hoursDeadline) * 3600 * 1000).toISOString();

    onAddTask({
      id: Date.now(),
      title,
      subject: subject || 'Matkul',
      code: 'MK2026',
      category,
      deadline: deadlineTimestamp
    });

    setTitle('');
    setSubject('');
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
            <label className="field-label">Mata Kuliah</label>
            <input type="text" className="field-input" placeholder="PAB / PBO" value={subject} onChange={(e) => setSubject(e.target.value)} />
          </div>

          <div className="field">
            <label className="field-label">Tipe Tugas</label>
            <select className="field-select" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="Mandiri">Mandiri (Personal)</option>
              <option value="Kelompok">Kelompok (Team Project)</option>
            </select>
          </div>

          <div className="field">
            <label className="field-label">Tenggat Waktu (Dalam Jam dari Sekarang)</label>
            <select className="field-select" value={hoursDeadline} onChange={(e) => setHoursDeadline(e.target.value)}>
              <option value={12}>12 Jam lagi (&lt;24j Alert)</option>
              <option value={24}>24 Jam lagi (1 Hari)</option>
              <option value={48}>48 Jam lagi (2 Hari)</option>
              <option value={96}>96 Jam lagi (4 Hari)</option>
            </select>
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
