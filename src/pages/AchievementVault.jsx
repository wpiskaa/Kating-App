import React, { useState } from 'react';
import UploadForm from '../components/UploadForm';
import { generateATSCV } from '../utils/pdfEngine';
import { Award, FileText, Download, Plus, Sparkles, Trash2, Building } from 'lucide-react';

export default function AchievementVault({ currentUser }) {
  const [achievements, setAchievements] = useState([
    {
      id: 'ach-1',
      title: 'Kepanitiaan IT Specta 2026',
      role: 'Koordinator Divisi Perangkat Software',
      institution: 'HMTI UMY',
      date: 'Mei 2026',
      category: 'Kepanitiaan',
      description: 'Memimpin tim pengembang aplikasi pendaftaran dan manajemen peserta online.',
      fileName: 'SK_Kepanitiaan_IT_Specta.pdf'
    },
    {
      id: 'ach-2',
      title: 'Riset Deteksi Golongan Darah Portabel',
      role: 'Ketua Peneliti Utama',
      institution: 'Lab Sistem Terintegrasi UMY',
      date: 'Juli 2026',
      category: 'Riset & Inovasi',
      description: 'Finalisasi berkas riset inovasi alat pendeteksi golongan darah portabel berbasis multi-spectral sensing.',
      fileName: 'Berkas_Finalisasi_Riset.pdf'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccessMsg, setExportSuccessMsg] = useState('');

  const handleAddAchievement = (newAchievement) => {
    setAchievements([newAchievement, ...achievements]);
  };

  const handleDeleteAchievement = (id) => {
    setAchievements((prev) => prev.filter(item => item.id !== id));
  };

  const handle1ClickCVExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      try {
        const exportedFilename = generateATSCV(currentUser, achievements);
        setExportSuccessMsg(`Resume PDF ATS (${exportedFilename}) berhasil diunduh!`);
        setTimeout(() => setExportSuccessMsg(''), 4000);
      } catch (err) {
        console.error("PDF Export error:", err);
      } finally {
        setIsExporting(false);
      }
    }, 600);
  };

  return (
    <>
      {/* Mobile Header Banner */}
      <div className="mobile-card" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.4)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <Award size={20} color="#818cf8" />
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Brankas & 1-Click CV ATS</h2>
        </div>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
          Ekstrak metadata ke dokumen Resume ATS-Friendly tanpa desain manual (FR-5.3).
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button className="btn-mobile-primary" onClick={handle1ClickCVExport} disabled={isExporting}>
            <Sparkles size={16} />
            {isExporting ? 'Meramu PDF ATS...' : '1-Click Ekspor CV ATS (PDF)'}
          </button>
          <button className="btn-mobile-secondary" onClick={() => setIsModalOpen(true)}>
            <Plus size={16} /> Unggah Dokumen Prestasi
          </button>
        </div>
      </div>

      {exportSuccessMsg && (
        <div style={{
          backgroundColor: 'rgba(16, 185, 129, 0.2)',
          border: '1px solid #10b981',
          padding: '0.65rem 0.85rem',
          borderRadius: 'var(--radius-md)',
          color: '#34d399',
          fontSize: '0.775rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Download size={16} />
          <span>{exportSuccessMsg}</span>
        </div>
      )}

      {/* Vault List */}
      <div className="mobile-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
          <h3 className="mobile-card-title">
            <FileText size={18} color="#06b6d4" />
            Rekam Jejak Prestasi (FR-5.1)
          </h3>
          <span className="badge badge-info">{achievements.length} Berkas</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {achievements.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '0.85rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.35rem' }}>
                <span className="badge badge-info" style={{ fontSize: '0.65rem' }}>{item.category}</span>
                <button onClick={() => handleDeleteAchievement(item.id)} style={{ background: 'none', color: '#ef4444' }}>
                  <Trash2 size={14} />
                </button>
              </div>

              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.25rem' }}>{item.title}</h4>

              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                <p><strong>Peran:</strong> {item.role}</p>
                <p><Building size={10} style={{ display: 'inline' }} /> {item.institution} • {item.date}</p>
              </div>

              <span style={{ fontSize: '0.675rem', color: '#10b981', display: 'block' }}>
                📄 {item.fileName} (Extracted for ATS)
              </span>
            </div>
          ))}
        </div>
      </div>

      <UploadForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddAchievement={handleAddAchievement}
      />
    </>
  );
}
