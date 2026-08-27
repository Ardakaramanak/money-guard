import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTransactions,
  addTransaction,
  deleteTransaction,
  fetchTransactionSummary,
  updateTransaction,
} from "./operations.js";

const initialState = {
  items: [], // Tüm transaksiyon listesi
  summary: {
    categoriesSummary: [],
    incomeSummary: 0,
    expenseSummary: 0,
    periodTotal: 0,
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  },
  isLoading: false,
  error: null,
};

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload; // thunkAPI.rejectWithValue'den gelen mesaj
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  extraReducers: (builder) => {
    builder
      // Fetch All Transactions
      .addCase(fetchTransactions.pending, handlePending)
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchTransactions.rejected, handleRejected)

      // Add Transaction
      .addCase(addTransaction.pending, handlePending)
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(addTransaction.rejected, handleRejected)

      // Delete Transaction
      .addCase(deleteTransaction.pending, handlePending)
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        // Silinen işlemi id kullanarak array'den filtrele
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteTransaction.rejected, handleRejected)

      // Fetch Summary
      .addCase(fetchTransactionSummary.pending, handlePending)
      .addCase(fetchTransactionSummary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.summary = action.payload; // İstatistik özetini kaydet
      })
      .addCase(fetchTransactionSummary.rejected, handleRejected)
      .addCase(updateTransaction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        // State içindeki eski işlemi bulup, backend'den gelen güncel veriyle değiştiriyoruz
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id,
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const transactionsReducer = transactionsSlice.reducer;
