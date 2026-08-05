import React, { useState } from 'react';
import { X, PlusCircle, DollarSign, Tag, FileText } from 'lucide-react';

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

  const setPreset = (presetTitle, presetAmount, presetCategory, presetLocation) => {
    setTitle(presetTitle);
    setAmount(presetAmount);
    setCategory(presetCategory);
    setLocation(presetLocation);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Tambah Transaksi Pengeluaran Cepat</h3>
          <button onClick={onClose} style={{ background: 'none', color: 'var(--text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        {/* Quick Presets for Mahasiswa */}
        <div style={{ marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
            Preset Cepat Skenario SRS:
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            <button
              type="button"
              className="btn-secondary"
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
              onClick={() => setPreset('Makan Rutin Warmindo', '18000', 'Makan & Minum', 'Warmindo War-Kun')}
            >
              🍜 Warmindo War-Kun (Rp 18k)
            </button>
            <button
              type="button"
              className="btn-secondary"
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
              onClick={() => setPreset('Nongkrong & Tugas', '25000', 'Hiburan / Kopi', 'Kopi Jahat Tamantirto')}
            >
              ☕ Kopi Jahat Tamantirto (Rp 25k)
            </button>
            <button
              type="button"
              className="btn-secondary"
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
              onClick={() => setPreset('Cetak Berkas Lab', '12000', 'Akademik', 'Fotocopy Kampus')}
            >
              🖨️ Cetak Berkas (Rp 12k)
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Deskripsi Pengeluaran</label>
            <input
              type="text"
              className="form-input"
              placeholder="Contoh: Makan Siang Nasi Goreng"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Nominal Pengeluaran (Rp)</label>
            <input
              type="number"
              className="form-input"
              placeholder="Contoh: 18000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Lokasi / Tempat</label>
            <input
              type="text"
              className="form-input"
              placeholder="Warmindo War-Kun / Kopi Jahat Tamantirto"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Kategori</label>
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Makan & Minum">Makan & Minum</option>
              <option value="Hiburan / Kopi">Hiburan / Kopi</option>
              <option value="Akademik">Akademik & Print</option>
              <option value="Transportasi">Transportasi</option>
              <option value="Lain-lain">Lain-lain</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn-secondary" style={{ flex: 1 }} onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
              Simpan Transaksi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
