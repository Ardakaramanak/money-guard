import { createSelector } from "@reduxjs/toolkit";
// Bu seçiciler store'daki verileri doğrudan arayüze taşır.
export const selectTransactions = (state) => state.transactions?.items || [];
export const selectTransactionsLoading = (state) =>
  state.transactions?.isLoading || false;
export const selectTransactionsError = (state) =>
  state.transactions?.error || null;
export const selectTransactionsSummary = (state) =>
  state.transactions?.summary || null;

// Gelişmiş (Memoized) Seçiciler için Güvenlik
// Tüm Gelir (Income) İşlemlerini Filtrele
export const selectIncomeTransactions = createSelector(
  [selectTransactions],
  (transactions) => {
    // Gelen verinin kesinlikle bir dizi olduğunu doğrula, değilse boş dizi dön
    if (!Array.isArray(transactions)) return [];
    // tx?.type kullanarak tekil transaction objelerinin de eksik gelme ihtimalini koru
    return transactions.filter((tx) => tx?.type === "INCOME");
  },
);

// Tüm Gider (Expense) İşlemlerini Filtrele
export const selectExpenseTransactions = createSelector(
  [selectTransactions],
  (transactions) => {
    if (!Array.isArray(transactions)) return [];
    return transactions.filter((tx) => tx?.type === "EXPENSE");
  },
);

// Toplam Bakiye Hesaplama (Gelirler - Giderler)
export const selectTotalBalance = createSelector(
  [selectTransactions],
  (transactions) => {
    if (!Array.isArray(transactions)) return 0;

    // Giderler zaten negatif (-) geldiği için sadece düz toplama yapıyoruz
    return transactions.reduce((total, tx) => {
      return total + (tx?.amount || 0);
    }, 0);
  },
);
