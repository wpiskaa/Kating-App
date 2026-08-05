import React, { useState } from 'react';
import MemberProgressBar from '../components/MemberProgressBar';
import { FolderKanban, CheckSquare, ShieldAlert, UserPlus, Plus, Trash2, X, Edit3 } from 'lucide-react';

export default function ProjectWorkspace({ currentUser }) {
  const [projectDeadline] = useState(new Date(Date.now() + 18 * 3600 * 1000).toISOString());

  // Members list (CRUD - Create/Read/Delete)
  const [members, setMembers] = useState([
    { id: "mem-1", name: "Hafiz Kurniawan", role: "Frontend Lead", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80", totalSubtasks: 3, completedSubtasks: 2 },
    { id: "mem-2", name: "Ilham", role: "Backend Architect", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80", totalSubtasks: 3, completedSubtasks: 3 },
    { id: "mem-3", name: "Rian Prasetya", role: "Database Analyst", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80", totalSubtasks: 2, completedSubtasks: 0 }
  ]);

  // Subtasks list (CRUD - Create/Read/Update/Delete)
  const [subtasks, setSubtasks] = useState([
    { id: 'st-1', title: 'UI Shell & Dynamic Countdown', assignedTo: 'mem-1', completed: true },
    { id: 'st-2', title: 'Google Auth Firebase Client', assignedTo: 'mem-1', completed: true },
    { id: 'st-3', title: '1-Click ATS Resume Generator', assignedTo: 'mem-1', completed: false },
    { id: 'st-4', title: 'Firestore NoSQL Database', assignedTo: 'mem-2', completed: true },
    { id: 'st-5', title: 'firestore.rules Security', assignedTo: 'mem-2', completed: true },
    { id: 'st-6', title: 'Cloud Functions Flagging', assignedTo: 'mem-2', completed: true },
    { id: 'st-7', title: 'Normalisasi Relasi Koleksi', assignedTo: 'mem-3', completed: false },
    { id: 'st-8', title: 'Kamus Data & Indexing', assignedTo: 'mem-3', completed: false }
  ]);

  // Modals state
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Anggota Tim');

  const [isAddSubtaskOpen, setIsAddSubtaskOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState('mem-1');

  // CRUD Actions
  const handleInviteMember = (e) => {
    e.preventDefault();
    if (!inviteEmail) return;

    const newMemberName = inviteEmail.split('@')[0];
    const newMemObj = {
      id: `mem-${Date.now()}`,
      name: newMemberName.charAt(0).toUpperCase() + newMemberName.slice(1),
      role: inviteRole,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${newMemberName}`,
      totalSubtasks: 0,
      completedSubtasks: 0
    };

    setMembers([...members, newMemObj]);
    setInviteEmail('');
    setIsInviteModalOpen(false);
  };

  const handleAddSubtask = (e) => {
    e.preventDefault();
    if (!newTaskTitle) return;

    const newTask = {
      id: `st-${Date.now()}`,
      title: newTaskTitle,
      assignedTo: newTaskAssignee,
      completed: false
    };

    setSubtasks([...subtasks, newTask]);
    
    // Update member total count
    setMembers(members.map(m => m.id === newTaskAssignee ? { ...m, totalSubtasks: m.totalSubtasks + 1 } : m));

    setNewTaskTitle('');
    setIsAddSubtaskOpen(false);
  };

  const handleToggleSubtask = (subtaskId, assignedMemberId) => {
    setSubtasks((prev) =>
      prev.map((task) => {
        if (task.id === subtaskId) {
          const nextState = !task.completed;
          setMembers((prevMembers) =>
            prevMembers.map((m) => {
              if (m.id === assignedMemberId) {
                const diff = nextState ? 1 : -1;
                return { ...m, completedSubtasks: Math.max(0, m.completedSubtasks + diff) };
              }
              return m;
            })
          );
          return { ...task, completed: nextState };
        }
        return task;
      })
    );
  };

  const handleDeleteSubtask = (subtaskId, assignedMemberId, e) => {
    e.stopPropagation();
    const taskToDelete = subtasks.find(t => t.id === subtaskId);
    setSubtasks(subtasks.filter(t => t.id !== subtaskId));
    
    if (taskToDelete) {
      setMembers(members.map(m => {
        if (m.id === assignedMemberId) {
          return {
            ...m,
            totalSubtasks: Math.max(0, m.totalSubtasks - 1),
            completedSubtasks: taskToDelete.completed ? Math.max(0, m.completedSubtasks - 1) : m.completedSubtasks
          };
        }
        return m;
      }));
    }
  };

  return (
    <>
      {/* Header Alert */}
      <div className="card-hero" style={{ background: 'linear-gradient(135deg, rgba(244,63,94,0.12) 0%, var(--bg-card) 100%)', border: '1px solid rgba(244,63,94,0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldAlert size={16} color="#f43f5e" />
            <div>
              <h2 className="h3">Drama-Free Project Manager</h2>
              <span className="dim" style={{ color: '#fb7185' }}>Tenggat Akhir Proyek: 18 Jam Lagi</span>
            </div>
          </div>

          <button onClick={() => setIsInviteModalOpen(true)} className="btn" style={{ padding: '6px 10px', fontSize: '10px', width: 'auto' }}>
            <UserPlus size={12} /> Invite Teman
          </button>
        </div>
      </div>

      {/* Member Progress Bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {members.map((member) => (
          <MemberProgressBar
            key={member.id}
            member={member}
            projectDeadline={projectDeadline}
          />
        ))}
      </div>

      {/* Subtasks Workspace */}
      <div className="card">
        <div className="section-row">
          <span className="h3" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <FolderKanban size={15} color="#22d3ee" /> Sub-Tugas Tim
          </span>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="badge badge-cyan">
              {subtasks.filter(t => t.completed).length}/{subtasks.length}
            </span>
            <button onClick={() => setIsAddSubtaskOpen(true)} className="badge badge-blue" style={{ cursor: 'pointer' }}>
              + Tambah Task
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {subtasks.map((task) => {
            const assignedMember = members.find(m => m.id === task.assignedTo);
            return (
              <div
                key={task.id}
                onClick={() => handleToggleSubtask(task.id, task.assignedTo)}
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

                <button onClick={(e) => handleDeleteSubtask(task.id, task.assignedTo, e)} className="icon-btn">
                  <Trash2 size={12} color="#fb7185" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Invite Member Modal */}
      {isInviteModalOpen && (
        <div className="overlay" onClick={() => setIsInviteModalOpen(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="drag-handle" />
            <div className="section-row">
              <span className="h3">Invite Teman / Anggota Kelompok</span>
              <button onClick={() => setIsInviteModalOpen(false)} className="icon-btn"><X size={16} /></button>
            </div>

            <form onSubmit={handleInviteMember}>
              <div className="field">
                <label className="field-label">Email / ID Anggota</label>
                <input
                  type="text"
                  className="field-input"
                  placeholder="ilham@student.umy.ac.id"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  required
                />
              </div>

              <div className="field">
                <label className="field-label">Peran dalam Tim</label>
                <input
                  type="text"
                  className="field-input"
                  placeholder="Contoh: UI Designer / QA Engineer"
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '6px', marginTop: '14px' }}>
                <button type="button" className="btn-ghost" onClick={() => setIsInviteModalOpen(false)}>Batal</button>
                <button type="submit" className="btn">Kirim Undangan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Subtask Modal */}
      {isAddSubtaskOpen && (
        <div className="overlay" onClick={() => setIsAddSubtaskOpen(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="drag-handle" />
            <div className="section-row">
              <span className="h3">Tambah Sub-Tugas Kelompok</span>
              <button onClick={() => setIsAddSubtaskOpen(false)} className="icon-btn"><X size={16} /></button>
            </div>

            <form onSubmit={handleAddSubtask}>
              <div className="field">
                <label className="field-label">Judul Sub-Tugas</label>
                <input
                  type="text"
                  className="field-input"
                  placeholder="Contoh: Pengujian Unit Test Auth API"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  required
                />
              </div>

              <div className="field">
                <label className="field-label">Delegasi Kepada Anggota</label>
                <select
                  className="field-select"
                  value={newTaskAssignee}
                  onChange={(e) => setNewTaskAssignee(e.target.value)}
                >
                  {members.map(m => (
                    <option key={m.id} value={m.id}>{m.name} ({m.role})</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', gap: '6px', marginTop: '14px' }}>
                <button type="button" className="btn-ghost" onClick={() => setIsAddSubtaskOpen(false)}>Batal</button>
                <button type="submit" className="btn">Tambah Sub-Tugas</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
