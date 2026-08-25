import { createSelector } from "@reduxjs/toolkit";

export const selectTransactions = (state) => state.finance.transactions;

export const selectCategories = (state) => state.finance.categories;

export const selectTotalBalance = createSelector(
  [selectTransactions],
  (transactions) => {
    if (!Array.isArray(transactions)) return 0;

    return transactions.reduce((total, tx) => {
      return total + Number(tx?.amount || 0);
    }, 0);
  },
);

export const selectFinanceLoading = (state) => state.finance.isLoading;

export const selectFinanceError = (state) => state.finance.error;