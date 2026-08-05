import React, { useState } from 'react';
import UploadForm from '../components/UploadForm';
import { generateATSCV } from '../utils/pdfEngine';
import { Award, FileText, Download, Plus, Calendar, Building, ShieldCheck, Sparkles, Trash2 } from 'lucide-react';

export default function AchievementVault({ currentUser }) {
  // Initial SRS preset achievements
  const [achievements, setAchievements] = useState([
    {
      id: 'ach-1',
      title: 'Kepanitiaan IT Specta 2026',
      role: 'Koordinator Divisi Perangkat Software',
      institution: 'Himpunan Mahasiswa Teknologi Informasi (HMTI)',
      date: 'Mei 2026',
      category: 'Kepanitiaan',
      description: 'Memimpin tim pengembang aplikasi pendaftaran dan manajemen peserta kompetisi IT Specta secara online.',
      fileName: 'SK_Kepanitiaan_IT_Specta.pdf'
    },
    {
      id: 'ach-2',
      title: 'Inovasi Perangkat Deteksi Golongan Darah Portabel Berbasis Multi-Spectral Sensing',
      role: 'Ketua Peneliti Utama',
      institution: 'Laboratorium Sistem Terintegrasi UMY',
      date: 'Juli 2026',
      category: 'Riset & Inovasi',
      description: 'Finalisasi berkas riset inovasi alat pendeteksi golongan darah portabel non-invasif berbasis pemindaian spektroskopi optic.',
      fileName: 'Berkas_Finalisasi_Riset_GolonganDarah.pdf'
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
        setExportSuccessMsg(`Resume ATS berformat PDF (${exportedFilename}) telah berhasil dibuat & diunduh!`);
        setTimeout(() => setExportSuccessMsg(''), 5000);
      } catch (err) {
        console.error("PDF Export error:", err);
      } finally {
        setIsExporting(false);
      }
    }, 600);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Achievement Vault & 1-Click CV Generator</h1>
          <p className="page-subtitle">
            Brankas digital rekam jejak prestasi & pemroses otomatis Resume ATS-Friendly tanpa intervensi desain manual (FR-5.3).
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn-secondary" onClick={() => setIsModalOpen(true)}>
            <Plus size={18} />
            Unggah Dokumen Prestasi
          </button>

          <button
            className="btn-primary"
            onClick={handle1ClickCVExport}
            disabled={isExporting}
          >
            <Sparkles size={18} />
            {isExporting ? 'Meramu PDF ATS...' : '1-Click Ekspor CV ATS (PDF)'}
          </button>
        </div>
      </div>

      {/* Export Success Notification Banner */}
      {exportSuccessMsg && (
        <div style={{
          backgroundColor: 'rgba(16, 185, 129, 0.2)',
          border: '1px solid #10b981',
          padding: '0.85rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          color: '#34d399',
          fontWeight: 600,
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <Download size={20} />
          <span>{exportSuccessMsg}</span>
        </div>
      )}

      {/* Hero CV Engine Feature Banner */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.4)',
        marginBottom: '2rem',
        padding: '1.75rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Award size={24} color="#818cf8" />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Client-Side CV Engine (Zero Server Latency)
              </span>
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>
              Konversi Otomatis Metadata Brankas ke Resume ATS-Friendly
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem', maxWidth: '750px' }}>
              Sistem secara instan mengesktrak nama peran, tanggal, institusi, dan poin pencapaian dari repositori prestasi ini, lalu meramunya ke struktur tata letak ATS tanpa intervensi desain manual.
            </p>
          </div>

          <button
            className="btn-primary"
            onClick={handle1ClickCVExport}
            disabled={isExporting}
            style={{ padding: '0.75rem 1.5rem', fontSize: '0.95rem' }}
          >
            <Download size={20} />
            Ekspor Resume PDF Sekarang
          </button>
        </div>
      </div>

      {/* Gallery of Uploaded Achievements & Metadata */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            <FileText size={22} color="#06b6d4" />
            Galeri Rekam Jejak & Metadata Terstruktur (FR-5.1 & FR-5.2)
          </h3>
          <span className="badge badge-info">{achievements.length} Berkas Tersimpan</span>
        </div>

        <div className="grid-container">
          {achievements.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <span className="badge badge-info" style={{ fontSize: '0.7rem' }}>
                    {item.category}
                  </span>
                  <button
                    onClick={() => handleDeleteAchievement(item.id)}
                    style={{ background: 'none', color: 'var(--text-muted)' }}
                    title="Hapus Dokumen"
                  >
                    <Trash2 size={16} color="#ef4444" />
                  </button>
                </div>

                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', lineHeight: '1.4' }}>
                  {item.title}
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#f3f4f6', fontWeight: 600 }}>
                    <ShieldCheck size={14} color="#10b981" /> Peran: {item.role}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Building size={14} color="#818cf8" /> {item.institution}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Calendar size={14} color="#fbbf24" /> {item.date}
                  </span>
                </div>

                {item.description && (
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', backgroundColor: 'var(--bg-secondary)', padding: '0.625rem', borderRadius: 'var(--radius-sm)', lineHeight: '1.4' }}>
                    "{item.description}"
                  </p>
                )}
              </div>

              <div style={{
                marginTop: '1.25rem',
                paddingTop: '0.75rem',
                borderTop: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.775rem',
                color: 'var(--text-muted)'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  📄 {item.fileName}
                </span>
                <span style={{ color: '#10b981', fontWeight: 600 }}>Cloud Ready</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <UploadForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddAchievement={handleAddAchievement}
      />
    </div>
  );
}
