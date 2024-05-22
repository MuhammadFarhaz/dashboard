import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "../slice/GetSlice";
import AuthSlice from "../slice/AuthSlice";
import OrderSlice from "../slice/OrderSlice";
import userReducer from "../slice/CurrentUserSlice";
import earningSlice from "../slice/TotalEarningSlice";
import SaleSlice from "../slice/SaleSlice";

export const Store = configureStore({
  reducer: {
    post: apiReducer,
    auth: AuthSlice,
    order: OrderSlice,
    user: userReducer,
    earn: earningSlice,
    sale: SaleSlice,
  },
});
