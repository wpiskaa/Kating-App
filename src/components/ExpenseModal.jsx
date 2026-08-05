import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function ExpenseModal({ isOpen, onClose, onAddExpense, categories = [] }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [categorySelect, setCategorySelect] = useState('Makan & Minum');
  const [customCategoryInput, setCustomCategoryInput] = useState('');
  const [location, setLocation] = useState('Warmindo War-Kun');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    const finalCategory = categorySelect === 'CUSTOM_NEW' ? (customCategoryInput.trim() || 'Umum') : categorySelect;

    onAddExpense({
      id: `exp-${Date.now()}`,
      title,
      amount: parseFloat(amount),
      category: finalCategory,
      location: location || 'Lokasi',
      date: new Date().toISOString()
    });

    setTitle('');
    setAmount('');
    setCustomCategoryInput('');
    onClose();
  };

  const defaultCategories = ['Makan & Minum', 'Hiburan / Kopi', 'Akademik', 'Transportasi', 'Kebutuhan Kos'];
  const allAvailableCategories = Array.from(new Set([...defaultCategories, ...categories]));

  return (
    <div className="overlay" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="drag-handle" />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span className="h3">Catat Transaksi Pengeluaran</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-3)' }}><X size={16} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="field-label">Deskripsi Pengeluaran</label>
            <input type="text" className="field-input" placeholder="Makan Siang / Beli Skincare / Topup Game" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="field">
            <label className="field-label">Nominal (Rp)</label>
            <input type="number" className="field-input" placeholder="18000" value={amount} onChange={(e) => setAmount(e.target.value)} required />
          </div>

          <div className="field">
            <label className="field-label">Kategori Pengeluaran</label>
            <select className="field-select" value={categorySelect} onChange={(e) => setCategorySelect(e.target.value)}>
              {allAvailableCategories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
              <option value="CUSTOM_NEW">+ Buat Kategori Baru...</option>
            </select>
          </div>

          {categorySelect === 'CUSTOM_NEW' && (
            <div className="field">
              <label className="field-label" style={{ color: 'var(--cyan)' }}>Nama Kategori Baru</label>
              <input
                type="text"
                className="field-input"
                placeholder="Contoh: Skincare / Topup Game / Belanja Baju"
                value={customCategoryInput}
                onChange={(e) => setCustomCategoryInput(e.target.value)}
                required
              />
            </div>
          )}

          <div className="field">
            <label className="field-label">Lokasi / Keterangan</label>
            <input type="text" className="field-input" placeholder="Warmindo War-Kun / Shopee / Minimarket" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>

          <div style={{ display: 'flex', gap: '6px', marginTop: '14px' }}>
            <button type="button" className="btn-ghost" onClick={onClose}>Batal</button>
            <button type="submit" className="btn">Simpan Transaksi</button>
          </div>
        </form>
      </div>
    </div>
  );
}
