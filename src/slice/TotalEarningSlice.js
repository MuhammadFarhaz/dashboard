// https://curious-crow-bracelet.cyclic.app/groceries/getGroceries

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get API data
const getEarning = createAsyncThunk("api/getEarning", async () => {
  try {
    const response = await axios.get(
      "http://localhost:5001/groceries/totalearning"
    );
    console.log("earning", response?.data);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const earningSlice = createSlice({
  name: "earn",
  initialState: {
    earns: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEarning.pending, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getEarning.fulfilled, (state, action) => {
        state.earns = action.payload;
        state.isLoading = false;
      })
      .addCase(getEarning.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export { getEarning };
export default earningSlice.reducer;
