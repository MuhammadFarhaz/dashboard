// https://curious-crow-bracelet.cyclic.app/groceries/getGroceries

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get API data
const getOrder = createAsyncThunk("api/getOrder", async () => {
  try {
    const response = await axios.get(
      "http://localhost:5001/groceries/getOrderDetail"
    );
    console.log("res", response?.data);
    return response.data;
  } catch (error) {
    throw error;
  }
});
// Search API data

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export { getOrder };
export default orderSlice.reducer;
