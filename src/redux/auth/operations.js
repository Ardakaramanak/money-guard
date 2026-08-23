import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { clearAuthHeader, setAuthHeader } from "../../services/api";

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const response = await api.post("/auth/sign-up", credentials);

      setAuthHeader(response.data.token);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await api.post("/auth/sign-in", credentials);

      setAuthHeader(response.data.token);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await api.delete("/auth/sign-out");

      clearAuthHeader();
    } catch (error) {
      clearAuthHeader();

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Logout failed"
      );
    }
  }
);

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      setAuthHeader(persistedToken);

      const response = await api.get("/users/current");

      return response.data;
    } catch (error) {
      clearAuthHeader();

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to fetch user"
      );
    }
  }
);