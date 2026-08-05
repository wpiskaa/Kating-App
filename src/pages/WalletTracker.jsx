import React, { useState } from 'react';
import ExpenseModal from '../components/ExpenseModal';
import { calculateSafeDailyBudget, getDaysRemainingInMonth, checkOverBudget, formatIDR } from '../utils/financialCalculations';
import { Wallet, AlertCircle, Plus, ArrowDownRight, ShoppingBag } from 'lucide-react';

export default function WalletTracker() {
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
      <div className={`card-clean ${isOverSafeLimit ? 'wallet-alert-card' : ''}`}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Wallet size={16} color={isOverSafeLimit ? '#f43f5e' : '#818cf8'} />
            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              Batas Aman Belanja Harian (FR-3.3)
            </span>
          </div>
          <span className={`pill-badge ${isOverSafeLimit ? 'pill-danger' : 'pill-success'}`}>
            {isOverSafeLimit ? 'Over Limit' : 'Aman'}
          </span>
        </div>

        <h2 style={{
          fontSize: '1.6rem',
          fontWeight: 800,
          color: isOverSafeLimit ? '#fb7185' : '#38bdf8',
          fontFamily: 'JetBrains Mono, monospace',
          lineHeight: 1.1
        }}>
          {formatIDR(safeDailyBudget)} <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>/ Hari</span>
        </h2>

        <p style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', marginTop: '0.25rem' }}>
          Saldo {formatIDR(currentBalance)} • {daysRemaining} Sisa Hari
        </p>

        {isOverSafeLimit && (
          <div style={{
            marginTop: '0.625rem',
            padding: '0.45rem 0.65rem',
            backgroundColor: 'rgba(244, 63, 94, 0.15)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            borderRadius: 'var(--radius-inner)',
            color: '#fb7185',
            fontSize: '0.725rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}>
            <AlertCircle size={13} />
            <span>Pengeluaran hari ini ({formatIDR(todayExpensesSum)}) melebihi Batas Aman!</span>
          </div>
        )}

        <div style={{ marginTop: '0.85rem' }}>
          <button className="btn-minimal" onClick={() => setIsModalOpen(true)}>
            <Plus size={16} /> Catat Pengeluaran
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.625rem' }}>
        <div className="card-clean" style={{ padding: '0.75rem 0.85rem' }}>
          <span style={{ fontSize: '0.675rem', color: 'var(--text-tertiary)' }}>Total Saldo</span>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#38bdf8', marginTop: '0.1rem' }}>
            {formatIDR(currentBalance)}
          </h3>
        </div>

        <div className="card-clean" style={{ padding: '0.75rem 0.85rem' }}>
          <span style={{ fontSize: '0.675rem', color: 'var(--text-tertiary)' }}>Keluar Hari Ini</span>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: isOverSafeLimit ? '#fb7185' : '#34d399', marginTop: '0.1rem' }}>
            {formatIDR(todayExpensesSum)}
          </h3>
        </div>
      </div>

      <div className="card-clean">
        <div className="card-clean-title">
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ShoppingBag size={16} color="#818cf8" /> Arus Kas Keluar Harian
          </span>
          <span className="pill-badge pill-info">{expenses.length} Transaksi</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {expenses.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.65rem 0.85rem',
                borderRadius: 'var(--radius-inner)',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                  background: 'rgba(244, 63, 94, 0.12)',
                  padding: '0.35rem',
                  borderRadius: '8px',
                  color: '#fb7185'
                }}>
                  <ArrowDownRight size={15} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.825rem', fontWeight: 700 }}>{item.title}</h4>
                  <span style={{ fontSize: '0.675rem', color: 'var(--text-tertiary)' }}>{item.location}</span>
                </div>
              </div>

              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fb7185', fontFamily: 'JetBrains Mono, monospace' }}>
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
