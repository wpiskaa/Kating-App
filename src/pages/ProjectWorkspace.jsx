import React, { useState } from 'react';
import MemberProgressBar from '../components/MemberProgressBar';
import { Users, FolderGit2, CheckSquare, ShieldAlert } from 'lucide-react';

export default function ProjectWorkspace({ currentUser }) {
  const [projectDeadline] = useState(new Date(Date.now() + 18 * 3600 * 1000).toISOString());

  const [members, setMembers] = useState([
    { id: "mem-1", name: "Hafiz Kurniawan (Anda)", role: "Frontend Lead", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80", totalSubtasks: 3, completedSubtasks: 2 },
    { id: "mem-2", name: "Ilham", role: "Backend Architect", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80", totalSubtasks: 3, completedSubtasks: 3 },
    { id: "mem-3", name: "Rian Prasetya", role: "Database Analyst", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80", totalSubtasks: 2, completedSubtasks: 0 } // Flagged Critical
  ]);

  const [subtasks, setSubtasks] = useState([
    { id: 'st-1', title: 'UI Shell & Dynamic Countdown Widget', assignedTo: 'mem-1', completed: true },
    { id: 'st-2', title: 'Integrasi Google Auth Firebase', assignedTo: 'mem-1', completed: true },
    { id: 'st-3', title: '1-Click ATS Resume Generator', assignedTo: 'mem-1', completed: false },
    { id: 'st-4', title: 'Inisialisasi Firestore NoSQL', assignedTo: 'mem-2', completed: true },
    { id: 'st-5', title: 'Penulisan firestore.rules Security', assignedTo: 'mem-2', completed: true },
    { id: 'st-6', title: 'Skrip Cloud Functions Automated Flagging', assignedTo: 'mem-2', completed: true },
    { id: 'st-7', title: 'Skema Normalisasi Relasi Koleksi', assignedTo: 'mem-3', completed: false },
    { id: 'st-8', title: 'Kamus Data Sub-tugas & Indexing', assignedTo: 'mem-3', completed: false }
  ]);

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

  return (
    <>
      <div className="mobile-card" style={{
        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(17, 24, 39, 0.95) 100%)',
        border: '1px solid rgba(239, 68, 68, 0.4)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <ShieldAlert size={22} color="#ef4444" />
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Drama-Free Project Manager</h2>
            <p style={{ fontSize: '0.75rem', color: '#f87171', marginTop: '0.15rem' }}>
              Tenggat Akhir Proyek: 18 Jam Lagi
            </p>
          </div>
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Users size={18} color="#818cf8" />
            Progres Individu Anggota
          </h3>
          <span style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>FR-2.3 Flagging 0%</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {members.map((member) => (
            <MemberProgressBar
              key={member.id}
              member={member}
              projectDeadline={projectDeadline}
            />
          ))}
        </div>
      </div>

      <div className="mobile-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
          <h3 className="mobile-card-title">
            <FolderGit2 size={18} color="#06b6d4" />
            Sub-Tugas Proyek
          </h3>
          <span className="badge badge-info">
            {subtasks.filter(t => t.completed).length}/{subtasks.length} Selesai
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {subtasks.map((task) => {
            const assignedMember = members.find(m => m.id === task.assignedTo);
            return (
              <div
                key={task.id}
                onClick={() => handleToggleSubtask(task.id, task.assignedTo)}
                style={{
                  padding: '0.75rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: task.completed ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-secondary)',
                  border: task.completed ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.5rem',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', overflow: 'hidden' }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '5px',
                    backgroundColor: task.completed ? 'var(--success)' : 'transparent',
                    border: task.completed ? 'none' : '1.5px solid var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    flexShrink: 0
                  }}>
                    {task.completed && <CheckSquare size={14} />}
                  </div>
                  <span style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: task.completed ? 'var(--text-muted)' : 'var(--text-main)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {task.title}
                  </span>
                </div>

                <img
                  src={assignedMember?.avatar}
                  alt={assignedMember?.name}
                  style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                  title={assignedMember?.name}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
