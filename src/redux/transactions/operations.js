import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Not: Axios baseURL projenin ana index.js veya auth dosyasında
// "https://goit.study" olarak set edilmiş olmalıdır.

// 1. Tüm İşlemleri Getir (GET /api/transactions)
export const fetchTransactions = createAsyncThunk(
  "transactions/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/transactions");
      return response.data; // Backend'den dönen transaksiyon dizisi
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "İşlemler yüklenemedi.",
      );
    }
  },
);

// 2. Yeni İşlem Ekle - Gelir/Gider (POST /api/transactions)
// payload: { transactionDate, type, categoryId, comment, amount }
export const addTransaction = createAsyncThunk(
  "transactions/add",
  async (transactionData, thunkAPI) => {
    try {
      // Eğer transactionData içinde type yoksa, varsayılan olarak "INCOME" ata
      const finalPayload = {
        type: "INCOME",
        ...transactionData,
      };
      const response = await axios.post("/transactions", finalPayload);
      return response.data; // Yeni eklenen işlem objesi
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "İşlem eklenemedi.",
      );
    }
  },
);

// 3. İşlem Sil (DELETE /api/transactions/:id)
export const deleteTransaction = createAsyncThunk(
  "transactions/delete",
  async (transactionId, thunkAPI) => {
    try {
      await axios.delete(`/transactions/${transactionId}`);
      return transactionId; // Reducer'da state'ten silmek için id'yi dönüyoruz
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "İşlem silinemedi.",
      );
    }
  },
);

// 4. İşlem İstatistiklerini Getir (GET /api/transactions-summary?month=MM&year=YYYY)
export const fetchTransactionSummary = createAsyncThunk(
  "transactions/fetchSummary",
  async ({ month, year }, thunkAPI) => {
    try {
      const response = await axios.get(`/transactions-summary`, {
        params: { month, year },
      });
      return response.data; // Kategorilere göre harcama özetleri
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Özet verileri alınamadı.",
      );
    }
  },
);

// 5. İşlemi Güncelle (PATCH /api/transactions/:id)
// argüman yapısı: { transactionId: "123", updateData: { amount: 500, comment: "Yeni açıklama" } }
export const updateTransaction = createAsyncThunk(
  "transactions/update",
  async ({ transactionId, updateData }, thunkAPI) => {
    try {
      // Wallet API standartlarına göre güncelleme PATCH metodu ile yapılır
      const response = await axios.patch(
        `/transactions/${transactionId}`,
        updateData,
      );
      return response.data; // Backend'den dönen güncellenmiş transaksiyon objesi
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "İşlem güncellenemedi.",
      );
    }
  },
);
