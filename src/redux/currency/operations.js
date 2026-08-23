import { createAsyncThunk } from "@reduxjs/toolkit";

import { fetchCurrencyRates } from "../../services/currencyApi";

const STORAGE_KEY = "currencyRates";
const STORAGE_TIME_KEY = "currencyRatesTimestamp";
const CACHE_DURATION = 60 * 60 * 1000;

export const getCurrencyRates = createAsyncThunk(
  "currency/getCurrencyRates",
  async (_, thunkAPI) => {
    try {
      const cachedRates = localStorage.getItem(STORAGE_KEY);
      const cachedTimestamp = localStorage.getItem(STORAGE_TIME_KEY);

      if (cachedRates && cachedTimestamp) {
        const timePassed = Date.now() - Number(cachedTimestamp);

        if (timePassed < CACHE_DURATION) {
          return JSON.parse(cachedRates);
        }
      }

      const rates = await fetchCurrencyRates();

      localStorage.setItem(STORAGE_KEY, JSON.stringify(rates));
      localStorage.setItem(STORAGE_TIME_KEY, String(Date.now()));

      return rates;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to load currency rates"
      );
    }
  }
);