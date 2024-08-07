// redux/clientsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_GET_CLIENTS = process.env.REACT_APP_API_GET_CLIENTS;

// Define a thunk para buscar os clientes
export const fetchClients = createAsyncThunk('clients/fetchClients', async () => {
  const response = await axios.get(`${API_BASE_URL}${API_GET_CLIENTS}`);
  return response.data;
});

const clientsSlice = createSlice({
  name: 'clients',
  initialState: {
    clients: [],
    status: 'idle', // idle, loading, succeeded, failed
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.clients = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default clientsSlice.reducer;
