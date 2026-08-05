/**
 * Synchronous client-side financial formula (FR-3.3):
 * Formula: Batas Aman Belanja Harian = (Total Saldo Aktual) / (Sisa Hari Kalender Bulan Berjalan)
 */

export const getDaysRemainingInMonth = (currentDate = new Date()) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-indexed
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
  const currentDay = currentDate.getDate();
  
  // Remaining days including today
  return Math.max(1, totalDaysInMonth - currentDay + 1);
};

export const calculateSafeDailyBudget = (totalBalance, currentDate = new Date()) => {
  const daysRemaining = getDaysRemainingInMonth(currentDate);
  if (!totalBalance || totalBalance <= 0) return 0;
  
  return Math.floor(totalBalance / daysRemaining);
};

export const checkOverBudget = (todayExpenses, safeDailyBudget) => {
  if (safeDailyBudget <= 0) return true;
  return todayExpenses > safeDailyBudget;
};

export const formatIDR = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount);
};
