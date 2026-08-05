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
      <div className={`card ${isOverSafeLimit ? 'wallet-over' : ''}`}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Wallet size={15} color={isOverSafeLimit ? '#f43f5e' : '#818cf8'} />
            <span className="label">Batas Aman Harian (FR-3.3)</span>
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

      <div className="row">
        <div className="stat-card">
          <span className="label">Total Saldo</span>
          <span className="h3 mono" style={{ color: '#22d3ee', display: 'block', marginTop: '2px' }}>{formatIDR(currentBalance)}</span>
        </div>

        <div className="stat-card">
          <span className="label">Keluar Hari Ini</span>
          <span className="h3 mono" style={{ color: isOverSafeLimit ? '#fb7185' : '#34d399', display: 'block', marginTop: '2px' }}>{formatIDR(todayExpensesSum)}</span>
        </div>
      </div>

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
