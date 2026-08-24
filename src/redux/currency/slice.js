import { createSlice } from "@reduxjs/toolkit";

import { getCurrencyRates } from "./operations";

const initialState = {
  rates: [],
  isLoading: false,
  error: null,
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCurrencyRates.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCurrencyRates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rates = action.payload;
      })
      .addCase(getCurrencyRates.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default currencySlice.reducer;