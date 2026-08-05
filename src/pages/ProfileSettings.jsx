import React, { useState } from 'react';
import { UserCheck, Shield, Moon, Sun, Bell, RefreshCw, LogOut, CheckCircle2, ChevronRight, Sliders, Edit2, X, PlusCircle, BookOpen, CheckSquare, Camera, Upload, Award, FileText, Sparkles, Trash2, Plus, Calendar } from 'lucide-react';
import { logoutUser } from '../services/authService';
import { generateATSCV } from '../utils/pdfEngine';
import ScheduleModal from '../components/ScheduleModal';
import TaskModal from '../components/TaskModal';
import UploadForm from '../components/UploadForm';

export default function ProfileSettings({ user, onLogout, theme, onToggleTheme, onAddSchedule, onAddTask, availableCourses = [] }) {
  const [notifications, setNotifications] = useState(true);
  const [demoResetMsg, setDemoResetMsg] = useState('');
  
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const [displayName, setDisplayName] = useState(user?.displayName || 'Hafiz Kurniawan');
  const [prodi, setProdi] = useState(user?.prodi || 'Teknologi Informasi');
  const [semester, setSemester] = useState(user?.semester || 6);
  const [photoURL, setPhotoURL] = useState(user?.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80');

  // Achievements State (CV ATS Engine)
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

  const handleResetData = () => {
    localStorage.clear();
    setDemoResetMsg('Data demo berhasil di-reset!');
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoURL(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, displayName, prodi, semester: parseInt(semester), photoURL };
    localStorage.setItem('kating_user', JSON.stringify(updatedUser));
    setIsEditingProfile(false);
    window.location.reload();
  };

  const handle1ClickCVExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      try {
        generateATSCV(user, achievements);
      } catch (err) {
        console.error("PDF Export error:", err);
      } finally {
        setIsExporting(false);
      }
    }, 400);
  };

  const handleAddAchievement = (newAch) => {
    setAchievements([newAch, ...achievements]);
  };

  const handleDeleteAchievement = (id) => {
    setAchievements(achievements.filter(a => a.id !== id));
  };

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
                style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--indigo)' }}
              />
              <label htmlFor="profile-photo-input-main" style={{
                position: 'absolute', bottom: -2, right: -2, background: 'var(--indigo)', color: 'white',
                borderRadius: '50%', padding: '3px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
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

          <button onClick={() => setIsEditingProfile(true)} className="icon-btn" title="Edit Profil & Semester">
            <Edit2 size={14} color="#22d3ee" />
          </button>
        </div>
      </div>

      {demoResetMsg && (
        <div className="badge badge-green" style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 10px' }}>
          <CheckCircle2 size={12} /> {demoResetMsg}
        </div>
      )}

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

      {/* Central Input Management Section */}
      <div className="card">
        <div className="section-row">
          <span className="h3" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <PlusCircle size={14} color="#22d3ee" /> Kelola Input Data (Semester {semester})
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
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

      {/* Preferences Section */}
      <div className="card">
        <div className="section-row">
          <span className="h3" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Sliders size={14} color="#818cf8" /> Pengaturan Sistem
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div className="list-item" style={{ justifyContent: 'space-between', cursor: 'pointer' }} onClick={onToggleTheme}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {theme === 'dark' ? <Moon size={14} color="#818cf8" /> : <Sun size={14} color="#fbbf24" />}
              <span className="h4">{theme === 'dark' ? 'Mode Malam (Dark)' : 'Mode Siang (Light)'}</span>
            </div>
            <span className="badge badge-blue">{theme === 'dark' ? 'Gelap' : 'Terang'}</span>
          </div>

          <div className="list-item" style={{ justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => setNotifications(!notifications)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Bell size={14} color="#22d3ee" />
              <span className="h4">Notifikasi Deadline</span>
            </div>
            <span className={`badge ${notifications ? 'badge-green' : 'badge-red'}`}>
              {notifications ? 'Aktif' : 'Mati'}
            </span>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="card">
        <div className="section-row">
          <span className="h3" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Shield size={14} color="#fbbf24" /> Sesi & Data
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <button onClick={handleResetData} className="btn-ghost" style={{ justifyContent: 'space-between' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <RefreshCw size={13} color="#22d3ee" /> Reset LocalStorage Demo
            </span>
            <ChevronRight size={13} className="dim" />
          </button>

          <button onClick={async () => { await logoutUser(); onLogout(); }} className="btn-ghost" style={{ justifyContent: 'space-between', borderColor: 'rgba(244,63,94,0.3)', color: '#fb7185' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <LogOut size={13} color="#fb7185" /> Keluar Sesi Akun
            </span>
            <ChevronRight size={13} color="#fb7185" />
          </button>
        </div>
      </div>

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
                <span className="dim" style={{ display: 'block', marginTop: '3px' }}>
                  Saat naik semester, matkul semester sebelumnya diarsip otomatis.
                </span>
              </div>

              <div style={{ display: 'flex', gap: '6px', marginTop: '14px' }}>
                <button type="button" className="btn-ghost" onClick={() => setIsEditingProfile(false)}>Batal</button>
                <button type="submit" className="btn">Simpan Perubahan</button>
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

                  <button onClick={() => handleDeleteAchievement(item.id)} className="icon-btn">
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
