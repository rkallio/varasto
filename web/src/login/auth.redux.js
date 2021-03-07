import * as api from '../api.js';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const loadToken = () => {
  let serialized;
  try {
    serialized = window.localStorage.getItem('token');
  } catch {
    return null;
  }
  return JSON.parse(serialized);
};

export const authenticate = createAsyncThunk(
  'auth/authenticate',
  async (data) => {
    const result = await api.authenticate(data);
    const serialized = JSON.stringify(result);
    window.localStorage.setItem('token', serialized);
    return result;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: loadToken(),
  reducers: {},
  extraReducers: {
    [authenticate.fulfilled]: (state, action) => action.payload,
  },
});

export default authSlice;

export const selector = (state) => state.auth;
