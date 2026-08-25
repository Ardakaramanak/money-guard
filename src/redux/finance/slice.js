import { createSlice } from "@reduxjs/toolkit";

import {
  fetchTransactionCategories,
  fetchTransactions,
} from "./operations";

const initialState = {
  transactions: [],
  categories: [],
  isLoading: false,
  error: null,
};

const financeSlice = createSlice({
  name: "finance",
  initialState,

  extraReducers: (builder) => {
    builder
      // TRANSACTIONS
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // CATEGORIES
      .addCase(fetchTransactionCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTransactionCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchTransactionCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default financeSlice.reducer;