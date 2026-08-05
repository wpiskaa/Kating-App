import React, { useState } from 'react';
import ExpenseModal from '../components/ExpenseModal';
import { calculateSafeDailyBudget, getDaysRemainingInMonth, checkOverBudget, formatIDR } from '../utils/financialCalculations';
import { Wallet, AlertCircle, Plus, ArrowDownRight, ShoppingBag, Trash2, Edit2, X } from 'lucide-react';

export default function WalletTracker() {
  const [totalAllowance, setTotalAllowance] = useState(1500000);
  const [currentBalance, setCurrentBalance] = useState(980000);
  const [expenses, setExpenses] = useState([
    { id: 'exp-1', title: 'Makan Rutin Warmindo', amount: 18000, category: 'Makan & Minum', location: 'Warmindo War-Kun', date: new Date().toISOString() },
    { id: 'exp-2', title: 'Kopi & Wifi Tugas', amount: 25000, category: 'Hiburan / Kopi', location: 'Kopi Jahat Tamantirto', date: new Date().toISOString() }
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

  const handleAddExpense = (newExpense) => {
    setExpenses([newExpense, ...expenses]);
    setCurrentBalance((prev) => Math.max(0, prev - newExpense.amount));
  };

  const handleDeleteExpense = (id, amount) => {
    setExpenses(expenses.filter(e => e.id !== id));
    setCurrentBalance((prev) => prev + amount);
  };

  const handleSaveBudget = (e) => {
    e.preventDefault();
    const val = parseFloat(tempBudget);
    if (!isNaN(val)) {
      setTotalAllowance(val);
      setCurrentBalance(val);
    }
    setIsEditBudgetOpen(false);
  };

  return (
    <>
      {/* Safe Limit Card */}
      <div className={`card ${isOverSafeLimit ? 'wallet-over' : ''}`}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Wallet size={15} color={isOverSafeLimit ? '#f43f5e' : '#818cf8'} />
            <span className="label">Batas Aman Belanja Harian (FR-3.3)</span>
          </div>
          <span className={`badge ${isOverSafeLimit ? 'badge-red' : 'badge-green'}`}>
            {isOverSafeLimit ? 'Over Limit' : 'Aman'}
          </span>
        </div>

        <h2 className="mono h1" style={{ color: isOverSafeLimit ? '#fb7185' : '#22d3ee', fontSize: '22px' }}>
          {formatIDR(safeDailyBudget)} <span className="dim" style={{ fontSize: '11px' }}>/ Hari</span>
        </h2>

        <span className="dim" style={{ display: 'block', marginTop: '2px' }}>
          Saldo {formatIDR(currentBalance)} • {daysRemaining} Sisa Hari
        </span>

        {isOverSafeLimit && (
          <div className="badge badge-red" style={{ marginTop: '6px', display: 'flex', alignItems: 'center', gap: '3px' }}>
            <AlertCircle size={11} /> Hari ini ({formatIDR(todayExpensesSum)}) melampaui limit aman!
          </div>
        )}

        <button className="btn" style={{ marginTop: '10px' }} onClick={() => setIsModalOpen(true)}>
          <Plus size={14} /> Catat Pengeluaran
        </button>
      </div>

      {/* Stats Row */}
      <div className="row">
        <div className="stat-card" style={{ position: 'relative' }}>
          <span className="label">Uang Saku Bulanan</span>
          <span className="h3 mono" style={{ color: '#818cf8', display: 'block', marginTop: '2px' }}>{formatIDR(totalAllowance)}</span>
          <button onClick={() => setIsEditBudgetOpen(true)} className="icon-btn" style={{ position: 'absolute', top: '6px', right: '6px' }}>
            <Edit2 size={12} color="#818cf8" />
          </button>
        </div>

        <div className="stat-card">
          <span className="label">Keluar Hari Ini</span>
          <span className="h3 mono" style={{ color: isOverSafeLimit ? '#fb7185' : '#34d399', display: 'block', marginTop: '2px' }}>{formatIDR(todayExpensesSum)}</span>
        </div>
      </div>

      {/* Expense Outflow List with Delete CRUD */}
      <div className="card">
        <div className="section-row">
          <span className="h3" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <ShoppingBag size={15} color="#818cf8" /> Arus Kas Keluar
          </span>
          <span className="badge badge-blue">{expenses.length} Transaksi</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {expenses.map((item) => (
            <div key={item.id} className="list-item">
              <div className="icon-box-sm" style={{ background: 'rgba(244,63,94,0.12)', color: '#fb7185' }}>
                <ArrowDownRight size={14} />
              </div>
              <div style={{ flex: 1 }}>
                <span className="h4">{item.title}</span>
                <span className="dim" style={{ display: 'block' }}>{item.location}</span>
              </div>
              <span className="mono h4" style={{ color: '#fb7185' }}>-{formatIDR(item.amount)}</span>
              <button onClick={() => handleDeleteExpense(item.id, item.amount)} className="icon-btn" title="Hapus Transaksi">
                <Trash2 size={12} color="#fb7185" />
              </button>
            </div>
          ))}
        </div>
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
      />
    </>
  );
}
