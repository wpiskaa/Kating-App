import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function MemberProgressBar({ member, projectDeadline }) {
  const { name, role, totalSubtasks, completedSubtasks, avatar } = member;
  const progressRatio = totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;

  const now = Date.now();
  const deadlineTime = new Date(projectDeadline).getTime();
  const hoursUntilDeadline = (deadlineTime - now) / (1000 * 3600);
  const isFlaggedCritical = progressRatio === 0 && hoursUntilDeadline <= 24 && hoursUntilDeadline > 0;

  return (
    <div
      className={`card-clean ${isFlaggedCritical ? 'flag-critical-card' : ''}`}
      style={{ padding: '0.85rem 1rem' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.625rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <img
            src={avatar}
            alt={name}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: isFlaggedCritical ? '1.5px solid var(--accent-rose)' : '1.5px solid var(--border-subtle)'
            }}
          />
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              {name}
              {isFlaggedCritical && (
                <span className="pill-badge pill-danger" style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  <AlertCircle size={10} /> 0% FLAG
                </span>
              )}
            </h4>
            <span style={{ fontSize: '0.725rem', color: 'var(--text-tertiary)' }}>{role}</span>
          </div>
        </div>

        <span style={{ fontSize: '0.875rem', fontWeight: 800, color: isFlaggedCritical ? '#fb7185' : '#34d399' }}>
          {progressRatio}%
        </span>
      </div>

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{
            width: `${progressRatio}%`,
            background: isFlaggedCritical ? 'var(--accent-rose)' : 'var(--accent-gradient)'
          }}
        />
      </div>
    </div>
  );
}
