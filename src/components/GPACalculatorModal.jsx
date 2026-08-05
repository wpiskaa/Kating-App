import React, { useState } from 'react';
import { X, Calculator, Target, CheckCircle2 } from 'lucide-react';

export default function GPACalculatorModal({ isOpen, onClose, currentGPA, onSaveGPA }) {
  const [currentIPK, setCurrentIPK] = useState(currentGPA || '3.75');
  const [targetIPK, setTargetIPK] = useState('3.85');
  const [completedSKS, setCompletedSKS] = useState(72);
  const [semesterSKS, setSemesterSKS] = useState(20);

  if (!isOpen) return null;

  // Formula FR-Academic: Target IPS Semester Ini = ((Target IPK * Total SKS Akhir) - (IPK Sekarang * SKS Lulus)) / SKS Semester Ini
  const numCurrentIPK = parseFloat(currentIPK) || 0;
  const numTargetIPK = parseFloat(targetIPK) || 0;
  const numCompletedSKS = parseInt(completedSKS) || 0;
  const numSemesterSKS = parseInt(semesterSKS) || 1;

  const totalSKSAfter = numCompletedSKS + numSemesterSKS;
  const requiredTotalPoints = numTargetIPK * totalSKSAfter;
  const currentEarnedPoints = numCurrentIPK * numCompletedSKS;
  const requiredSemesterIPS = numSemesterSKS > 0 ? (requiredTotalPoints - currentEarnedPoints) / numSemesterSKS : 0;

  const formattedIPS = Math.min(4.00, Math.max(0.00, requiredSemesterIPS)).toFixed(2);
  const isTargetAchievable = requiredSemesterIPS <= 4.00;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveGPA(targetIPK);
    onClose();
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="drag-handle" />
        <div className="section-row">
          <span className="h3" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Calculator size={15} color="#22d3ee" /> Formulasi Target IPS & IPK
          </span>
          <button onClick={onClose} className="icon-btn"><X size={16} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div className="field">
              <label className="field-label">IPK Kumulatif Saat Ini</label>
              <input
                type="number"
                step="0.01"
                max="4.00"
                className="field-input mono"
                value={currentIPK}
                onChange={(e) => setCurrentIPK(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label className="field-label">Target IPK Kumulatif</label>
              <input
                type="number"
                step="0.01"
                max="4.00"
                className="field-input mono"
                value={targetIPK}
                onChange={(e) => setTargetIPK(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div className="field">
              <label className="field-label">Total SKS Lulus</label>
              <input
                type="number"
                className="field-input mono"
                value={completedSKS}
                onChange={(e) => setCompletedSKS(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label className="field-label">SKS Semester Ini</label>
              <input
                type="number"
                className="field-input mono"
                value={semesterSKS}
                onChange={(e) => setSemesterSKS(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Mathematical Result Card */}
          <div className="card" style={{ background: isTargetAchievable ? 'rgba(16,185,129,0.08)' : 'rgba(244,63,94,0.08)', border: isTargetAchievable ? '1px solid rgba(16,185,129,0.3)' : '1.5px solid rgba(244,63,94,0.4)', margin: '10px 0', padding: '10px 12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
              <span className="label" style={{ color: isTargetAchievable ? '#34d399' : '#fb7185' }}>IPS Minimal Semester Ini</span>
              <span className="badge badge-cyan">{totalSKSAfter} Total SKS</span>
            </div>

            <div className="mono h1" style={{ color: isTargetAchievable ? '#34d399' : '#fb7185', fontSize: '22px' }}>
              {isTargetAchievable ? formattedIPS : 'Terlalu Tinggi (>4.00)'}
            </div>

            <p className="dim" style={{ marginTop: '4px', lineHeight: 1.35 }}>
              {isTargetAchievable
                ? `Untuk menaikkan IPK dari ${currentIPK} ke ${targetIPK}, kamu harus meraih IPS minimal ${formattedIPS} pada ${semesterSKS} SKS semester ini.`
                : `Target IPK ${targetIPK} tidak memungkinkan dalam 1 semester karena membutuhkan IPS melebihi 4.00.`}
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
