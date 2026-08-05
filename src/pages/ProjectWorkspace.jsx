import React, { useState } from 'react';
import MemberProgressBar from '../components/MemberProgressBar';
import { Users, Plus, CheckCircle, Clock, ShieldAlert, FolderGit2, CheckSquare } from 'lucide-react';

export default function ProjectWorkspace({ currentUser }) {
  // Project overall deadline set to 18 hours from now to demonstrate Automated Flagging rule
  const [projectDeadline] = useState(new Date(Date.now() + 18 * 3600 * 1000).toISOString());

  const [members, setMembers] = useState([
    {
      id: "mem-1",
      name: "Hafiz Kurniawan (Anda)",
      role: "Frontend Lead & UI Shell",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
      totalSubtasks: 3,
      completedSubtasks: 2
    },
    {
      id: "mem-2",
      name: "Ilham",
      role: "Backend & Firebase Architect",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
      totalSubtasks: 3,
      completedSubtasks: 3
    },
    {
      id: "mem-3",
      name: "Rian Prasetya",
      role: "Database Analyst",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80",
      totalSubtasks: 2,
      completedSubtasks: 0 // 0% progress within 24h deadline -> Automated Flagging Triggered!
    }
  ]);

  const [subtasks, setSubtasks] = useState([
    { id: 'st-1', title: 'Rancangan UI Shell & Dynamic Countdown Widget', assignedTo: 'mem-1', completed: true },
    { id: 'st-2', title: 'Integrasi Google Auth Firebase Client', assignedTo: 'mem-1', completed: true },
    { id: 'st-3', title: '1-Click ATS Resume Generator (jsPDF)', assignedTo: 'mem-1', completed: false },
    { id: 'st-4', title: 'Inisialisasi Firestore & Firebase Storage Bucket', assignedTo: 'mem-2', completed: true },
    { id: 'st-5', title: 'Penulisan firestore.rules & storage.rules Security', assignedTo: 'mem-2', completed: true },
    { id: 'st-6', title: 'Skrip Automated Flagging Cloud Functions', assignedTo: 'mem-2', completed: true },
    { id: 'st-7', title: 'Skema Normalisasi Relasi Koleksi Dokumen', assignedTo: 'mem-3', completed: false },
    { id: 'st-8', title: 'Kamus Data Sub-tugas & Firestore Indexing', assignedTo: 'mem-3', completed: false }
  ]);

  const handleToggleSubtask = (subtaskId, assignedMemberId) => {
    setSubtasks((prev) =>
      prev.map((task) => {
        if (task.id === subtaskId) {
          const nextState = !task.completed;
          
          // Update completed count for assigned member
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
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Drama-Free Project Manager</h1>
          <p className="page-subtitle">
            Ruang kerja kolaboratif proyek kelompok dengan pemantauan progres real-time & Automated Flagging 0%.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            padding: '0.625rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#f87171'
          }}>
            <ShieldAlert size={18} />
            <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>
              Tenggat Akhir Proyek: 18 Jam Lagi
            </span>
          </div>
        </div>
      </div>

      {/* Team Progress Overview Section */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <Users size={22} color="#818cf8" />
            Metrik Progres Individu Anggota Tim
          </h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            *Sistem secara otomatis menandai warna merah jika progres 0% pada 24 jam sebelum tenggat (FR-2.3)
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem' }}>
          {members.map((member) => (
            <MemberProgressBar
              key={member.id}
              member={member}
              projectDeadline={projectDeadline}
            />
          ))}
        </div>
      </div>

      {/* Sub-tasks Mapping Workspace */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            <FolderGit2 size={22} color="#06b6d4" />
            Pemetaan Sub-Tugas Proyek (Tugas Akhir Kating App)
          </h3>
          <span className="badge badge-info">
            {subtasks.filter(t => t.completed).length} / {subtasks.length} Sub-tugas Selesai
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {subtasks.map((task) => {
            const assignedMember = members.find(m => m.id === task.assignedTo);
            return (
              <div
                key={task.id}
                onClick={() => handleToggleSubtask(task.id, task.assignedTo)}
                style={{
                  padding: '1rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: task.completed ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-card)',
                  border: task.completed ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'var(--transition-normal)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '6px',
                    border: task.completed ? 'none' : '2px solid var(--border-light)',
                    backgroundColor: task.completed ? 'var(--success)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}>
                    {task.completed && <CheckSquare size={16} />}
                  </div>
                  <div>
                    <span style={{
                      fontSize: '0.975rem',
                      fontWeight: 600,
                      textDecoration: task.completed ? 'line-through' : 'none',
                      color: task.completed ? 'var(--text-muted)' : 'var(--text-main)'
                    }}>
                      {task.title}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <img
                    src={assignedMember?.avatar}
                    alt={assignedMember?.name}
                    style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {assignedMember?.name.split(' ')[0]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
