import React, { useState } from 'react';
import UploadForm from '../components/UploadForm';
import { generateATSCV } from '../utils/pdfEngine';
import { Award, FileText, Plus, Sparkles, Trash2, Edit2, Eye, X } from 'lucide-react';

export default function AchievementVault({ currentUser }) {
  const [achievements, setAchievements] = useState([
    {
      id: 'ach-1',
      title: 'Kepanitiaan IT Specta 2026',
      role: 'Koordinator Software',
      institution: 'HMTI UMY',
      date: 'Mei 2026',
      category: 'Kepanitiaan',
      description: 'Memimpin tim pengembang aplikasi pendaftaran peserta online.',
      fileName: 'SK_Kepanitiaan_IT_Specta.pdf'
    },
    {
      id: 'ach-2',
      title: 'Riset Deteksi Golongan Darah',
      role: 'Ketua Peneliti',
      institution: 'Lab Sistem Terintegrasi',
      date: 'Juli 2026',
      category: 'Riset & Inovasi',
      description: 'Finalisasi berkas riset inovasi alat pendeteksi golongan darah portabel.',
      fileName: 'Berkas_Finalisasi_Riset.pdf'
    }
  ]);

  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Edit State (CRUD Update)
  const [editingItem, setEditingItem] = useState(null);
  
  // Preview Modal State
  const [previewItem, setPreviewItem] = useState(null);

  const handleAddAchievement = (newAchievement) => {
    setAchievements([newAchievement, ...achievements]);
  };

  const handleDeleteAchievement = (id) => {
    setAchievements((prev) => prev.filter(item => item.id !== id));
  };

  const handleUpdateAchievement = (e) => {
    e.preventDefault();
    setAchievements(achievements.map(item => item.id === editingItem.id ? editingItem : item));
    setEditingItem(null);
  };

  const handle1ClickCVExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      try {
        generateATSCV(currentUser, achievements);
      } catch (err) {
        console.error("PDF Export error:", err);
      } finally {
        setIsExporting(false);
      }
    }, 400);
  };

  return (
    <>
      {/* Header Banner */}
      <div className="card-hero" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(34,211,238,0.1) 100%)', border: '1px solid rgba(99,102,241,0.25)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
          <Award size={16} color="#818cf8" />
          <h2 className="h3">Brankas & 1-Click CV ATS</h2>
        </div>
        <span className="dim">Ekstrak otomatis metadata ke PDF Resume ATS (FR-5.3)</span>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginTop: '10px' }}>
          <button className="btn" onClick={handle1ClickCVExport} disabled={isExporting}>
            <Sparkles size={13} /> {isExporting ? 'Proses...' : 'Ekspor CV (PDF)'}
          </button>
          <button className="btn-ghost" onClick={() => setIsUploadOpen(true)}>
            <Plus size={13} /> Unggah Berkas
          </button>
        </div>
      </div>

      {/* Achievement Gallery */}
      <div className="card">
        <div className="section-row">
          <span className="h3" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <FileText size={15} color="#22d3ee" /> Rekam Jejak Prestasi
          </span>
          <span className="badge badge-cyan">{achievements.length} Berkas</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {achievements.map((item) => (
            <div key={item.id} className="list-item">
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span className="h4">{item.title}</span>
                  <span className="badge badge-cyan">{item.category}</span>
                </div>
                <span className="dim">{item.role} • {item.institution} ({item.date})</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <button onClick={() => setPreviewItem(item)} className="icon-btn" title="Pratinjau">
                  <Eye size={13} color="#22d3ee" />
                </button>
                <button onClick={() => setEditingItem(item)} className="icon-btn" title="Edit Metadata">
                  <Edit2 size={13} color="#818cf8" />
                </button>
                <button onClick={() => handleDeleteAchievement(item.id)} className="icon-btn" title="Hapus">
                  <Trash2 size={13} color="#fb7185" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Form Modal */}
      <UploadForm
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onAddAchievement={handleAddAchievement}
      />

      {/* Edit Achievement Metadata Modal (CRUD Update) */}
      {editingItem && (
        <div className="overlay" onClick={() => setEditingItem(null)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="drag-handle" />
            <div className="section-row">
              <span className="h3">Edit Metadata Prestasi</span>
              <button onClick={() => setEditingItem(null)} className="icon-btn"><X size={16} /></button>
            </div>

            <form onSubmit={handleUpdateAchievement}>
              <div className="field">
                <label className="field-label">Nama Kegiatan</label>
                <input
                  type="text"
                  className="field-input"
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  required
                />
              </div>

              <div className="field">
                <label className="field-label">Peran (Role Name)</label>
                <input
                  type="text"
                  className="field-input"
                  value={editingItem.role}
                  onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                  required
                />
              </div>

              <div className="field">
                <label className="field-label">Institusi</label>
                <input
                  type="text"
                  className="field-input"
                  value={editingItem.institution}
                  onChange={(e) => setEditingItem({ ...editingItem, institution: e.target.value })}
                  required
                />
              </div>

              <div className="field">
                <label className="field-label">Tanggal / Periode</label>
                <input
                  type="text"
                  className="field-input"
                  value={editingItem.date}
                  onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: '6px', marginTop: '14px' }}>
                <button type="button" className="btn-ghost" onClick={() => setEditingItem(null)}>Batal</button>
                <button type="submit" className="btn">Simpan Perubahan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewItem && (
        <div className="overlay" onClick={() => setPreviewItem(null)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="drag-handle" />
            <div className="section-row">
              <span className="h3">Detail Metadata Prestasi</span>
              <button onClick={() => setPreviewItem(null)} className="icon-btn"><X size={16} /></button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '10px 0' }}>
              <div><span className="label">Nama Kegiatan:</span> <p className="h3">{previewItem.title}</p></div>
              <div><span className="label">Peran:</span> <p className="h4">{previewItem.role}</p></div>
              <div><span className="label">Institusi:</span> <p className="h4">{previewItem.institution} ({previewItem.date})</p></div>
              {previewItem.description && <div><span className="label">Deskripsi:</span> <p className="dim">"{previewItem.description}"</p></div>}
              <div><span className="label">Berkas:</span> <p className="dim" style={{ color: '#34d399' }}>📄 {previewItem.fileName}</p></div>
            </div>

            <button className="btn" onClick={() => setPreviewItem(null)}>Tutup Pratinjau</button>
          </div>
        </div>
      )}
    </>
  );
}
