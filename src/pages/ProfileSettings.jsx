import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCheck, Edit2, X, PlusCircle, BookOpen, CheckSquare, Camera, Upload, Award, FileText, Sparkles, Trash2, Plus, Calendar, Settings, ChevronRight } from 'lucide-react';
import { generateATSCV } from '../utils/pdfEngine';
import ScheduleModal from '../components/ScheduleModal';
import TaskModal from '../components/TaskModal';
import UploadForm from '../components/UploadForm';
import ConfirmModal from '../components/ConfirmModal';

export default function ProfileSettings({ user, onAddSchedule, onAddTask, availableCourses = [], onActionNotice, onLogAction }) {
  const navigate = useNavigate();
  
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isFullWeeklyScheduleOpen, setIsFullWeeklyScheduleOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Deletion Confirmation State
  const [achToDelete, setAchToDelete] = useState(null);

  const [activeDayTab, setActiveDayTab] = useState('Senin');

  const [displayName, setDisplayName] = useState(user?.displayName || 'Hafiz Kurniawan');
  const [prodi, setProdi] = useState(user?.prodi || 'Teknologi Informasi');
  const [semester, setSemester] = useState(user?.semester || 6);
  const [photoURL, setPhotoURL] = useState(user?.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80');

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

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoURL(reader.result);
        if (onActionNotice) onActionNotice('Foto profil baru berhasil diperbarui!');
        if (onLogAction) onLogAction('Update Foto Profil', 'Mengunggah foto profil baru');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, displayName, prodi, semester: parseInt(semester), photoURL };
    localStorage.setItem('kating_user', JSON.stringify(updatedUser));
    if (onActionNotice) onActionNotice('Profil berhasil diperbarui!');
    if (onLogAction) onLogAction('Update Profil', `Nama: ${displayName}, Sem: ${semester}`);
    setIsEditingProfile(false);
    window.location.reload();
  };

  const handle1ClickCVExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      try {
        generateATSCV(user, achievements);
        if (onActionNotice) onActionNotice('CV ATS (PDF) berhasil dibuat dan diunduh!');
        if (onLogAction) onLogAction('Ekspor CV ATS', 'Mengunduh berkas PDF CV ATS');
      } catch (err) {
        console.error("PDF Export error:", err);
      } finally {
        setIsExporting(false);
      }
    }, 400);
  };

  const handleAddAchievement = (newAch) => {
    setAchievements([newAch, ...achievements]);
    if (onActionNotice) onActionNotice(`Prestasi "${newAch.title}" berhasil disimpan!`);
    if (onLogAction) onLogAction('Tambah Prestasi', newAch.title);
  };

  const confirmDeleteAchievement = () => {
    if (!achToDelete) return;
    setAchievements(achievements.filter(a => a.id !== achToDelete.id));
    if (onActionNotice) onActionNotice(`Prestasi "${achToDelete.title}" telah dihapus`, 'delete');
    if (onLogAction) onLogAction('Hapus Prestasi', achToDelete.title);
    setAchToDelete(null);
  };

  const daysList = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

  return (
    <>
      {/* Profile Header Card */}
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(34,211,238,0.08) 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ position: 'relative' }}>
              <img
                src={photoURL}
                alt={displayName}
                style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--indigo)' }}
              />
              <label htmlFor="profile-photo-input-main" style={{
                position: 'absolute', bottom: -2, right: -2, background: 'var(--indigo)', color: 'white',
                borderRadius: '50%', padding: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Camera size={10} />
              </label>
              <input type="file" id="profile-photo-input-main" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoUpload} />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span className="h3">{displayName}</span>
                <UserCheck size={12} color="#10b981" />
              </div>
              <span className="dim">{prodi} • Semester {semester}</span>
            </div>
          </div>

          <button onClick={() => setIsEditingProfile(true)} className="icon-btn" title="Edit Profil & Kenaikan Semester">
            <Edit2 size={14} color="#22d3ee" />
          </button>
        </div>
      </div>

      {/* Central Input Management Section */}
      <div className="card">
        <div className="section-row">
          <span className="h3" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <PlusCircle size={14} color="#22d3ee" /> Kelola Akademik (Semester {semester})
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <button onClick={() => setIsFullWeeklyScheduleOpen(true)} className="btn-ghost" style={{ justifyContent: 'space-between', borderColor: 'rgba(99,102,241,0.3)', color: '#818cf8' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={13} color="#818cf8" /> Jadwal Lengkap Kuliah
            </span>
            <span className="badge badge-blue">Lengkap</span>
          </button>

          <button onClick={() => setIsScheduleModalOpen(true)} className="btn-ghost" style={{ justifyContent: 'space-between' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BookOpen size={13} color="#818cf8" /> Input Jadwal Perkuliahan
            </span>
            <span className="badge badge-blue">+ Tambah</span>
          </button>

          <button onClick={() => setIsTaskModalOpen(true)} className="btn-ghost" style={{ justifyContent: 'space-between' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckSquare size={13} color="#22d3ee" /> Input Tugas Matkul Semester Ini
            </span>
            <span className="badge badge-cyan">+ Tambah</span>
          </button>
        </div>
      </div>

      {/* CV ATS & Brankas Prestasi Section */}
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(34,211,238,0.06) 100%)' }}>
        <div className="section-row">
          <span className="h3" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Award size={15} color="#818cf8" /> Brankas Prestasi & CV ATS
          </span>
          <span className="badge badge-cyan">{achievements.length} Dokumen</span>
        </div>

        <p className="dim" style={{ marginBottom: '10px' }}>
          Ekstrak otomatis metadata prestasi ke format PDF Resume ATS-friendly.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '6px' }}>
          <button className="btn" onClick={handle1ClickCVExport} disabled={isExporting}>
            <Sparkles size={13} /> {isExporting ? 'Proses...' : 'Ekspor CV ATS (PDF)'}
          </button>
          <button className="btn-ghost" onClick={() => setIsCVModalOpen(true)}>
            <FileText size={13} /> Kelola Prestasi
          </button>
        </div>
      </div>

      {/* Settings Link Card (MOVED TO THE BOTTOM) */}
      <div className="card" onClick={() => navigate('/settings')} style={{ cursor: 'pointer', background: 'linear-gradient(135deg, rgba(34,211,238,0.08) 0%, var(--bg-card) 100%)', border: '1px solid rgba(34,211,238,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="icon-box-sm" style={{ background: 'rgba(34,211,238,0.15)', color: '#22d3ee' }}>
              <Settings size={16} />
            </div>
            <div>
              <span className="h3">Pengaturan Sistem Aplikasi</span>
              <span className="dim" style={{ display: 'block' }}>Tema, Notifikasi, Log Aktivitas, Sesi & Reset</span>
            </div>
          </div>
          <ChevronRight size={16} color="var(--text-3)" />
        </div>
      </div>

      {/* Confirmation Modal for Achievement Delete */}
      <ConfirmModal
        isOpen={Boolean(achToDelete)}
        title="Konfirmasi Hapus Dokumen Prestasi"
        message={`Apakah kamu yakin ingin menghapus berkas prestasi "${achToDelete?.title || ''}" dari brankas?`}
        onConfirm={confirmDeleteAchievement}
        onCancel={() => setAchToDelete(null)}
      />

      {/* FULL WEEKLY SCHEDULE VIEWER MODAL */}
      {isFullWeeklyScheduleOpen && (
        <div className="overlay" onClick={() => setIsFullWeeklyScheduleOpen(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="drag-handle" />
            <div className="section-row">
              <span className="h3" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Calendar size={15} color="#818cf8" /> Jadwal Lengkap Kuliah
              </span>
              <button onClick={() => setIsFullWeeklyScheduleOpen(false)} className="icon-btn"><X size={16} /></button>
            </div>

            <div style={{ display: 'flex', gap: '4px', marginBottom: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
              {daysList.map(d => (
                <button
                  key={d}
                  onClick={() => setActiveDayTab(d)}
                  className={`badge ${activeDayTab === d ? 'badge-blue' : ''}`}
                  style={{ cursor: 'pointer', padding: '5px 8px', background: activeDayTab === d ? '' : 'rgba(255,255,255,0.03)', color: activeDayTab === d ? '' : 'var(--text-3)' }}
                >
                  {d}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', margin: '8px 0' }}>
              {availableCourses.filter(c => c.day === activeDayTab).length > 0 ? (
                availableCourses.filter(c => c.day === activeDayTab).map(c => (
                  <div key={c.id} className="list-item">
                    <div style={{ flex: 1 }}>
                      <span className="h4">{c.subject}</span>
                      <span className="dim" style={{ display: 'block' }}>{c.time} • {c.room} ({c.lecturer})</span>
                    </div>
                    <span className="badge badge-cyan">{c.sks} SKS</span>
                  </div>
                ))
              ) : (
                <div className="dim" style={{ textAlign: 'center', padding: '16px' }}>Tidak ada perkuliahan pada hari {activeDayTab}.</div>
              )}
            </div>

            <button className="btn-ghost" onClick={() => setIsFullWeeklyScheduleOpen(false)}>Tutup</button>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {isEditingProfile && (
        <div className="overlay" onClick={() => setIsEditingProfile(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="drag-handle" />
            <div className="section-row">
              <span className="h3">Edit Profil & Kenaikan Semester</span>
              <button onClick={() => setIsEditingProfile(false)} className="icon-btn"><X size={16} /></button>
            </div>

            <form onSubmit={handleSaveProfile}>
              <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                <img src={photoURL} alt="Avatar" style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--indigo)', marginBottom: '6px' }} />
                <div>
                  <label htmlFor="photo-file-upload-modal" className="badge badge-cyan" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Upload size={10} /> Unggah Foto Baru
                  </label>
                  <input type="file" id="photo-file-upload-modal" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoUpload} />
                </div>
              </div>

              <div className="field">
                <label className="field-label">Nama Lengkap</label>
                <input type="text" className="field-input" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required />
              </div>
              <div className="field">
                <label className="field-label">Program Studi</label>
                <input type="text" className="field-input" value={prodi} onChange={(e) => setProdi(e.target.value)} required />
              </div>
              <div className="field">
                <label className="field-label">Semester Berjalan</label>
                <select className="field-select" value={semester} onChange={(e) => setSemester(e.target.value)}>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                    <option key={s} value={s}>Semester {s}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', gap: '6px', marginTop: '14px' }}>
                <button type="button" className="btn-ghost" onClick={() => setIsEditingProfile(false)}>Batal</button>
                <button type="submit" className="btn">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CV ATS Manager Modal */}
      {isCVModalOpen && (
        <div className="overlay" onClick={() => setIsCVModalOpen(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="drag-handle" />
            <div className="section-row">
              <span className="h3">Kelola Brankas & Rekam Jejak CV ATS</span>
              <button onClick={() => setIsCVModalOpen(false)} className="icon-btn"><X size={16} /></button>
            </div>

            <button className="btn" style={{ marginBottom: '10px' }} onClick={() => setIsUploadOpen(true)}>
              <Plus size={13} /> Unggah Metadata Prestasi Baru
            </button>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', margin: '8px 0' }}>
              {achievements.map((item) => (
                <div key={item.id} className="list-item">
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span className="h4">{item.title}</span>
                      <span className="badge badge-cyan">{item.category}</span>
                    </div>
                    <span className="dim">{item.role} • {item.institution} ({item.date})</span>
                  </div>

                  <button onClick={() => setAchToDelete(item)} className="icon-btn" title="Hapus Prestasi">
                    <Trash2 size={13} color="#fb7185" />
                  </button>
                </div>
              ))}
            </div>

            <button className="btn-ghost" onClick={() => setIsCVModalOpen(false)}>Selesai</button>
          </div>
        </div>
      )}

      {/* Modals for Centralized Input & Upload */}
      <ScheduleModal isOpen={isScheduleModalOpen} onClose={() => setIsScheduleModalOpen(false)} onAddSchedule={onAddSchedule} activeSemester={semester} />
      <TaskModal isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} onAddTask={onAddTask} availableCourses={availableCourses} />
      <UploadForm isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} onAddAchievement={handleAddAchievement} />
    </>
  );
}
