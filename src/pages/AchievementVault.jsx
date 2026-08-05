import React, { useState } from 'react';
import UploadForm from '../components/UploadForm';
import { generateATSCV } from '../utils/pdfEngine';
import { Award, FileText, Plus, Sparkles, Trash2 } from 'lucide-react';

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
      <div className="card-hero" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(34,211,238,0.1) 100%)', border: '1px solid rgba(99,102,241,0.25)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
          <Award size={16} color="#818cf8" />
          <h2 className="h3">Brankas & 1-Click CV ATS</h2>
        </div>
        <span className="dim">Ekstrak otomatis metadata ke PDF Resume ATS (FR-5.3)</span>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginTop: '10px' }}>
          <button className="btn" onClick={handle1ClickCVExport} disabled={isExporting}>
            <Sparkles size={13} /> {isExporting ? 'Proses...' : 'Ekspor CV (PDF)'}
          </button>
          <button className="btn-ghost" onClick={() => setIsModalOpen(true)}>
            <Plus size={13} /> Unggah Metadata
          </button>
        </div>
      </div>

      <div className="card">
        <div className="section-row">
          <span className="h3" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <FileText size={15} color="#22d3ee" /> Rekam Jejak
          </span>
          <span className="badge badge-cyan">{achievements.length} Berkas</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {achievements.map((item) => (
            <div key={item.id} className="list-item">
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span className="h4">{item.title}</span>
                  <span className="badge badge-cyan">{item.category}</span>
                </div>
                <span className="dim">{item.role} • {item.institution} ({item.date})</span>
              </div>

              <button onClick={() => handleDeleteAchievement(item.id)} style={{ background: 'none', border: 'none', color: '#fb7185', cursor: 'pointer' }}>
                <Trash2 size={13} />
              </button>
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
