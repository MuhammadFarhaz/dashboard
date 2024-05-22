// https://curious-crow-bracelet.cyclic.app/groceries/getGroceries

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get API data
const getSales = createAsyncThunk("api/getSale", async () => {
  try {
    const response = await axios.get(
      "http://192.168.0.103:5001/groceries/totalsalesproduct"
    );
    console.log("res", response?.data);
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Search API data

const saleSlice = createSlice({
  name: "sale",
  initialState: {
    sales: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSales.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSales.fulfilled, (state, action) => {
        state.sales = action.payload;
        state.isLoading = false;
      })
      .addCase(getSales.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export { getSales };
export default saleSlice.reducer;
