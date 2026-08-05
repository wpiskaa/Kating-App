import React, { useState } from 'react';
import { UserCheck, Shield, Moon, Sun, Bell, RefreshCw, LogOut, CheckCircle2, ChevronRight, Sliders, Edit2, X, PlusCircle, BookOpen, CheckSquare, Camera, Upload, Award, FileText, Sparkles, Trash2, Plus, Calendar, ChevronUp, ChevronDown, Activity, Clock } from 'lucide-react';
import { logoutUser } from '../services/authService';
import { generateATSCV } from '../utils/pdfEngine';
import ScheduleModal from '../components/ScheduleModal';
import TaskModal from '../components/TaskModal';
import UploadForm from '../components/UploadForm';

export default function ProfileSettings({ user, onLogout, theme, onToggleTheme, onAddSchedule, onAddTask, availableCourses = [], activityLogs = [], onActionNotice, onLogAction }) {
  const [notifications, setNotifications] = useState(true);
  const [demoResetMsg, setDemoResetMsg] = useState('');
  
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isFullWeeklyScheduleOpen, setIsFullWeeklyScheduleOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Section Hide Toggles (Activity Log hidden by default!)
  const [hideActivityLog, setHideActivityLog] = useState(true);
  const [hideCVSection, setHideCVSection] = useState(false);
  const [hideInputSection, setHideInputSection] = useState(false);
  const [hideSettingsSection, setHideSettingsSection] = useState(false);

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

  const handleResetData = () => {
    localStorage.clear();
    if (onActionNotice) onActionNotice('Data demo berhasil di-reset!');
    if (onLogAction) onLogAction('Reset LocalStorage', 'Memuat ulang data aplikasi bawaan');
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

  const handleDeleteAchievement = (id) => {
    const itemToDelete = achievements.find(a => a.id === id);
    setAchievements(achievements.filter(a => a.id !== id));
    if (onActionNotice) onActionNotice(`Prestasi "${itemToDelete?.title || ''}" telah dihapus`, 'delete');
    if (onLogAction) onLogAction('Hapus Prestasi', itemToDelete?.title || id);
  };

  const daysList = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

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

          <button onClick={() => setIsEditingProfile(true)} className="icon-btn" title="Edit Profil & Kenaikan Semester">
            <Edit2 size={14} color="#22d3ee" />
          </button>
        </div>
      </div>

      {demoResetMsg && (
        <div className="badge badge-green" style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 10px' }}>
          <CheckCircle2 size={12} /> {demoResetMsg}
        </div>
      )}

      {/* Activity Log Section (Hidden by default to save space!) */}
      <div className="card">
        <div className="section-row">
          <span className="h3" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Activity size={15} color="#34d399" /> Log Aktivitas Pengguna
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="badge badge-green">{activityLogs.length} Log</span>
            <button onClick={() => setHideActivityLog(!hideActivityLog)} className="icon-btn" title="Buka / Sembunyikan Log">
              {hideActivityLog ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
            </button>
          </div>
        </div>

        {!hideActivityLog && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', maxHeight: '180px', overflowY: 'auto', marginTop: '6px' }}>
            {activityLogs.length > 0 ? (
              activityLogs.map((log) => (
                <div key={log.id} className="list-item" style={{ padding: '6px 10px' }}>
                  <Clock size={12} color="#818cf8" style={{ flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <span className="h4" style={{ fontSize: '10px' }}>{log.action}</span>
                    <span className="dim" style={{ display: 'block', fontSize: '8.5px' }}>{log.detail}</span>
                  </div>
                  <span className="dim" style={{ fontSize: '8.5px' }}>{log.time}</span>
                </div>
              ))
            ) : (
              <div className="dim" style={{ textAlign: 'center', padding: '10px' }}>Belum ada riwayat aktivitas.</div>
            )}
          </div>
        )}
      </div>

      {/* CV ATS & Brankas Prestasi Section */}
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(34,211,238,0.06) 100%)' }}>
        <div className="section-row">
          <span className="h3" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Award size={15} color="#818cf8" /> Brankas Prestasi & CV ATS
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="badge badge-cyan">{achievements.length} Dokumen</span>
            <button onClick={() => setHideCVSection(!hideCVSection)} className="icon-btn">
              {hideCVSection ? <ChevronDown size={13} /> : <ChevronUp size={13} />}
            </button>
          </div>
        </div>

        {!hideCVSection && (
          <>
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
          </>
        )}
      </div>

      {/* Central Input Management Section */}
      <div className="card">
        <div className="section-row">
          <span className="h3" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <PlusCircle size={14} color="#22d3ee" /> Kelola Akademik (Semester {semester})
          </span>

          <button onClick={() => setHideInputSection(!hideInputSection)} className="icon-btn">
            {hideInputSection ? <ChevronDown size={13} /> : <ChevronUp size={13} />}
          </button>
        </div>

        {!hideInputSection && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <button onClick={() => setIsFullWeeklyScheduleOpen(true)} className="btn-ghost" style={{ justifyContent: 'space-between', borderColor: 'rgba(99,102,241,0.3)', color: '#818cf8' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={13} color="#818cf8" /> Lihat Lengkap Jadwal Kuliah (Senin - Sabtu)
              </span>
              <span className="badge badge-blue">Senin - Sabtu</span>
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
        )}
      </div>

      {/* Preferences Section */}
      <div className="card">
        <div className="section-row">
          <span className="h3" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Sliders size={14} color="#818cf8" /> Pengaturan Sistem
          </span>

          <button onClick={() => setHideSettingsSection(!hideSettingsSection)} className="icon-btn">
            {hideSettingsSection ? <ChevronDown size={13} /> : <ChevronUp size={13} />}
          </button>
        </div>

        {!hideSettingsSection && (
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
        )}
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

      {/* FULL WEEKLY SCHEDULE VIEWER MODAL */}
      {isFullWeeklyScheduleOpen && (
        <div className="overlay" onClick={() => setIsFullWeeklyScheduleOpen(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="drag-handle" />
            <div className="section-row">
              <span className="h3" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Calendar size={15} color="#818cf8" /> Jadwal Lengkap (Senin - Sabtu)
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
