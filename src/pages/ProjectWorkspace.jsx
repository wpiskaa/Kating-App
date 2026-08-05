import React, { useState } from 'react';
import MemberProgressBar from '../components/MemberProgressBar';
import { FolderKanban, CheckSquare, ShieldAlert } from 'lucide-react';

export default function ProjectWorkspace({ currentUser }) {
  const [projectDeadline] = useState(new Date(Date.now() + 18 * 3600 * 1000).toISOString());

  const [members, setMembers] = useState([
    { id: "mem-1", name: "Hafiz Kurniawan", role: "Frontend Lead", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80", totalSubtasks: 3, completedSubtasks: 2 },
    { id: "mem-2", name: "Ilham", role: "Backend Architect", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80", totalSubtasks: 3, completedSubtasks: 3 },
    { id: "mem-3", name: "Rian Prasetya", role: "Database Analyst", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80", totalSubtasks: 2, completedSubtasks: 0 } // Flagged Critical
  ]);

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
      <div className="card-hero" style={{ background: 'linear-gradient(135deg, rgba(244,63,94,0.12) 0%, var(--bg-card) 100%)', border: '1px solid rgba(244,63,94,0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldAlert size={18} color="#f43f5e" />
          <div>
            <h2 className="h3">Drama-Free Project Manager</h2>
            <span className="dim" style={{ color: '#fb7185' }}>Tenggat Akhir Proyek: 18 Jam Lagi</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {members.map((member) => (
          <MemberProgressBar
            key={member.id}
            member={member}
            projectDeadline={projectDeadline}
          />
        ))}
      </div>

      <div className="card">
        <div className="section-row">
          <span className="h3" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <FolderKanban size={15} color="#22d3ee" /> Sub-Tugas Tim
          </span>
          <span className="badge badge-cyan">
            {subtasks.filter(t => t.completed).length}/{subtasks.length} Selesai
          </span>
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
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
