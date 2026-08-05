import React, { useState } from 'react';
import { X, Calculator, Award } from 'lucide-react';

export default function GPACalculatorModal({ isOpen, onClose, currentGPA, onSaveGPA }) {
  const [targetGPA, setTargetGPA] = useState(currentGPA || '3.88');
  const [completedSKS, setCompletedSKS] = useState(72);
  const [targetSKS, setTargetSKS] = useState(20);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveGPA(targetGPA);
    onClose();
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="drag-handle" />
        <div className="section-row">
          <span className="h3" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Calculator size={15} color="#22d3ee" /> Kalkulator & Target IPK
          </span>
          <button onClick={onClose} className="icon-btn"><X size={16} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="field-label">Target IPK Semester Ini</label>
            <input
              type="number"
              step="0.01"
              max="4.00"
              min="0.00"
              className="field-input mono"
              value={targetGPA}
              onChange={(e) => setTargetGPA(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div className="field">
              <label className="field-label">Total SKS Lulus</label>
              <input
                type="number"
                className="field-input"
                value={completedSKS}
                onChange={(e) => setCompletedSKS(e.target.value)}
              />
            </div>

            <div className="field">
              <label className="field-label">SKS Semester Ini</label>
              <input
                type="number"
                className="field-input"
                value={targetSKS}
                onChange={(e) => setTargetSKS(e.target.value)}
              />
            </div>
          </div>

          <div className="card" style={{ background: 'rgba(34,211,238,0.06)', margin: '10px 0', padding: '10px' }}>
            <span className="label" style={{ color: '#22d3ee' }}>Perkiraan Nilai Rata-rata</span>
            <p className="dim" style={{ marginTop: '2px' }}>
              Untuk mencapai IPK <strong>{targetGPA}</strong> dari total {completedSKS + parseInt(targetSKS || 0)} SKS, minimal nilai mata kuliah semester ini adalah <strong>A- (3.70)</strong>.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '6px', marginTop: '12px' }}>
            <button type="button" className="btn-ghost" onClick={onClose}>Batal</button>
            <button type="submit" className="btn">Simpan Target IPK</button>
          </div>
        </form>
      </div>
    </div>
  );
}
