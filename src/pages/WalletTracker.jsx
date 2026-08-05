import React, { useState, useEffect } from 'react';
import ExpenseModal from '../components/ExpenseModal';
import { calculateSafeDailyBudget, getDaysRemainingInMonth, checkOverBudget, formatIDR } from '../utils/financialCalculations';
import { Wallet, AlertTriangle, Plus, ArrowDownRight, Calendar, ShoppingBag, ShieldCheck, MapPin } from 'lucide-react';

export default function WalletTracker() {
  const [totalAllowance, setTotalAllowance] = useState(1500000); // Rp 1.500.000 Uang Saku Bulanan
  const [currentBalance, setCurrentBalance] = useState(980000); // Rp 980.000 Sisa Saldo
  const [expenses, setExpenses] = useState([
    { id: 'exp-1', title: 'Makan Rutin Warmindo', amount: 18000, category: 'Makan & Minum', location: 'Warmindo War-Kun', date: new Date().toISOString() },
    { id: 'exp-2', title: 'Kopi & Wifi Tugas', amount: 25000, category: 'Hiburan / Kopi', location: 'Kopi Jahat Tamantirto', date: new Date().toISOString() }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [tempBudgetInput, setTempBudgetInput] = useState(totalAllowance);

  const daysRemaining = getDaysRemainingInMonth();
  const safeDailyBudget = calculateSafeDailyBudget(currentBalance);

  // Sum today's expenses
  const todayDateStr = new Date().toDateString();
  const todayExpensesSum = expenses
    .filter(e => new Date(e.date).toDateString() === todayDateStr)
    .reduce((sum, item) => sum + item.amount, 0);

  const isOverSafeLimit = checkOverBudget(todayExpensesSum, safeDailyBudget);

  const handleAddExpense = (newExpense) => {
    setExpenses([newExpense, ...expenses]);
    setCurrentBalance((prev) => Math.max(0, prev - newExpense.amount));
  };

  const handleSaveBudget = (e) => {
    e.preventDefault();
    const newAllowance = parseFloat(tempBudgetInput);
    if (!isNaN(newAllowance)) {
      setTotalAllowance(newAllowance);
      setCurrentBalance(newAllowance);
    }
    setIsEditingBudget(false);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Personal Wallet Tracker</h1>
          <p className="page-subtitle">
            Manajemen keuangan pribadi dengan Algoritma Batas Aman Belanja Harian (FR-3.3) & Peringatan Otomatis (FR-3.4).
          </p>
        </div>

        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Catat Pengeluaran Cepat
        </button>
      </div>

      {/* Synchronous Safe Daily Limit Alert Card */}
      <div className={`card ${isOverSafeLimit ? 'wallet-warning' : ''}`} style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.35rem' }}>
              <Wallet size={24} color={isOverSafeLimit ? '#ef4444' : '#818cf8'} />
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                Algoritma Batas Aman Belanja Harian (Real-Time Synchronous)
              </span>
            </div>

            <h2 style={{
              fontSize: '2.25rem',
              fontWeight: 800,
              color: isOverSafeLimit ? '#ef4444' : '#38bdf8',
              fontFamily: 'monospace'
            }}>
              {formatIDR(safeDailyBudget)} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/ Hari</span>
            </h2>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
              Formula: (Total Saldo {formatIDR(currentBalance)}) / ({daysRemaining} Sisa Hari Kalender Bulan Ini)
            </p>
          </div>

          <div style={{
            backgroundColor: isOverSafeLimit ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.15)',
            border: isOverSafeLimit ? '1px solid var(--danger)' : '1px solid rgba(16, 185, 129, 0.3)',
            padding: '1rem 1.5rem',
            borderRadius: 'var(--radius-md)',
            textAlign: 'right'
          }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Pengeluaran Hari Ini</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: isOverSafeLimit ? '#f87171' : '#34d399' }}>
              {formatIDR(todayExpensesSum)}
            </span>
            {isOverSafeLimit ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: '#ef4444', fontWeight: 700, marginTop: '0.25rem' }}>
                <AlertTriangle size={14} /> MELAMPAUI BATAS AMAN!
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: '#10b981', fontWeight: 700, marginTop: '0.25rem' }}>
                <ShieldCheck size={14} /> Dalam Limit Aman
              </span>
            )}
          </div>
        </div>

        {/* Visual Warning Banner */}
        {isOverSafeLimit && (
          <div style={{
            marginTop: '1.25rem',
            padding: '0.75rem 1rem',
            backgroundColor: 'rgba(239, 68, 68, 0.25)',
            border: '1px solid #ef4444',
            borderRadius: 'var(--radius-md)',
            color: '#f87171',
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.625rem'
          }}>
            <AlertTriangle size={20} color="#ef4444" />
            <span>
              <strong>Umpan Balik Visual Instan (FR-3.4):</strong> Akumulasi pengeluaran hari ini ({formatIDR(todayExpensesSum)}) telah melebihi Batas Aman Belanja Harian ({formatIDR(safeDailyBudget)}). Harap kurangi pengeluaran insidental besok!
            </span>
          </div>
        )}
      </div>

      {/* Metrics Row */}
      <div className="grid-container" style={{ marginBottom: '2rem' }}>
        <div className="card">
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Saldo Uang Saku Saat Ini</span>
          <h3 style={{ fontSize: '1.65rem', fontWeight: 800, marginTop: '0.25rem', color: '#38bdf8' }}>
            {formatIDR(currentBalance)}
          </h3>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Anggaran Bulan Berjalan</span>
            <button
              onClick={() => setIsEditingBudget(true)}
              style={{ background: 'none', color: '#818cf8', fontSize: '0.8rem', fontWeight: 600 }}
            >
              Ubah
            </button>
          </div>
          {isEditingBudget ? (
            <form onSubmit={handleSaveBudget} style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <input
                type="number"
                className="form-input"
                style={{ padding: '0.35rem 0.65rem', fontSize: '0.9rem' }}
                value={tempBudgetInput}
                onChange={(e) => setTempBudgetInput(e.target.value)}
              />
              <button type="submit" className="btn-primary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}>Simpan</button>
            </form>
          ) : (
            <h3 style={{ fontSize: '1.65rem', fontWeight: 800, marginTop: '0.25rem' }}>
              {formatIDR(totalAllowance)}
            </h3>
          )}
        </div>

        <div className="card">
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sisa Hari Bulan Ini</span>
          <h3 style={{ fontSize: '1.65rem', fontWeight: 800, marginTop: '0.25rem', color: '#fbbf24' }}>
            {daysRemaining} Hari Kalender
          </h3>
        </div>
      </div>

      {/* Recent Cash Outflow Transactions */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            <ShoppingBag size={22} color="#818cf8" />
            Riwayat Arus Kas Keluar Harian (FR-3.2)
          </h3>
          <span className="badge badge-info">{expenses.length} Transaksi Tercatat</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {expenses.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  background: 'rgba(239, 68, 68, 0.15)',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  color: '#f87171'
                }}>
                  <ArrowDownRight size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{item.title}</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <MapPin size={12} color="#38bdf8" /> {item.location}
                    </span>
                    <span className="badge badge-warning" style={{ fontSize: '0.65rem' }}>{item.category}</span>
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f87171' }}>
                  - {formatIDR(item.amount)}
                </span>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {new Date(item.date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddExpense={handleAddExpense}
      />
    </div>
  );
}
