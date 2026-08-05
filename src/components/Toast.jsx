import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Trash2, Info } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 2500);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isDelete = toast.type === 'delete';
  const isError = toast.type === 'error';

  return (
    <div style={{
      position: 'fixed',
      top: '60px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'calc(100% - 32px)',
      maxWidth: '380px',
      zIndex: 300,
      background: isDelete ? 'var(--rose)' : isError ? 'var(--amber)' : 'var(--indigo)',
      color: 'white',
      padding: '10px 14px',
      borderRadius: '14px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '11.5px',
      fontWeight: 600,
      animation: 'fadeIn 0.2s ease'
    }}>
      {isDelete ? <Trash2 size={16} /> : isError ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
      <span style={{ flex: 1 }}>{toast.message}</span>
    </div>
  );
}
