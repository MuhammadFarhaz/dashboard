// https://curious-crow-bracelet.cyclic.app/groceries/getGroceries

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// Get API data
const getAuth = createAsyncThunk('api/getAuth', async () => {
  try {
    const res = await axios.get("http://localhost:5001/auth/getAuth",
    );
    console.log("res", res?.data);
    return res.data;
  } catch (error) {
    throw error;
  }
});


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    auths: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAuth.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAuth.fulfilled, (state, action) => {
        state.auths = action.payload;
        state.isLoading = false;
      })
      .addCase(getAuth.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
  },
});

export { getAuth };
export default authSlice.reducer;
