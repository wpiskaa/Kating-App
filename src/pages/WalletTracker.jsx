import React, { useState } from 'react';
import ExpenseModal from '../components/ExpenseModal';
import { calculateSafeDailyBudget, getDaysRemainingInMonth, checkOverBudget, formatIDR } from '../utils/financialCalculations';
import { Wallet, AlertCircle, Plus, ArrowDownRight, ShoppingBag, Trash2, Edit2, X, CreditCard, Clock, ChevronUp, ChevronDown } from 'lucide-react';

export default function WalletTracker({ onActionNotice, onLogAction }) {
  const [totalAllowance, setTotalAllowance] = useState(1500000);
  const [currentBalance, setCurrentBalance] = useState(980000);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('Semua');

  // Hide Toggles
  const [hideCardHero, setHideCardHero] = useState(false);
  const [hideHistorySection, setHideHistorySection] = useState(false);

  const [expenses, setExpenses] = useState([
    { id: 'exp-1', title: 'Makan Rutin Warmindo', amount: 18000, category: 'Makan & Minum', location: 'Warmindo War-Kun', date: new Date().toISOString() },
    { id: 'exp-2', title: 'Kopi & Wifi Tugas', amount: 25000, category: 'Hiburan / Kopi', location: 'Kopi Jahat Tamantirto', date: new Date().toISOString() },
    { id: 'exp-3', title: 'Cetak Berkas Tugas Lab', amount: 12000, category: 'Akademik', location: 'Fotocopy Kampus', date: new Date(Date.now() - 86400000).toISOString() },
    { id: 'exp-4', title: 'Beli Skincare Sunscreen', amount: 45000, category: 'Skincare', location: 'Sociolla Online', date: new Date(Date.now() - 172800000).toISOString() },
    { id: 'exp-5', title: 'Bensin Motor Mingguan', amount: 30000, category: 'Transportasi', location: 'SPBU Terban', date: new Date(Date.now() - 259200000).toISOString() }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditBudgetOpen, setIsEditBudgetOpen] = useState(false);
  const [tempBudget, setTempBudget] = useState(totalAllowance);

  const daysRemaining = getDaysRemainingInMonth();
  const safeDailyBudget = calculateSafeDailyBudget(currentBalance);

  const todayDateStr = new Date().toDateString();
  const todayExpensesSum = expenses
    .filter(e => new Date(e.date).toDateString() === todayDateStr)
    .reduce((sum, item) => sum + item.amount, 0);

  const isOverSafeLimit = checkOverBudget(todayExpensesSum, safeDailyBudget);

  const existingCategories = Array.from(new Set(expenses.map(e => e.category)));
  const allCategoryFilters = ['Semua', ...existingCategories];

  const handleAddExpense = (newExpense) => {
    setExpenses([newExpense, ...expenses]);
    setCurrentBalance((prev) => Math.max(0, prev - newExpense.amount));

    if (onActionNotice) onActionNotice(`Pengeluaran ${newExpense.title} (${formatIDR(newExpense.amount)}) dicatat!`);
    if (onLogAction) onLogAction('Catat Transaksi', `${newExpense.title} [${formatIDR(newExpense.amount)}]`);
  };

  const handleDeleteExpense = (id, amount) => {
    const itemObj = expenses.find(e => e.id === id);
    setExpenses(expenses.filter(e => e.id !== id));
    setCurrentBalance((prev) => prev + amount);

    if (onActionNotice) onActionNotice(`Transaksi "${itemObj?.title || ''}" dihapus`, 'delete');
    if (onLogAction) onLogAction('Hapus Transaksi', itemObj?.title || id);
  };

  const handleSaveBudget = (e) => {
    e.preventDefault();
    const val = parseFloat(tempBudget);
    if (!isNaN(val)) {
      setTotalAllowance(val);
      setCurrentBalance(val);
      if (onActionNotice) onActionNotice(`Uang saku bulanan diubah ke ${formatIDR(val)}`);
      if (onLogAction) onLogAction('Ubah Uang Saku', formatIDR(val));
    }
    setIsEditBudgetOpen(false);
  };

  const filteredExpenses = expenses.filter(e => {
    if (selectedCategoryFilter === 'Semua') return true;
    return e.category === selectedCategoryFilter;
  });

  return (
    <>
      {/* Credit Card Banner */}
      {!hideCardHero && (
        <div className={`wallet-card-hero ${isOverSafeLimit ? 'wallet-alert' : ''}`}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CreditCard size={18} color="white" />
              <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', opacity: 0.9 }}>
                Batas Aman Belanja (FR-3.3)
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className={`badge ${isOverSafeLimit ? 'badge-red' : 'badge-green'}`} style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none' }}>
                {isOverSafeLimit ? 'Over Limit' : 'Safe Limit'}
              </span>
              <button onClick={() => setHideCardHero(true)} className="icon-btn" style={{ color: 'white' }}><ChevronUp size={14} /></button>
            </div>
          </div>

          <h2 className="mono" style={{ fontSize: '22px', fontWeight: 800, lineHeight: 1, marginBottom: '6px' }}>
            {formatIDR(safeDailyBudget)} <span style={{ fontSize: '11px', opacity: 0.8, fontWeight: 500 }}>/ Hari</span>
          </h2>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '10px' }}>
            <div>
              <span style={{ fontSize: '9px', opacity: 0.8, display: 'block' }}>Saldo Uang Saku</span>
              <span className="mono" style={{ fontSize: '12px', fontWeight: 700 }}>{formatIDR(currentBalance)}</span>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '9px', opacity: 0.8, display: 'block' }}>Sisa Kalender</span>
              <span className="mono" style={{ fontSize: '11px', fontWeight: 700 }}>{daysRemaining} Hari</span>
            </div>
          </div>

          {isOverSafeLimit && (
            <div style={{ marginTop: '8px', padding: '5px 8px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', fontSize: '9.5px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <AlertCircle size={12} color="#f43f5e" /> Pengeluaran hari ini ({formatIDR(todayExpensesSum)}) melebihi limit!
            </div>
          )}
        </div>
      )}

      {hideCardHero && (
        <button onClick={() => setHideCardHero(false)} className="btn-ghost" style={{ padding: '4px', fontSize: '9.5px' }}>
          Tampilkan Kartu Dompet & Batas Aman <ChevronDown size={11} />
        </button>
      )}

      {/* Action Button & Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '8px' }}>
        <button className="btn" onClick={() => setIsModalOpen(true)} style={{ height: '100%' }}>
          <Plus size={14} /> Catat Transaksi
        </button>

        <div className="stat-card" style={{ position: 'relative' }}>
          <span className="label">Uang Saku</span>
          <span className="h3 mono" style={{ color: '#818cf8', display: 'block', marginTop: '2px' }}>{formatIDR(totalAllowance)}</span>
          <button onClick={() => setIsEditBudgetOpen(true)} className="icon-btn" style={{ position: 'absolute', top: '4px', right: '4px' }}>
            <Edit2 size={11} color="#818cf8" />
          </button>
        </div>
      </div>

      {/* Riwayat Transaksi Section */}
      <div className="card">
        <div className="section-row">
          <span className="h3" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Clock size={15} color="#818cf8" /> Riwayat Transaksi Arus Kas
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="badge badge-blue">{filteredExpenses.length} Transaksi</span>
            <button onClick={() => setHideHistorySection(!hideHistorySection)} className="icon-btn">
              {hideHistorySection ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
            </button>
          </div>
        </div>

        {!hideHistorySection && (
          <>
            {/* Dynamic Category Filter Chips */}
            <div style={{ display: 'flex', gap: '4px', marginBottom: '8px', flexWrap: 'wrap' }}>
              {allCategoryFilters.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategoryFilter(cat)}
                  className={`badge ${selectedCategoryFilter === cat ? 'badge-cyan' : ''}`}
                  style={{ cursor: 'pointer', background: selectedCategoryFilter === cat ? '' : 'rgba(255,255,255,0.03)', color: selectedCategoryFilter === cat ? '' : 'var(--text-3)' }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {filteredExpenses.map((item) => (
                <div key={item.id} className="list-item">
                  <div className="icon-box-sm" style={{ background: 'rgba(244,63,94,0.12)', color: '#fb7185' }}>
                    <ArrowDownRight size={14} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span className="h4">{item.title}</span>
                      <span className="badge badge-yellow">{item.category}</span>
                    </div>
                    <span className="dim" style={{ display: 'block' }}>{item.location} • {new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                  </div>

                  <span className="mono h4" style={{ color: '#fb7185' }}>-{formatIDR(item.amount)}</span>

                  <button onClick={() => handleDeleteExpense(item.id, item.amount)} className="icon-btn" title="Hapus Transaksi">
                    <Trash2 size={12} color="#fb7185" />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Modal Edit Budget */}
      {isEditBudgetOpen && (
        <div className="overlay" onClick={() => setIsEditBudgetOpen(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="drag-handle" />
            <div className="section-row">
              <span className="h3">Ubah Uang Saku Bulanan</span>
              <button onClick={() => setIsEditBudgetOpen(false)} className="icon-btn"><X size={16} /></button>
            </div>

            <form onSubmit={handleSaveBudget}>
              <div className="field">
                <label className="field-label">Nominal Uang Saku (Rp)</label>
                <input
                  type="number"
                  className="field-input"
                  value={tempBudget}
                  onChange={(e) => setTempBudget(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '6px', marginTop: '14px' }}>
                <button type="button" className="btn-ghost" onClick={() => setIsEditBudgetOpen(false)}>Batal</button>
                <button type="submit" className="btn">Simpan Budget</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddExpense={handleAddExpense}
        categories={existingCategories}
      />
    </>
  );
}
