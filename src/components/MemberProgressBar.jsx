import React from 'react';
import { AlertOctagon, CheckCircle2, UserCheck } from 'lucide-react';

export default function MemberProgressBar({ member, projectDeadline }) {
  const { name, role, totalSubtasks, completedSubtasks, avatar } = member;
  const progressRatio = totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;

  // Automated Flagging Rule (FR-2.3):
  // System automatically applies visual red warning flag on member profile if task progress is 0% within 24h of project deadline
  const now = Date.now();
  const deadlineTime = new Date(projectDeadline).getTime();
  const hoursUntilDeadline = (deadlineTime - now) / (1000 * 3600);
  const isFlaggedCritical = progressRatio === 0 && hoursUntilDeadline <= 24 && hoursUntilDeadline > 0;

  return (
    <div
      className={`card ${isFlaggedCritical ? 'flag-critical' : ''}`}
      style={{
        padding: '1.25rem',
        borderRadius: 'var(--radius-md)',
        marginBottom: '1rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img
            src={avatar}
            alt={name}
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: isFlaggedCritical ? '2px solid var(--danger)' : '2px solid var(--accent-primary)'
            }}
          />
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {name}
              {isFlaggedCritical && (
                <span className="badge badge-danger" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <AlertOctagon size={12} />
                  CRITICAL 0% FLAG
                </span>
              )}
            </h4>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{role}</span>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '1.15rem', fontWeight: 800, color: isFlaggedCritical ? '#ef4444' : '#34d399' }}>
            {progressRatio}%
          </span>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {completedSubtasks}/{totalSubtasks} Sub-tugas Selesai
          </p>
        </div>
      </div>

      {/* Automated Flag Warning Banner */}
      {isFlaggedCritical && (
        <div style={{
          backgroundColor: 'rgba(239, 68, 68, 0.2)',
          border: '1px solid var(--danger)',
          borderRadius: 'var(--radius-sm)',
          padding: '0.625rem 0.85rem',
          fontSize: '0.825rem',
          color: '#f87171',
          marginBottom: '0.85rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <AlertOctagon size={18} color="#ef4444" />
          <span>
            <strong>Peringatan Otomatis (FR-2.3):</strong> Progres masih 0% pada jendela waktu &lt; 24 jam sebelum tenggat akhir!
          </span>
        </div>
      )}

      {/* Custom Progress Bar Visual */}
      <div className="progress-bar-bg">
        <div
          className="progress-bar-fill"
          style={{
            width: `${progressRatio}%`,
            background: isFlaggedCritical ? 'var(--danger)' : 'var(--accent-gradient)'
          }}
        />
      </div>
    </div>
  );
}
