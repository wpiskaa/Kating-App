import React, { useState } from 'react';
import { X, UploadCloud, Award, Building, Calendar, UserCheck, FileText } from 'lucide-react';

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
    if (file) {
      setFileName(file.name);
    }
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
      fileName: fileName || 'Sertifikat_Digital_Prestasi.pdf'
    });

    setTitle('');
    setRole('');
    setInstitution('');
    setDate('');
    setDescription('');
    setFileName('');
    onClose();
  };

  const setPresetITSpecta = () => {
    setTitle('Kepanitiaan IT Specta 2026');
    setRole('Koordinator Divisi Perangkat Software');
    setInstitution('Himpunan Mahasiswa Teknologi Informasi');
    setDate('Mei 2026');
    setCategory('Kepanitiaan');
    setDescription('Memimpin divisi pengembang aplikasi pendaftaran dan manajemen peserta secara online.');
    setFileName('SK_Kepanitiaan_IT_Specta.pdf');
  };

  const setPresetRiset = () => {
    setTitle('Inovasi Perangkat Deteksi Golongan Darah Portabel Berbasis Multi-Spectral Sensing');
    setRole('Ketua Peneliti Utama');
    setInstitution('Laboratorium Sistem Terintegrasi UMY');
    setDate('Juli 2026');
    setCategory('Riset & Inovasi');
    setDescription('Finalisasi riset publikasi pembuatan alat pendeteksi golongan darah tanpa jarum berbasis pemindaian multispektral.');
    setFileName('Berkas_Finalisasi_Riset_GolonganDarah.pdf');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '650px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Award size={22} color="#818cf8" />
            Unggah Dokumen & Isi Metadata Terstruktur (FR-5.2)
          </h3>
          <button onClick={onClose} style={{ background: 'none', color: 'var(--text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        {/* SRS Presets */}
        <div style={{ marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
            Preset Skenario Dokumen SRS:
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            <button
              type="button"
              className="btn-secondary"
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
              onClick={setPresetITSpecta}
            >
              📜 Kepanitiaan IT Specta
            </button>
            <button
              type="button"
              className="btn-secondary"
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
              onClick={setPresetRiset}
            >
              🔬 Riset Deteksi Golongan Darah
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* File Upload Box */}
          <div className="form-group" style={{
            border: '2px dashed var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            textAlign: 'center',
            backgroundColor: 'var(--bg-card)',
            marginBottom: '1.25rem'
          }}>
            <UploadCloud size={32} color="#818cf8" style={{ marginBottom: '0.5rem' }} />
            <span style={{ fontSize: '0.875rem', fontWeight: 600, display: 'block' }}>
              {fileName ? `File Terpilih: ${fileName}` : 'Pilih Dokumen PDF atau Gambar Prestasi'}
            </span>
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              style={{ display: 'none' }}
              id="cert-file-input"
              onChange={handleFileChange}
            />
            <label htmlFor="cert-file-input" className="btn-secondary" style={{ marginTop: '0.75rem', display: 'inline-flex', padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}>
              Pilih Berkas Digital
            </label>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Nama Prestasi / Kegiatan</label>
              <input
                type="text"
                className="form-input"
                placeholder="Contoh: Kepanitiaan IT Specta"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Nama Peran (Role Name)</label>
              <input
                type="text"
                className="form-input"
                placeholder="Contoh: Koordinator Software"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Institusi Penyelenggara</label>
              <input
                type="text"
                className="form-input"
                placeholder="Contoh: HMTI UMY / Kemendikbud"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Tanggal / Periode Pelaksanaan</label>
              <input
                type="text"
                className="form-input"
                placeholder="Contoh: Mei 2026"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Kategori Rekam Jejak</label>
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Kepanitiaan">Kepanitiaan & Organisasi</option>
              <option value="Riset & Inovasi">Riset & Inovasi Perangkat</option>
              <option value="Kompetisi">Kompetisi & Lomba</option>
              <option value="Sertifikasi">Sertifikasi Keahlian</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Deskripsi Ringkas (Poin Penting Resume)</label>
            <textarea
              className="form-textarea"
              rows="3"
              placeholder="Jelaskan pencapaian utama untuk diekstrak ke Resume ATS-Friendly..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn-secondary" style={{ flex: 1 }} onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
              Unggah & Simpan Metadata
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
