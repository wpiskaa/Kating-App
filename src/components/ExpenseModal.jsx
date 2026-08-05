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
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Catat Pengeluaran Cepat</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        {/* SRS Presets */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.15rem' }}>
          <button type="button" className="pill-badge pill-info" onClick={() => setPreset('Warmindo Rutin', '18000', 'Makan & Minum', 'Warmindo War-Kun')}>
            🍜 Warmindo (18k)
          </button>
          <button type="button" className="pill-badge pill-warning" onClick={() => setPreset('Kopi Jahat', '25000', 'Hiburan / Kopi', 'Kopi Jahat Tamantirto')}>
            ☕ Kopi Jahat (25k)
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label className="form-label-clean">Deskripsi Transaksi</label>
            <input
              type="text"
              className="form-input-clean"
              placeholder="Contoh: Makan Siang Warmindo"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label className="form-label-clean">Nominal (Rp)</label>
            <input
              type="number"
              className="form-input-clean"
              placeholder="18000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label className="form-label-clean">Lokasi</label>
            <input
              type="text"
              className="form-input-clean"
              placeholder="Warmindo War-Kun"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn-minimal-secondary" onClick={onClose}>Batal</button>
            <button type="submit" className="btn-minimal">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  );
}
