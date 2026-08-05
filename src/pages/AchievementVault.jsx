import React, { useState } from 'react';
import UploadForm from '../components/UploadForm';
import { generateATSCV } from '../utils/pdfEngine';
import { Award, FileText, Download, Plus, Sparkles, Trash2 } from 'lucide-react';

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

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
        generateATSCV(currentUser, achievements);
      } catch (err) {
        console.error("PDF Export error:", err);
      } finally {
        setIsExporting(false);
      }
    }, 500);
  };

  return (
    <>
      <div className="card-clean" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)',
        border: '1px solid var(--border-focus)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
          <Award size={18} color="#818cf8" />
          <h2 style={{ fontSize: '1.05rem', fontWeight: 800 }}>Brankas & 1-Click CV ATS</h2>
        </div>
        <p style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
          Ekstrak metadata ke Resume ATS berformat PDF (FR-5.3).
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button className="btn-minimal" onClick={handle1ClickCVExport} disabled={isExporting}>
            <Sparkles size={15} />
            {isExporting ? 'Meramu PDF ATS...' : '1-Click Ekspor CV ATS (PDF)'}
          </button>
          <button className="btn-minimal-secondary" onClick={() => setIsModalOpen(true)}>
            <Plus size={15} /> Unggah Metadata Prestasi
          </button>
        </div>
      </div>

      <div className="card-clean">
        <div className="card-clean-title">
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <FileText size={16} color="#06b6d4" /> Rekam Jejak Prestasi
          </span>
          <span className="pill-badge pill-info">{achievements.length} Berkas</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {achievements.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-inner)',
                padding: '0.75rem 0.85rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                <span className="pill-badge pill-info">{item.category}</span>
                <button onClick={() => handleDeleteAchievement(item.id)} style={{ background: 'none', border: 'none', color: '#fb7185', cursor: 'pointer' }}>
                  <Trash2 size={13} />
                </button>
              </div>

              <h4 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '0.15rem' }}>{item.title}</h4>
              <p style={{ fontSize: '0.725rem', color: 'var(--text-secondary)' }}>
                {item.role} • {item.institution} ({item.date})
              </p>
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
