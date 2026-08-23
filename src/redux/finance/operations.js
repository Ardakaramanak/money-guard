import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../services/api";

export const fetchTransactions = createAsyncThunk(
  "finance/fetchTransactions",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/transactions");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to fetch transactions",
      );
    }
  },
);

export const fetchTransactionCategories = createAsyncThunk(
  "finance/fetchTransactionCategories",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/transaction-categories");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Unable to fetch transaction categories",
      );
    }
  },
);