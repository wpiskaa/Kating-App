import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function ExpenseModal({ isOpen, onClose, onAddExpense }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Makan & Minum');
  const [location, setLocation] = useState('Warmindo War-Kun');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    onAddExpense({
      id: `exp-${Date.now()}`,
      title,
      amount: parseFloat(amount),
      category,
      location,
      date: new Date().toISOString()
    });

    setTitle('');
    setAmount('');
    onClose();
  };

  const setPreset = (pTitle, pAmount, pCategory, pLocation) => {
    setTitle(pTitle);
    setAmount(pAmount);
    setCategory(pCategory);
    setLocation(pLocation);
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="drag-handle" />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span className="h3">Tambah Transaksi</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-3)' }}><X size={16} /></button>
        </div>

        <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
          <button type="button" className="badge badge-cyan" onClick={() => setPreset('Warmindo Rutin', '18000', 'Makan & Minum', 'Warmindo War-Kun')}>🍜 Warmindo (18k)</button>
          <button type="button" className="badge badge-yellow" onClick={() => setPreset('Kopi Jahat', '25000', 'Hiburan / Kopi', 'Kopi Jahat Tamantirto')}>☕ Kopi Jahat (25k)</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="field-label">Deskripsi</label>
            <input type="text" className="field-input" placeholder="Makan Siang Warmindo" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="field">
            <label className="field-label">Nominal (Rp)</label>
            <input type="number" className="field-input" placeholder="18000" value={amount} onChange={(e) => setAmount(e.target.value)} required />
          </div>

          <div className="field">
            <label className="field-label">Lokasi</label>
            <input type="text" className="field-input" placeholder="Warmindo War-Kun" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>

          <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
            <button type="button" className="btn-ghost" onClick={onClose}>Batal</button>
            <button type="submit" className="btn">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  );
}
