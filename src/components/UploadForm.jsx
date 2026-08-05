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
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.15rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Unggah Dokumen & Metadata</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-field" style={{ textAlign: 'center', border: '1.5px dashed var(--border-subtle)', borderRadius: '12px', padding: '1rem', marginBottom: '1rem' }}>
            <UploadCloud size={24} color="#818cf8" style={{ marginBottom: '0.25rem' }} />
            <span style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', display: 'block' }}>
              {fileName ? fileName : 'Pilih Berkas PDF / Gambar'}
            </span>
            <input type="file" id="pdf-cert-input" style={{ display: 'none' }} onChange={handleFileChange} />
            <label htmlFor="pdf-cert-input" className="pill-badge pill-info" style={{ marginTop: '0.5rem', display: 'inline-block', cursor: 'pointer' }}>
              Pilih Berkas
            </label>
          </div>

          <div className="form-field">
            <label className="form-label-clean">Nama Kegiatan / Prestasi</label>
            <input type="text" className="form-input-clean" placeholder="IT Specta 2026" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="form-field">
            <label className="form-label-clean">Peran (Role Name)</label>
            <input type="text" className="form-input-clean" placeholder="Koordinator Software" value={role} onChange={(e) => setRole(e.target.value)} required />
          </div>

          <div className="form-field">
            <label className="form-label-clean">Institusi Penyelenggara</label>
            <input type="text" className="form-input-clean" placeholder="HMTI UMY" value={institution} onChange={(e) => setInstitution(e.target.value)} required />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
            <button type="button" className="btn-minimal-secondary" onClick={onClose}>Batal</button>
            <button type="submit" className="btn-minimal">Simpan Metadata</button>
          </div>
        </form>
      </div>
    </div>
  );
}
