import React, { useState } from 'react';
import ExpenseModal from '../components/ExpenseModal';
import { calculateSafeDailyBudget, getDaysRemainingInMonth, checkOverBudget, formatIDR } from '../utils/financialCalculations';
import { Wallet, AlertTriangle, Plus, ArrowDownRight, ShoppingBag, ShieldCheck, MapPin } from 'lucide-react';

export default function WalletTracker() {
  const [totalAllowance, setTotalAllowance] = useState(1500000);
  const [currentBalance, setCurrentBalance] = useState(980000);
  const [expenses, setExpenses] = useState([
    { id: 'exp-1', title: 'Makan Rutin Warmindo', amount: 18000, category: 'Makan & Minum', location: 'Warmindo War-Kun', date: new Date().toISOString() },
    { id: 'exp-2', title: 'Kopi & Wifi Tugas', amount: 25000, category: 'Hiburan / Kopi', location: 'Kopi Jahat Tamantirto', date: new Date().toISOString() }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
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

  return (
    <>
      {/* Mobile Safe Limit Banner */}
      <div className={`mobile-card ${isOverSafeLimit ? 'wallet-warning' : ''}`}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Wallet size={18} color={isOverSafeLimit ? '#ef4444' : '#818cf8'} />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              Batas Aman Belanja Harian (FR-3.3)
            </span>
          </div>
          <span className={`badge ${isOverSafeLimit ? 'badge-danger' : 'badge-success'}`}>
            {isOverSafeLimit ? 'Over Limit' : 'Aman'}
          </span>
        </div>

        <h2 style={{
          fontSize: '1.75rem',
          fontWeight: 800,
          color: isOverSafeLimit ? '#ef4444' : '#38bdf8',
          fontFamily: 'monospace',
          lineHeight: 1.1
        }}>
          {formatIDR(safeDailyBudget)} <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>/ Hari</span>
        </h2>

        <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
          Formula: (Saldo {formatIDR(currentBalance)}) / ({daysRemaining} Sisa Hari)
        </p>

        {isOverSafeLimit && (
          <div style={{
            marginTop: '0.75rem',
            padding: '0.5rem 0.65rem',
            backgroundColor: 'rgba(239, 68, 68, 0.25)',
            border: '1px solid #ef4444',
            borderRadius: 'var(--radius-sm)',
            color: '#f87171',
            fontSize: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}>
            <AlertTriangle size={14} color="#ef4444" />
            <span>Pengeluaran hari ini ({formatIDR(todayExpensesSum)}) melebihi Batas Aman!</span>
          </div>
        )}

        <div style={{ marginTop: '1rem' }}>
          <button className="btn-mobile-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={16} /> Catat Pengeluaran Cepat
          </button>
        </div>
      </div>

      {/* Mini Financial Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <div className="mobile-card" style={{ padding: '0.85rem 1rem' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Total Saldo</span>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#38bdf8', marginTop: '0.15rem' }}>
            {formatIDR(currentBalance)}
          </h3>
        </div>

        <div className="mobile-card" style={{ padding: '0.85rem 1rem' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Keluar Hari Ini</span>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: isOverSafeLimit ? '#f87171' : '#34d399', marginTop: '0.15rem' }}>
            {formatIDR(todayExpensesSum)}
          </h3>
        </div>
      </div>

      {/* Transactions List */}
      <div className="mobile-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
          <h3 className="mobile-card-title">
            <ShoppingBag size={18} color="#818cf8" />
            Arus Kas Keluar Harian (FR-3.2)
          </h3>
          <span className="badge badge-info">{expenses.length} Transaksi</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {expenses.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <div style={{
                  background: 'rgba(239, 68, 68, 0.15)',
                  padding: '0.4rem',
                  borderRadius: 'var(--radius-sm)',
                  color: '#f87171'
                }}>
                  <ArrowDownRight size={18} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 700 }}>{item.title}</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    <span><MapPin size={10} style={{ display: 'inline' }} /> {item.location}</span>
                  </div>
                </div>
              </div>

              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#f87171' }}>
                -{formatIDR(item.amount)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <ExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddExpense={handleAddExpense}
      />
    </>
  );
}
