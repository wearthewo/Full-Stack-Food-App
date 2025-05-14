import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./index.css";
import Home from "./pages/Home";
import FoodPage from "./pages/FoodPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import UserProfile from "./pages/UserProfile";
import AdminDashboard from "./pages/AdminDashboard";
import UserRoute from "./components/UserRoute";
import AdminRoute from "./components/AdminRoute";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import PaymentSuccess from "./pages/SuccessPage";
import AdminUsers from "./pages/AdminUsers";
import Adminfood from "./pages/AdminFood";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 container mx-auto p-4">
            {/* ✅ Only one Routes */}
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/food/:id" element={<FoodPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />

              {/* Protected User Routes */}
              <Route
                path="/me"
                element={
                  <UserRoute>
                    <UserProfile />
                  </UserRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <UserRoute>
                    <CartPage />
                  </UserRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <UserRoute>
                    <OrderPage />
                  </UserRoute>
                }
              />

              {/* <Route path="/cart" element={<CartPage />} /> */}
              <Route path="/payment-success" element={<PaymentSuccess />} />

              {/* Protected Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
              <Route
                path="/users/admin"
                element={
                  <AdminRoute>
                    <AdminUsers />
                  </AdminRoute>
                }
              />
              <Route
                path="/foods/admin"
                element={
                  <AdminRoute>
                    <Adminfood />
                  </AdminRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
