import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";
import {
  Ecommerce,
  Orders,
  Customers,
} from "./pages";
import { useStateContext } from "./contexts/ContextProvider";
import ProductAdd from "./pages/ProductAdd";
import AllProducts from "./pages/AllProducts";
import OrderDetail from "./pages/OrderDetail";
import Login from "./pages/Login";
import PrivateRoute from "./PrivateRoute";
import UpdateProduct from "./pages/UpdateProduct";
import Sales from "./pages/Sales";

const App = () => {
  const [user, setUser] = useState(() => {
    // Get the user's login status from local storage on initial load
    const loggedInUser = localStorage.getItem("auth");
    return loggedInUser ? JSON.parse(loggedInUser) : false;
  });

  useEffect(() => {
    // Save the user's login status to local storage whenever it changes
    localStorage.setItem("auth", JSON.stringify(user));
  }, [user]);
  const {
    activeMenu,
    currentMode,
  } = useStateContext();

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <div className={currentMode === "Dark" ? "dark" : ""}>
          <div className="flex relative dark:bg-main-dark-bg">
            {user && (
              <div
                className="fixed right-4 bottom-4"
                style={{ zIndex: "1000" }}
              >
              </div>
            )}

            {user && activeMenu && (
              <div
                className={`w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white`}
              >
                <Sidebar />
              </div>
            )}

            <div
              className={` min-h-screen w-full ${user && activeMenu ? "md:ml-72" : "md:ml-5"
                }`}
            >
              <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
                <Navbar setUser={setUser} />
              </div>
              <div>
                <Routes>
                  {/* Home Page */}

                  {/* Pages */}
                  <Route path="/" element={<PrivateRoute />}>
                    <Route path="dashboard" element={<Ecommerce />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="customers" element={<Customers />} />
                    <Route path="add" element={<ProductAdd />} />
                    <Route path="update/:id" element={<UpdateProduct />} />
                    <Route path="allProducts" element={<AllProducts />} />
                    <Route path="detail/:id" element={<OrderDetail />} />
                    <Route path="sales" element={<Sales />} />
                    <Route path="ecommerce" element={<Ecommerce />} />
                    <Route path="*" element={<h1>Not Found</h1>} />
                  </Route>
                  {/* Login Page */}
                  {user ? (
                    <Route
                      path="/"
                      element={<Navigate to="/dashboard" replace={true} />}
                    />
                  ) : (
                    <Route
                      path="/"
                      element={<Navigate to="/login" replace={true} />}
                    />
                  )}
                  <Route path="/login" element={<Login setUser={setUser} />} />

                  {/* Not Found */}
                </Routes>
              </div>
              {user ? <Footer /> : null}
            </div>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
