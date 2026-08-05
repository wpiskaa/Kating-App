import React, { useState } from 'react';
import { X, UploadCloud } from 'lucide-react';

export default function UploadForm({ isOpen, onClose, onAddAchievement }) {
  const [title, setTitle] = useState('');
  const [role, setRole] = useState('');
  const [institution, setInstitution] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('Kepanitiaan');
  const [description, setDescription] = useState('');
  const [fileName, setFileName] = useState('');

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !role || !institution) return;

    onAddAchievement({
      id: `ach-${Date.now()}`,
      title,
      role,
      institution,
      date: date || '2026',
      category,
      description,
      fileName: fileName || 'Dokumen_Prestasi.pdf'
    });

    setTitle('');
    setRole('');
    setInstitution('');
    setDate('');
    setDescription('');
    setFileName('');
    onClose();
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="drag-handle" />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span className="h3">Unggah Metadata Prestasi</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-3)' }}><X size={16} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="field" style={{ textAlign: 'center', border: '1.5px dashed var(--border-2)', borderRadius: '10px', padding: '10px', marginBottom: '10px' }}>
            <UploadCloud size={20} color="#818cf8" style={{ marginBottom: '2px' }} />
            <span className="dim" style={{ display: 'block' }}>{fileName ? fileName : 'Pilih Berkas PDF'}</span>
            <input type="file" id="pdf-input" style={{ display: 'none' }} onChange={handleFileChange} />
            <label htmlFor="pdf-input" className="badge badge-cyan" style={{ marginTop: '4px', display: 'inline-block', cursor: 'pointer' }}>Pilih File</label>
          </div>

          <div className="field">
            <label className="field-label">Nama Kegiatan</label>
            <input type="text" className="field-input" placeholder="IT Specta 2026" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="field">
            <label className="field-label">Peran (Role Name)</label>
            <input type="text" className="field-input" placeholder="Koordinator Software" value={role} onChange={(e) => setRole(e.target.value)} required />
          </div>

          <div className="field">
            <label className="field-label">Institusi</label>
            <input type="text" className="field-input" placeholder="HMTI UMY" value={institution} onChange={(e) => setInstitution(e.target.value)} required />
          </div>

          <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
            <button type="button" className="btn-ghost" onClick={onClose}>Batal</button>
            <button type="submit" className="btn">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  );
}
