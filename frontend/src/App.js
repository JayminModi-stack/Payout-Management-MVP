import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext, AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import PayoutList from "./pages/PayoutList";
import PayoutDetail from "./pages/PayoutDetail";
import Vendors from "./pages/Vendors";
import CreatePayout from "./pages/CreatePayout";
import Header from "./components/Header";

function ProtectedRoute({ children }) {
  const { role } = useContext(AuthContext);
  return role ? children : <Navigate to="/" />;
}

function AppRoutes() {
  const { role } = useContext(AuthContext);

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={role ? <Navigate to="/payouts" /> : <Login />} />

        <Route
          path="/payouts"
          element={
            <ProtectedRoute>
              <PayoutList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payout/:id"
          element={
            <ProtectedRoute>
              <PayoutDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendors"
          element={
            <ProtectedRoute>
              <Vendors />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreatePayout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}