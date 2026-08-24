export const selectTransactions = (state) => state.finance.transactions;

export const selectCategories = (state) => state.finance.categories;

export const selectTotalBalance = (state) => state.finance.totalBalance;

export const selectFinanceLoading = (state) => state.finance.isLoading;

export const selectFinanceError = (state) => state.finance.error;