import * as api from './api.js';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const selectToken = state => state.auth.token;

export const authenticate = createAsyncThunk(
    'auth/authenticate',
    data => api.authenticate(data)
);

const loadToken = () => {
    let serialized;
    try {
        serialized = window.localStorage.getItem('token');
    } catch {
        return null;
    }
    return JSON.parse(serialized);
}

export default authSlice = createSlice({
    name: 'auth',
    initialState: loadToken(),
    reducers: {},
    extraReducers: {
        [authenticate.fulfilled]: (state, action) => action.payload
    }
});
