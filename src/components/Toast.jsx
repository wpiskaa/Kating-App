import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Trash2 } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isDelete = toast.type === 'delete';
  const isError = toast.type === 'error';

  return (
    <div style={{
      position: 'fixed',
      top: '64px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'calc(100% - 32px)',
      maxWidth: '380px',
      zIndex: 9999,
      background: isDelete ? '#e11d48' : isError ? '#d97706' : '#4f46e5',
      color: 'white',
      padding: '11px 16px',
      borderRadius: '16px',
      boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '12px',
      fontWeight: 700,
      border: '1px solid rgba(255,255,255,0.2)'
    }}>
      {isDelete ? <Trash2 size={18} color="white" /> : isError ? <AlertCircle size={18} color="white" /> : <CheckCircle2 size={18} color="white" />}
      <span style={{ flex: 1, lineHeight: 1.3 }}>{toast.message}</span>
    </div>
  );
}
