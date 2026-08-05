import React, { useState } from 'react';
import MemberProgressBar from '../components/MemberProgressBar';
import TaskModal from '../components/TaskModal';
import { FolderKanban, CheckSquare, ShieldAlert, UserPlus, Plus, Trash2, X, Filter, ChevronUp, ChevronDown, User } from 'lucide-react';

export default function ProjectWorkspace({ currentUser }) {
  const [projectDeadline] = useState(new Date(Date.now() + 18 * 3600 * 1000).toISOString());
  const [filterType, setFilterType] = useState('Semua'); // 'Semua' | 'Mandiri' | 'Kelompok'

  const [hideTeamMembers, setHideTeamMembers] = useState(false);
  const [hideTasksList, setHideTasksList] = useState(false);

  // Members list (Team Invite CRUD)
  const [members, setMembers] = useState([
    { id: "mem-1", name: "Hafiz Kurniawan", role: "Frontend Lead", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80", totalSubtasks: 3, completedSubtasks: 2 },
    { id: "mem-2", name: "Ilham", role: "Backend Architect", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80", totalSubtasks: 3, completedSubtasks: 3 },
    { id: "mem-3", name: "Rian Prasetya", role: "Database Analyst", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80", totalSubtasks: 2, completedSubtasks: 0 }
  ]);

  // Tasks & Subtasks (Mandiri + Kelompok CRUD)
  const [subtasks, setSubtasks] = useState([
    { id: 'st-1', title: 'UI Shell & Dynamic Countdown', assignedTo: 'mem-1', category: 'Kelompok', completed: true },
    { id: 'st-2', title: 'Google Auth Firebase Client', assignedTo: 'mem-1', category: 'Kelompok', completed: true },
    { id: 'st-3', title: '1-Click ATS Resume Generator', assignedTo: 'mem-1', category: 'Mandiri', completed: false },
    { id: 'st-4', title: 'Firestore NoSQL Database', assignedTo: 'mem-2', category: 'Kelompok', completed: true },
    { id: 'st-5', title: 'firestore.rules Security', assignedTo: 'mem-2', category: 'Kelompok', completed: true },
    { id: 'st-6', title: 'Cloud Functions Flagging', assignedTo: 'mem-2', category: 'Kelompok', completed: true },
    { id: 'st-7', title: 'Normalisasi Relasi Koleksi', assignedTo: 'mem-3', category: 'Mandiri', completed: false },
    { id: 'st-8', title: 'Kamus Data & Indexing', assignedTo: 'mem-3', category: 'Kelompok', completed: false }
  ]);

  // Modals state
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Anggota Tim');

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

  const handleAddTask = (newTask) => {
    const newSubtask = {
      id: `st-${Date.now()}`,
      title: newTask.title,
      assignedTo: 'mem-1',
      category: newTask.category,
      completed: false
    };

    setSubtasks([...subtasks, newSubtask]);
    setMembers(members.map(m => m.id === 'mem-1' ? { ...m, totalSubtasks: m.totalSubtasks + 1 } : m));
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

  // Filter tasks based on filterType
  const filteredSubtasks = subtasks.filter(t => {
    if (filterType === 'Mandiri') return t.category === 'Mandiri';
    if (filterType === 'Kelompok') return t.category === 'Kelompok';
    return true;
  });

  return (
    <>
      {/* Header Alert Card */}
      <div className="card-hero" style={{ background: 'linear-gradient(135deg, rgba(244,63,94,0.12) 0%, var(--bg-card) 100%)', border: '1px solid rgba(244,63,94,0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldAlert size={16} color="#f43f5e" />
            <div>
              <h2 className="h3">Tugas & Proyek (Mandiri & Kelompok)</h2>
              <span className="dim" style={{ color: '#fb7185' }}>Batas Kritis: 18 Jam Lagi</span>
            </div>
          </div>

          <button onClick={() => setIsInviteModalOpen(true)} className="btn" style={{ padding: '5px 8px', fontSize: '9.5px', width: 'auto' }}>
            <UserPlus size={12} /> Invite Teman
          </button>
        </div>
      </div>

      {/* Hideable Team Members Progress */}
      {!hideTeamMembers && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div className="section-row" style={{ marginBottom: '2px' }}>
            <span className="h4" style={{ color: 'var(--text-2)' }}>Progres Tim Kelompok</span>
            <button onClick={() => setHideTeamMembers(true)} className="icon-btn" title="Sembunyikan"><ChevronUp size={12} /></button>
          </div>
          {members.map((member) => (
            <MemberProgressBar
              key={member.id}
              member={member}
              projectDeadline={projectDeadline}
            />
          ))}
        </div>
      )}

      {hideTeamMembers && (
        <button onClick={() => setHideTeamMembers(false)} className="btn-ghost" style={{ padding: '4px', fontSize: '9.5px' }}>
          Show Progres Tim Kelompok <ChevronDown size={11} />
        </button>
      )}

      {/* Task Filter & List Card */}
      <div className="card">
        <div className="section-row">
          <span className="h3" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <FolderKanban size={15} color="#22d3ee" /> Daftar Tugas & Sub-Tugas
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button onClick={() => setIsTaskModalOpen(true)} className="badge badge-cyan" style={{ cursor: 'pointer' }}>+ Task</button>
            <button onClick={() => setHideTasksList(!hideTasksList)} className="icon-btn">
              {hideTasksList ? <ChevronDown size={13} /> : <ChevronUp size={13} />}
            </button>
          </div>
        </div>

        {/* Filter Mandiri / Kelompok Switcher */}
        {!hideTasksList && (
          <>
            <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
              <button
                onClick={() => setFilterType('Semua')}
                className={`badge ${filterType === 'Semua' ? 'badge-blue' : ''}`}
                style={{ cursor: 'pointer', background: filterType === 'Semua' ? '' : 'rgba(255,255,255,0.03)', color: filterType === 'Semua' ? '' : 'var(--text-3)' }}
              >
                Semua ({subtasks.length})
              </button>
              <button
                onClick={() => setFilterType('Mandiri')}
                className={`badge ${filterType === 'Mandiri' ? 'badge-yellow' : ''}`}
                style={{ cursor: 'pointer', background: filterType === 'Mandiri' ? '' : 'rgba(255,255,255,0.03)', color: filterType === 'Mandiri' ? '' : 'var(--text-3)' }}
              >
                Mandiri ({subtasks.filter(t => t.category === 'Mandiri').length})
              </button>
              <button
                onClick={() => setFilterType('Kelompok')}
                className={`badge ${filterType === 'Kelompok' ? 'badge-cyan' : ''}`}
                style={{ cursor: 'pointer', background: filterType === 'Kelompok' ? '' : 'rgba(255,255,255,0.03)', color: filterType === 'Kelompok' ? '' : 'var(--text-3)' }}
              >
                Kelompok ({subtasks.filter(t => t.category === 'Kelompok').length})
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {filteredSubtasks.map((task) => {
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

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span className="h4" style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                          {task.title}
                        </span>
                        <span className={`badge ${task.category === 'Kelompok' ? 'badge-cyan' : 'badge-yellow'}`}>
                          {task.category}
                        </span>
                      </div>
                    </div>

                    {task.category === 'Kelompok' && (
                      <img
                        src={assignedMember?.avatar}
                        alt={assignedMember?.name}
                        style={{ width: '18px', height: '18px', borderRadius: '50%', objectFit: 'cover' }}
                        title={assignedMember?.name}
                      />
                    )}

                    <button onClick={(e) => handleDeleteSubtask(task.id, task.assignedTo, e)} className="icon-btn">
                      <Trash2 size={12} color="#fb7185" />
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Invite Modal */}
      {isInviteModalOpen && (
        <div className="overlay" onClick={() => setIsInviteModalOpen(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="drag-handle" />
            <div className="section-row">
              <span className="h3">Invite Teman Kelompok</span>
              <button onClick={() => setIsInviteModalOpen(false)} className="icon-btn"><X size={16} /></button>
            </div>

            <form onSubmit={handleInviteMember}>
              <div className="field">
                <label className="field-label">Email / ID Teman</label>
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
                <label className="field-label">Peran Tim</label>
                <input
                  type="text"
                  className="field-input"
                  placeholder="UI Designer / Backend Developer"
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

      {/* Task Modal */}
      <TaskModal isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} onAddTask={handleAddTask} />
    </>
  );
}
