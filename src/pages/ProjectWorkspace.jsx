import React, { useState } from 'react';
import MemberProgressBar from '../components/MemberProgressBar';
import { FolderKanban, CheckSquare, ShieldAlert, UserPlus, Plus, Trash2, X, Users, ArrowLeft, User, PlusCircle } from 'lucide-react';

export default function ProjectWorkspace({ currentUser }) {
  const [activeTab, setActiveTab] = useState('Kelompok'); // 'Mandiri' | 'Kelompok'

  // Personal Mandiri Tasks (CRUD)
  const [personalTasks, setPersonalTasks] = useState([
    { id: 'p-1', title: 'Tugas Mandiri Diagram UML PBO', subject: 'PBO', completed: false, deadline: '24 Jam lagi' },
    { id: 'p-2', title: 'Analisis Vektor Serangan MitM', subject: 'Keamanan Jaringan', completed: true, deadline: 'Selesai' }
  ]);
  const [newPersonalTitle, setNewPersonalTitle] = useState('');
  const [isAddPersonalOpen, setIsAddPersonalOpen] = useState(false);

  // Multi-Group List (CRUD - Create/Read/Delete)
  const [groups, setGroups] = useState([
    {
      id: 'grp-1',
      name: 'Proyek Kating App',
      subject: 'PAB2026',
      deadline: new Date(Date.now() + 18 * 3600 * 1000).toISOString(),
      members: [
        { id: "mem-1", name: "Hafiz Kurniawan", role: "Frontend Lead", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80", totalSubtasks: 3, completedSubtasks: 2 },
        { id: "mem-2", name: "Ilham", role: "Backend Architect", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80", totalSubtasks: 3, completedSubtasks: 3 },
        { id: "mem-3", name: "Rian Prasetya", role: "Database Analyst", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80", totalSubtasks: 2, completedSubtasks: 0 }
      ],
      subtasks: [
        { id: 'st-1', title: 'UI Shell & Dynamic Countdown', assignedTo: 'mem-1', completed: true },
        { id: 'st-2', title: 'Google Auth Firebase Client', assignedTo: 'mem-1', completed: true },
        { id: 'st-3', title: '1-Click ATS Resume Generator', assignedTo: 'mem-1', completed: false },
        { id: 'st-4', title: 'Firestore NoSQL Database', assignedTo: 'mem-2', completed: true },
        { id: 'st-5', title: 'firestore.rules Security', assignedTo: 'mem-2', completed: true },
        { id: 'st-6', title: 'Cloud Functions Flagging', assignedTo: 'mem-2', completed: true },
        { id: 'st-7', title: 'Normalisasi Relasi Koleksi', assignedTo: 'mem-3', completed: false },
        { id: 'st-8', title: 'Kamus Data & Indexing', assignedTo: 'mem-3', completed: false }
      ]
    },
    {
      id: 'grp-2',
      name: 'Riset Multi-Spectral Sensing',
      subject: 'Inovasi Perangkat',
      deadline: new Date(Date.now() + 96 * 3600 * 1000).toISOString(),
      members: [
        { id: "mem-1", name: "Hafiz Kurniawan", role: "Ketua Peneliti", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80", totalSubtasks: 2, completedSubtasks: 1 }
      ],
      subtasks: [
        { id: 'st-9', title: 'Pemindaian Optic Blood Sensing', assignedTo: 'mem-1', completed: true },
        { id: 'st-10', title: 'Uji Akurasi Sample Darah', assignedTo: 'mem-1', completed: false }
      ]
    }
  ]);

  // Selected Group Detail Room View
  const [selectedGroup, setSelectedGroup] = useState(null);

  // Modals inside Group
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Anggota Tim');

  const [isAddGroupOpen, setIsAddGroupOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupSubject, setNewGroupSubject] = useState('');

  const [isAddGroupSubtaskOpen, setIsAddGroupSubtaskOpen] = useState(false);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [newSubtaskAssignee, setNewSubtaskAssignee] = useState('mem-1');

  // Handle Create Personal Task
  const handleAddPersonalTask = (e) => {
    e.preventDefault();
    if (!newPersonalTitle) return;
    setPersonalTasks([...personalTasks, { id: `p-${Date.now()}`, title: newPersonalTitle, subject: 'Mandiri', completed: false, deadline: '24 Jam' }]);
    setNewPersonalTitle('');
    setIsAddPersonalOpen(false);
  };

  const handleTogglePersonalTask = (id) => {
    setPersonalTasks(personalTasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleDeletePersonalTask = (id) => {
    setPersonalTasks(personalTasks.filter(t => t.id !== id));
  };

  // Handle Create Group
  const handleCreateGroup = (e) => {
    e.preventDefault();
    if (!newGroupName) return;

    const newGrp = {
      id: `grp-${Date.now()}`,
      name: newGroupName,
      subject: newGroupSubject || 'Proyek Matkul',
      deadline: new Date(Date.now() + 72 * 3600 * 1000).toISOString(),
      members: [
        { id: "mem-1", name: "Hafiz Kurniawan", role: "Ketua Kelompok", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80", totalSubtasks: 0, completedSubtasks: 0 }
      ],
      subtasks: []
    };

    setGroups([...groups, newGrp]);
    setNewGroupName('');
    setNewGroupSubject('');
    setIsAddGroupOpen(false);
  };

  // Handle Invite Member to Selected Group
  const handleInviteMember = (e) => {
    e.preventDefault();
    if (!inviteEmail || !selectedGroup) return;

    const newMemberName = inviteEmail.split('@')[0];
    const newMemObj = {
      id: `mem-${Date.now()}`,
      name: newMemberName.charAt(0).toUpperCase() + newMemberName.slice(1),
      role: inviteRole,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${newMemberName}`,
      totalSubtasks: 0,
      completedSubtasks: 0
    };

    const updatedGroup = {
      ...selectedGroup,
      members: [...selectedGroup.members, newMemObj]
    };

    setSelectedGroup(updatedGroup);
    setGroups(groups.map(g => g.id === selectedGroup.id ? updatedGroup : g));
    setInviteEmail('');
    setIsInviteModalOpen(false);
  };

  // Handle Add Subtask to Selected Group
  const handleAddGroupSubtask = (e) => {
    e.preventDefault();
    if (!newSubtaskTitle || !selectedGroup) return;

    const newSt = {
      id: `st-${Date.now()}`,
      title: newSubtaskTitle,
      assignedTo: newSubtaskAssignee,
      completed: false
    };

    const updatedSubtasks = [...selectedGroup.subtasks, newSt];
    const updatedMembers = selectedGroup.members.map(m => m.id === newSubtaskAssignee ? { ...m, totalSubtasks: m.totalSubtasks + 1 } : m);

    const updatedGroup = { ...selectedGroup, subtasks: updatedSubtasks, members: updatedMembers };

    setSelectedGroup(updatedGroup);
    setGroups(groups.map(g => g.id === selectedGroup.id ? updatedGroup : g));
    setNewSubtaskTitle('');
    setIsAddGroupSubtaskOpen(false);
  };

  const handleToggleSubtaskInGroup = (subtaskId, assignedMemberId) => {
    if (!selectedGroup) return;
    let isNowCompleted = false;

    const updatedSubtasks = selectedGroup.subtasks.map(t => {
      if (t.id === subtaskId) {
        isNowCompleted = !t.completed;
        return { ...t, completed: isNowCompleted };
      }
      return t;
    });

    const updatedMembers = selectedGroup.members.map(m => {
      if (m.id === assignedMemberId) {
        const diff = isNowCompleted ? 1 : -1;
        return { ...m, completedSubtasks: Math.max(0, m.completedSubtasks + diff) };
      }
      return m;
    });

    const updatedGroup = { ...selectedGroup, subtasks: updatedSubtasks, members: updatedMembers };
    setSelectedGroup(updatedGroup);
    setGroups(groups.map(g => g.id === selectedGroup.id ? updatedGroup : g));
  };

  return (
    <>
      {/* Tab Switcher: Mandiri vs Kelompok */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
        <button
          onClick={() => { setActiveTab('Mandiri'); setSelectedGroup(null); }}
          className={`btn-ghost ${activeTab === 'Mandiri' ? 'badge-yellow' : ''}`}
          style={{ padding: '8px', fontSize: '11px', border: activeTab === 'Mandiri' ? '1px solid var(--amber)' : '' }}
        >
          <User size={13} /> Tugas Mandiri ({personalTasks.length})
        </button>

        <button
          onClick={() => setActiveTab('Kelompok')}
          className={`btn-ghost ${activeTab === 'Kelompok' ? 'badge-cyan' : ''}`}
          style={{ padding: '8px', fontSize: '11px', border: activeTab === 'Kelompok' ? '1px solid var(--cyan)' : '' }}
        >
          <Users size={13} /> Kelompok Proyek ({groups.length})
        </button>
      </div>

      {/* VIEW 1: TUGAS MANDIRI */}
      {activeTab === 'Mandiri' && (
        <div className="card">
          <div className="section-row">
            <span className="h3" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <User size={15} color="#fbbf24" /> Daftar Tugas Mandiri
            </span>
            <button onClick={() => setIsAddPersonalOpen(true)} className="badge badge-yellow" style={{ cursor: 'pointer' }}>+ Tambah</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {personalTasks.map((t) => (
              <div key={t.id} className="list-item" onClick={() => handleTogglePersonalTask(t.id)} style={{ cursor: 'pointer', opacity: t.completed ? 0.7 : 1 }}>
                <div style={{
                  width: '16px', height: '16px', borderRadius: '4px',
                  background: t.completed ? 'var(--emerald)' : 'transparent',
                  border: t.completed ? 'none' : '1.5px solid var(--text-3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0
                }}>
                  {t.completed && <CheckSquare size={11} />}
                </div>

                <div style={{ flex: 1 }}>
                  <span className="h4" style={{ textDecoration: t.completed ? 'line-through' : 'none' }}>{t.title}</span>
                  <span className="dim" style={{ display: 'block' }}>{t.subject} • {t.deadline}</span>
                </div>

                <button onClick={(e) => { e.stopPropagation(); handleDeletePersonalTask(t.id); }} className="icon-btn">
                  <Trash2 size={12} color="#fb7185" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: KELOMPOK PROYEK - LIST OF GROUPS */}
      {activeTab === 'Kelompok' && !selectedGroup && (
        <div className="card">
          <div className="section-row">
            <span className="h3" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Users size={15} color="#22d3ee" /> Daftar Ruang Kelompok Proyek
            </span>
            <button onClick={() => setIsAddGroupOpen(true)} className="badge badge-cyan" style={{ cursor: 'pointer' }}>+ Buat Kelompok Baru</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {groups.map((grp) => (
              <div
                key={grp.id}
                className="list-item"
                onClick={() => setSelectedGroup(grp)}
                style={{ cursor: 'pointer', justifyContent: 'space-between', padding: '10px 12px' }}
              >
                <div>
                  <span className="h3">{grp.name}</span>
                  <span className="dim" style={{ display: 'block' }}>{grp.subject} • {grp.members.length} Anggota</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span className="badge badge-blue">{grp.subtasks.filter(st => st.completed).length}/{grp.subtasks.length} Sub-tugas</span>
                  <span className="h3" style={{ color: 'var(--cyan)' }}>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: INSIDE A SPECIFIC GROUP ROOM */}
      {activeTab === 'Kelompok' && selectedGroup && (
        <>
          <button onClick={() => setSelectedGroup(null)} className="btn-ghost" style={{ padding: '6px 10px', fontSize: '10px', width: 'auto', alignSelf: 'flex-start' }}>
            <ArrowLeft size={12} /> Kembali ke Daftar Kelompok
          </button>

          {/* Group Header Alert */}
          <div className="card-hero" style={{ background: 'linear-gradient(135deg, rgba(244,63,94,0.12) 0%, var(--bg-card) 100%)', border: '1px solid rgba(244,63,94,0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h2 className="h3">{selectedGroup.name}</h2>
                <span className="dim" style={{ color: '#fb7185' }}>{selectedGroup.subject} • Tenggat &lt;24 Jam</span>
              </div>

              <button onClick={() => setIsInviteModalOpen(true)} className="btn" style={{ padding: '5px 8px', fontSize: '9.5px', width: 'auto' }}>
                <UserPlus size={12} /> Invite Teman
              </button>
            </div>
          </div>

          {/* Group Members List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {selectedGroup.members.map((member) => (
              <MemberProgressBar
                key={member.id}
                member={member}
                projectDeadline={selectedGroup.deadline}
              />
            ))}
          </div>

          {/* Subtasks inside this Group */}
          <div className="card">
            <div className="section-row">
              <span className="h3" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FolderKanban size={15} color="#22d3ee" /> Sub-Tugas Kelompok Ini
              </span>
              <button onClick={() => setIsAddGroupSubtaskOpen(true)} className="badge badge-cyan" style={{ cursor: 'pointer' }}>+ Sub-tugas</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {selectedGroup.subtasks.map((task) => {
                const assignedMember = selectedGroup.members.find(m => m.id === task.assignedTo);
                return (
                  <div
                    key={task.id}
                    onClick={() => handleToggleSubtaskInGroup(task.id, task.assignedTo)}
                    className="list-item"
                    style={{ cursor: 'pointer', opacity: task.completed ? 0.7 : 1 }}
                  >
                    <div style={{
                      width: '16px', height: '16px', borderRadius: '4px',
                      background: task.completed ? 'var(--emerald)' : 'transparent',
                      border: task.completed ? 'none' : '1.5px solid var(--text-3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0
                    }}>
                      {task.completed && <CheckSquare size={11} />}
                    </div>

                    <span className="h4" style={{ flex: 1, textDecoration: task.completed ? 'line-through' : 'none' }}>
                      {task.title}
                    </span>

                    <img
                      src={assignedMember?.avatar}
                      alt={assignedMember?.name}
                      style={{ width: '18px', height: '18px', borderRadius: '50%', objectFit: 'cover' }}
                      title={assignedMember?.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Modal Add Personal Task */}
      {isAddPersonalOpen && (
        <div className="overlay" onClick={() => setIsAddPersonalOpen(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="drag-handle" />
            <div className="section-row">
              <span className="h3">Tambah Tugas Mandiri</span>
              <button onClick={() => setIsAddPersonalOpen(false)} className="icon-btn"><X size={16} /></button>
            </div>

            <form onSubmit={handleAddPersonalTask}>
              <div className="field">
                <label className="field-label">Judul Tugas Mandiri</label>
                <input type="text" className="field-input" placeholder="Laporan Praktikum" value={newPersonalTitle} onChange={(e) => setNewPersonalTitle(e.target.value)} required />
              </div>
              <div style={{ display: 'flex', gap: '6px', marginTop: '14px' }}>
                <button type="button" className="btn-ghost" onClick={() => setIsAddPersonalOpen(false)}>Batal</button>
                <button type="submit" className="btn">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Create New Group */}
      {isAddGroupOpen && (
        <div className="overlay" onClick={() => setIsAddGroupOpen(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="drag-handle" />
            <div className="section-row">
              <span className="h3">Buat Kelompok Baru</span>
              <button onClick={() => setIsAddGroupOpen(false)} className="icon-btn"><X size={16} /></button>
            </div>

            <form onSubmit={handleCreateGroup}>
              <div className="field">
                <label className="field-label">Nama Kelompok / Proyek</label>
                <input type="text" className="field-input" placeholder="Proyek Sistem Pakar" value={newGroupName} onChange={(e) => setNewGroupName(e.target.value)} required />
              </div>
              <div className="field">
                <label className="field-label">Mata Kuliah</label>
                <input type="text" className="field-input" placeholder="Kecerdasan Buatan" value={newGroupSubject} onChange={(e) => setNewGroupSubject(e.target.value)} />
              </div>
              <div style={{ display: 'flex', gap: '6px', marginTop: '14px' }}>
                <button type="button" className="btn-ghost" onClick={() => setIsAddGroupOpen(false)}>Batal</button>
                <button type="submit" className="btn">Buat Kelompok</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Invite Member into Selected Group */}
      {isInviteModalOpen && selectedGroup && (
        <div className="overlay" onClick={() => setIsInviteModalOpen(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="drag-handle" />
            <div className="section-row">
              <span className="h3">Invite Teman ke {selectedGroup.name}</span>
              <button onClick={() => setIsInviteModalOpen(false)} className="icon-btn"><X size={16} /></button>
            </div>

            <form onSubmit={handleInviteMember}>
              <div className="field">
                <label className="field-label">Email / ID Teman</label>
                <input type="text" className="field-input" placeholder="ilham@student.umy.ac.id" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} required />
              </div>
              <div className="field">
                <label className="field-label">Peran dalam Tim</label>
                <input type="text" className="field-input" placeholder="UI Designer" value={inviteRole} onChange={(e) => setInviteRole(e.target.value)} required />
              </div>
              <div style={{ display: 'flex', gap: '6px', marginTop: '14px' }}>
                <button type="button" className="btn-ghost" onClick={() => setIsInviteModalOpen(false)}>Batal</button>
                <button type="submit" className="btn">Kirim Undangan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add Subtask into Selected Group */}
      {isAddGroupSubtaskOpen && selectedGroup && (
        <div className="overlay" onClick={() => setIsAddGroupSubtaskOpen(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="drag-handle" />
            <div className="section-row">
              <span className="h3">Tambah Sub-Tugas Kelompok</span>
              <button onClick={() => setIsAddGroupSubtaskOpen(false)} className="icon-btn"><X size={16} /></button>
            </div>

            <form onSubmit={handleAddGroupSubtask}>
              <div className="field">
                <label className="field-label">Judul Sub-Tugas</label>
                <input type="text" className="field-input" placeholder="Integrasi API" value={newSubtaskTitle} onChange={(e) => setNewSubtaskTitle(e.target.value)} required />
              </div>
              <div className="field">
                <label className="field-label">Delegasi Anggota</label>
                <select className="field-select" value={newSubtaskAssignee} onChange={(e) => setNewSubtaskAssignee(e.target.value)}>
                  {selectedGroup.members.map(m => (
                    <option key={m.id} value={m.id}>{m.name} ({m.role})</option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'flex', gap: '6px', marginTop: '14px' }}>
                <button type="button" className="btn-ghost" onClick={() => setIsAddGroupSubtaskOpen(false)}>Batal</button>
                <button type="submit" className="btn">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
