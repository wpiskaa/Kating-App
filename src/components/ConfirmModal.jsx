import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="overlay" onClick={onCancel}>
      <div className="sheet" onClick={(e) => e.stopPropagation()} style={{ borderTop: '2px solid var(--rose)' }}>
        <div className="drag-handle" />

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <div className="icon-box-sm" style={{ background: 'rgba(244,63,94,0.15)', color: '#fb7185' }}>
            <AlertTriangle size={18} />
          </div>
          <div>
            <span className="h3" style={{ color: '#fb7185' }}>{title || 'Konfirmasi Hapus Data'}</span>
            <span className="dim" style={{ display: 'block' }}>Tindakan ini tidak dapat dibatalkan.</span>
          </div>
        </div>

        <p className="muted" style={{ fontSize: '11.5px', marginBottom: '16px', lineHeight: 1.4 }}>
          {message || 'Apakah kamu yakin ingin menghapus data ini dari sistem?'}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <button type="button" className="btn-ghost" onClick={onCancel}>
            Batal
          </button>
          <button
            type="button"
            className="btn"
            style={{ background: 'var(--rose)', boxShadow: '0 4px 14px rgba(244,63,94,0.4)' }}
            onClick={onConfirm}
          >
            Ya, Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
