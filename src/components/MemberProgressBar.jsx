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
    <div className={`card ${isFlaggedCritical ? 'critical-card' : ''}`} style={{ padding: '10px 12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img
            src={avatar}
            alt={name}
            style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span className="h4">{name}</span>
              {isFlaggedCritical && (
                <span className="badge badge-red" style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                  <AlertCircle size={9} /> 0% FLAG
                </span>
              )}
            </div>
            <span className="dim">{role}</span>
          </div>
        </div>

        <span className="mono h3" style={{ color: isFlaggedCritical ? '#fb7185' : '#34d399' }}>
          {progressRatio}%
        </span>
      </div>

      <div className="pbar-track">
        <div
          className="pbar-fill"
          style={{
            width: `${progressRatio}%`,
            background: isFlaggedCritical ? 'var(--g-rose)' : 'var(--g-indigo-cyan)'
          }}
        />
      </div>
    </div>
  );
}
